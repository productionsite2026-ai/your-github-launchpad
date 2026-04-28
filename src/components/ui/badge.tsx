import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        accent:
          "border-transparent bg-accent text-accent-foreground shadow",
        accentSoft:
          "border border-accent/20 bg-accent-soft text-accent",
        serviceBlue:
          "border-transparent bg-service-blue text-white shadow",
        serviceCyan:
          "border-transparent bg-service-cyan text-white shadow",
        serviceOrange:
          "border-transparent bg-service-orange text-white shadow",
        serviceEmerald:
          "border-transparent bg-service-emerald text-white shadow",
        serviceRose:
          "border-transparent bg-service-rose text-white shadow",
        serviceViolet:
          "border-transparent bg-service-violet text-white shadow",
        serviceAmber:
          "border-transparent bg-service-amber text-white shadow",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
