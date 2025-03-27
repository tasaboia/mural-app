import { NextRequest, NextResponse } from "next/server";
import { apiService } from "@/src/lib/api-service";
import { CreateTestimonyDTO } from "@/src/types/testemunho";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const approved = searchParams.get("approved");
    const category = searchParams.get("category");
    const authorId = searchParams.get("authorId");
    
    const filters: Record<string, any> = {};
    
    if (approved !== null) {
      filters.approved = approved === "true";
    }
    
    if (category) {
      filters.category = category;
    }
    
    if (authorId) {
      filters.authorId = authorId;
    }
    
    
    const testimonies = await apiService.getTestimonies(filters);
    return NextResponse.json(testimonies);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Error fetching testimonies" },
      { status: error.status || 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    
    
    const testimonyDTO: CreateTestimonyDTO = {
      title: data.title,
      content: data.content,
      category: data.category,
      anonymous: data.anonymous || false,
    };
    
    const testimony = await apiService.createTestimony(testimonyDTO);
    return NextResponse.json(testimony);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Error creating testimony" },
      { status: error.status || 500 }
    );
  }
} 