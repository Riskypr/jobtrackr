import { GoogleGenAI } from "@google/genai";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { jobDescription } = await req.json();

    if (!jobDescription) {
      return NextResponse.json(
        { error: "Job description diperlukan" },
        { status: 400 }
      );
    }

    const prompt = `
      Anda adalah asisten AI cerdas untuk ekstraksi data lowongan pekerjaan.
      Ekstrak informasi berikut dari teks job description di bawah ini:
      1. Role/Posisi pekerjaan (masukkan ke field position)
      2. Company/Nama perusahaan (masukkan ke field company)
      3. Location/Lokasi perusahaan atau penempatan
      4. Deadline (Batas akhir pendaftaran jika ada, berikan format tanggal YYYY-MM-DD atau string kosong jika tidak ada)
      5. Requirements/Kualifikasi dan persyaratan pekerjaan

      Teks Job Description:
      ${jobDescription}

      Berikan respons HANYA dalam format JSON tanpa markdown tambahan (seperti \`\`\`json). Respons harus berupa objek JSON valid dengan struktur:
      {
        "company": "...",
        "position": "...",
        "location": "...",
        "deadline": "...",
        "requirements": "..."
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text = response.text?.trim() || "{}";
    // Bersihkan jika ada sisa markdown
    text = text.replace(/^```json/, "").replace(/```$/, "").trim();
    
    const data = JSON.parse(text);

    return NextResponse.json(data);
  } catch (error) {
    console.error("PARSE_AI_ERROR:", error);
    return NextResponse.json(
      { error: "Gagal memproses data menggunakan AI." },
      { status: 500 }
    );
  }
}