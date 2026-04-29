import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Optional name for logging — helps identify which section failed. */
  name?: string;
  /** Optional custom fallback UI. Defaults to a discreet, accessible notice. */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * SectionErrorBoundary
 *
 * Isole une section (souvent lazy-loaded) pour qu'une erreur de chunk
 * (HMR, réseau, parsing) ne fasse pas disparaître toute la page.
 * Affiche un fallback minimal et logge l'erreur en console.
 */
class SectionErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    // eslint-disable-next-line no-console
    console.error(`[SectionErrorBoundary${this.props.name ? `:${this.props.name}` : ""}]`, error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <section
            aria-label="Section indisponible"
            className="container mx-auto max-w-3xl px-4 py-10 text-center text-sm text-muted-foreground"
          >
            <p>Cette section n'a pas pu être chargée. Merci d'actualiser la page.</p>
          </section>
        )
      );
    }
    return this.props.children;
  }
}

export default SectionErrorBoundary;
