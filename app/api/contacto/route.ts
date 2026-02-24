import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

/**
 * Normaliza valores para string (sem usar any)
 */
function toStr(v: unknown): string | undefined {
  if (v === null || v === undefined) return undefined;
  if (typeof v === "string") return v.trim();
  if (typeof v === "number") return String(v);
  return undefined;
}

/**
 * Aceita vários nomes de campos (PT/EN) + honeypot "company"
 */
const IncomingSchema = z.object({
  nome: z.unknown().optional(),
  name: z.unknown().optional(),

  email: z.unknown().optional(),

  telefone: z.unknown().optional(),
  telemovel: z.unknown().optional(),
  numero: z.unknown().optional(),
  phone: z.unknown().optional(),

  mensagem: z.unknown().optional(),
  conteudo: z.unknown().optional(),
  message: z.unknown().optional(),

  assunto: z.unknown().optional(),

  company: z.unknown().optional(), // honeypot anti-spam
});

type Incoming = z.infer<typeof IncomingSchema>;

function errorMessage(e: unknown) {
  return e instanceof Error ? e.message : "Erro desconhecido";
}

function normalize(raw: Incoming) {
  const nome = toStr(raw.nome) ?? toStr(raw.name);
  const email = toStr(raw.email);

  const telefone =
    toStr(raw.telefone) ?? toStr(raw.telemovel) ?? toStr(raw.numero) ?? toStr(raw.phone);

  const mensagem = toStr(raw.mensagem) ?? toStr(raw.conteudo) ?? toStr(raw.message);
  const assunto = toStr(raw.assunto);
  const company = toStr(raw.company);

  return { nome, email, telefone, mensagem, assunto, company };
}

export async function POST(req: NextRequest) {
  try {
    const json = (await req.json()) as unknown;
    const parsed = IncomingSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
    }

    const normalized = normalize(parsed.data);

    // Honeypot: se preenchido, é spam
    if (normalized.company && normalized.company.length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!normalized.nome || !normalized.email || !normalized.mensagem) {
      return NextResponse.json(
        { error: "Campos obrigatórios em falta (nome, email, mensagem)." },
        { status: 400 }
      );
    }

    // SMTP envs
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = process.env.SMTP_PORT;
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;
    const SMTP_FROM = process.env.SMTP_FROM;
    const CONTACT_RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL;

    // Log seguro (não mostra password)
    console.log("SMTP CHECK:", {
      host: SMTP_HOST,
      port: SMTP_PORT,
      user: SMTP_USER,
      passLen: SMTP_PASS?.length,
      from: SMTP_FROM,
      to: CONTACT_RECEIVER_EMAIL,
    });

    if (
      !SMTP_HOST ||
      !SMTP_PORT ||
      !SMTP_USER ||
      !SMTP_PASS ||
      !SMTP_FROM ||
      !CONTACT_RECEIVER_EMAIL
    ) {
      return NextResponse.json(
        { error: "Variáveis SMTP em falta no ambiente (Vercel/.env)." },
        { status: 500 }
      );
    }

    const port = Number(SMTP_PORT);
    if (!Number.isFinite(port)) {
      return NextResponse.json({ error: "SMTP_PORT inválido." }, { status: 500 });
    }

    const secure = port === 465;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      tls: { minVersion: "TLSv1.2" },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: SMTP_FROM,
      to: CONTACT_RECEIVER_EMAIL,
      replyTo: normalized.email,
      subject: `Novo contacto${normalized.assunto ? ` - ${normalized.assunto}` : ""} - ${
        normalized.nome
      }`,
      text:
        `Novo contacto recebido:\n\n` +
        `Nome: ${normalized.nome}\n` +
        `Telefone: ${normalized.telefone ?? "-"}\n` +
        `Email: ${normalized.email}\n\n` +
        `Mensagem:\n${normalized.mensagem}\n`,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: unknown) {
    console.error("ERRO CONTACTO:", err);
    return NextResponse.json(
      { error: "Não foi possível processar o contacto.", detail: errorMessage(err) },
      { status: 500 }
    );
  }
}