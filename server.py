
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import time

app = FastAPI(title="CLB Church Backend")

# Enable CORS for the frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models ---

class Announcement(BaseModel):
    id: str
    title: str
    description: str
    image: Optional[str] = None

class PaymentRequest(BaseModel):
    amount: str
    phone: str
    provider: str
    purpose: str

class ControlState(BaseModel):
    is_live: bool = False
    global_alert: Optional[str] = None
    force_view: Optional[str] = None # e.g., "LIVE_STREAM", "GIVING"

# --- Mock Database ---

db_announcements = [
    { 
        "id": "sunday-garage", 
        "title": "Sunday Garage", 
        "description": "Join us every Sunday! 1st Service: 9:00AM | 2nd Service: 11:30PM",
        "image": "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=800"
    },
    { 
        "id": "mc-live", 
        "title": "MC Live is ON!", 
        "description": "Every Wednesday at 5:30PM in all Missional Communities.",
        "image": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800"
    }
]

# This is the "Control" object that manages the app remotely
current_control_state = ControlState(
    is_live=False,
    global_alert="Welcome to CLB Mobile! God bless you.",
    force_view=None
)

# --- Routes ---

@app.get("/api/announcements", response_model=List[Announcement])
async def get_announcements():
    return db_announcements

@app.get("/api/control")
async def get_control_state():
    """Endpoint for the mobile app to poll for remote commands."""
    return current_control_state

@app.post("/api/control/update")
async def update_control_state(state: ControlState):
    """Admin endpoint to change what the mobile app is doing."""
    global current_control_state
    current_control_state = state
    return {"status": "updated", "state": current_control_state}

@app.post("/api/payments/initiate")
async def initiate_payment(req: PaymentRequest):
    """Handles logic for Mobile Money USSD generation."""
    mtn_merchant = "726123"
    airtel_merchant = "4380286"
    
    ussd = ""
    if req.provider.upper() == "MTN":
        ussd = f"*165*3*{mtn_merchant}*{req.amount}#"
    elif req.provider.upper() == "AIRTEL":
        ussd = f"*185*9*{airtel_merchant}*{req.amount}#"
    else:
        raise HTTPException(status_code=400, detail="Invalid provider")
        
    print(f"[PY-SERVER] Initiating {req.provider} payment for {req.amount} UGX")
    
    return {
        "status": "initiated",
        "transactionId": f"PY-CLB-{int(time.time())}",
        "ussdInstruction": ussd,
        "message": f"Please confirm on your phone or dial {ussd}"
    }

if __name__ == "__main__":
    import uvicorn
    # In production, use uvicorn server:app --host 0.0.0.0 --port 3001
    uvicorn.run(app, host="0.0.0.0", port=3001)
