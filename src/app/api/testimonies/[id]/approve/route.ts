import { NextRequest, NextResponse } from "next/server";
import { apiService } from "@/src/lib/api-service";
 
export async function PATCH(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    const testimonyId = searchParams.get("testimonyId");
    if (!testimonyId) {
      return NextResponse.json(
        { message: "Testimony ID is required" },
        { status: 400 }
      )}

  try {
    
    
    const testimony = await apiService.approveTestimony(testimonyId);
    return NextResponse.json(testimony);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Error approving testimony" },
      { status: error.status || 500 }
    );
  }
} 