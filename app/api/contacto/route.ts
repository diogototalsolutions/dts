// app/api/contacto/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

function s(v: any) {
  if (v === undefined || v === null) return "";
  return String(v).trim();
}

const IncomingSchema = z.object({
  // PT
  nome: z.any().optional(),
  telefone: z.any().optional(),
  telemovel: z.any().optional(),
  numero: z.any().optional(),
  mensagem: z.any().optional(),
  conteudo: z.any().optional(),

  // EN
  name: z.any().optional(),
  phone: z.any().optional(),
  message: z.any().optional(),

  // comum
  email: z.any().optional(),
  company: z.any().optional(), // honeypot
});

const NormalizedSchema = z.object({
  nome: z.string().min(2, "Nome obrigatório"),
  telefone: z.string().optional(),
  email: z.string().email("Email inválido"),
  conteudo: z.string().min(5, "Mensagem obrigatória"),
  company: z.string().optional(),
});

function normalize(raw: any) {
  return {
    nome: s(raw.nome ?? raw.name),
    telefone: s(raw.telefone ?? raw.telemovel ?? raw.numero ?? raw.phone),
    email: s(raw.email),
    conteudo: s(raw.conteudo ?? raw.mensagem ?? raw.message),
    company: s(raw.company),
  };
}

async function readBody(req: Request) {
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) return await req.json();

  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    return Object.fromEntries(form.entries());
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const text = await req.text();
    return Object.fromEntries(new URLSearchParams(text));
  }

  return await req.json().catch(async () => {
    const text = await req.text().catch(() => "");
    return text ? { raw: text } : {};
  });
}

export async function POST(req: Request) {
  try {
    const raw = await readBody(req);

    const incoming = IncomingSchema.parse(raw);
    const normalized = normalize(incoming);

    // Honeypot anti-spam
    if (normalized.company && normalized.company.length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const data = NormalizedSchema.parse(normalized);

    // 1) Guardar na BD (ContactMessage)
    await prisma.contactMessage.create({
      data: {
        nome: data.nome,
        telefone: data.telefone || null,
        email: data.email,
        conteudo: data.conteudo,
      },
    });

    // 2) Enviar email (Resend)
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    if (!apiKey || !toEmail) {
      return NextResponse.json(
        { ok: true, warning: "Email não configurado (RESEND_API_KEY/CONTACT_TO_EMAIL)." },
        { status: 200 }
      );
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject: `Novo contacto: ${data.nome}`,
      text:
        `Nome: ${data.nome}\n` +
        `Telefone: ${data.telefone || "-"}\n` +
        `Email: ${data.email}\n\n` +
        `Mensagem:\n${data.conteudo}\n`,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("CONTACT ERROR:", err);

    if (err?.name === "ZodError") {
      return NextResponse.json({ ok: false, errors: err.errors }, { status: 400 });
    }

    return NextResponse.json({ ok: false, error: "Erro ao enviar contacto." }, { status: 500 });
  }
}
