import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login | MOYONE",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f8fb] px-5 py-12">
      <div className="w-full max-w-md">
        <a href="/" className="text-sm font-bold text-brand-800 hover:underline">
          ← Back to MOYONE website
        </a>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
          <Image
            src="/images/moyone-logo.png"
            alt="MOYONE — Mobile Youth Network Organization"
            width={150}
            height={50}
            priority
            className="h-auto max-h-12 w-auto max-w-[150px] object-contain object-left"
          />

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-brand-800">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
            Welcome back
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Sign in to manage MOYONE stories, programs, projects and website content.
          </p>

          <LoginForm />

          <p className="mt-6 text-center text-xs text-slate-400">
            Authorized personnel only
          </p>
        </section>
      </div>
    </main>
  );
}
