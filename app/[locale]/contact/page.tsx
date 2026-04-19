import { companyInfo } from '@/data/companyInfo';
import { getTranslations } from 'next-intl/server';
import { FadeIn } from '@/components/fade-in';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tCompany = await getTranslations({ locale, namespace: 'Company' });
  const tContact = await getTranslations({ locale, namespace: 'Contact' });
  return {
    title: `${tContact('title')} | ${tCompany('name')}`,
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tContact = await getTranslations({ locale, namespace: 'Contact' });
  const tOffices = await getTranslations({ locale, namespace: 'Offices' });
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section className="bg-primary-950 py-32 text-white relative bg-[url('/images/hero/homepage-hero-alt.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-primary-950/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-primary-900/60 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 lg:px-12 relative z-10 editorial-rhythm">
          <FadeIn className="max-w-3xl lg:ml-24 rtl:lg:mr-24 rtl:lg:ml-0">
            <span className="text-accent-400 font-bold tracking-widest uppercase mb-6 block text-sm border-l rtl:border-l-0 rtl:border-r border-accent-500 pl-4 rtl:pl-0 rtl:pr-4">INQUIRIES</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
               {tContact('title')}
            </h1>
            <p className="border-l rtl:border-l-0 rtl:border-r border-white/20 pl-6 rtl:pl-0 rtl:pr-6 text-primary-200 text-xl font-medium leading-relaxed max-w-2xl mt-8">
              {tContact('subtitle')}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-32">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
            
            <div className="lg:flex-1 editorial-rhythm">
              <FadeIn>
                <h2 className="text-3xl font-bold mb-8 text-primary-900 dark:text-white tracking-tight uppercase">
                  {tContact('getInTouch')}
                </h2>
                <div className="h-px bg-border w-24 mb-12"></div>
                
                <form className="space-y-8 max-w-2xl">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-foreground/50">{tContact('fullName')}</label>
                      <input type="text" className="w-full p-4 bg-transparent border-b border-border focus:outline-none focus:border-accent-500 transition-colors" required />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-foreground/50">{tContact('emailAddress')}</label>
                      <input type="email" className="w-full p-4 bg-transparent border-b border-border focus:outline-none focus:border-accent-500 transition-colors" required />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/50">{tContact('phoneNumber')}</label>
                    <input type="tel" className="w-full p-4 bg-transparent border-b border-border focus:outline-none focus:border-accent-500 transition-colors" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/50">{tContact('serviceNeeded')}</label>
                    <select className="w-full p-4 bg-transparent border-b border-border focus:outline-none focus:border-accent-500 transition-colors text-foreground">
                       <option>{tContact('generalInquiry')}</option>
                       <option>{tContact('legalConsultation')}</option>
                       <option>{tContact('litigation')}</option>
                       <option>{tContact('corporateMA')}</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/50">{tContact('message')}</label>
                    <textarea rows={4} className="w-full p-4 bg-transparent border-b border-border focus:outline-none focus:border-accent-500 transition-colors resize-none" required></textarea>
                  </div>
                  <button type="button" className="bg-primary-900 border border-primary-900 hover:bg-transparent hover:text-primary-900 dark:hover:text-white dark:hover:border-white text-white w-full py-5 font-bold transition-colors text-sm uppercase tracking-widest mt-8">
                     {tContact('submitInquiry')}
                  </button>
                  <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest text-center mt-6">
                     {tContact('demoFormText')}
                  </p>
                </form>
              </FadeIn>
            </div>

            <div className="lg:w-[400px] shrink-0">
              <FadeIn delay={0.2} className="space-y-16">
                <div>
                  <h2 className="text-xl font-bold mb-8 text-primary-900 dark:text-white tracking-tight uppercase">
                    {tContact('contactDetails')}
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/50 mb-3">{tContact('phones')}</h3>
                      <ul className="space-y-2 flex flex-col text-foreground/90 font-medium">
                        {companyInfo.contact.phones.map(p => (
                          <a key={p} href={`tel:${p.replace(/\s+/g,'')}`} className="hover:text-accent-500 transition-colors text-lg" dir="ltr">{p}</a>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/50 mb-3">{tContact('emails')}</h3>
                      <ul className="space-y-2 flex flex-col text-foreground/90 font-medium">
                        {companyInfo.contact.emails.map(e => (
                          <a key={e} href={`mailto:${e}`} className="hover:text-accent-500 transition-colors text-lg">{e}</a>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="double-divider"></div>

                <div>
                  <h2 className="text-xl font-bold mb-8 text-primary-900 dark:text-white tracking-tight uppercase">
                    {tContact('ourOffices')}
                  </h2>
                  <div className="space-y-12">
                    {companyInfo.contact.offices.map((office, i) => (
                       <div key={i}>
                          <img 
                            src={office.id === 'dubai' ? '/images/office/dubai-difc-exterior.png' : '/images/office/fujairah-office-facade.png'} 
                            alt={office.id === 'dubai' ? 'Dubai Headquarters' : 'Fujairah Office'} 
                            className="w-full h-56 object-cover mb-6 grayscale opacity-80 mix-blend-multiply dark:mix-blend-screen" 
                          />
                          <div className="border-l rtl:border-l-0 rtl:border-r border-accent-500 pl-6 rtl:pl-0 rtl:pr-6">
                            <h3 className="font-serif font-bold text-2xl mb-3 text-primary-900 dark:text-white">{tOffices(`${office.id}.city`)}</h3>
                            <p className="text-foreground/80 leading-relaxed font-medium">{tOffices(`${office.id}.address`)}</p>
                          </div>
                       </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
