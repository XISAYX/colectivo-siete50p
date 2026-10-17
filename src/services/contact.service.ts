import { dispatchContactMail } from "./mail.service";
import type { ContactPayload } from "@/types/contact";

export async function processContactSubmission(rawBody: unknown) {
  if (!rawBody || typeof rawBody !== "object") {
    return {
      ok: false,
      message: "Revisa los campos del formulario.",
    };
  }

  const body = rawBody as Record<string, unknown>;

  // Extraemos y limpiamos los campos recibidos
  const name = String(body.name || body.nombre || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || body.telefono || "").trim();
  const message = String(
    body.message || body.brief || body.mensaje || "",
  ).trim();

  // Validaciones flexibles y seguras
  if (!name || name.length < 3) {
    return {
      ok: false,
      message: "Por favor ingresa un nombre válido.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return {
      ok: false,
      message: "Por favor ingresa un correo electrónico válido.",
    };
  }

  if (!phone || phone.length < 10) {
    return {
      ok: false,
      message: "El teléfono debe contener 10 dígitos.",
    };
  }

  if (!message || message.length < 5) {
    return {
      ok: false,
      message: "Escribe un mensaje de al menos 5 caracteres.",
    };
  }

  const payload: ContactPayload = {
    name,
    email,
    phone,
    company: String(body.company || ""),
    division: String(body.division || "General"),
    channel: String(body.channel || "Email"),
    message,
  };

  try {
    const result = await dispatchContactMail(payload);
    return {
      ok: true,
      message: "Mensaje enviado con éxito.",
      result,
    };
  } catch (error) {
    console.error("[contact.service] Error enviando correo:", error);
    return {
      ok: false,
      message: "Ocurrió un error al enviar el correo.",
    };
  }
}
