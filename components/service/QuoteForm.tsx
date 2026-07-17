"use client"
import { useState } from 'react';
import { Send, Phone, Mail, MessageCircle, MapPin } from 'lucide-react';
import { PhoneInput } from '@/components/ui/phone-input';

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    wasteType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="quote-form" className="py-20 bg-gradient-to-br from-gray-900 via-emerald-900 to-teal-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl top-0 right-0"></div>
        <div className="absolute w-96 h-96 bg-teal-500 rounded-full filter blur-3xl bottom-0 left-0"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get Our Service Now
          </h2>
          <p className="text-xl text-gray-300">
            Fill in your details and we'll contact you shortly
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-white font-medium mb-2">
                  Phone Number
                </label>
                <PhoneInput
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(value) => setFormData({ ...formData, phone: value })}
                  placeholder="Enter phone number"
                  className="phone-input-field--on-dark"
                  inputClassName="w-full px-4 py-3 rounded-lg text-white bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="wasteType" className="block text-white font-medium mb-2">
                  Type of E-Waste
                </label>
                <select
                  id="wasteType"
                  name="wasteType"
                  value={formData.wasteType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="" className="text-gray-900">Select type</option>
                  <option value="it-equipment" className="text-gray-900">IT & Telecommunication Equipment</option>
                  <option value="consumer-electronics" className="text-gray-900">Consumer Electronics</option>
                  <option value="printers" className="text-gray-900">Printers</option>
                  <option value="batteries" className="text-gray-900">Batteries</option>
                  <option value="data-destruction" className="text-gray-900">Data Destruction Service</option>
                  <option value="other" className="text-gray-900">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  placeholder="Tell us more about your requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Submit Request
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

              <div className="space-y-4">
                <a
                  href="tel:+919949901238"
                  className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Call Us</p>
                    <p className="text-white font-semibold">(+91) 9949901238</p>
                  </div>
                </a>

                <a
                  href="mailto:siliconplanetrecycling@gmail.com"
                  className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email Us</p>
                    <p className="text-white font-semibold">siliconplanetrecycling@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/919949901238"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all duration-200 group"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-emerald-100 text-sm">WhatsApp</p>
                    <p className="text-white font-semibold">Quick Contact</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">Our Location</h3>
              </div>
              <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3160410054!2d78.24323169999999!3d17.412608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="S P Recycling Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
