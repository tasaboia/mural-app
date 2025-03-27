import { NextRequest, NextResponse } from "next/server";
import { apiService } from "@/src/lib/api-service";
import { auth } from "@/auth";

// GET /api/amens/meus
export async function GET(request: NextRequest) {
    try {
    const amens = await apiService.getUserLikes();
    return NextResponse.json(amens);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Error fetching amens" },
      { status: error.status || 500 }
    );
  }
}

// POST /api/amens
  export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const testimonyId = searchParams.get("testimonyId");
     
    try {
      if (!testimonyId) {
        throw new Error("Testimony ID is required");
      }
      
      const amen = await apiService.giveLike(testimonyId);
      return NextResponse.json(amen);
    } catch (error: any) {
      return NextResponse.json(
        { message: error.message || "Error giving amen" },
      { status: error.status || 500 }
    );
  }
} 