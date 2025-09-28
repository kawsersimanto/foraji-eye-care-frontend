import { AppointmentForm } from "@/features/appointment/components/AppointmentForm";

const AppointmentPage = () => {
  return (
    <section className="min-h-[60dvh] py-20 flex items-center justify-center">
      <div className="container">
        <AppointmentForm />
      </div>
    </section>
  );
};

export default AppointmentPage;
