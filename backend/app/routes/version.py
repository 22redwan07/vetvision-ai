from fastapi import APIRouter
router = APIRouter(prefix="/api", tags=["version"])
@router.get("/version")
async def get_version(): return {"version":"1.0.0","name":"VetVision AI"}
