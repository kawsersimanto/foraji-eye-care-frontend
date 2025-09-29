"use client";

import { Combobox } from "@/components/combobox/Combobox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { AppointmentFormData } from "../schema";

interface Branch {
  id: string;
  name: string;
}

interface BranchSelectionProps {
  form: UseFormReturn<AppointmentFormData>;
  branches: Branch[];
}

export function BranchSelection({ form, branches }: BranchSelectionProps) {
  return (
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
  );
}
