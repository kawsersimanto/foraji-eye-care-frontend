"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { branches, doctors } from "../constants";
import { AppointmentFormData, appointmentSchema } from "../schema";
import { Doctor } from "../types";

export const AppointmentForm = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientType: "new",
      name: "",
      phone: "",
      age: "",
      gender: "",
      notes: "",
      password: "",
      branch: "",
      doctorId: "",
    },
  });

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  const patientType = watch("patientType");
  const selectedBranch = watch("branch");
  const selectedDoctorId = watch("doctorId");

  const onSubmit = (data: AppointmentFormData) => {
    if (data.patientType === "new" && !data.name) {
      alert("Name is required for new patients");
      return;
    }

    if (data.patientType === "existing" && !data.password) {
      alert("Password is required for existing patients");
      return;
    }

    console.log("Appointment booked:", {
      ...data,
      selectedDoctor,
    });
  };

  const isDateAvailable = (date: Date) => {
    if (!selectedDoctor) return false;
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    return selectedDoctor.availableDays.includes(dayName);
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setValue("doctorId", doctor.id);
  };

  return (
    <Card className="w-full">
      <CardHeader className="sr-only">
        <CardTitle>Patient Appointment Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Patient Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Patient Information</h3>

            <div className="space-y-2">
              <Label className="mb-2">Patient Type</Label>
              <div className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <input
                    {...register("patientType")}
                    type="radio"
                    id="new"
                    value="new"
                    className="w-4 h-4"
                  />
                  <Label htmlFor="new" className="font-normal">
                    New Patient
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    {...register("patientType")}
                    type="radio"
                    id="existing"
                    value="existing"
                    className="w-4 h-4"
                  />
                  <Label htmlFor="existing" className="font-normal">
                    Existing Patient
                  </Label>
                </div>
              </div>
              {errors.patientType && (
                <p className="text-sm text-destructive">
                  {errors.patientType.message}
                </p>
              )}
            </div>

            {patientType === "new" ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      {...register("name")}
                      id="name"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone No. *</Label>
                    <Input
                      {...register("phone")}
                      id="phone"
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      {...register("age")}
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      onValueChange={(value) => setValue("gender", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    {...register("notes")}
                    id="notes"
                    placeholder="Any additional notes or concerns"
                    rows={3}
                  />
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone No. *</Label>
                  <Input
                    {...register("phone")}
                    id="phone"
                    placeholder="Enter your registered phone number"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    {...register("password")}
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Branch Selection Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select Branch</h3>
            <div className="space-y-2">
              <Label htmlFor="branch">Choose a branch *</Label>
              <Select onValueChange={(value) => setValue("branch", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.branch && (
                <p className="text-sm text-destructive">
                  {errors.branch.message}
                </p>
              )}
            </div>
          </div>

          {/* Doctor Selection Section */}
          {selectedBranch && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">
                Select Doctor & Appointment
              </h3>

              <div className="space-y-4">
                <Label>Choose a doctor *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {doctors.map((doctor) => (
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
                  ))}
                </div>
                {errors.doctorId && (
                  <p className="text-sm text-destructive">
                    {errors.doctorId.message}
                  </p>
                )}
              </div>

              {selectedDoctor && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold">
                      Doctors Schedule
                    </Label>
                    <div className="mt-2">
                      <span className="text-sm font-medium">
                        Available Days:
                      </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedDoctor.availableDays.map((day) => (
                          <Badge key={day} variant="secondary">
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Select Date *</Label>
                    <Calendar
                      mode="single"
                      selected={watch("appointmentDate")}
                      onSelect={(date) => setValue("appointmentDate", date!)}
                      disabled={(date) =>
                        !isDateAvailable(date) || date < new Date()
                      }
                      className="rounded-md border w-fit"
                    />
                    {errors.appointmentDate && (
                      <p className="text-sm text-destructive">
                        {errors.appointmentDate.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <Button type="submit" className="text-white">
            Confirm Appointment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
