import {  NextResponse } from "next/server";
import { apiService } from "@/src/lib/api-service";

export async function DELETE(request: Request){
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
    return NextResponse.json({}, { status: 204 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Error removing amen" },
      { status: error.status || 500 }
    );
  }
} 