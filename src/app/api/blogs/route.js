import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Blog from "../../../models/Blog";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Quick check to make sure slug is unique. 
    // In production, we'd handle duplicate slugs gracefully (e.g., adding a number).
    const existing = await Blog.findOne({ slug: body.slug });
    if (existing) {
      body.slug = `${body.slug}-${Date.now()}`;
    }

    const blog = await Blog.create(body);

    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
