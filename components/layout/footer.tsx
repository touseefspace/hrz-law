import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { companyInfo } from '@/data/companyInfo';

export function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navigation');
  const tCompany = useTranslations('Company');
  const tOffices = useTranslations('Offices');
  const tCommon = useTranslations('Common');

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-950 text-primary-50 py-12 md:py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="mb-8">
            <Link href="/" className="inline-block">
              <img src="/images/logo/logofooter.png" alt="HRZ Logo" className="w-full h-auto object-contain drop-shadow-lg" />
            </Link>
          </div>
          <p className="text-primary-200 text-sm mb-6 leading-relaxed">
            {tCompany('positioning')}
          </p>
          <div className="pt-4 border-t border-primary-800/50 mt-6">
            <span className="text-accent-400 text-sm font-medium leading-relaxed block max-w-sm">
              {t('trustedAdvisors')}
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-bold font-serif text-lg text-white mb-6 border-b border-primary-800 pb-2 inline-block">{t('quickLinks')}</h3>
          <ul className="space-y-2 text-sm text-primary-200">
            <li><Link href="/" className="hover:text-white transition-colors">{tNav('home')}</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">{tNav('about')}</Link></li>
            <li><Link href="/practice-areas" className="hover:text-white transition-colors">{tNav('practiceAreas')}</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">{tNav('contact')}</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-bold font-serif text-lg text-white mb-6 border-b border-primary-800 pb-2 inline-block">{t('contactInfo')}</h3>
          <ul className="space-y-6 text-sm text-primary-200">
            {companyInfo.contact.offices.map((office, idx) => (
              <li key={idx} className="flex flex-col">
                <span className="font-bold text-accent-400 mb-1">{tOffices(`${office.id}.city`)} {tCommon('office')}</span>
                <span className="leading-relaxed">{tOffices(`${office.id}.address`)}</span>
              </li>
            ))}
            <li className="pt-4 border-t border-primary-800/50">
              <div className="flex flex-col space-y-2">
                {companyInfo.contact.phones.map((phone, idx) => (
                  <a key={idx} href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-accent-400 transition-colors flex items-center gap-2" dir="ltr">
                    <span className="text-primary-500">✆</span> {phone}
                  </a>
                ))}
              </div>
            </li>
            <li>
              <div className="flex flex-col space-y-2 mt-2">
                {companyInfo.contact.emails.map((email, idx) => (
                  <a key={idx} href={`mailto:${email}`} className="hover:text-accent-400 transition-colors flex items-center gap-2">
                    <span className="text-primary-500">✉</span> {email}
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-primary-800 text-sm text-primary-400 flex flex-col md:flex-row justify-between items-center text-center md:text-start gap-4">
        <p>&copy; {currentYear} {tCompany('name')}. {t('allRightsReserved')}</p>
        <div className="space-x-4">
          <Link href="/privacy" className="hover:text-white transition-colors">{t('privacyPolicy')}</Link>
          <Link href="/terms" className="hover:text-white transition-colors">{t('termsOfService')}</Link>
        </div>
      </div>
    </footer>
  );
}
