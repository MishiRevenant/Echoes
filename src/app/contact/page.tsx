'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const subjects = [
    'General Inquiry',
    'Package / Itinerary',
    'Custom Trip Planning',
    'Group Travel',
    'Press & Media',
    'Other',
];

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: subjects[0],
        message: '',
    });
    const [status, setStatus] = useState<FormState>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setForm({ name: '', email: '', phone: '', subject: subjects[0], message: '' });
            } else {
                setStatus('error');
                setErrorMsg(data.error ?? 'Something went wrong. Please try again or contact us directly.');
            }
        } catch {
            setStatus('error');
            setErrorMsg('Network error. Please check your connection and try again.');
        }
    };

    return (
        <main>
            <Header />

            {/* Hero */}
            <section className="relative h-[42vh] min-h-[300px] bg-tierra flex items-end overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&w=1400"
                    alt="Contact us"
                    className="absolute inset-0 w-full h-full object-cover opacity-25"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tierra via-tierra/60 to-transparent" />
                <div className="relative z-10 max-w-[1200px] mx-auto px-8 pb-16">
                    <p className="text-arcilla text-[10px] tracking-[0.3em] uppercase mb-3">Get in Touch</p>
                    <h1 className="font-display text-4xl md:text-6xl font-semibold text-white tracking-wider">
                        CONTACT US
                    </h1>
                    <div className="mt-4 h-px w-16 bg-arcilla" />
                    <p className="mt-5 text-white/60 max-w-md text-sm leading-relaxed font-light">
                        Every great journey begins with a conversation. Tell us about your dream trip.
                    </p>
                </div>
            </section>

            {/* Contact Layout */}
            <section className="bg-crema py-16 md:py-24">
                <div className="max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

                        {/* ── Left: Info column ── */}
                        <div className="space-y-10">
                            <div>
                                <h2 className="font-display text-xl font-semibold text-tierra tracking-wider mb-6">
                                    LET'S PLAN YOUR JOURNEY
                                </h2>
                                <p className="text-tierra-light text-sm leading-relaxed font-light">
                                    Our travel specialists are available Monday–Saturday, 9am–7pm (Peru Time, GMT−5). For urgent enquiries, please contact us by phone.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 border border-arcilla/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Mail size={12} strokeWidth={1.5} className="text-arcilla" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] tracking-[0.2em] uppercase text-tierra/50 mb-1">Email</p>
                                        <a href="mailto:hello@echoesoftheandes.com" className="text-sm text-tierra hover:text-arcilla transition-colors duration-300">
                                            hello@echoesoftheandes.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 border border-arcilla/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Phone size={12} strokeWidth={1.5} className="text-arcilla" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] tracking-[0.2em] uppercase text-tierra/50 mb-1">Phone</p>
                                        <a href="tel:+5112345678" className="text-sm text-tierra hover:text-arcilla transition-colors duration-300">
                                            +51 1 234 5678
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 border border-arcilla/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <MapPin size={12} strokeWidth={1.5} className="text-arcilla" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] tracking-[0.2em] uppercase text-tierra/50 mb-1">Office</p>
                                        <p className="text-sm text-tierra">
                                            Miraflores, Lima<br />
                                            Peru
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px w-full bg-tierra/10" />

                            <div>
                                <p className="text-[9px] tracking-[0.2em] uppercase text-tierra/40 mb-4">Response Time</p>
                                <p className="text-tierra-light text-sm font-light">
                                    We respond to all enquiries within <strong className="text-tierra font-normal">24 hours</strong> on business days.
                                </p>
                            </div>
                        </div>

                        {/* ── Right: Form ── */}
                        <div className="lg:col-span-2">
                            {status === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center py-20 text-center"
                                >
                                    <CheckCircle size={48} strokeWidth={1} className="text-arcilla mb-6" />
                                    <h3 className="font-display text-2xl font-semibold text-tierra mb-3">
                                        Message Sent
                                    </h3>
                                    <p className="text-tierra-light text-sm font-light max-w-sm">
                                        Thank you for reaching out. A member of our team will be in touch within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="mt-8 border border-tierra text-tierra text-[10px] tracking-[0.25em] uppercase px-7 py-2.5 hover:bg-tierra hover:text-white transition-all duration-400"
                                    >
                                        SEND ANOTHER MESSAGE
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name + Email row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label htmlFor="name" className="block text-[9px] tracking-[0.2em] uppercase text-tierra/60 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder="Your name"
                                                className="w-full border border-tierra/20 bg-white px-4 py-3 text-sm text-tierra placeholder-tierra/30 focus:outline-none focus:border-arcilla transition-colors duration-300"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-[9px] tracking-[0.2em] uppercase text-tierra/60 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="your@email.com"
                                                className="w-full border border-tierra/20 bg-white px-4 py-3 text-sm text-tierra placeholder-tierra/30 focus:outline-none focus:border-arcilla transition-colors duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone + Subject row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label htmlFor="phone" className="block text-[9px] tracking-[0.2em] uppercase text-tierra/60 mb-2">
                                                Phone (optional)
                                            </label>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={form.phone}
                                                onChange={handleChange}
                                                placeholder="+1 000 000 0000"
                                                className="w-full border border-tierra/20 bg-white px-4 py-3 text-sm text-tierra placeholder-tierra/30 focus:outline-none focus:border-arcilla transition-colors duration-300"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-[9px] tracking-[0.2em] uppercase text-tierra/60 mb-2">
                                                Subject *
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                required
                                                value={form.subject}
                                                onChange={handleChange}
                                                className="w-full border border-tierra/20 bg-white px-4 py-3 text-sm text-tierra focus:outline-none focus:border-arcilla transition-colors duration-300 appearance-none"
                                            >
                                                {subjects.map(s => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-[9px] tracking-[0.2em] uppercase text-tierra/60 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={6}
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Tell us about your dream journey — destinations, dates, group size, special requests…"
                                            className="w-full border border-tierra/20 bg-white px-4 py-3 text-sm text-tierra placeholder-tierra/30 focus:outline-none focus:border-arcilla transition-colors duration-300 resize-none"
                                        />
                                    </div>

                                    {/* Error message */}
                                    {status === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex items-center gap-3 text-red-700 bg-red-50 border border-red-200 px-4 py-3"
                                        >
                                            <AlertCircle size={16} strokeWidth={1.5} className="flex-shrink-0" />
                                            <p className="text-[11px]">{errorMsg}</p>
                                        </motion.div>
                                    )}

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="flex items-center gap-3 bg-tierra text-white text-[10px] tracking-[0.3em] uppercase px-10 py-4 hover:bg-arcilla transition-colors duration-400 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {status === 'loading' ? (
                                            <span className="w-4 h-4 border border-white/40 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <Send size={13} strokeWidth={1.5} />
                                        )}
                                        {status === 'loading' ? 'SENDING…' : 'SEND MESSAGE'}
                                    </button>

                                    <p className="text-[9px] text-tierra/40">* Required fields</p>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
