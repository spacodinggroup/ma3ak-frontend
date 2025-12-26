import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const plans = [
  {
    name: 'starter',
    price: 'starterPrice',
    description: 'starterDesc',
    features: 'starterFeatures',
    cta: 'getStarted',
    variant: 'outline' as const,
  },
  {
    name: 'pro',
    price: 'proPrice',
    period: 'perMonth',
    description: 'proDesc',
    features: 'proFeatures',
    cta: 'startProTrial',
    variant: 'hero' as const,
    popular: true,
  },
  {
    name: 'team',
    price: 'teamPrice',
    period: 'perMonth',
    description: 'teamDesc',
    features: 'teamFeatures',
    cta: 'contactSales',
    variant: 'accent' as const,
  },
];

export function Pricing() {
  const { t } = useLanguage();
  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('pricingTitle')} <span className="gradient-text">{t('pricingTitleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('pricingSubtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-card rounded-2xl p-6 border ${
                plan.popular 
                  ? 'border-primary shadow-lg shadow-primary/10' 
                  : 'border-border'
              } flex flex-col`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    <Sparkles className="w-3 h-3" />
                    {t('mostPopular')}
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{t(plan.name)}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold">{t(plan.price)}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{t(plan.period)}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{t(plan.description)}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {(t(plan.features) as readonly string[]).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link to="/signup">
                <Button variant={plan.variant} className="w-full">
                  {t(plan.cta)}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
