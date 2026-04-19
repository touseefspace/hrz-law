import { getTranslations } from 'next-intl/server';
import { blogs } from '@/data/blogs';
import { FadeIn } from '@/components/fade-in';
import { Link } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tCompany = await getTranslations({ locale, namespace: 'Company' });
  const tBlogPage = await getTranslations({ locale, namespace: 'BlogPage' });
  return {
    title: `${tBlogPage('title')} | ${tCompany('name')}`,
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tBlogPage = await getTranslations({ locale, namespace: 'BlogPage' });
  const tBlogs = await getTranslations({ locale, namespace: 'Blogs' });
  const tCommon = await getTranslations({ locale, namespace: 'Common' });
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section className="bg-primary-950 py-32 text-white relative bg-[url('/images/blog/insights-banner.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-primary-950/80 mix-blend-multiply"></div>
        <div className="container mx-auto px-4 lg:px-12 editorial-rhythm relative z-10">
          <FadeIn className="max-w-3xl lg:ml-24 rtl:lg:mr-24 rtl:lg:ml-0">
            <span className="text-accent-400 font-bold tracking-widest uppercase mb-6 block text-sm border-l rtl:border-l-0 rtl:border-r border-accent-500 pl-4 rtl:pl-0 rtl:pr-4">PUBLICATIONS</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
               {tBlogPage('title')}
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
                     Legal Insights
                   </h2>
                   <div className="my-8 h-px bg-border max-w-[100px]"></div>
                </FadeIn>
             </div>

             <div className="lg:max-w-3xl flex-1 editorial-rhythm">
                <div className="space-y-16">
                  {blogs.map((blog, index) => (
                    <FadeIn key={blog.slug} delay={index * 0.1}>
                      <div className="group border-b border-border pb-12 hover:border-accent-500 transition-colors">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-accent-600 font-bold uppercase tracking-widest text-xs border border-accent-500/30 px-2 py-1">
                            {tBlogs(`${blog.slug}.category`)}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-widest text-foreground/50">{blog.date}</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-6 text-primary-900 dark:text-white group-hover:text-accent-600 transition-colors font-serif leading-tight">
                          {tBlogs(`${blog.slug}.title`)}
                        </h3>
                        <p className="text-foreground/80 text-xl leading-relaxed mb-8 font-medium line-clamp-3">
                          {tBlogs(`${blog.slug}.excerpt`)}
                        </p>
                        <Link href={`/blog/${blog.slug}`} className="text-primary-900 dark:text-white font-bold uppercase tracking-widest text-xs border-b-2 border-primary-900 dark:border-white pb-1 group-hover:border-accent-600 group-hover:text-accent-600 transition-colors inline-block">
                          {tCommon('readMore')}
                        </Link>
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
