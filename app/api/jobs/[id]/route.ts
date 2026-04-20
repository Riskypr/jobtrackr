import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET job detail
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // 🔥 FIX DI SINI

    const job = await prisma.jobApplication.findUnique({
      where: { id },
    });

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("GET DETAIL ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch job" },
      { status: 500 }
    );
  }
}

// update timeline (PATCH)
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const job = await prisma.jobApplication.update({
      where: { id },
      data: {
        status: body.status,
        steps: body.steps, // 🔥 penting
        notes: body.notes,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error("UPDATE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}

// DELETE job
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing ID" },
        { status: 400 }
      );
    }

    await prisma.jobApplication.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}