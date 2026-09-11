import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Amr2 from "../assets/Amr2.png";

// ===== SOCIAL LINK =====
interface SocialLinkProps {
  href: string;
  label: string;
  icon: ReactNode;
  hoverClass: string;
}

function SocialLink({
  href,
  label,
  icon,
  hoverClass,
}: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col items-center p-3 rounded-xl bg-white/5 text-gray-400 transition-all duration-300 transform hover:-translate-y-1 ${hoverClass}`}
    >
      {icon}
      <span className="text-xs font-semibold">{label}</span>
    </a>
  );
}

export function Contact() {
  const { t } = useTranslation();

  return (
    <div>
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
          {t("contact.title")}
        </h1>
      </header>

      <div className="max-w-3xl">
        <div className="bg-[#1a1a1a] p-8 rounded-2xl border-t-4 border-[#E30613] relative overflow-hidden group">
          {/* Decorative element */}
          <div className="absolute -inset-e-20 -top-20 w-64 h-64 bg-[#E30613]/5 rounded-full blur-3xl group-hover:bg-[#E30613]/10 transition duration-700 pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full overflow-hidden bg-linear-to-br from-[#2a2a2a] to-[#121212] flex items-center justify-center border-4 border-[#1a1a1a] shadow-[0_0_20px_rgba(227,6,19,0.15)] shrink-0 group-hover:border-[#E30613]/50 group-hover:shadow-[0_0_30px_rgba(227,6,19,0.3)] transition-all duration-500">
              <img
                src={Amr2}
                alt={t("contact.avatarAlt")}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-full"
              />
            </div>

            <div className="flex-1 text-center md:text-start">
              <h2 className="text-2xl font-bold mb-2 text-white">{t("contact.name")}</h2>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-xl mx-auto md:mx-0">
                {t("contact.bio")}
              </p>

              {/* Social Links Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {/* Facebook */}
                <SocialLink
                  href="https://www.facebook.com/amr.hesham.234617/"
                  label={t("contact.facebook")}
                  hoverClass="hover:bg-[#1877F2] hover:text-white"
                  icon={
                    <svg className="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  }
                />

                {/* LinkedIn */}
                <SocialLink
                  href="https://www.linkedin.com/in/amr-hesham-10082a276/"
                  label={t("contact.linkedin")}
                  hoverClass="hover:bg-[#0A66C2] hover:text-white"
                  icon={
                    <svg className="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  }
                />

                {/* Instagram 1 */}
                <SocialLink
                  href="https://www.instagram.com/amr_hesham_4/"
                  label={t("contact.instagram")}
                  hoverClass="hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white"
                  icon={
                    <svg className="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  }
                />

                {/* Instagram 2 */}
                <SocialLink
                  href="https://www.instagram.com/amrdev25?igsh=aW5ia21nZGc2M3Jk"
                  label={t("contact.instagram2")}
                  hoverClass="hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white"
                  icon={
                    <svg className="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  }
                />

                {/* WhatsApp */}
                <SocialLink
                  href="https://wa.me/201006581094"
                  label={t("contact.whatsapp")}
                  hoverClass="hover:bg-[#25D366] hover:text-white"
                  icon={
                    <svg className="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  }
                />

                {/* GitHub */}
                <SocialLink
                  href="https://github.com/amor-44"
                  label={t("contact.github")}
                  hoverClass="hover:bg-white hover:text-black"
                  icon={
                    <svg className="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
