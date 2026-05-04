
//app/api/jobs
import { auth } from "@/lib/auth"; // Sesuaikan dengan path file auth Anda
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const jobs = await prisma.jobApplication.findMany({
      where: { userId: session.user.id },
    });

    const total = jobs.length;

    const success = jobs.filter(
      (job) => job.status === "ACCEPTED"
    ).length;

    const successRate = total === 0 ? 0 : Math.round((success / total) * 100);

    return NextResponse.json({
      jobs,
      stats: {
        total,
        success,
        successRate,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

// POST: Membuat lowongan baru yang terikat ke user
export async function POST(req: Request) {
  try {
    const session = await auth();

    // 1. Validasi Autentikasi
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // 2. Validasi Input Dasar
    if (!body.company || !body.position) {
      return NextResponse.json(
        { error: "Company and Position are required" },
        { status: 400 }
      );
    }

    const appliedDate = body.appliedAt ? new Date(body.appliedAt) : new Date();

    // 3. Simpan ke Database
    const job = await prisma.jobApplication.create({
      data: {
        company: body.company,
        position: body.position,
        location: body.location || null,
        requirements: body.requirements || null,
        status: "APPLIED",
        appliedAt: appliedDate,
        userId: session.user.id, // Hubungkan dengan user yang login
        
        steps: [
          {
            name: "Apply",
            done: true,
            date: appliedDate.toISOString(),
          },
          { 
            name: "Seleksi Administrasi", 
            done: false, 
            date: null 
          },
        ],
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}