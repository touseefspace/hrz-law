import { getTranslations } from 'next-intl/server';
import { FadeIn } from '@/components/fade-in';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tCompany = await getTranslations({ locale, namespace: 'Company' });
  const tResources = await getTranslations({ locale, namespace: 'Resources' });
  return {
    title: `${tResources('title')} | ${tCompany('name')}`,
  };
}

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tResources = await getTranslations({ locale, namespace: 'Resources' });
  
  const resourceKeys = [
    "dubaiChamber",
    "abuDhabiJustice",
    "landDepartment",
    "ministryInterior",
    "rakCourts",
    "ministryJustice",
    "dubaiMunicipality",
    "mohre",
    "dubaiCourts",
    "dubaiPolice",
    "dubaiLegalAffairs",
    "publicProsecution"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section className="bg-primary-950 py-32 text-white relative">
        <div className="container mx-auto px-4 lg:px-12 editorial-rhythm">
          <FadeIn className="max-w-3xl lg:ml-24 rtl:lg:mr-24 rtl:lg:ml-0">
            <span className="text-accent-400 font-bold tracking-widest uppercase mb-6 block text-sm border-l rtl:border-l-0 rtl:border-r border-accent-500 pl-4 rtl:pl-0 rtl:pr-4">REFERENCES</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
               {tResources('title')}
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
                     {tResources('importantLinks')}
                   </h2>
                   <div className="my-8 h-px bg-border max-w-[100px]"></div>
                </FadeIn>
             </div>

             <div className="lg:max-w-3xl flex-1 editorial-rhythm">
                <FadeIn className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
                  {resourceKeys.map((key, i) => (
                    <a key={i} href="#" className="group flex flex-col py-4 border-b border-border hover:border-accent-500 transition-colors">
                      <span className="font-serif text-primary-900 dark:text-white text-xl group-hover:text-accent-600 transition-colors">
                         {tResources(`links.${key}`)}
                      </span>
                    </a>
                  ))}
                </FadeIn>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
