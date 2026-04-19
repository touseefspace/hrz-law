import { getTranslations } from 'next-intl/server';
import { FadeIn } from '@/components/fade-in';
import { Link } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tCompany = await getTranslations({ locale, namespace: 'Company' });
  const tCareers = await getTranslations({ locale, namespace: 'Careers' });
  return {
    title: `${tCareers('title')} | ${tCompany('name')}`,
  };
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tCareers = await getTranslations({ locale, namespace: 'Careers' });
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section className="bg-primary-950 py-32 text-white relative">
        <div className="container mx-auto px-4 lg:px-12 editorial-rhythm">
          <FadeIn className="max-w-3xl lg:ml-24 rtl:lg:mr-24 rtl:lg:ml-0">
            <span className="text-accent-400 font-bold tracking-widest uppercase mb-6 block text-sm border-l rtl:border-l-0 rtl:border-r border-accent-500 pl-4 rtl:pl-0 rtl:pr-4">CAREERS</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
               {tCareers('title')}
            </h1>
          </FadeIn>
        </div>
      </section>

      <section className="py-32">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
             <div className="lg:w-[320px] shrink-0 top-32">
                <FadeIn className="sticky top-32 editorial-rhythm">
                   <h2 className="text-2xl font-bold mb-6 text-primary-900 dark:text-white uppercase tracking-widest">
                     {tCareers('careersTitle')}
                   </h2>
                   <div className="my-8 h-px bg-border max-w-[100px]"></div>
                </FadeIn>
             </div>

             <div className="lg:max-w-3xl flex-1 editorial-rhythm">
                <FadeIn>
                  <div className="text-foreground/80 text-xl leading-loose space-y-6 mb-16">
                     <p>{tCareers('careersP1')}</p>
                     <p>{tCareers('careersP2')}</p>
                  </div>
                  
                  <div className="double-divider"></div>

                  <div className="mt-16 border border-border p-12 bg-primary-50 dark:bg-primary-950/20">
                    <h3 className="text-2xl font-bold mb-6 text-primary-900 dark:text-white font-serif tracking-tight">
                       {tCareers('currentOpenings')}
                    </h3>
                    <p className="text-foreground/80 leading-relaxed mb-8 max-w-xl">
                       {tCareers('noOpenings')}
                    </p>
                    <Link href="/contact" className="inline-block bg-primary-900 hover:bg-primary-800 text-white font-bold py-4 px-10 transition-colors uppercase tracking-widest text-sm">
                      {tCareers('submitCV')}
                    </Link>
                  </div>
                </FadeIn>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
