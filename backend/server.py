from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Iterator, Dict, Any, Union
from datetime import datetime, timedelta, date
from pathlib import Path
import os
import uuid
import logging

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Twin Lakes API")
api = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ---------- CONSTANTS ----------
ROOMS_SEED = [
    {"id": "small-1", "name": "Small Cabin 1", "size": "small", "capacity": 2, "price": 120, "desc": "Cosy cabin sleeping up to 2 guests."},
    {"id": "small-2", "name": "Small Cabin 2", "size": "small", "capacity": 2, "price": 120, "desc": "Cosy cabin sleeping up to 2 guests."},
    {"id": "big-1", "name": "Big Lodge 1", "size": "big", "capacity": 4, "price": 220, "desc": "Spacious lodge with fireplace, sleeps up to 4."},
    {"id": "big-2", "name": "Big Lodge 2", "size": "big", "capacity": 4, "price": 220, "desc": "Spacious lodge with fireplace, sleeps up to 4."},
]
SYNDICATE_TOTAL_SLOTS = 25
SYNDICATE_WAITING_MAX = 10
SYNDICATE_ANNUAL_FEE = 1450
SYNDICATE_DURATION_DAYS = 365
DAY_TICKET_BASE_HOURS = 48
DAY_TICKET_BASE_PRICE = 200
DAY_TICKET_EXT_PRICE = 100

# ---------- MODELS ----------
class Room(BaseModel):
    id: str
    name: str
    size: str
    capacity: int
    price: int
    desc: str

class RoomBookingCreate(BaseModel):
    guest_name: str
    email: EmailStr
    guests: int = Field(ge=1, le=6)
    check_in: date
    check_out: date

class RoomBooking(BaseModel):
    id: str
    room_id: str
    guest_name: str
    email: EmailStr
    guests: int
    check_in: date
    check_out: date
    nights: int
    total: int
    created_at: datetime

class DayTicketCreate(BaseModel):
    guest_name: str
    email: EmailStr
    phone: Optional[str] = None
    start_date: date
    hours: int = Field(ge=48)

class SyndicateApply(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    experience: Optional[str] = None

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str

# ---------- HELPERS ----------
def daterange(start: date, end: date) -> Iterator[date]:
    cur = start
    while cur < end:
        yield cur
        cur += timedelta(days=1)

def iso(d: Union[datetime, date, str, None]) -> Union[str, None]:
    if isinstance(d, (datetime,)):
        return d.isoformat()
    if isinstance(d, date):
        return d.isoformat()
    return d

def serialize_booking(doc: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "id": doc["id"],
        "room_id": doc["room_id"],
        "guest_name": doc["guest_name"],
        "email": doc["email"],
        "guests": doc["guests"],
        "check_in": doc["check_in"],
        "check_out": doc["check_out"],
        "nights": doc["nights"],
        "total": doc["total"],
        "created_at": doc["created_at"].isoformat() if isinstance(doc["created_at"], datetime) else doc["created_at"],
    }

# ---------- STARTUP ----------
@app.on_event("startup")
async def seed_rooms() -> None:
    for r in ROOMS_SEED:
        await db.rooms.update_one({"id": r["id"]}, {"$set": r}, upsert=True)
    logger.info("Rooms seeded")

# ---------- ROUTES ----------
@api.get("/")
async def root() -> Dict[str, str]:
    return {"message": "Twin Lakes API"}

# --- Rooms
@api.get("/rooms", response_model=List[Room])
async def list_rooms() -> List[Dict[str, Any]]:
    rooms = await db.rooms.find({}, {"_id": 0}).to_list(100)
    return rooms

@api.get("/rooms/{room_id}/availability")
async def room_availability(room_id: str) -> Dict[str, Any]:
    room = await db.rooms.find_one({"id": room_id})
    if not room:
        raise HTTPException(404, "Room not found")
    bookings = await db.room_bookings.find(
        {"room_id": room_id},
        {"check_in": 1, "check_out": 1, "_id": 0},
    ).to_list(1000)
    booked: set = set()
    for b in bookings:
        ci = date.fromisoformat(b["check_in"])
        co = date.fromisoformat(b["check_out"])
        for d in daterange(ci, co):
            booked.add(d.isoformat())
    return {"room_id": room_id, "booked_dates": sorted(list(booked))}

@api.post("/rooms/{room_id}/bookings")
async def create_room_booking(room_id: str, payload: RoomBookingCreate) -> Dict[str, Any]:
    room = await db.rooms.find_one({"id": room_id})
    if not room:
        raise HTTPException(404, "Room not found")
    if payload.check_out <= payload.check_in:
        raise HTTPException(400, "check_out must be after check_in")
    if payload.guests > room["capacity"]:
        raise HTTPException(400, f"Guests exceeds capacity ({room['capacity']})")

    # overlap check
    existing = await db.room_bookings.find(
        {"room_id": room_id},
        {"check_in": 1, "check_out": 1, "_id": 0},
    ).to_list(1000)
    new_days = set(d.isoformat() for d in daterange(payload.check_in, payload.check_out))
    for b in existing:
        b_ci = date.fromisoformat(b["check_in"])
        b_co = date.fromisoformat(b["check_out"])
        b_days = set(d.isoformat() for d in daterange(b_ci, b_co))
        if new_days & b_days:
            raise HTTPException(409, "Selected dates overlap with an existing booking")

    nights: int = (payload.check_out - payload.check_in).days
    total: int = nights * room["price"]
    doc: Dict[str, Any] = {
        "id": str(uuid.uuid4()),
        "room_id": room_id,
        "guest_name": payload.guest_name,
        "email": payload.email,
        "guests": payload.guests,
        "check_in": payload.check_in.isoformat(),
        "check_out": payload.check_out.isoformat(),
        "nights": nights,
        "total": total,
        "created_at": datetime.utcnow(),
    }
    await db.room_bookings.insert_one(doc)
    return serialize_booking(doc)

# --- Day Tickets
@api.post("/day-tickets")
async def create_day_ticket(payload: DayTicketCreate) -> Dict[str, Any]:
    if payload.hours < DAY_TICKET_BASE_HOURS or (payload.hours - DAY_TICKET_BASE_HOURS) % 24 != 0:
        raise HTTPException(400, "Hours must be >=48 and in 24-hour increments")
    extra_days: int = (payload.hours - DAY_TICKET_BASE_HOURS) // 24
    price: int = DAY_TICKET_BASE_PRICE + extra_days * DAY_TICKET_EXT_PRICE
    end_date: datetime = payload.start_date + timedelta(hours=payload.hours)
    doc: Dict[str, Any] = {
        "id": str(uuid.uuid4()),
        "guest_name": payload.guest_name,
        "email": payload.email,
        "phone": payload.phone,
        "start_date": payload.start_date.isoformat(),
        "end_date": end_date.isoformat(),
        "hours": payload.hours,
        "price": price,
        "created_at": datetime.utcnow(),
    }
    await db.day_tickets.insert_one(doc)
    doc.pop("_id", None)  # Remove MongoDB ObjectId before returning
    return {**doc, "created_at": doc["created_at"].isoformat()}

# --- Syndicate
@api.get("/syndicate/status")
async def syndicate_status() -> Dict[str, Any]:
    members: int = await db.syndicate_members.count_documents({"status": "member"})
    waiting: int = await db.syndicate_members.count_documents({"status": "waiting"})
    return {
        "members": members,
        "total_slots": SYNDICATE_TOTAL_SLOTS,
        "waiting": waiting,
        "waiting_max": SYNDICATE_WAITING_MAX,
        "annual_fee": SYNDICATE_ANNUAL_FEE,
        "duration_days": SYNDICATE_DURATION_DAYS,
    }

@api.post("/syndicate/apply")
async def syndicate_apply(payload: SyndicateApply) -> Dict[str, Any]:
    existing = await db.syndicate_members.find_one({"email": payload.email})
    if existing:
        raise HTTPException(409, "This email has already applied.")
    members: int = await db.syndicate_members.count_documents({"status": "member"})
    waiting: int = await db.syndicate_members.count_documents({"status": "waiting"})
    now: datetime = datetime.utcnow()
    # Initialize before conditional to avoid possibly-unbound usage
    status_val: str = "waiting"
    expires_at: Optional[datetime] = None
    if members < SYNDICATE_TOTAL_SLOTS:
        status_val = "member"
        expires_at = now + timedelta(days=SYNDICATE_DURATION_DAYS)
    elif waiting < SYNDICATE_WAITING_MAX:
        status_val = "waiting"
        expires_at = None
    else:
        raise HTTPException(409, "Membership and waiting list are both full.")
    doc: Dict[str, Any] = {
        "id": str(uuid.uuid4()),
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone,
        "experience": payload.experience,
        "status": status_val,
        "joined_at": now,
        "expires_at": expires_at,
    }
    await db.syndicate_members.insert_one(doc)
    return {
        "id": doc["id"],
        "status": status_val,
        "joined_at": now.isoformat(),
        "expires_at": expires_at.isoformat() if expires_at else None,
        "position": (waiting + 1) if status_val == "waiting" else None,
    }

# --- Contact
@api.post("/contact")
async def create_contact(payload: ContactCreate) -> Dict[str, Any]:
    doc: Dict[str, Any] = {
        "id": str(uuid.uuid4()),
        "name": payload.name,
        "email": payload.email,
        "subject": payload.subject,
        "message": payload.message,
        "created_at": datetime.utcnow(),
    }
    await db.contact_messages.insert_one(doc)
    return {"id": doc["id"], "ok": True}

app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client() -> None:
    client.close()
