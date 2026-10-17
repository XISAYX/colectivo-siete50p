import { z } from "zod";

import { CONTACT_CHANNELS, CONTACT_DIVISIONS } from "@/types/contact";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Indica tu nombre.")
    .max(80, "El nombre es demasiado largo."),
  email: z.email("Introduce un correo válido."),
  company: z
    .string()
    .trim()
    .max(80, "El nombre de empresa es demasiado largo.")
    .optional()
    .or(z.literal("")),
  division: z.enum(CONTACT_DIVISIONS, {
    error: "Selecciona una línea de trabajo.",
  }),
  channel: z.enum(CONTACT_CHANNELS, {
    error: "Selecciona un canal de contacto.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Cuéntanos un poco más (mínimo 20 caracteres).")
    .max(2000, "El mensaje no puede superar 2000 caracteres."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
