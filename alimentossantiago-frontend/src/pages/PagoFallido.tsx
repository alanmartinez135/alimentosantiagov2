import MainLayout from "@/components/Layout/MainLayout";

export default function PagoFallido() {
  return (
    <MainLayout>
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-red-700">El pago no pudo ser realizado.</h1>
        <p className="mt-4"></p>
      </div>
    </MainLayout>
  );
}
