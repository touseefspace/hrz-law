"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="px-3 py-1 text-sm font-medium rounded-md border border-border hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors"
    >
      {locale === 'en' ? 'العربية' : 'English'}
    </button>
  );
}
