"use client";

import { useState, useRef, FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Send, Terminal, Github, Linkedin, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { sendContactEmail } from "@/app/actions/contact";
import { useLanguage } from "@/context/language-context";
import { SITE_CONFIG } from "@/lib/constants";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: SITE_CONFIG.location,
    href: null,
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: SITE_CONFIG.links.github,
    username: SITE_CONFIG.twitterHandle,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: SITE_CONFIG.links.linkedin,
    username: "/in/aldicahyar",
  },
];

type FormStatus = "idle" | "loading" | "success" | "error";

const viewportConfig = { once: false, amount: 0.2 };

export function ContactSection() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "$ init contact_form",
    "> Ready to receive your message...",
  ]);
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useLanguage();

  const addTerminalLine = (line: string) => {
    setTerminalLines((prev) => [...prev.slice(-6), line]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const _gotcha = formData.get("_gotcha") as string; // Honeypot

    addTerminalLine(`$ send --from "${name}"`);
    addTerminalLine("> Validating input...");
    setFormStatus("loading");

    await new Promise((resolve) => setTimeout(resolve, 500));
    addTerminalLine("> Encrypting message...");
    
    await new Promise((resolve) => setTimeout(resolve, 400));
    addTerminalLine("> Establishing connection...");

    // Send email using server action
    const result = await sendContactEmail({ name, email, message, _gotcha });
    
    if (result.success) {
      addTerminalLine(`> ${t("contact.success")}!`);
      addTerminalLine(`$ echo "Thanks, ${name}!"`);
      setFormStatus("success");
      
      // Reset form after success
      setTimeout(() => {
        form.reset();
        setFormStatus("idle");
        setTerminalLines([
          "$ init contact_form",
          "> Ready to receive your message...",
        ]);
      }, 4000);
    } else {
      addTerminalLine(`> Error: ${result.message}`);
      setFormStatus("error");
      
      // Reset to idle after error
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }
  };

  return (
    <div className="relative z-10 container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-[var(--cyber-orange)] text-sm mb-2">
            {"// 03. Contact"}
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-[var(--cyber-light)] mb-4">
            {t("contact.title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[var(--cyber-orange)] to-transparent mx-auto mb-6" />
          <p className="text-[var(--cyber-muted)] max-w-lg mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Terminal-style form container */}
            <div className="relative border border-[var(--cyber-orange)]/30 rounded-lg bg-[var(--cyber-dark)]/50 backdrop-blur-sm overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--cyber-orange)]/20 bg-[var(--cyber-dark)]/80">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-xs text-[var(--cyber-muted)] ml-2">
                  contact-form.sh
                </span>
              </div>

              {/* Terminal output */}
              <div className="px-4 py-3 border-b border-[var(--cyber-orange)]/10 bg-[var(--cyber-black)]/50 min-h-[100px] max-h-[140px] overflow-y-auto">
                {terminalLines.map((line, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`font-mono text-xs ${
                      line.startsWith("$")
                        ? "text-[var(--cyber-orange)]"
                        : line.includes("successfully") || line.includes("Berhasil")
                        ? "text-green-400"
                        : line.includes("error") || line.includes("Gagal")
                        ? "text-red-400"
                        : "text-[var(--cyber-muted)]"
                    }`}
                  >
                    {line}
                  </motion.p>
                ))}
                {formStatus === "loading" && (
                  <span className="inline-block w-2 h-4 bg-[var(--cyber-orange)] animate-pulse" />
                )}
              </div>

              {/* Form */}
              <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="font-mono text-xs text-[var(--cyber-muted)] flex items-center gap-2">
                    <Terminal className="w-3 h-3 text-[var(--cyber-orange)]" />
                    {t("contact.form.name")}:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    disabled={formStatus === "loading"}
                    className="w-full px-4 py-3 bg-[var(--cyber-black)] border border-[var(--cyber-orange)]/20 rounded font-mono text-sm text-[var(--cyber-light)] placeholder:text-[var(--cyber-muted)]/50 focus:border-[var(--cyber-orange)]/50 focus:outline-none transition-colors disabled:opacity-50"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="font-mono text-xs text-[var(--cyber-muted)] flex items-center gap-2">
                    <Terminal className="w-3 h-3 text-[var(--cyber-orange)]" />
                    {t("contact.form.email")}:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    disabled={formStatus === "loading"}
                    className="w-full px-4 py-3 bg-[var(--cyber-black)] border border-[var(--cyber-orange)]/20 rounded font-mono text-sm text-[var(--cyber-light)] placeholder:text-[var(--cyber-muted)]/50 focus:border-[var(--cyber-orange)]/50 focus:outline-none transition-colors disabled:opacity-50"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="font-mono text-xs text-[var(--cyber-muted)] flex items-center gap-2">
                    <Terminal className="w-3 h-3 text-[var(--cyber-orange)]" />
                    {t("contact.form.message")}:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    disabled={formStatus === "loading"}
                    className="w-full px-4 py-3 bg-[var(--cyber-black)] border border-[var(--cyber-orange)]/20 rounded font-mono text-sm text-[var(--cyber-light)] placeholder:text-[var(--cyber-muted)]/50 focus:border-[var(--cyber-orange)]/50 focus:outline-none transition-colors resize-none disabled:opacity-50"
                    placeholder="Your message here..."
                  />
                </div>

                {/* Honeypot field - hidden from users but visible to bots */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                />

                <motion.button
                  type="submit"
                  disabled={formStatus === "loading" || formStatus === "success"}
                  className="w-full py-3 px-6 flex items-center justify-center gap-2 font-mono text-sm border border-[var(--cyber-orange)] text-[var(--cyber-orange)] rounded hover:bg-[var(--cyber-orange)]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                  whileHover={{ scale: formStatus === "idle" ? 1.02 : 1 }}
                  whileTap={{ scale: formStatus === "idle" ? 0.98 : 1 }}
                >
                  {formStatus === "loading" && (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t("contact.form.sending")}</span>
                    </>
                  )}
                  {formStatus === "success" && (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">{t("contact.success")}</span>
                    </>
                  )}
                  {formStatus === "error" && (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span className="text-red-400">{t("contact.error")}</span>
                    </>
                  )}
                  {formStatus === "idle" && (
                    <>
                      <span>./send_message.sh</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Contact Info Cards */}
            <div className="space-y-4">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--cyber-light)] mb-4">
                Contact Info
              </h3>
              
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                const content = (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportConfig}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={info.href ? { x: 4 } : undefined}
                    className={`flex items-center gap-4 p-4 border border-[var(--cyber-orange)]/20 rounded-lg bg-[var(--cyber-dark)]/30 ${
                      info.href ? "hover:border-[var(--cyber-orange)]/50 cursor-pointer" : ""
                    } transition-colors`}
                  >
                    <div className="w-12 h-12 flex items-center justify-center border border-[var(--cyber-orange)]/30 rounded-lg bg-[var(--cyber-dark)]">
                      <Icon className="w-5 h-5 text-[var(--cyber-orange)]" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-[var(--cyber-muted)]">
                        {info.label}
                      </p>
                      <p className="font-mono text-sm text-[var(--cyber-light)]">
                        {info.value}
                      </p>
                    </div>
                  </motion.div>
                );

                return info.href ? (
                  <a key={info.label} href={info.href}>
                    {content}
                  </a>
                ) : (
                  <div key={info.label}>{content}</div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--cyber-light)] mb-4">
                {t("footer.connect")}
              </h3>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={viewportConfig}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -4 }}
                      className="flex-1 flex items-center gap-3 p-4 border border-[var(--cyber-orange)]/20 rounded-lg bg-[var(--cyber-dark)]/30 hover:border-[var(--cyber-orange)]/50 transition-colors group"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5 text-[var(--cyber-muted)] group-hover:text-[var(--cyber-orange)] transition-colors" />
                      <div>
                        <p className="font-mono text-xs text-[var(--cyber-muted)]">
                          {social.label}
                        </p>
                        <p className="font-mono text-sm text-[var(--cyber-light)] group-hover:text-[var(--cyber-orange)] transition-colors">
                          {social.username}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="p-6 border border-[var(--cyber-orange)]/30 rounded-lg bg-[var(--cyber-dark)]/50 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="font-mono text-sm text-green-400">
                  {t("hero.status.available")}
                </span>
              </div>
              <p className="text-[var(--cyber-muted)] text-sm">
                {t("hero.description")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
