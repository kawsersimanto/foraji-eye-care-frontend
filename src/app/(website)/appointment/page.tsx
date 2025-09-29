import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentForm } from "@/features/appointment/components/AppointmentForm";

const AppointmentPage = () => {
  return (
    <section className="min-h-[60dvh] md:py-20 py-10 flex items-center justify-center">
      <div className="container">
        <Card className="w-full">
          <CardHeader className="sr-only">
            <CardTitle>Patient Appointment Form</CardTitle>
          </CardHeader>
          <CardContent>
            <AppointmentForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AppointmentPage;
