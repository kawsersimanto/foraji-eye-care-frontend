import { Doctor } from "@/features/appointment/types";

export const branches = [
  { id: "downtown", name: "Downtown Medical Center" },
  { id: "northside", name: "Northside Clinic" },
  { id: "westend", name: "West End Hospital" },
];

export const doctors: Doctor[] = [
  {
    id: "dr-smith",
    name: "Dr. Sarah Smith",
    specialty: "Cardiologist",
    image: "/female-doctor.png",
    availableDays: ["Monday", "Wednesday", "Friday"],
    timeSlots: ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"],
  },
  {
    id: "dr-johnson",
    name: "Dr. Michael Johnson",
    specialty: "Neurologist",
    image: "/male-doctor.png",
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    timeSlots: ["8:00 AM", "11:00 AM", "1:00 PM", "4:00 PM"],
  },
  {
    id: "dr-williams",
    name: "Dr. Emily Williams",
    specialty: "Dermatologist",
    image: "/female-doctor.png",
    availableDays: ["Monday", "Tuesday", "Thursday"],
    timeSlots: ["9:30 AM", "11:30 AM", "2:30 PM", "4:30 PM"],
  },
];
