import type { ContactPayload, WhatsAppRedirect } from "@/types/contact";

const DIVISION_LABEL: Record<ContactPayload["division"], string> = {
  produccion: "Producción",
  marca: "Marca",
  experiencias: "Experiencias",
  digital: "Digital",
  otro: "Otro",
};

export function buildWhatsAppMessage(payload: ContactPayload): string {
  const company = payload.company?.trim() ? payload.company.trim() : "No indicada";

  return [
    `Hola, soy ${payload.name}.`,
    `Empresa: ${company}`,
    `Correo: ${payload.email}`,
    `Línea de interés: ${DIVISION_LABEL[payload.division]}`,
    "",
    payload.message.trim(),
  ].join("\n");
}

export function buildWhatsAppRedirect(
  phone: string,
  payload: ContactPayload,
): WhatsAppRedirect {
  const prefilledMessage = buildWhatsAppMessage(payload);
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(prefilledMessage)}`;

  return { url, phone, prefilledMessage };
}
