import { CSSProperties, useMemo } from "react";
import manifest from "@/assets/image-manifest.json";

type Variant = { w: number; url: string };
type ManifestEntry = {
  width: number;
  height: number;
  aspectRatio: number;
  sources: { avif: Variant[]; webp: Variant[] };
  placeholder: string;
};

const M = manifest as Record<string, ManifestEntry>;

interface ResponsiveImageProps {
  /** Nom de fichier source (ex: "hero-accueil-paris.webp") OU chemin importé. */
  src: string;
  alt: string;
  /** Sizes attribute. Ex: "(min-width: 1024px) 33vw, 100vw". */
  sizes?: string;
  /** Eager + high priority pour LCP. Sinon lazy + async. */
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Override des dimensions intrinsèques (sinon issu du manifest). */
  width?: number;
  height?: number;
}

/**
 * Récupère le basename de fichier depuis un import Vite (qui peut être
 * "/src/assets/foo.webp" ou "/assets/foo-abc123.webp" en build) ou un nom direct.
 */
function resolveKey(src: string): string {
  const file = src.split("/").pop() ?? src;
  // En build, Vite ajoute un hash : "foo-abc123.webp" -> on tente d'abord brut, puis on strip le hash
  if (M[file]) return file;
  const stripped = file.replace(/-[A-Za-z0-9_]{6,}\.webp$/, ".webp");
  return M[stripped] ? stripped : file;
}

/**
 * Image responsive avec srcset AVIF+WebP, dimensions intrinsèques (anti-CLS),
 * placeholder LQIP et stratégie loading/fetchpriority adaptative.
 */
const ResponsiveImage = ({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  className,
  style,
  width,
  height,
}: ResponsiveImageProps) => {
  const key = resolveKey(src);
  const entry = M[key];

  // Fallback si l'image n'est pas dans le manifest (sécurité)
  if (!entry) {
    return (
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={className}
        style={style}
        width={width}
        height={height}
      />
    );
  }

  const { width: iw, height: ih, sources, placeholder } = entry;
  const finalW = width ?? iw;
  const finalH = height ?? ih;

  const buildSrcSet = (variants: Variant[]) =>
    variants.map((v) => `${v.url} ${v.w}w`).join(", ");

  const fallback = useMemo(() => {
    const w = sources.webp;
    return w[Math.min(2, w.length - 1)]?.url ?? src;
  }, [sources.webp, src]);

  const bgStyle: CSSProperties = {
    backgroundImage: `url(${placeholder})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    ...style,
  };

  return (
    <picture>
      {sources.avif.length > 0 && (
        <source type="image/avif" srcSet={buildSrcSet(sources.avif)} sizes={sizes} />
      )}
      {sources.webp.length > 0 && (
        <source type="image/webp" srcSet={buildSrcSet(sources.webp)} sizes={sizes} />
      )}
      <img
        src={fallback}
        alt={alt}
        width={finalW}
        height={finalH}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={className}
        style={bgStyle}
      />
    </picture>
  );
};

export default ResponsiveImage;
