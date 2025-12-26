import { ROLE_CONFIGS } from '@/types/user';
import { Brain, MessageSquare, Users, Lightbulb, Target, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const platformFeatures = [
  {
    icon: Brain,
    title: 'adaptiveAITitle',
    description: 'adaptiveAIDesc',
  },
  {
    icon: MessageSquare,
    title: 'smartConversationsTitle',
    description: 'smartConversationsDesc',
  },
  {
    icon: Users,
    title: 'teamCollaborationTitle',
    description: 'teamCollaborationDesc',
  },
  {
    icon: Lightbulb,
    title: 'ideaValidationTitle',
    description: 'ideaValidationDesc',
  },
  {
    icon: Target,
    title: 'goalTrackingTitle',
    description: 'goalTrackingDesc',
  },
  {
    icon: Shield,
    title: 'privacyFirstTitle',
    description: 'privacyFirstDesc',
  },
];

export function Features() {
  const { t } = useLanguage();
  return (
    <section id="features" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('featuresTitle')} <span className="gradient-text">{t('featuresTitleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('featuresSubtitle')}
          </p>
        </div>

        {/* Role-Based Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {ROLE_CONFIGS.map((role, index) => (
            <div
              key={role.id}
              className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Role Icon */}
              <div className="text-5xl mb-4">{role.icon}</div>
              
              {/* Role Info */}
              <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{role.description}</p>
              
              {/* Features List */}
              <ul className="space-y-2">
                {role.features.map((feature, i) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <div className={`w-1.5 h-1.5 rounded-full bg-${role.color}`} />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Platform Features */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t('platformFeaturesTitle')} <span className="gradient-text-accent">{t('platformFeaturesTitleHighlight')}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platformFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-card/50 rounded-xl p-6 border border-border/50 hover:border-border transition-colors"
            >
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{t(feature.title)}</h3>
              <p className="text-sm text-muted-foreground">{t(feature.description)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
