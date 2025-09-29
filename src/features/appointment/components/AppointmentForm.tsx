"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Combobox } from "@/components/combobox/Combobox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { branches, doctors } from "../constants";
import { AppointmentFormData, appointmentSchema } from "../schema";
import { Doctor } from "../types";

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
      password: "",
      branch: "",
      doctorId: "",
      appointmentDate: undefined,
    },
  });

  const patientType = form.watch("patientType");
  const selectedBranch = form.watch("branch");
  const selectedDoctorId = form.watch("doctorId");

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
    form.setValue("doctorId", doctor.id);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Patient Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Patient Information</h3>
          <FormField
            control={form.control}
            name="patientType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Patient Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex space-x-6"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="new" />
                      </FormControl>
                      <FormLabel className="font-normal">New Patient</FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="existing" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Existing Patient
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {patientType === "new" ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone No. *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your age"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional notes or concerns"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone No. *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your registered phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        {/* Branch Selection Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Select Branch</h3>
          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose a branch *</FormLabel>
                <FormControl>
                  <Combobox
                    value={field.value}
                    onChange={field.onChange}
                    options={branches.map((b) => ({
                      label: b.name,
                      value: b.id,
                    }))}
                    placeholder="Choose a branch"
                    searchPlaceholder="Search branches..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Doctor Selection Section */}
        {selectedBranch && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">
              Select Doctor & Appointment
            </h3>

            {/* Doctor Search */}
            <div className="">
              <Input
                type="text"
                placeholder="Search doctor"
                value={doctorSearch}
                onChange={(e) => setDoctorSearch(e.target.value)}
              />
            </div>

            <FormField
              control={form.control}
              name="doctorId"
              render={() => (
                <FormItem>
                  <FormLabel>Choose a doctor *</FormLabel>

                  {/* Filtered Doctors */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {doctors
                      .filter(
                        (doctor) =>
                          doctor.name
                            .toLowerCase()
                            .includes(doctorSearch.toLowerCase()) ||
                          doctor.specialty
                            .toLowerCase()
                            .includes(doctorSearch.toLowerCase())
                      )
                      .map((doctor) => (
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
                            <h3 className="font-semibold text-sm">
                              {doctor.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {doctor.specialty}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

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
        )}

        <Button type="submit" className="text-white">
          Confirm Appointment
        </Button>
      </form>
    </Form>
  );
};
