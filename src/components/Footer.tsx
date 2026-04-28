import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, Droplets, MessageCircle } from "lucide-react";
import { content, navLinks } from "@/data/content";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-14 pb-28 md:pb-14 max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-xl mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                <Droplets className="h-5 w-5" />
              </span>
              {content.company.name}
            </Link>
            <p className="text-sm text-primary-foreground/75 leading-relaxed">
              {content.company.description}
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-sm uppercase tracking-wide mb-4 text-accent">Nos services</h2>
            <ul className="space-y-2 text-sm">
              {navLinks.slice(1).map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-primary-foreground/75 hover:text-accent transition-smooth">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display font-bold text-sm uppercase tracking-wide mb-4 text-accent">Contact</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${content.company.contact.mobileRaw}`}
                  aria-label={`Appeler ${content.company.name} au ${content.company.contact.phoneMobile}`}
                  className="hover:text-accent transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm font-semibold tracking-wide"
                >
                  {content.company.contact.phoneMobile}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" aria-hidden="true" />
                <a
                  href={content.company.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Contacter ${content.company.name} sur WhatsApp au ${content.company.contact.phoneMobile}`}
                  className="hover:text-accent transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                >
                  WhatsApp · {content.company.contact.phoneMobile}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                <a href={`mailto:${content.company.contact.email}`} className="hover:text-accent transition-smooth break-all">
                  {content.company.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/75">
                  {content.company.contact.address}, {content.company.contact.postalCode} {content.company.contact.city}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/75">{content.company.contact.hours}</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-bold text-sm uppercase tracking-wide mb-4 text-accent">Zone d'intervention</h2>
            <p className="text-sm text-primary-foreground/75 mb-3">
              Paris centre et toute l'Île-de-France (banlieue comprise).
            </p>
            <ul className="flex flex-wrap gap-1.5 list-none">
              {content.company.contact.areaServed.map((c) => (
                <li key={c} className="text-xs px-2 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground/85">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/15 mt-10 pt-6 flex flex-col md:flex-row gap-3 justify-between items-center text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} {content.company.name} — SIRET {content.company.legal.siret} — {content.company.legal.assurance}</p>
          <p>Plombier · Chauffagiste · Dépannage 7j/7 — Paris & Île-de-France</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
