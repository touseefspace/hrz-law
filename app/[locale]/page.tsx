import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { practiceAreas } from '@/data/practiceAreas';
import { FadeIn } from '@/components/fade-in';

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
      <section className="relative bg-primary-950 text-white pt-48 pb-32 overflow-hidden flex flex-col justify-center bg-[url('/images/hero/homepage-hero.png')] bg-cover bg-center">
        <div className="absolute inset-0 z-0 bg-primary-950/70 mix-blend-multiply"></div>
        <div className="absolute inset-0 z-0 bg-primary-900/90 mix-blend-overlay"></div>
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

      {/* Jurisdiction Signals */}
      <section className="bg-primary-900 text-primary-200 py-6 border-y border-white/10">
        <div className="container mx-auto px-4 lg:px-12">
           <FadeIn className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs font-medium tracking-widest uppercase">
              <span>{tHome('jurisdictionSignals.uaeFederalCourts')}</span>
              <span className="text-accent-500">•</span>
              <span>{tHome('jurisdictionSignals.dubaiCourts')}</span>
              <span className="text-accent-500">•</span>
              <span>{tHome('jurisdictionSignals.adjd')}</span>
              <span className="text-accent-500">•</span>
              <span>{tHome('jurisdictionSignals.arbitration')}</span>
              <span className="text-accent-500">•</span>
              <span>{tHome('jurisdictionSignals.crossBorder')}</span>
           </FadeIn>
        </div>
      </section>

      {/* Intro / Legal Narrative Segment */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-12">
          <FadeIn className="max-w-4xl lg:ml-32 rtl:lg:mr-32 rtl:lg:ml-0 editorial-rhythm">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 dark:text-white tracking-tight leading-tight">
              {tHome('qualityTitle')}
            </h2>
            <div className="double-divider"></div>
            <div className="text-foreground/80 text-xl leading-loose max-w-3xl">
              <p>{tHome('qualityP1')}</p>
              <br/>
              <p>{tHome('qualityP2')}</p>
            </div>
            <div className="mt-16 border-l border-border pl-8 rtl:pl-0 rtl:border-l-0 rtl:border-r rtl:pr-8 py-10 relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('/images/editorial/legal-document-texture.png')] bg-cover opacity-10 mix-blend-multiply z-0 pointer-events-none"></div>
               <span className="relative z-10 block font-serif text-3xl font-bold text-primary-900 dark:text-white mb-2">{tCompany('establishedYear')}</span>
               <span className="relative z-10 text-accent-600 font-bold uppercase tracking-widest text-sm">Over Three Decades of Advisory Excellence</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Practice Areas / Capability Editorial */}
      <section className="py-32 bg-primary-50 dark:bg-primary-950 border-t border-border">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
            <div className="lg:w-[320px] shrink-0 top-32">
              <FadeIn className="sticky top-32 editorial-rhythm">
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
                  <FadeIn key={area.id} delay={index * 0.1}>
                    <div className="group border-b border-border pb-12 hover:border-accent-500 transition-colors">
                      <h3 className="text-3xl font-bold mb-6 text-primary-900 dark:text-white group-hover:text-accent-600 transition-colors font-serif">{tPractice(`${area.id}.title`)}</h3>
                      <p className="text-foreground/80 text-lg leading-relaxed">{tPractice(`${area.id}.description`)}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-primary-950 text-white relative">
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
      </section>
    </div>
  );
}
