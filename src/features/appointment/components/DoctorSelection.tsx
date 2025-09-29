"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { AppointmentFormData } from "../schema";
import { Doctor } from "../types";

interface DoctorSelectionProps {
  form: UseFormReturn<AppointmentFormData>;
  doctors: Doctor[];
  doctorSearch: string;
  setDoctorSearch: (value: string) => void;
  selectedDoctor: Doctor | null;
  handleDoctorSelect: (doctor: Doctor) => void;
  isDateAvailable: (date: Date) => boolean;
  selectedBranch: string;
}

export function DoctorSelection({
  form,
  doctors,
  doctorSearch,
  setDoctorSearch,
  selectedDoctor,
  handleDoctorSelect,
  isDateAvailable,
  selectedBranch,
}: DoctorSelectionProps) {
  const selectedDoctorId = form.watch("doctorId");

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.branchId === selectedBranch &&
      (doctor.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(doctorSearch.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Select Doctor & Appointment</h3>

      {/* Doctor Search */}
      <div>
        <Input
          type="text"
          placeholder="Search doctor"
          value={doctorSearch}
          onChange={(e) => setDoctorSearch(e.target.value)}
        />
      </div>

      {/* Doctor Cards */}
      <FormField
        control={form.control}
        name="doctorId"
        render={() => (
          <FormItem>
            <FormLabel>Choose a doctor *</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <Card
                    key={doctor.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedDoctorId === doctor.id
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    onClick={() => handleDoctorSelect(doctor)}
                  >
                    <CardContent className="p-4 text-center">
                      <Avatar className="w-16 h-16 mx-auto mb-3">
                        <AvatarImage
                          src={doctor.image || "/placeholder.svg"}
                          alt={doctor.name}
                        />
                        <AvatarFallback>
                          {doctor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-sm">{doctor.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {doctor.specialty}
                      </p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="text-sm text-muted-foreground col-span-full text-center mt-4">
                  <CardContent>No doctors found for this branch</CardContent>
                </Card>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Doctor Schedule & Calendar */}
      {selectedDoctor && (
        <>
          <div>
            <FormLabel className="text-base font-semibold">
              Doctor&apos;s Schedule
            </FormLabel>
            <div className="mt-2">
              <span className="text-sm font-medium">Available Days:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedDoctor.availableDays.map((day) => (
                  <Badge key={day} variant="secondary">
                    {day}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <FormField
            control={form.control}
            name="appointmentDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Date *</FormLabel>
                <FormControl>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      !isDateAvailable(date) || date < new Date()
                    }
                    className="rounded-md border w-fit"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
}
