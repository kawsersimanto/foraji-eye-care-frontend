export interface Appointment {
  id: string;
  // define fields
}

export interface PatientInfo {
  isNewPatient: boolean;
  name: string;
  phone: string;
  age: string;
  gender: string;
  notes: string;
  password: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  availableDays: string[];
  timeSlots: string[];
}
