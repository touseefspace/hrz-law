import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { practiceAreas } from '@/data/practiceAreas';
import { FadeIn } from '@/components/fade-in';
import {
  Shield,
  Landmark,
  Building2,
  Scale,
  Globe,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  TrendingUp,
  FileText
} from 'lucide-react';

const getPracticeIcon = (id: string, className: string) => {
  switch (id) {
    case 'arbitration': return <Scale className={className} />;
    case 'banking-finance': return <Landmark className={className} />;
    case 'capital-markets': return <TrendingUp className={className} />;
    case 'commercial-law': return <Briefcase className={className} />;
    case 'competition-law': return <Shield className={className} />;
    default: return <FileText className={className} />;
  }
};

import { HeroSlideshow } from '@/components/hero-slideshow';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Company' });
  return {
    title: t('name'),
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tCompany = await getTranslations({ locale, namespace: 'Company' });
  const tHome = await getTranslations({ locale, namespace: 'Home' });
  const tCommon = await getTranslations({ locale, namespace: 'Common' });
  const tPractice = await getTranslations({ locale, namespace: 'PracticeAreas' });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary-950 text-white py-10 overflow-hidden flex flex-col justify-center">
        <HeroSlideshow />
        
        <div className="container mx-auto px-4 lg:px-12 relative z-10 editorial-rhythm">
          <FadeIn className="max-w-4xl lg:ml-24 rtl:lg:mr-24 rtl:lg:ml-0">
            <span className="text-accent-400 font-bold tracking-widest uppercase mb-8 block text-sm border-l-2 rtl:border-l-0 rtl:border-r-2 border-accent-500 pl-4 rtl:pl-0 rtl:pr-4">
              {tCommon('established')} {tCompany('establishedYear')}
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-white drop-shadow-md">
              {tCompany('name')}
            </h1>
            <p className="text-2xl md:text-3xl text-accent-400 font-serif italic drop-shadow-sm border-b border-primary-800 pb-8 inline-block">
              {tCompany('heroTagline')}
            </p>
            <p className="text-lg md:text-xl text-primary-100 font-medium max-w-2xl leading-relaxed mt-8">
              {tCompany('positioning')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Jurisdiction Signals - Scrolling Ticker */}
      <section className="bg-primary-900 text-primary-200 py-4 border-y border-white/10 overflow-hidden relative">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes tickerRTL {
            0% { transform: translateX(0); }
            100% { transform: translateX(50%); }
          }
          .animate-ticker {
            display: flex;
            width: max-content;
            animation: ticker 60s linear infinite;
          }
          [dir="rtl"] .animate-ticker {
            animation-name: tickerRTL;
          }
          .animate-ticker:hover {
            animation-play-state: paused;
          }
        `}} />
        
        {/* Faded Edges for Premium Look */}
        <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-primary-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-primary-900 to-transparent z-10 pointer-events-none"></div>

        <div className="animate-ticker text-xs font-medium tracking-[0.2em] uppercase items-center group">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-x-12 px-6">
              <span>{tHome('jurisdictionSignals.uaeFederalCourts')}</span>
              <span className="text-accent-500 text-lg">•</span>
              <span>{tHome('jurisdictionSignals.dubaiCourts')}</span>
              <span className="text-accent-500 text-lg">•</span>
              <span>{tHome('jurisdictionSignals.adjd')}</span>
              <span className="text-accent-500 text-lg">•</span>
              <span>{tHome('jurisdictionSignals.arbitration')}</span>
              <span className="text-accent-500 text-lg">•</span>
              <span>{tHome('jurisdictionSignals.crossBorder')}</span>
              <span className="text-accent-500 text-lg">•</span>
            </div>
          ))}
        </div>
      </section>

      {/* Intro / Legal Narrative Segment */}
      <section className="py-16 md:py-24 lg:py-32 bg-background relative z-0 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-12 relative z-10">
          <FadeIn className="max-w-4xl md:ml-16 lg:ml-32 rtl:md:mr-16 rtl:lg:mr-32 rtl:lg:ml-0 editorial-rhythm">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 dark:text-white tracking-tight leading-tight">
              {tHome('qualityTitle')}
            </h2>
            <div className="double-divider"></div>
            <div className="text-foreground/80 text-xl leading-loose max-w-3xl">
              <p>{tHome('qualityP1')}</p>
              <br />
              <p>{tHome('qualityP2')}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Practice Areas / Capability Editorial */}
      < section className="py-16 md:py-24 lg:py-32 bg-primary-50 dark:bg-primary-950 border-t border-border" >
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-16 lg:gap-24 relative">
            <div className="lg:w-[320px] shrink-0 lg:top-32 lg:relative">
              <FadeIn className="lg:sticky lg:top-32 editorial-rhythm">
                <span className="text-accent-600 font-bold tracking-widest uppercase mb-4 block text-sm border-l border-accent-500 pl-4 rtl:pl-0 rtl:pr-4 rtl:border-l-0 rtl:border-r">LEGAL DEPTH</span>
                <h2 className="text-4xl font-bold text-primary-900 dark:text-white leading-tight">
                  {tHome('practiceTitle')}
                </h2>
                <div className="my-8 h-px bg-border max-w-[100px]"></div>
                <p className="text-foreground/80 text-lg leading-relaxed mb-10">
                  {tHome('practiceDesc')}
                </p>
                <Link href="/practice-areas" className="text-accent-600 font-bold uppercase tracking-widest text-sm hover:text-accent-500 transition-colors inline-flex items-center gap-2">
                  {tHome('viewAllAreas')} &rarr;
                </Link>
              </FadeIn>
            </div>

            <div className="lg:max-w-3xl flex-1">
              <div className="space-y-12">
                {practiceAreas.slice(0, 5).map((area, index) => (
                  <FadeIn key={area.id}>
                    <div className="group border-b border-border pb-10 hover:border-accent-500 transition-colors cursor-pointer relative">
                      <div className="flex items-start gap-6">
                        <div className="mt-1 transform group-hover:scale-110 transition-transform duration-500 text-accent-500">
                          {getPracticeIcon(area.id, "w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity")}
                        </div>

                        <div className="flex-1 transform group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-500 ease-out">
                          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary-900 dark:text-white group-hover:text-accent-600 transition-colors font-serif flex items-center justify-between gap-4">
                            <span>{tPractice(`${area.id}.title`)}</span>

                            <span className="shrink-0 flex items-center justify-center w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-accent-500">
                              {locale === 'ar' ? (
                                <ArrowLeft className="w-6 h-6" />
                              ) : (
                                <ArrowRight className="w-6 h-6" />
                              )}
                            </span>
                          </h3>

                          <p className="text-foreground/80 text-lg leading-relaxed">
                            {tPractice(`${area.id}.description`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* CTA Section */}
      < section className="py-16 md:py-24 lg:py-32 bg-primary-950 text-white relative" >
        <div className="container mx-auto px-4 lg:px-12">
          <FadeIn className="max-w-4xl lg:mx-auto text-center editorial-rhythm">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 font-serif leading-tight">
              {tHome('ctaTitle')}
            </h2>
            <div className="double-divider border-accent-500/30"></div>
            <p className="text-primary-200 text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
              {tHome('ctaDesc')}
            </p>
            <Link href="/contact" className="bg-primary-900 hover:bg-primary-800 border border-primary-800 text-white px-12 py-5 font-bold transition-colors text-lg uppercase tracking-widest inline-block">
              {tHome('ctaButton')}
            </Link>
          </FadeIn>
        </div>
      </section >
    </div >
  );
}
