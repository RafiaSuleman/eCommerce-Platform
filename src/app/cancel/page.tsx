export default function CancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">
          Payment Cancelled
        </h1>

        <p className="mt-4 text-gray-600">
          Your payment was cancelled.
        </p>
      </div>
    </div>
  );
}