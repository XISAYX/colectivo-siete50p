/**
 * Lectura centralizada de variables de entorno.
 * Las claves `PUBLIC_*` están disponibles en el cliente; el resto solo en el servidor.
 */
export function getServerEnv() {
  return {
    siteUrl: import.meta.env.PUBLIC_SITE_URL ?? "http://localhost:4321",
    siteName: import.meta.env.PUBLIC_SITE_NAME ?? "Colectivo Siete50",
    whatsappNumber: (import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? "5210000000000").replace(
      /\D/g,
      "",
    ),
    contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL ?? "hola@colectivosiete50.com",
    mailProvider: (import.meta.env.MAIL_PROVIDER ?? "console") as
      | "console"
      | "resend"
      | "nodemailer",
    mailFrom: import.meta.env.MAIL_FROM ?? "Colectivo Siete50 <hola@colectivosiete50.com>",
    mailTo: import.meta.env.MAIL_TO ?? import.meta.env.PUBLIC_CONTACT_EMAIL ?? "hola@colectivosiete50.com",
    resendApiKey: import.meta.env.RESEND_API_KEY,
    smtp: {
      host: import.meta.env.SMTP_HOST,
      port: import.meta.env.SMTP_PORT ? Number(import.meta.env.SMTP_PORT) : 587,
      user: import.meta.env.SMTP_USER,
      pass: import.meta.env.SMTP_PASS,
    },
  };
}

export function getPublicEnv() {
  return {
    siteUrl: import.meta.env.PUBLIC_SITE_URL ?? "http://localhost:4321",
    siteName: import.meta.env.PUBLIC_SITE_NAME ?? "Colectivo Siete50",
    whatsappNumber: (import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? "5210000000000").replace(
      /\D/g,
      "",
    ),
    contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL ?? "hola@colectivosiete50.com",
  };
}
