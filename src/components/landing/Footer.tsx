import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border py-12 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold gradient-text">Ma3ak AI</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {t('footerDesc')}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">{t('product')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">{t('featuresFooter')}</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">{t('pricingFooter')}</a></li>
              <li><Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">{t('login')}</Link></li>
              <li><Link to="/signup" className="text-muted-foreground hover:text-foreground transition-colors">{t('signUp')}</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">{t('resources')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{t('documentation')}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{t('blog')}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{t('community')}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{t('support')}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{t('legal')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{t('privacy')}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{t('terms')}</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>{t('footerCopyright')}</p>
        </div>
      </div>
    </footer>
  );
}
