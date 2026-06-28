"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import {
  FiMail,
  FiGithub,
  FiMapPin,
  FiSend,
  FiUser,
  FiMessageSquare,
  FiCode,
} from "react-icons/fi";

const contactInfo = [
  {
    icon: FiMail,
    label: "Email",
    value: "satyam88802@gmail.com",
    href: "mailto:satyam88802@gmail.com",
    color: "#00ff9d",
  },
  {
    icon: FiGithub,
    label: "GitHub",
    value: "github.com/Satyam7790",
    href: "https://github.com/Satyam7790",
    color: "#00c8ff",
  },
  {
    icon: FiCode,
    label: "Codeforces",
    value: "pikachu121",
    href: "https://codeforces.com/profile/pikachu121",
    color: "#ffc107",
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: "Pune, India",
    color: "#ff2fd6",
  },
];

export default function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:satyam88802@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formState.name)}&body=${encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`)}`;
    window.open(mailtoLink, "_blank");
    setSubmitted(true);
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const getFocusColor = (field: string) => {
    if (focusedField === field) {
      const colors: Record<string, string> = {
        name: "#00ff9d",
        email: "#00c8ff",
        message: "#8a2be2",
      };
      return colors[field] || "#00ff9d";
    }
    return "rgba(255,255,255,0.1)";
  };

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[#00ff9d] font-mono text-sm mb-3 tracking-[0.2em] uppercase">
            &gt; Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? I&apos;m always open to
            discussing new opportunities and collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map((info) => {
              const Icon = info.icon;
              const content = (
                <div
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 card-depth hover-lift group cursor-pointer"
                >
                  {/* Colored icon container */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      backgroundColor: `${info.color}10`,
                      border: `1px solid ${info.color}20`,
                    }}
                  >
                    <Icon
                      size={18}
                      style={{ color: info.color }}
                      className="transition-colors"
                    />
                  </div>
                  <div>
                    <p
                      className="text-[10px] uppercase tracking-wider font-mono"
                      style={{ color: `${info.color}80` }}
                    >
                      {info.label}
                    </p>
                    <p className="text-sm text-white/70 group-hover:text-white transition-colors">
                      {info.value}
                    </p>
                  </div>
                </div>
              );

              return info.href ? (
                <a
                  key={info.label}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              ) : (
                <div key={info.label}>{content}</div>
              );
            })}

            {/* Availability badge */}
            <div className="p-4 rounded-xl card-depth mt-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-[#00ff9d]" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#00ff9d]/40 animate-ping" />
                </div>
                <div>
                  <p className="text-xs text-[#00ff9d]/70 font-mono">Available for opportunities</p>
                  <p className="text-[10px] text-white/30 font-mono">Response time: &lt; 24 hours</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="relative group">
                <FiUser
                  className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10"
                  style={{ color: getFocusColor("name") }}
                  size={16}
                />
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, name: e.target.value }))
                  }
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-white/[0.02] rounded-xl py-3.5 pl-11 pr-4 text-white/80 placeholder:text-white/20 focus:outline-none transition-all duration-300"
                  style={{
                    border: `1px solid ${getFocusColor("name")}`,
                    boxShadow:
                      focusedField === "name"
                        ? "0 0 20px rgba(0,255,157,0.08)"
                        : "none",
                  }}
                />
              </div>

              {/* Email */}
              <div className="relative group">
                <FiMail
                  className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10"
                  style={{ color: getFocusColor("email") }}
                  size={16}
                />
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, email: e.target.value }))
                  }
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-white/[0.02] rounded-xl py-3.5 pl-11 pr-4 text-white/80 placeholder:text-white/20 focus:outline-none transition-all duration-300"
                  style={{
                    border: `1px solid ${getFocusColor("email")}`,
                    boxShadow:
                      focusedField === "email"
                        ? "0 0 20px rgba(0,200,255,0.08)"
                        : "none",
                  }}
                />
              </div>

              {/* Message */}
              <div className="relative group">
                <FiMessageSquare
                  className="absolute left-4 top-4 transition-colors duration-300 z-10"
                  style={{ color: getFocusColor("message") }}
                  size={16}
                />
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, message: e.target.value }))
                  }
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-white/[0.02] rounded-xl py-3.5 pl-11 pr-4 text-white/80 placeholder:text-white/20 focus:outline-none transition-all duration-300 resize-none"
                  style={{
                    border: `1px solid ${getFocusColor("message")}`,
                    boxShadow:
                      focusedField === "message"
                        ? "0 0 20px rgba(138,43,226,0.08)"
                        : "none",
                  }}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full py-3.5 rounded-xl overflow-hidden font-medium transition-all duration-300"
              >
                <span
                  className="absolute inset-0 rounded-xl opacity-90 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, #00ff9d, #00c8ff, #8a2be2)",
                  }}
                />
                <span
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(135deg, #00ff9d, #00c8ff, #8a2be2)",
                  }}
                />
                <span className="relative z-10 text-[#050505] font-semibold flex items-center justify-center gap-2">
                  {submitted ? (
                    "Message Sent! 🚀"
                  ) : (
                    <>
                      <FiSend size={16} />
                      Send Message
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
