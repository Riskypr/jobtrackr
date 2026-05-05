import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // Sesuaikan dengan path file auth Anda

export async function POST(req: Request) {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { jobDescription, resumeData, companyName, position } = await req.json();

    if (!jobDescription || !resumeData || !companyName || !position) {
      return NextResponse.json(
        { error: "Semua data seperti Job Description, Resume, Nama Perusahaan, dan Posisi harus diisi" },
        { status: 400 }
      );
    }

    // Ambil nama dari session user yang login 
    const applicantName = session.user?.name || "Nama Pelamar";

    const prompt = `
      Anda adalah asisten pelamar kerja profesional. Buatlah surat lamaran pekerjaan formal berbahasa Indonesia.
      Sesuaikan isi paragrafnya agar sangat relevan dengan detail pekerjaan (job description) dan ringkasan resume yang diberikan, namun gunakan susunan format persis seperti di bawah ini tanpa mengubah bagian data diri.

      Data Pelamar:
      Nama: ${applicantName}
      Jenis Kelamin: Laki-Laki
      Tempat, Tanggal Lahir: 
      Pendidikan Terakhir: 
      Status: 
      Alamat: 
      Nomor Hp: 
      Email: 

      Detail Pekerjaan yang Dilamar:
      Posisi: ${position}
      Perusahaan: ${companyName}
      Detail Pekerjaan (Job Description):
      ${jobDescription}

      Ringkasan Resume/Pengalaman:
      ${resumeData}

      Format Output yang Harus Dihasilkan:
      Palangka Raya, 22 April 2026
      Hal : Lamaran Pekerjaan
      Kepada Yth,
      Bapak/Ibu HRD
      ${companyName}
      Di tempat

      Dengan hormat,
      Berdasarkan informasi lowongan pekerjaan yang dipublikasikan oleh ${companyName}, saya bermaksud mengajukan diri untuk melamar posisi sebagai ${position}.

      Untuk itu, saya yang bertanda tangan di bawah ini,

      Nama				    : ${applicantName}
      Jenis Kelamin			: 
      Tempat, Tanggal Lahir	: 
      Pendidikan Terkahir	: 
      Status				: 
      Alamat				: 
      Nomor Hp			    : 
      Email				    : 

      [Tuliskan 1-2 paragraf penutup yang diubah, profesional, dan menjelaskan bagaimana keahlian Teknik Informatika Anda relevan dengan posisi yang dilamar di ${companyName}]

      Sebagai bahan pertimbangan, bersama ini saya lampirkan dokumen pendukung:
      • Surat Lamaran
      • Curriculum Vitae (CV)
      • KTP
      • Ijasah
      • Kartu keluarga
      • Transkrip Nilai

      Besar harapan saya untuk dapat diberikan kesempatan mengikuti tahapan seleksi selanjutnya guna menjelaskan lebih mendalam mengenai potensi yang saya miliki.

      Demikian surat lamaran ini saya buat dengan sebenar-benarnya. Atas perhatian dan kesempatan yang Bapak/Ibu berikan, saya ucapkan terima kasih.
      Salam Hormat,

      ${applicantName}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({
      coverLetter: response.text,
    });
  } catch (error) {
    console.error("GENERATE_ERROR:", error);
    return NextResponse.json(
      { error: "Gagal membuat draf, silakan coba lagi." },
      { status: 500 }
    );
  }
}