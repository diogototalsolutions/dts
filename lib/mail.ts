import nodemailer from 'nodemailer';

export async function sendContactEmail(payload: {
  nome: string;
  telefone: string;
  email: string;
  conteudo: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    subject: `Novo contacto DTS de ${payload.nome}`,
    text: `Nome: ${payload.nome}\nTelefone: ${payload.telefone}\nEmail: ${payload.email}\n\nMensagem:\n${payload.conteudo}`
  });
}
