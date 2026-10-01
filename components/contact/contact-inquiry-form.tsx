"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

export function ContactInquiryForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const interest = String(formData.get("interest") ?? "General inquiry");
    const message = String(formData.get("message") ?? "").trim();
    const subject = encodeURIComponent(`${interest} inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nInterested in: ${interest}\n\n${message}`);

    window.location.href = `mailto:mobileyouthnetwork@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form id="inquiry" onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <p className="section-label">Get in touch</p>
      <h2 className="mt-2 text-2xl font-black tracking-tight">Let’s start a conversation</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">Tell us how you’d like to connect with our work. Your email app will open with your message ready to send.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-800">
          Your name
          <input name="name" autoComplete="name" required className="mt-2 block w-full rounded-lg border border-slate-300 px-3.5 py-3 font-normal outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15" placeholder="Name" />
        </label>
        <label className="text-sm font-semibold text-slate-800">
          Email address
          <input name="email" type="email" autoComplete="email" required className="mt-2 block w-full rounded-lg border border-slate-300 px-3.5 py-3 font-normal outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15" placeholder="you@example.com" />
        </label>
        <label className="text-sm font-semibold text-slate-800 sm:col-span-2">
          I’m interested in
          <select name="interest" defaultValue="Partnership" className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 font-normal outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15">
            <option>Partnership</option>
            <option>Volunteering</option>
            <option>Supporting our work</option>
            <option>Programs and projects</option>
            <option>General inquiry</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-800 sm:col-span-2">
          Your message
          <textarea name="message" required rows={5} className="mt-2 block w-full resize-y rounded-lg border border-slate-300 px-3.5 py-3 font-normal outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15" placeholder="How would you like to work with MOYONE?" />
        </label>
      </div>

      <button type="submit" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[var(--moyone-green)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--moyone-green-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
        Prepare email <ArrowRight size={16} />
      </button>
      {sent && <p role="status" className="mt-3 text-sm text-emerald-800">Your email app should open with the inquiry ready. If it doesn’t, email <a className="font-semibold underline" href="mailto:mobileyouthnetwork@gmail.com">mobileyouthnetwork@gmail.com</a>.</p>}
    </form>
  );
}
