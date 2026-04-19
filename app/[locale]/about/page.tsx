import { getTranslations } from 'next-intl/server';
import { staff } from '@/data/staff';
import { FadeIn } from '@/components/fade-in';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tCompany = await getTranslations({ locale, namespace: 'Company' });
  const tAbout = await getTranslations({ locale, namespace: 'About' });
  return {
    title: `${tAbout('title')} | ${tCompany('name')}`,
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tAbout = await getTranslations({ locale, namespace: 'About' });
  const tStaff = await getTranslations({ locale, namespace: 'Staff' });
  const tCompany = await getTranslations({ locale, namespace: 'Company' });
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Editorial Page Header */}
      <section className="bg-primary-950 py-32 text-white relative bg-[url('/images/editorial/marble-surface-dark.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-primary-950/80 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-primary-950/70 mix-blend-multiply"></div>
        <div className="container mx-auto px-4 lg:px-12 relative z-10 editorial-rhythm">
          <FadeIn className="max-w-3xl lg:ml-24 rtl:lg:mr-24 rtl:lg:ml-0">
            <span className="text-accent-400 font-bold tracking-widest uppercase mb-6 block text-sm border-l rtl:border-l-0 rtl:border-r border-accent-500 pl-4 rtl:pl-0 rtl:pr-4">PROFILE</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
               {tAbout('title')}
            </h1>
            <p className="border-l rtl:border-l-0 rtl:border-r border-white/20 pl-6 rtl:pl-0 rtl:pr-6 text-primary-200 text-xl font-medium leading-relaxed max-w-2xl mt-8">
               {tCompany('positioning')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Institutional Narrative & Timeline */}
      <section className="py-32">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            <div className="lg:w-[320px] shrink-0 top-32">
              <FadeIn className="sticky top-32 editorial-rhythm">
                 <div className="border-t border-border pt-6 mt-2 mb-8 relative">
                    <img src="/images/editorial/firm-legacy-1989.png" alt="Legacy Since 1989" className="w-full h-auto mb-6 grayscale opacity-60 mix-blend-multiply dark:mix-blend-screen" />
                    <span className="font-serif text-5xl font-bold text-primary-900 dark:text-white block mb-2">{tCompany('establishedYear')}</span>
                    <span className="text-accent-600 font-bold uppercase tracking-widest text-sm">Legacy Establishment</span>
                 </div>
              </FadeIn>
            </div>

            <div className="lg:max-w-3xl flex-1 editorial-rhythm">
               <FadeIn>
                <h2 className="text-4xl font-bold mb-8 text-primary-900 dark:text-white tracking-tight leading-tight">
                  {tAbout('whoWeAre')}
                </h2>
                <div className="text-foreground/80 leading-loose text-xl space-y-6">
                  <p>{tAbout('whoWeAreP1')}</p>
                  <p>{tAbout('whoWeAreP2')}</p>
                  <p>{tAbout('whoWeAreP3')}</p>
                </div>

                <div className="double-divider"></div>

                <div className="space-y-16">
                  <div>
                    <h3 className="text-3xl font-bold mb-6 text-primary-900 dark:text-white tracking-tight">
                      {tAbout('ourMission')}
                    </h3>
                    <p className="text-foreground/80 leading-loose text-xl border-l rtl:border-l-0 rtl:border-r border-border pl-8 rtl:pl-0 rtl:pr-8 py-2">
                      {tAbout('ourMissionDesc')}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-bold mb-6 text-primary-900 dark:text-white tracking-tight">
                      {tAbout('ourPrinciples')}
                    </h3>
                    <p className="text-foreground/80 leading-loose text-xl border-l rtl:border-l-0 rtl:border-r border-border pl-8 rtl:pl-0 rtl:pr-8 py-2">
                      {tAbout('ourPrinciplesDesc')}
                    </p>
                  </div>
                </div>
               </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Roster */}
      <section className="py-32 bg-primary-50 dark:bg-primary-950 border-t border-border">
        <div className="container mx-auto px-4 lg:px-12">
          
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
             <div className="lg:w-[320px] shrink-0 top-32">
                <FadeIn className="sticky top-32 editorial-rhythm">
                   <h2 className="text-4xl font-bold mb-6 text-primary-900 dark:text-white tracking-tight leading-tight">
                     {tAbout('ourTeam')}
                   </h2>
                   <div className="my-8 h-px bg-border max-w-[100px]"></div>
                   <p className="text-foreground/80 text-lg leading-relaxed mb-10">
                     {tAbout('ourTeamDesc')}
                   </p>
                </FadeIn>
             </div>

             <div className="lg:max-w-4xl flex-1">
                <div className="grid sm:grid-cols-2 gap-12">
                  {staff.map((member, i) => (
                    <FadeIn key={member.id} delay={i * 0.1}>
                      <div className="group border-b border-border pb-8 hover:border-accent-500 transition-colors">
                        <div className="aspect-3/4 bg-primary-100 dark:bg-primary-900 mb-6 border border-border relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 bg-[url('/images/team/portrait-placeholder.png')] bg-cover bg-center">
                          {/* Portrait Frame */}
                          <div className="absolute inset-4 border border-border/50"></div>
                        </div>
                        <h3 className="font-serif font-bold text-2xl mb-2 text-primary-900 dark:text-white group-hover:text-accent-600 transition-colors">
                          {tStaff(`${member.id}.name`)}
                        </h3>
                        <p className="text-sm font-bold tracking-widest uppercase text-foreground/50 mb-4">{tStaff(`${member.id}.designation`)}</p>
                        <p className="text-foreground/80 leading-relaxed max-w-sm">{/* If bio existed mapping can happen here, omitted per user standard */}</p>
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
