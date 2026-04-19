import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { LangSwitcher } from '@/components/lang-switcher';

export function Header() {
  const t = useTranslations('Navigation');
  
  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/practice-areas', label: t('practiceAreas') },
    { href: '/sectors', label: t('sectors') },
    { href: '/blog', label: t('blog') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 py-2 md:py-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/" className="flex items-center">
            <img src="/images/logo/logo.png" alt="HRZ Logo" className="h-15 md:h-20 w-auto object-contain drop-shadow-sm" />
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="text-sm font-medium text-foreground tracking-wide hover:text-accent-500 transition-colors uppercase"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <LangSwitcher />
        </div>
      </div>
    </header>
  );
}
