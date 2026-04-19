import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET
export async function GET() {
  try {
    const jobs = await prisma.jobApplication.findMany({
      orderBy: { appliedAt: "desc" },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

// POST
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.company || !body.position) {
      return NextResponse.json(
        { error: "Invalid data" },
        { status: 400 }
      );
    }

  const job = await prisma.jobApplication.create({
    data: {
      company: body.company,
      position: body.position,
      status: "APPLIED",
      appliedAt: body.appliedAt
        ? new Date(body.appliedAt)
        : new Date(),

      steps: [
        {
          name: "Apply",
          done: true,
          date: body.appliedAt || new Date(),
        },
        { name: "Seleksi Administrasi", done: false, date: null },
      ],
    },
  });

    return NextResponse.json(job);
  } catch (error) {
    console.error("POST ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}