import { z } from "zod";

// Schema for new patients
const newPatientSchema = z.object({
  patientType: z.literal("new"),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  age: z.string().min(1, "Age is required"),
  gender: z.string().optional(),
  notes: z.string().optional(),
  branch: z.string().min(1, "Please select a branch"),
  doctorId: z.string().min(1, "Please select a doctor"),
  appointmentDate: z.date({
    error: "Please select an appointment date",
  }),
});

// Schema for existing patients
const existingPatientSchema = z.object({
  patientType: z.literal("existing"),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  branch: z.string().min(1, "Please select a branch"),
  doctorId: z.string().min(1, "Please select a doctor"),
  appointmentDate: z.date({
    error: "Please select an appointment date",
  }),
});

// Combine them into a discriminated union
export const appointmentSchema = z.discriminatedUnion("patientType", [
  newPatientSchema,
  existingPatientSchema,
]);

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
