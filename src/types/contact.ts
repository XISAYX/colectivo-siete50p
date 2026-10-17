export const CONTACT_CHANNELS = ["whatsapp", "email"] as const;
export type ContactChannel = (typeof CONTACT_CHANNELS)[number];

export const CONTACT_DIVISIONS = [
  "produccion",
  "marca",
  "experiencias",
  "digital",
  "otro",
] as const;
export type ContactDivision = (typeof CONTACT_DIVISIONS)[number];

/** Payload validado del formulario de contacto. */
export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  division: ContactDivision;
  channel: ContactChannel;
  message: string;
}

export interface WhatsAppRedirect {
  url: string;
  phone: string;
  prefilledMessage: string;
}

export interface MailDispatchResult {
  provider: "console" | "resend" | "nodemailer";
  simulated: boolean;
  queued: boolean;
}

export interface ContactApiSuccess {
  ok: true;
  requestId: string;
  mail: MailDispatchResult;
  whatsapp: WhatsAppRedirect;
}

export interface ContactApiError {
  ok: false;
  requestId: string;
  message: string;
  issues?: Record<string, string[] | undefined>;
}

export type ContactApiResponse = ContactApiSuccess | ContactApiError;
