import { NextRequest, NextResponse } from "next/server";
import { apiService } from "@/src/lib/api-service";


export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const testimonyId = searchParams.get("testimonyId");
   
  try {
    
    if (!testimonyId) {
      return NextResponse.json(
        { message: "Testimony ID is required" },
        { status: 400 }
      );
    }

    const like = await apiService.giveLike(testimonyId);
    return NextResponse.json(like);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Error liking testimony" },
      { status: error.status || 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const testimonyId = searchParams.get("testimonyId");
    if (!testimonyId) {
      return NextResponse.json(
        { message: "Testimony ID is required" },
        { status: 400 }
      );
    }
  try {
    
    await apiService.removeLike(testimonyId);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Error removing like from testimony" },
      { status: error.status || 500 }
    );
  }
} 