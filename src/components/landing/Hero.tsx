import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Users, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-subtle" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-subtle delay-1000" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">{t('heroBadge')}</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-in">
            {t('heroTitle')}{' '}
            <span className="gradient-text">{t('heroTitleHighlight')}</span>
            <br />
            <span className="text-muted-foreground">{t('heroTitleEnd')}</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-in" style={{ animationDelay: '0.1s' }}>
            {t('heroSubtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <Link to="/signup">
              <Button variant="hero" size="xl" className="group">
                {t('startFreeToday')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="glass" size="xl">
                {t('signInHero')}
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground animate-slide-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span>{t('usersCount')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              <span>{t('sessionsCount')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-role-student" />
              <span>{t('rating')}</span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-20 max-w-5xl mx-auto animate-slide-in" style={{ animationDelay: '0.4s' }}>
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl" />
            
            {/* Dashboard Preview */}
            <div className="relative glass-effect rounded-2xl p-6 shadow-elevated">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-accent" />
                <div className="w-3 h-3 rounded-full bg-role-student" />
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {/* Role Cards Preview */}
                {[
                  { title: t('studentAITitle'), desc: t('studentAIDesc') },
                  { title: t('businessAITitle'), desc: t('businessAIDesc') },
                  { title: t('founderAITitle'), desc: t('founderAIDesc') },
                ].map((role, i) => (
                  <div 
                    key={i}
                    className="bg-secondary/50 rounded-xl p-4 border border-border/50 hover:border-primary/50 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="text-3xl mb-2">{role.icon}</div>
                    <h3 className="font-semibold mb-1">{role.title}</h3>
                    <p className="text-sm text-muted-foreground">{role.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
