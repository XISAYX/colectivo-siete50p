import { getServerEnv } from "@/lib/env";
import type { ContactPayload, MailDispatchResult } from "@/types/contact";

/**
 * Capa de correo conectada y activa con Nodemailer.
 */
export async function dispatchContactMail(
  payload: ContactPayload,
): Promise<MailDispatchResult> {
  const env = getServerEnv();

  // Asunto actualizado exactamente a lo que pediste
  const subject = "Correo Pagina Web";
  const text = formatMailBody(payload);

  switch (env.mailProvider) {
    case "resend":
      return dispatchResend({ subject, text, env });
    case "nodemailer":
      return dispatchNodemailer({ subject, text, env, payload });
    default:
      console.info("[mail:simulated]", { to: env.mailTo, subject, text });
      return { provider: "console", simulated: true, queued: false };
  }
}

function formatMailBody(payload: ContactPayload): string {
  return [
    `Nombre: ${payload.name}`,
    `Email: ${payload.email}`,
    `Teléfono: ${payload.phone || "—"}`,
    `Empresa: ${payload.company || "—"}`,
    `División: ${payload.division || "General"}`,
    `Canal preferido: ${payload.channel || "Email"}`,
    "",
    `Detalles:`,
    payload.message,
  ].join("\n");
}

async function dispatchResend({
  subject,
  text,
  env,
}: {
  subject: string;
  text: string;
  env: ReturnType<typeof getServerEnv>;
}): Promise<MailDispatchResult> {
  if (!env.resendApiKey) {
    console.warn("[mail:resend] Falta RESEND_API_KEY. Se simula el envío.");
    return { provider: "resend", simulated: true, queued: false };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(env.resendApiKey);
  await resend.emails.send({
    from: env.mailFrom,
    to: env.mailTo,
    subject,
    text,
  });

  return { provider: "resend", simulated: false, queued: true };
}

async function dispatchNodemailer({
  subject,
  text,
  env,
  payload,
}: {
  subject: string;
  text: string;
  env: ReturnType<typeof getServerEnv>;
  payload: ContactPayload;
}): Promise<MailDispatchResult> {
  if (!env.smtp.host || !env.smtp.user || !env.smtp.pass) {
    console.warn("[mail:smtp] Faltan credenciales SMTP. Se simula el envío.");
    return { provider: "nodemailer", simulated: true, queued: false };
  }

  const nodemailer = await import("nodemailer");

  const transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port || 587,
    secure: false,
    auth: {
      user: env.smtp.user,
      pass: env.smtp.pass,
    },
  });

  await transporter.sendMail({
    from: env.mailFrom || `Colectivo Siete50 <${env.smtp.user}>`,
    to: env.mailTo || "colectivosiete50@gmail.com",
    replyTo: payload.email,
    subject,
    text,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 25px; background-color: #08080c; color: #ffffff; border-radius: 12px;">
        <h2 style="color: #e8b800; border-bottom: 2px solid #e8b800; padding-bottom: 10px; margin-top: 0;">
          NUEVO CORREO — COLECTIVO SIETE50
        </h2>
        <p style="font-size: 14px; margin: 10px 0;"><strong>Nombre completo:</strong> ${payload.name}</p>
        <p style="font-size: 14px; margin: 10px 0;"><strong>Email:</strong> <span style="color: #60a5fa; text-decoration: none;">${payload.email}</span></p>
        <p style="font-size: 14px; margin: 10px 0;"><strong>Teléfono:</strong> <span style="color: #60a5fa;">${payload.phone || "—"}</span></p>
        <br />
        <h3 style="color: #e8b800; margin-bottom: 10px;">DETALLES:</h3>
        <div style="background-color: #121218; padding: 18px; border-radius: 8px; border: 1px solid #333; line-height: 1.6; font-size: 14px; white-space: pre-wrap; text-align: left; margin: 0;">${payload.message}</div>
      </div>
    `,
  });

  console.info("[mail:smtp:sent]", { to: env.mailTo, subject });
  return { provider: "nodemailer", simulated: false, queued: true };
}
