import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET job detail
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

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

// UPDATE (Timeline, Status, atau Info lainnya)
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    // Kita gunakan spread operator agar API ini fleksibel:
    const job = await prisma.jobApplication.update({
      where: { id },
      data: {
        ...(body.status && { status: body.status }),
        ...(body.steps && { steps: body.steps }),
        ...(body.notes !== undefined && { notes: body.notes }),
        ...(body.company && { company: body.company }),
        ...(body.role && { role: body.role }),
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