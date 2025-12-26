import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { t, isRTL } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLandingPage = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
            </div>
            <span className="text-xl font-bold gradient-text">{t('brandName')}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isLandingPage && (
              <>
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('features')}
                </a>
                <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('pricing')}
                </a>
              </>
            )}

            <LanguageToggle />

            {isAuthenticated ? (
              <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Link to="/dashboard">
                  <Button variant="ghost">{t('dashboard')}</Button>
                </Link>
                <Button variant="outline" onClick={logout}>
                  {t('logOut')}
                </Button>
              </div>
            ) : (
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Link to="/login">
                  <Button variant="ghost">{t('signIn')}</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="hero">{t('getStarted')}</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-in">
            <div className="flex flex-col gap-4">
              {isLandingPage && (
                <>
                  <a
                    href="#features"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('features')}
                  </a>
                  <a
                    href="#pricing"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('pricing')}
                  </a>
                </>
              )}

              <LanguageToggle />

              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">{t('dashboard')}</Button>
                  </Link>
                  <Button variant="outline" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                    {t('logOut')}
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">{t('signIn')}</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="hero" className="w-full">{t('getStarted')}</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}