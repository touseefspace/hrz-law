import { getTranslations } from 'next-intl/server';
import { practiceAreas } from '@/data/practiceAreas';
import { FadeIn } from '@/components/fade-in';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tCompany = await getTranslations({ locale, namespace: 'Company' });
  const tPractice = await getTranslations({ locale, namespace: 'PracticePage' });
  return {
    title: `${tPractice('title')} | ${tCompany('name')}`,
  };
}

export default async function PracticeAreasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tPractice = await getTranslations({ locale, namespace: 'PracticePage' });
  const tAreas = await getTranslations({ locale, namespace: 'PracticeAreas' });
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section className="bg-primary-950 py-32 text-white relative bg-[url('/images/editorial/legal-document-texture.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-primary-950/30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-primary-950/50 mix-blend-multiply"></div>
        <div className="container mx-auto px-4 lg:px-12 relative z-10 editorial-rhythm">
          <FadeIn className="max-w-3xl lg:ml-24 rtl:lg:mr-24 rtl:lg:ml-0">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
               {tPractice('title')}
            </h1>
            <div className="w-16 h-px bg-accent-500 mb-8"></div>
            <p className="text-primary-200 text-xl font-medium leading-relaxed max-w-2xl">
              {tPractice('description')}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-32">
        <div className="container mx-auto px-4 lg:px-12">
           <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
             <div className="lg:w-[320px] shrink-0 top-32">
                <FadeIn className="sticky top-32 editorial-rhythm">
                   <h2 className="text-2xl font-bold mb-6 text-primary-900 dark:text-white uppercase tracking-widest">
                     Index
                   </h2>
                   <div className="my-8 h-px bg-border max-w-[100px]"></div>
                   <ul className="space-y-4 text-sm font-bold tracking-widest uppercase text-foreground/50 border-l rtl:border-l-0 rtl:border-r border-border pl-6 rtl:pl-0 rtl:pr-6">
                      {practiceAreas.slice(0, 10).map((area) => (
                         <li key={area.id} className="hover:text-accent-600 cursor-pointer transition-colors">
                            {tAreas(`${area.id}.title`)}
                         </li>
                      ))}
                      <li className="pt-4 text-accent-500">...</li>
                   </ul>
                </FadeIn>
             </div>

             <div className="lg:max-w-3xl flex-1">
                <div className="space-y-16">
                  {practiceAreas.map((area, index) => (
                    <FadeIn key={area.id} delay={index * 0.05}>
                      <div className="group border-b border-border pb-12 hover:border-accent-500 transition-colors">
                        <span className="text-accent-500 font-bold uppercase tracking-widest text-xs mb-4 block">Depth 0{index + 1}</span>
                        <h3 className="text-3xl font-bold mb-6 text-primary-900 dark:text-white group-hover:text-accent-600 transition-colors tracking-tight font-serif">
                           {tAreas(`${area.id}.title`)}
                        </h3>
                        <p className="text-foreground/80 text-xl leading-loose">
                           {tAreas(`${area.id}.description`)}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}
