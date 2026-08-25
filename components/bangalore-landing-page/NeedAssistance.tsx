"use client";

import { FormEvent, useState } from "react";
import { PhoneInput } from "@/components/ui/phone-input";
import { getPhoneValidationError } from "@/lib/phone-validation";

const fieldClass =
  "mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/20";

const phoneInputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function NeedAssistance() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    const phoneError = getPhoneValidationError(phone);
    if (phoneError) {
      setError(phoneError);
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "pickup-form",
          data: {
            fullName: name.trim(),
            phone,
            email: "",
            city: "Hyderabad",
            additionalNotes:
              "Source: Hyderabad landing page — Need Assistance callback request",
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit request");
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2">
      {open ? (
        <form
          onSubmit={handleSubmit}
          className="w-[280px] rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-200"
        >
          <p className="text-sm font-bold text-gray-900">Need assistance?</p>
          <p className="mt-0.5 text-xs text-gray-500">
            Share your details and we will call you back.
          </p>

          {submitted ? (
            <p className="mt-3 rounded-lg bg-mint px-3 py-2 text-sm font-medium text-brand-dark">
              Thanks {name}. We will call you on {phone} shortly.
            </p>
          ) : (
            <>
              <label className="mt-3 block text-xs font-semibold text-gray-700">
                Name
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={fieldClass}
                  placeholder="Your name"
                />
              </label>
              <label className="mt-2.5 block text-xs font-semibold text-gray-700">
                Number
                <div className="mt-1">
                  <PhoneInput
                    name="phone"
                    value={phone}
                    onChange={setPhone}
                    placeholder="Enter phone number"
                    inputClassName={phoneInputClass}
                  />
                </div>
              </label>
              {error ? (
                <p className="mt-2 text-xs text-red-600">{error}</p>
              ) : null}
              <button
                type="submit"
                disabled={submitting}
                className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-lg bg-brand text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Sending..." : "Request a callback"}
              </button>
            </>
          )}
        </form>
      ) : null}

      <button
        type="button"
        aria-expanded={open}
        onClick={() => {
          setOpen((current) => !current);
          setSubmitted(false);
          setError("");
        }}
        className="inline-flex items-center gap-2 rounded-lg bg-brand px-3.5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-dark"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden>
          <path
            d="M4 7.5c0-3 2.7-5 6-5s6 2 6 5c0 2.1-1.4 3.8-3.4 4.6-.5.2-.8.6-.7 1.1l.2 1.2c.1.6-.5 1.1-1.1.9C7.4 14.6 4 11.6 4 7.5Z"
            stroke="white"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="8" cy="7.5" r="0.8" fill="white" />
          <circle cx="10" cy="7.5" r="0.8" fill="white" />
          <circle cx="12" cy="7.5" r="0.8" fill="white" />
        </svg>
        {open ? "Close" : "Need Assistance?"}
      </button>
    </div>
  );
}
