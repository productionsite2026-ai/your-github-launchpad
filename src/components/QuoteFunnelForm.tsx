import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Flame,
  Droplets,
  AlertTriangle,
  Phone,
  Mail,
  User,
  MessageSquare,
  Home,
  Building2,
  Send,
  Hammer,
  Recycle,
  Wrench,
  Bath,
  Thermometer,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { content, servicesCatalog, type ServiceKey, type DomainKey } from "@/data/content";
import { toast } from "@/hooks/use-toast";

// ============================================
// Schéma Zod (sans urgency)
// ============================================
const formSchema = z.object({
  serviceType: z.enum(["installation", "depannage", "entretien"], {
    errorMap: () => ({ message: "Choisissez un type d'intervention" }),
  }),
  domain: z.enum(["plomberie", "chauffage"], {
    errorMap: () => ({ message: "Choisissez un domaine" }),
  }),
  prestation: z.string().trim().min(2, "Sélectionnez une prestation"),
  propertyType: z.enum(["maison", "appartement", "local_pro"]),
  name: z.string().trim().min(2, "Nom trop court").max(80, "Nom trop long"),
  phone: z
    .string()
    .trim()
    .min(8, "Téléphone invalide")
    .max(20, "Téléphone invalide")
    .regex(/^[\d\s+().-]+$/, "Format de téléphone invalide"),
  email: z.string().trim().email("Email invalide").max(150).optional().or(z.literal("")),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Code postal à 5 chiffres")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().max(800, "Message trop long").optional(),
});

type FormData = z.infer<typeof formSchema>;

// ============================================
// Options
// ============================================
const serviceOptions: {
  value: ServiceKey;
  label: string;
  desc: string;
  icon: typeof Hammer;
  color: string;
  ring: string;
}[] = [
  {
    value: "installation",
    label: "Installation & Rénovation",
    desc: "Pose neuve, remplacement, rénovation complète",
    icon: Hammer,
    color: "bg-service-blue/15 text-service-blue",
    ring: "border-service-blue bg-service-blue/5",
  },
  {
    value: "depannage",
    label: "Dépannage urgent",
    desc: "Fuite, panne, urgence 7j/7 24h/24",
    icon: AlertTriangle,
    color: "bg-service-rose/15 text-service-rose",
    ring: "border-service-rose bg-service-rose/5",
  },
  {
    value: "entretien",
    label: "Entretien",
    desc: "Maintenance, contrat annuel, mise aux normes",
    icon: Recycle,
    color: "bg-service-emerald/15 text-service-emerald",
    ring: "border-service-emerald bg-service-emerald/5",
  },
];

const domainOptions: {
  value: DomainKey;
  label: string;
  icon: typeof Droplets;
  color: string;
  ring: string;
}[] = [
  {
    value: "plomberie",
    label: "Plomberie",
    icon: Droplets,
    color: "bg-service-cyan/15 text-service-cyan",
    ring: "border-service-cyan bg-service-cyan/5",
  },
  {
    value: "chauffage",
    label: "Chauffage",
    icon: Flame,
    color: "bg-service-orange/15 text-service-orange",
    ring: "border-service-orange bg-service-orange/5",
  },
];

// Icône par mot-clé pour les prestations
const prestationIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("fuite") || l.includes("dégât")) return AlertTriangle;
  if (l.includes("salle de bain") || l.includes("douche") || l.includes("baignoire")) return Bath;
  if (l.includes("wc") || l.includes("bouché") || l.includes("débouchage")) return Wrench;
  if (l.includes("robinet") || l.includes("mitigeur") || l.includes("eau")) return Droplets;
  if (l.includes("chaudière") || l.includes("granulés") || l.includes("gaz")) return Flame;
  if (l.includes("pompe à chaleur") || l.includes("pac")) return Thermometer;
  if (l.includes("radiateur") || l.includes("plancher")) return Thermometer;
  if (l.includes("chauffe-eau") || l.includes("ballon") || l.includes("ecs")) return Droplets;
  if (l.includes("entretien") || l.includes("annuel") || l.includes("ramonage")) return Recycle;
  if (l.includes("norme") || l.includes("sécurité") || l.includes("diagnostic")) return ShieldCheck;
  if (l.includes("détartrage") || l.includes("optimisation") || l.includes("réglage")) return Sparkles;
  return CheckCircle2;
};

const propertyOptions = [
  { value: "maison" as const, label: "Maison", icon: Home },
  { value: "appartement" as const, label: "Appartement", icon: Building2 },
  { value: "local_pro" as const, label: "Local pro", icon: Building2 },
];

interface QuoteFunnelFormProps {
  defaultService?: ServiceKey;
  defaultDomain?: DomainKey;
  variant?: "overlay" | "section";
}

const QuoteFunnelForm = ({ defaultService, defaultDomain, variant = "section" }: QuoteFunnelFormProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<FormData>>({
    serviceType: defaultService,
    domain: defaultDomain,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const update = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setData((d) => ({ ...d, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const goTo = (s: number) => setStep(Math.max(1, Math.min(s, totalSteps)));
  const prev = () => goTo(step - 1);

  // Auto-advance helpers
  const pickService = (value: ServiceKey) => {
    update("serviceType", value);
    update("prestation", "" as FormData["prestation"]);
    // Auto-advance to step 2
    setTimeout(() => goTo(2), 180);
  };

  const pickDomain = (value: DomainKey) => {
    update("domain", value);
    update("prestation", "" as FormData["prestation"]);
  };

  const pickPrestation = (value: string) => {
    update("prestation", value);
  };

  const pickProperty = (value: FormData["propertyType"]) => {
    update("propertyType", value);
    // Si tout est rempli en étape 2, on avance auto
    setTimeout(() => {
      if (data.domain && (data.prestation || value)) {
        // On checke avec la dernière valeur
      }
      goTo(3);
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as keyof FormData] = err.message;
      });
      setErrors(fieldErrors);
      toast({ title: "Vérifiez vos informations", description: "Certains champs sont incorrects.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const endpoint = content.company.formspreeEndpoint;
      if (endpoint.includes("REMPLACER_PAR_VOTRE_ID")) {
        await new Promise((r) => setTimeout(r, 800));
      } else {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            ...result.data,
            _subject: `Devis ${result.data.serviceType} ${result.data.domain} — ${result.data.name}`,
          }),
        });
        if (!res.ok) throw new Error("Échec d'envoi");
      }
      setSubmitted(true);
      toast({ title: "Demande envoyée ✅", description: "Nous vous rappelons sous 2h ouvrées." });
    } catch {
      toast({ title: "Erreur d'envoi", description: "Appelez-nous directement, nous décrochons.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  // Liste des prestations dynamique selon service + domaine
  const prestationList =
    data.serviceType && data.domain ? servicesCatalog[data.serviceType].domains[data.domain].items : [];

  const activeService = serviceOptions.find((s) => s.value === data.serviceType);
  const activeDomain = domainOptions.find((d) => d.value === data.domain);

  // Step 2 complete?
  const step2Complete = !!data.domain && !!data.prestation && !!data.propertyType;

  // ============================================
  // CONFIRMATION
  // ============================================
  if (submitted) {
    return (
      <div className={containerCls(variant)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8 px-4"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-success/15 text-success mb-4">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">Demande reçue !</h3>
          <p className="text-muted-foreground mb-6">
            Merci {data.name?.split(" ")[0]}. Nous vous rappelons sous <strong>2 heures ouvrées</strong> au {data.phone}.
          </p>
          <Button asChild variant="accent" size="lg" className="gap-2">
            <a href={`tel:${content.company.contact.mobileRaw}`}>
              <Phone className="h-4 w-4" /> Urgent ? Appelez maintenant
            </a>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={containerCls(variant)}>
      {/* Header + Progress */}
      <div className="px-5 pt-5 pb-4 border-b border-border bg-muted/30 rounded-t-2xl">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="accentSoft" className="text-xs">
            Étape {step} / {totalSteps}
          </Badge>
          <span className="text-xs font-semibold text-muted-foreground">Devis Gratuit</span>
        </div>
        <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-hero-gradient"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-5 sm:p-6">
        <AnimatePresence mode="wait">
          {/* ============ ÉTAPE 1 : Type d'intervention (auto-advance) ============ */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">Que souhaitez-vous ?</h3>
                <p className="text-sm text-muted-foreground">Cliquez pour passer à l'étape suivante.</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {serviceOptions.map((opt) => {
                  const Icon = opt.icon;
                  const active = data.serviceType === opt.value;
                  return (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => pickService(opt.value)}
                      className={`relative p-3 rounded-xl border-2 transition-smooth text-center ${
                        active ? `${opt.ring} shadow-sm` : "border-border bg-card hover:border-accent/40"
                      }`}
                    >
                      <div className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg ${opt.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="font-semibold text-xs text-foreground leading-tight">{opt.label}</div>
                      <div className="text-[10px] text-muted-foreground mt-1 leading-snug line-clamp-2">{opt.desc}</div>
                      {active && (
                        <CheckCircle2 className="absolute top-1.5 right-1.5 h-4 w-4 text-accent" />
                      )}
                    </button>
                  );
                })}
              </div>
              {errors.serviceType && <p className="text-xs text-destructive">{errors.serviceType}</p>}
            </motion.div>
          )}

          {/* ============ ÉTAPE 2 : Domaine + prestation (cards) + logement ============ */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">
                  {activeService ? `${activeService.label} —` : ""} précisez votre besoin
                </h3>
                <p className="text-sm text-muted-foreground">Choisissez le domaine puis la prestation.</p>
              </div>

              {/* === MOITIÉ HAUTE : Domaine + Prestation === */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Domaine — cards colorées */}
                <div>
                  <Label className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2 block">
                    1. Domaine
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {domainOptions.map((opt) => {
                      const Icon = opt.icon;
                      const active = data.domain === opt.value;
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() => pickDomain(opt.value)}
                          className={`relative overflow-hidden flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-smooth ${
                            active ? `${opt.ring} shadow-sm` : "border-border bg-card hover:border-accent/40"
                          }`}
                        >
                          <div className={`flex h-9 w-9 items-center justify-center rounded-full ${opt.color}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-xs font-bold text-foreground">{opt.label}</span>
                          {active && (
                            <CheckCircle2 className="h-3.5 w-3.5 text-accent absolute top-1.5 right-1.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {errors.domain && <p className="text-xs text-destructive mt-1">{errors.domain}</p>}
                </div>

                {/* Prestation — roulette (Select) qui s'adapte au domaine */}
                <div>
                  <Label className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2 block">
                    2. Prestation {activeDomain && (
                      <Badge variant={activeDomain.value === "plomberie" ? "serviceCyan" : "serviceOrange"} className="ml-1 text-[10px] py-0">
                        {activeDomain.label}
                      </Badge>
                    )}
                  </Label>
                  {data.serviceType && data.domain ? (
                    <Select
                      value={data.prestation || ""}
                      onValueChange={(v) => pickPrestation(v)}
                    >
                      <SelectTrigger
                        className={`h-11 text-sm font-semibold ${
                          activeDomain?.value === "plomberie"
                            ? "border-service-cyan/60 focus:ring-service-cyan/30"
                            : "border-service-orange/60 focus:ring-service-orange/30"
                        } ${data.prestation ? "border-2" : ""}`}
                      >
                        <SelectValue placeholder={`Choisir une prestation ${activeDomain?.label.toLowerCase()}…`} />
                      </SelectTrigger>
                      <SelectContent className="max-h-[260px]">
                        {prestationList.map((p) => {
                          const Icon = prestationIcon(p);
                          const iconCls = activeDomain?.value === "plomberie"
                            ? "bg-service-cyan/15 text-service-cyan"
                            : "bg-service-orange/15 text-service-orange";
                          return (
                            <SelectItem key={p} value={p} className="py-2.5">
                              <span className="flex items-center gap-2">
                                <span className={`flex h-6 w-6 items-center justify-center rounded-md flex-shrink-0 ${iconCls}`}>
                                  <Icon className="h-3 w-3" />
                                </span>
                                <span className="text-xs font-semibold">{p}</span>
                              </span>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-xs text-muted-foreground italic p-3 rounded-lg border-2 border-dashed border-border">
                      Sélectionnez d'abord un domaine
                    </div>
                  )}
                  {errors.prestation && <p className="text-xs text-destructive mt-1">{errors.prestation}</p>}
                </div>
              </div>

              {/* === MOITIÉ BASSE : Logement + Précisions === */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Type de logement */}
                <div>
                  <Label className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2 block">
                    3. Type de logement
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {propertyOptions.map((opt) => {
                      const Icon = opt.icon;
                      const active = data.propertyType === opt.value;
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() => pickProperty(opt.value)}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-smooth ${
                            active ? "border-accent bg-accent/5 shadow-sm" : "border-border bg-card hover:border-accent/40"
                          }`}
                        >
                          <Icon className={`h-4 w-4 ${active ? "text-accent" : "text-muted-foreground"}`} />
                          <span className="text-xs font-semibold text-foreground">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.propertyType && <p className="text-xs text-destructive mt-1">{errors.propertyType}</p>}
                </div>

                <div>
                  <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2 block">
                    Précisez votre besoin (optionnel)
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Ex : chaudière Saunier Duval, code F28…"
                    value={data.message || ""}
                    onChange={(e) => update("message", e.target.value)}
                    maxLength={800}
                    rows={3}
                    className="resize-none text-sm"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ============ ÉTAPE 3 : Coordonnées ============ */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">Vos coordonnées</h3>
                <p className="text-sm text-muted-foreground">Nous vous rappelons sous 2 heures ouvrées.</p>
              </div>

              <div>
                <Label htmlFor="name" className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-accent" /> Nom complet *
                </Label>
                <Input
                  id="name"
                  placeholder="Jean Dupont"
                  value={data.name || ""}
                  onChange={(e) => update("name", e.target.value)}
                  maxLength={80}
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="phone" className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-accent" /> Téléphone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    value={data.phone || ""}
                    onChange={(e) => update("phone", e.target.value)}
                    maxLength={20}
                  />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <Label htmlFor="postalCode" className="text-sm font-semibold text-foreground mb-1.5">
                    Code postal
                  </Label>
                  <Input
                    id="postalCode"
                    placeholder="75001"
                    value={data.postalCode || ""}
                    onChange={(e) => update("postalCode", e.target.value)}
                    maxLength={5}
                  />
                  {errors.postalCode && <p className="text-xs text-destructive mt-1">{errors.postalCode}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-accent" /> Email <span className="text-muted-foreground font-normal">(optionnel)</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jean@exemple.fr"
                  value={data.email || ""}
                  onChange={(e) => update("email", e.target.value)}
                  maxLength={150}
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                <MessageSquare className="inline h-3 w-3 mr-1" />
                Vos données ne servent qu'à vous recontacter (RGPD).
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-2 pt-5 mt-5 border-t border-border">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={prev} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Retour
            </Button>
          )}
          {step === 2 && (
            <Button
              type="button"
              variant="accent"
              onClick={() => goTo(3)}
              disabled={!step2Complete}
              className="flex-1 gap-2"
            >
              Continuer <ArrowRight className="h-4 w-4" />
            </Button>
          )}
          {step === totalSteps && (
            <Button type="submit" variant="accent" disabled={submitting} className="flex-1 gap-2">
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Envoi…
                </>
              ) : (
                <>
                  Recevoir mon devis <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

const containerCls = (variant: "overlay" | "section") =>
  variant === "overlay"
    ? "bg-card border border-border rounded-2xl shadow-glow-soft overflow-hidden"
    : "bg-card border border-border rounded-2xl shadow-md overflow-hidden max-w-xl mx-auto";

export default QuoteFunnelForm;
