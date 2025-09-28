import { z } from "zod";

export const appointmentSchema = z.object({
  patientType: z.enum(["new", "existing"]),
  name: z.string(),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  age: z.string().optional(),
  gender: z.string().optional(),
  notes: z.string().optional(),
  password: z.string().optional(),
  branch: z.string().min(1, "Please select a branch"),
  doctorId: z.string().min(1, "Please select a doctor"),
  appointmentDate: z.date({
    error: "Please select an appointment date",
  }),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
