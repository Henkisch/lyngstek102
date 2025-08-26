import { Badge } from "@workspace/ui/components/badge";
import { Check } from "lucide-react";
import type { PagebuilderType } from "types";

type PricingSectionProps = PagebuilderType<"pricingSection">;

export function PricingSection({
  badge,
  title,
  description,
  plans,
  index,
}: PricingSectionProps) {
  return (
    <section className="container mx-auto w-full px-4 md:px-6">
      <div className="flex flex-col gap-4 items-start">
        {badge && <Badge variant="secondary">{badge}</Badge>}

        {index === 0 ? (
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl text-balance">
            {title}
          </h1>
        ) : (
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-balance">
            {title}
          </h2>
        )}
        {description && <p className="text-lg max-w-3xl">{description}</p>}
      </div>

      {plans && (
        <div className="grid mt-6 md:mt-8 md:grid-cols-2 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col relative items-start gap-6 rounded p-4 md:p-6 border ${
                plan.isPopular
                  ? "border-2 border-primary"
                  : "border-2 border-secondary"
              }`}
            >
              {plan.isPopular && (
                <Badge className="absolute top-4 right-4 md:right-6 md:top-6">
                  Most Popular
                </Badge>
              )}

              <div className="flex flex-col items-start gap-2">
                {index === 0 ? (
                  <h2 className="text-lg font-bold">{plan.name}</h2>
                ) : (
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                )}

                <div className="flex items-baseline">
                  <span className="text-3xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-secondary ml-1">/{plan.period}</span>
                  )}
                </div>

                {plan.description && (
                  <p className="text-foreground">{plan.description}</p>
                )}
              </div>

              <ul className="flex flex-col gap-2 text-sm">
                {plan.features &&
                  plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="shrink-0 h-5 w-5 text-primary mr-2">
                        <Check className="h-4 w-4 translate-y-1" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
