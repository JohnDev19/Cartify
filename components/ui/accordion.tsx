import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const accordionVariants = cva("space-y-2", {
  variants: {
    variant: {
      default: "border bg-background text-foreground",
      outlined: "border border-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const accordionHeaderVariants = cva(
  "flex justify-between items-center cursor-pointer py-2 px-4 text-lg font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "text-primary hover:text-primary/80",
        destructive: "text-destructive hover:text-destructive/80",
        secondary: "text-secondary hover:text-secondary/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const accordionContentVariants = cva(
  "transition-max-height ease-in-out duration-300 overflow-hidden px-4 pb-4",
  {
    variants: {
      isOpen: {
        true: "max-h-[500px]", // You can adjust the max-height according to content size
        false: "max-h-0",
      },
    },
    defaultVariants: {
      isOpen: false,
    },
  }
)

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof accordionVariants> {}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

export interface AccordionTriggerProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Accordion({ className, variant, children, ...props }: AccordionProps) {
  return (
    <div className={cn(accordionVariants({ variant }), className)} {...props}>
      {children}
    </div>
  )
}

export function AccordionItem({ value, children, ...props }: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleAccordion = () => setIsOpen(!isOpen)

  return (
    <div {...props}>
      <div className={accordionHeaderVariants({})} onClick={toggleAccordion}>
        {children[0]} {/* AccordionTrigger */}
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      <div className={accordionContentVariants({ isOpen: isOpen })}>
        {children[1]} {/* AccordionContent */}
      </div>
    </div>
  )
}

export function AccordionTrigger({ children, ...props }: AccordionTriggerProps) {
  return (
    <div className={cn(accordionHeaderVariants({}))} {...props}>
      {children}
    </div>
  )
}

export function AccordionContent({ children, ...props }: AccordionContentProps) {
  return (
    <div className={cn(accordionContentVariants({}))} {...props}>
      {children}
    </div>
  )
}