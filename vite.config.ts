// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    server: {
      allowedHosts: true,
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // Code splitting fin pour réduire le bundle initial.
          // React + TanStack restent dans le vendor critique, le reste est isolé.
          manualChunks(id) {
            if (!id.includes("node_modules")) return undefined;
            if (id.includes("framer-motion")) return "vendor-motion";
            if (id.includes("@radix-ui")) return "vendor-radix";
            if (id.includes("lucide-react")) return "vendor-icons";
            if (id.includes("react-hook-form") || id.includes("@hookform") || id.includes("zod")) {
              return "vendor-forms";
            }
            if (
              id.includes("recharts") ||
              id.includes("embla-carousel") ||
              id.includes("react-day-picker") ||
              id.includes("date-fns") ||
              id.includes("cmdk") ||
              id.includes("vaul") ||
              id.includes("input-otp") ||
              id.includes("sonner") ||
              id.includes("react-resizable-panels")
            ) {
              return "vendor-ui-extras";
            }
            return undefined;
          },
        },
      },
    },
  },
});
