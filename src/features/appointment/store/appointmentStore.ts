/* eslint-disable @typescript-eslint/no-empty-object-type */
import { create } from "zustand";

export interface AppointmentState {}

export const useAppointmentStore = create<AppointmentState>(() => ({
  // initial state
}));
