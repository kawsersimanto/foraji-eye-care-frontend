import { z } from "zod";

export const AppointmentSchema = z.object({
  // Example field
  title: z.string().min(1, "Title is required"),
});

export type AppointmentSchemaType = z.infer<typeof AppointmentSchema>;
