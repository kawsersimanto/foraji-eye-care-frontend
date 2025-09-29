"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { branches, doctors } from "../constants";
import { AppointmentFormData, appointmentSchema } from "../schema";
import { Doctor } from "../types";
import { BranchSelection } from "./BranchSelection";
import { DoctorSelection } from "./DoctorSelection";
import { PatientInformation } from "./PatientInformation";

export const AppointmentForm = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [doctorSearch, setDoctorSearch] = useState("");

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientType: "new",
      name: "",
      phone: "",
      age: "",
      gender: "",
      notes: "",
      branch: "",
      doctorId: "",
      appointmentDate: undefined,
    },
  });

  const selectedBranch = form.watch("branch");

  const onSubmit = (data: AppointmentFormData) => {
    console.log("Appointment booked:", { ...data, selectedDoctor });
  };

  const isDateAvailable = (date: Date) => {
    if (!selectedDoctor) return false;
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    return selectedDoctor.availableDays.includes(dayName);
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    form.setValue("doctorId", doctor.id, {
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <PatientInformation form={form} />
        <BranchSelection form={form} branches={branches} />
        {selectedBranch && (
          <DoctorSelection
            form={form}
            doctors={doctors}
            doctorSearch={doctorSearch}
            setDoctorSearch={setDoctorSearch}
            selectedDoctor={selectedDoctor}
            handleDoctorSelect={handleDoctorSelect}
            isDateAvailable={isDateAvailable}
          />
        )}
        <Button type="submit" className="text-white">
          Confirm Appointment
        </Button>
      </form>
    </Form>
  );
};
