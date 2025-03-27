import { NextRequest, NextResponse } from "next/server";
import { apiService } from "@/src/lib/api-service";
import { UpdateTestimonyDTO } from "@/src/types/testemunho";
import { auth } from "@/auth";
import { isAdmin } from "@/src/lib/auth-utils";

 

export async function GET(request: NextRequest) { 
  try {
    const { searchParams } = new URL(request.url);
    const testimonyId = searchParams.get("testimonyId");
    if (!testimonyId) {
      return NextResponse.json(
        { message: "Testimony ID is required" },
        { status: 400 }
      );
    }
    const testimony = await apiService.getTestimonyById(testimonyId);
    return NextResponse.json(testimony);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Error fetching testimony" },
      { status: error.status || 500 }
    );
  }
}

// PATCH /api/testemunhos/[id]
export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const testimonyId = searchParams.get("testimonyId");
  if (!testimonyId) {
    return NextResponse.json(
      { message: "Testimony ID is required" },
      { status: 400 }
    );
  }

  try {
   
    const data = await request.json();
    const testimonyDTO: UpdateTestimonyDTO = {};
    
    if (data.title !== undefined) testimonyDTO.title = data.title;
    if (data.content !== undefined) testimonyDTO.content = data.content;
    if (data.category !== undefined) testimonyDTO.category = data.category;
    if (data.anonymous !== undefined) testimonyDTO.anonymous = data.anonymous;
    
 
    
    const testimony = await apiService.updateTestimony(testimonyId, testimonyDTO);
    return NextResponse.json(testimony);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Error updating testimony" },
      { status: error.status || 500 }
    );
  }
}

// DELETE /api/testemunhos/[id]
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
    
    
    await apiService.deleteTestimony(testimonyId);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Error deleting testimony" },
      { status: error.status || 500 }
    );
  }
} 