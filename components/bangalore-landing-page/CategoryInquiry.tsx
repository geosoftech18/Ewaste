"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { ewasteCategories } from "@/data/categories";
import { PhoneInput } from "@/components/ui/phone-input";
import { getPhoneValidationError } from "@/lib/phone-validation";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/20";

const phoneInputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function CategoryInquiry() {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [openItems, setOpenItems] = useState<string | null>(null);

  const selectedCategories = useMemo(
    () => ewasteCategories.filter((category) => selected.includes(category.id)),
    [selected],
  );

  function toggleCategory(id: string) {
    setSubmitted(false);
    setError("");
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selected.length === 0) {
      setError("Please select at least one e-waste category.");
      return;
    }
    const phoneError = getPhoneValidationError(phone);
    if (phoneError) {
      setError(phoneError);
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <section id="categories" className="bg-[#f6fbf8] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            Recyclable products
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Select E-Waste Categories
          </h2>
          <p className="mt-3 text-base leading-7 text-gray-500 sm:text-lg">
            Choose the items you want to recycle or sell in Hyderabad. Tap a
            category to select it, then send an inquiry for a pickup quote.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]">
          <div className="grid md:gap-4 gap-2 grid-cols-2 xl:grid-cols-3">
            {ewasteCategories.map((category) => {
              const isSelected = selected.includes(category.id);
              const isItemsOpen = openItems === category.id;
              const [firstItem, ...otherItems] = category.items;
              return (
                <article
                  key={category.id}
                  className={`flex h-full flex-col overflow-hidden cursor-pointer rounded-2xl bg-white shadow-sm ring-1 transition ${
                    isSelected
                      ? "ring-2 ring-brand shadow-md"
                      : "ring-gray-200 hover:ring-brand/40"
                  }`}
                  onClick={() => toggleCategory(category.id)}
                  aria-pressed={isSelected}
                >
                  <div className="relative h-36">
                    <Image
                      src={category.image}
                      alt={category.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 40vw, 25vw"
                      className="object-cover"
                    />
                    <span
                      className={`absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold shadow-sm ${
                        isSelected
                          ? "bg-brand text-white"
                          : "bg-white/95 text-brand"
                      }`}
                    >
                      {isSelected ? "✓" : "+"}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4 pb-3">
                    <h3 className="text-[15px] font-bold leading-snug text-gray-900">
                      {category.title}
                    </h3>
                    <div className="relative mt-3">
                      <button
                        type="button"
                        aria-expanded={isItemsOpen}
                        onClick={(event) => {
                          event.stopPropagation();
                          setOpenItems(isItemsOpen ? null : category.id);
                        }}
                        className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-left transition hover:border-brand/40"
                      >
                        <span className="flex items-start justify-between gap-2">
                          <span className="min-w-0 flex-1">
                            {isItemsOpen ? (
                              <ul className="space-y-1.5">
                                {category.items.map((item) => (
                                  <li
                                    key={item}
                                    className="flex items-start gap-2 text-[13px] leading-5 text-gray-700"
                                  >
                                    <span
                                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                                      aria-hidden
                                    />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <span className="relative block h-5 overflow-hidden">
                                <span className="flex items-start gap-2 text-[13px] leading-5 text-gray-800">
                                  <span
                                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                                    aria-hidden
                                  />
                                  {firstItem}
                                </span>
                              </span>
                            )}
                          </span>
                          <span
                            className={`relative  z-10 mt-0.5 shrink-0 text-brand transition ${
                              isItemsOpen ? "rotate-180" : ""
                            } ${otherItems.length === 0 ? "invisible" : ""}`}
                            aria-hidden
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
                          </span>
                        </span>
                        {otherItems.length > 0 && !isItemsOpen ? (
                          <span
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-9 rounded-b-xl"
                            style={{
                              background:
                                "linear-gradient(to bottom, rgba(249,250,251,0) 0%, rgba(249,250,251,0.75) 45%, #f9fafb 100%)",
                            }}
                            aria-hidden
                          />
                        ) : null}
                      </button>
                    </div>
                  </div>
                  <div className="mt-auto p-3 pt-0">
                    <button
                      type="button"
                     
                      className={`flex h-11 w-full items-center justify-around gap-2 rounded-xl text-sm font-semibold transition ${
                        isSelected
                          ? "bg-brand text-white shadow-sm hover:bg-brand-dark"
                          : "bg-mint text-brand ring-1 ring-brand/20 hover:bg-[#d7f3e3] hover:ring-brand/40"
                      }`}
                    >
                     
                      {isSelected ? "Selected" : "Select"}
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold ${
                          isSelected
                            ? "bg-white text-brand"
                            : "bg-brand text-white"
                        }`}
                      >
                        {isSelected ? "✓" : "+"}
                      </span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <aside id="inquiry" className="lg:sticky lg:top-26">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-900">Send an inquiry</h3>
              <p className="mt-1 text-sm text-gray-500">
                Selected categories are added automatically.
              </p>

              <div className="mt-4 min-h-12 rounded-xl bg-mint p-3">
                {selectedCategories.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No category selected yet. Pick items from the list.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => toggleCategory(category.id)}
                        className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white"
                      >
                        {category.title}
                        <span aria-hidden>×</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* {selectedCategories.length > 0 ? (
                <ul className="mt-3 max-h-28 overflow-auto text-xs leading-5 text-gray-600">
                  {selectedCategories.map((category) => (
                    <li key={`${category.id}-items`}>
                      <span className="font-semibold text-gray-800">
                        {category.title}:
                      </span>{" "}
                      {category.items.join(", ")}
                    </li>
                  ))}
                </ul>
              ) : null} */}

              <label className="mt-4 block text-sm font-medium text-gray-700">
                * Full name
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={inputClass}
                  placeholder="Your name"
                />
              </label>
              <label className="mt-3 block text-sm font-medium text-gray-700">
                * Mobile number
                <div className="mt-1.5">
                  <PhoneInput
                    name="phone"
                    value={phone}
                    onChange={setPhone}
                    placeholder="Enter phone number"
                    inputClassName={phoneInputClass}
                  />
                </div>
              </label>
             
              <label className="mt-3 block text-sm font-medium text-gray-700">
                Area in Hyderabad (Optional)
                <input
                  required
                  value={area}
                  onChange={(event) => setArea(event.target.value)}
                  className={inputClass}
                  placeholder="Gachibowli, Madhapur, Kukatpally..."
                />
              </label>
              
              {error ? (
                <p className="mt-3 text-sm text-red-600">{error}</p>
              ) : null}
              {submitted ? (
                <p className="mt-3 rounded-xl bg-mint px-3 py-2 text-sm font-medium text-brand-dark">
                  Thanks {name}. We received your inquiry for{" "}
                  {selectedCategories.map((category) => category.title).join(", ")}{" "}
                  from {area}. Our team will call you shortly.
                </p>
              ) : null}

              <button
                type="submit"
                className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-brand text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                Submit inquiry
              </button>
            </form>
          </aside>
        </div>
      </div>
    </section>
  );
}
