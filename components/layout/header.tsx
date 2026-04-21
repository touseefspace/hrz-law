"use client";

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { LangSwitcher } from '@/components/lang-switcher';
import { Menu, X, ChevronRight, ChevronLeft, ChevronDown, Home, Info, Scale, Globe, BookOpen, Mail, Briefcase, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isOthersOpen, setIsOthersOpen] = useState(false);
  const pathname = usePathname();
  const isRtl = locale === 'ar';

  const mainLinks = [
    { href: '/', label: t('home'), icon: Home },
    { href: '/about', label: t('about'), icon: Info },
    { href: '/practice-areas', label: t('practiceAreas'), icon: Scale },
    { href: '/sectors', label: t('sectors'), icon: Globe },
    { href: '/contact', label: t('contact'), icon: Mail },
  ];

  const dropdownLinks = [
    { href: '/blog', label: t('blog'), icon: BookOpen },
    { href: '/careers', label: t('careers'), icon: Briefcase },
    { href: '/resources', label: t('resources'), icon: FileText },
  ];

  // Close menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
    setIsOthersOpen(false);
  }, [pathname]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const isActive = (path: string) => pathname === path;
  const isOthersActive = dropdownLinks.some(link => isActive(link.href));

  return (
    <header className="sticky top-0 z-100 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 py-3 md:py-4 transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/" className="flex items-center relative z-110">
            <img src="/images/logo/logo.png" alt="HRZ Logo" className="h-12 md:h-16 w-auto object-contain drop-shadow-sm" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-[11px] xl:text-xs font-bold tracking-widest uppercase transition-colors hover:text-accent-600 group py-2 ${isActive(link.href) ? 'text-accent-600' : 'text-primary-950 dark:text-primary-100/70'}`}
            >
              {link.label}
              <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-accent-500 transform origin-left transition-transform duration-300 ease-out ${isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
          ))}

          {/* Others Dropdown */}
          <div className="relative group py-2">
            <button className={`flex items-center gap-1 text-[11px] xl:text-xs font-bold tracking-widest uppercase transition-colors group-hover:text-accent-600 ${isOthersActive ? 'text-accent-600' : 'text-primary-950 dark:text-primary-100/70'}`}>
              {t('others')}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180 ${isOthersActive ? 'text-accent-600' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-max">
              <div className="bg-white dark:bg-zinc-900 border border-border/50 shadow-xl py-3 w-56 rounded-none backdrop-blur-xl">
                {dropdownLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-6 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-accent-50 dark:hover:bg-accent-950/20 transition-colors ${isActive(link.href) ? 'text-accent-600 border-l-2 border-accent-500' : 'text-primary-950 dark:text-primary-200'}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-2 md:gap-5 relative z-110">
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <LangSwitcher />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 text-primary-900 dark:text-white hover:text-accent-600 transition-colors bg-accent-50 dark:bg-accent-950/20 rounded-full border border-border/50"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-primary-950/60 backdrop-blur-sm z-90 lg:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: isRtl ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className={`fixed top-[72px] md:top-[88px] h-[calc(100vh-72px)] md:h-[calc(100vh-88px)] ${isRtl ? 'left-0' : 'right-0'} w-full bg-white/95 dark:bg-zinc-950/98 backdrop-blur-2xl shadow-2xl z-95 flex flex-col lg:hidden border-t border-border/40`}
            >
              <div className="flex-1 overflow-y-auto pt-6 px-6 pb-40">
                <nav className="flex flex-col">
                  {mainLinks.map((link, i) => {
                    const LinkIcon = link.icon;
                    const active = isActive(link.href);
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={`group flex items-center justify-between py-5 border-b border-border/30 text-lg font-serif font-bold transition-all ${active ? 'text-accent-600' : 'text-primary-950 dark:text-white'}`}
                        >
                          <div className="flex items-center gap-5">
                            <LinkIcon className={`w-5 h-5 transition-opacity ${active ? 'text-accent-600 opacity-100' : 'opacity-80 group-hover:opacity-100'}`} />
                            <span className="tracking-tight">{link.label}</span>
                          </div>
                          {isRtl ? (
                            <ChevronLeft className={`w-5 h-5 transition-all ${active ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 group-hover:opacity-40 group-hover:translate-x-0'} text-accent-600`} />
                          ) : (
                            <ChevronRight className={`w-5 h-5 transition-all ${active ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-0'} text-accent-600`} />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Mobile Others Accordion */}
                  <motion.div
                    initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: mainLinks.length * 0.05 }}
                  >
                    <button
                      onClick={() => setIsOthersOpen(!isOthersOpen)}
                      className={`w-full group flex items-center justify-between py-5 border-b border-border/30 text-lg font-serif font-bold transition-all ${isOthersActive || isOthersOpen ? 'text-accent-600' : 'text-primary-950 dark:text-white'}`}
                    >
                      <div className="flex items-center gap-5">
                        <Menu className={`w-5 h-5 transition-opacity ${isOthersActive || isOthersOpen ? 'text-accent-600 opacity-100' : 'opacity-80'}`} />
                        <span className="tracking-tight">{t('others')}</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOthersOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isOthersOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-accent-50/30 dark:bg-accent-950/10"
                        >
                          {dropdownLinks.map((link) => {
                            const SubIcon = link.icon;
                            const active = isActive(link.href);
                            return (
                              <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-5 py-4 px-10 border-b border-border/20 text-base font-medium transition-colors ${active ? 'text-accent-600 bg-accent-50/50 dark:bg-accent-950/20' : 'text-primary-950/70 dark:text-white/70'}`}
                              >
                                <SubIcon className={`w-4 h-4 ${active ? 'text-accent-600' : ''}`} />
                                {link.label}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </nav>

                <div className="mt-16 text-center">
                  <div className="h-px bg-linear-to-r from-transparent via-border to-transparent w-full mb-8"></div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-accent-600 font-bold mb-3">Since 1989</p>
                  <p className="text-xs font-serif italic text-primary-900/60 dark:text-white/40 leading-relaxed uppercase tracking-wider">Global Advisory. Legal Excellence.</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
