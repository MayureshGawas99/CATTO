import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying your email...");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    // const email = searchParams.get("email");

    if (!token) {
      setStatus("Invalid verification link parameters.");
      return;
    }

    const verifyToken = async () => {
      try {
        // Access Vite environment variable using import.meta.env
        const API_URL = import.meta.env.VITE_API_BASE_URL;
        console.log("verifying", API_URL);

        const response = await axios.get(
          `${API_URL}/api/auth/verify-email/${token}`,
        );
        // const response = { data: { message: "Verify Successfull!" } };

        setStatus(response.data.message);
        setIsSuccess(true);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        console.log(error);
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.message ||
            "Verification failed. Please try again."
          : "Verification failed. Please try again.";
        setStatus(errorMessage);
        setIsSuccess(false);
      }
    };

    verifyToken();
  }, [searchParams, navigate]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fff8f1] px-5 py-5 text-zinc-900">
      <section className="w-full max-w-md rounded-[28px] border border-orange-100 bg-white/90 p-8 text-center shadow-[0_24px_70px_rgba(154,82,20,0.12)] backdrop-blur-xl sm:p-10">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-2xl shadow-lg shadow-orange-500/20 text-white">
          {isSuccess ? "✓" : "✉"}
        </div>

        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-orange-500">
          CATTO account
        </p>
        <h1 className="text-3xl font-black tracking-tight text-zinc-950">
          Account verification
        </h1>
        <p
          className={`mt-4 text-base font-semibold ${isSuccess ? "text-emerald-600" : "text-red-500"}`}
        >
          {status}
        </p>
        {isSuccess && (
          <p className="mt-3 text-sm font-medium text-zinc-500">
            Redirecting to login page...
          </p>
        )}
      </section>
    </main>
  );
}
