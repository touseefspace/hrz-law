import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { blogs } from '@/data/blogs';
import { FadeIn } from '@/components/fade-in';
import { Link } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const tCompany = await getTranslations({ locale, namespace: 'Company' });
  const tBlogs = await getTranslations({ locale, namespace: 'Blogs' });
  
  const blog = blogs.find(b => b.slug === slug);
  if (!blog) return { title: `Not Found | ${tCompany('name')}` };
  
  return {
    title: `${tBlogs(`${blog.slug}.title`)} | ${tCompany('name')}`,
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  
  const blog = blogs.find(b => b.slug === slug);
  if (!blog) {
    notFound();
  }
  
  const tBlogs = await getTranslations({ locale, namespace: 'Blogs' });
  const tCompany = await getTranslations({ locale, namespace: 'Company' });
  
  const blogTranslation = (key: string) => tBlogs(`${blog.slug}.${key}`);
  
  const backText = locale === 'en' ? 'Return to Publications' : 'العودة إلى المنشورات';
  const authorText = locale === 'en' ? 'Authored by Corporate Advisory Group' : 'بقلم مجموعة الاستشارات للشركات';

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <article className="container mx-auto px-4 lg:px-12 py-32">
        <div className="max-w-3xl lg:ml-24 rtl:lg:mr-24 rtl:lg:ml-0 editorial-rhythm">
          <Link href="/blog" className="inline-flex items-center gap-2 text-foreground/50 hover:text-accent-600 font-bold uppercase tracking-widest text-xs mb-16 transition-colors">
            &larr; {backText}
          </Link>
          
          <FadeIn>
            <header className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-accent-600 font-bold uppercase tracking-widest text-xs border border-accent-500/30 px-3 py-1">
                  {blogTranslation('category')}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-foreground/50">{blog.date}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 text-primary-900 dark:text-white leading-tight font-serif tracking-tight">
                 {blogTranslation('title')}
              </h1>
            </header>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="aspect-21/9 w-full bg-[url('/images/blog/placeholder-abstract.png')] bg-cover bg-center mb-16 grayscale opacity-80 mix-blend-multiply dark:mix-blend-screen"></div>
            <div className="double-divider border-accent-500/30 my-16"></div>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80 leading-loose prose-a:text-accent-600 hover:prose-a:text-accent-500 prose-headings:text-primary-900 dark:prose-headings:text-white">
              {blogTranslation('content').split('\n').map((paragraph, idx) => {
                if (paragraph.trim() === '') return <br key={idx} />;
                
                const isListItem = paragraph.trim().startsWith('-');
                if (isListItem) {
                   return <li key={idx} className="ml-4 rtl:ml-0 rtl:mr-4 font-medium">{paragraph.replace('-', '').trim()}</li>;
                }
                return <p key={idx} className="font-medium">{paragraph}</p>;
              })}
            </div>
          </FadeIn>
          
          <FadeIn delay={0.4} className="mt-24 pt-8 border-t border-border flex justify-between items-center">
            <div className="flex flex-col">
               <span className="text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">Publishing Entity</span>
               <p className="text-foreground font-serif text-lg">
                  {authorText}
               </p>
            </div>
            <div className="flex gap-4">
               <button className="w-10 h-10 border border-border flex items-center justify-center text-primary-600 dark:text-primary-400 hover:border-accent-500 hover:text-accent-500 transition-colors font-serif font-bold italic">in</button>
            </div>
          </FadeIn>
        </div>
      </article>
      
      <section className="bg-primary-950 py-32 border-t border-primary-900 text-white">
         <div className="container mx-auto px-4 lg:px-12 text-center editorial-rhythm">
            <h3 className="text-3xl font-bold mb-6 font-serif">
               {locale === 'en' ? 'Require Strategic Counsel?' : 'هل تحتاج إلى مشورة استراتيجية؟'}
            </h3>
            <p className="text-primary-200 mb-10 max-w-xl mx-auto">
               {locale === 'en' ? 'Consult with our specialized attorneys regarding matters discussed in this publication.' : 'استشر محامينا المتخصصين فيما يتعلق بالمسائل التي نوقشت في هذا المنشور.'}
            </p>
            <Link href="/contact" className="inline-block bg-primary-900 border border-primary-800 hover:bg-transparent hover:border-accent-500 text-white font-bold py-4 px-10 transition-colors uppercase tracking-widest text-sm">
               {locale === 'en' ? 'Engage Counsel' : 'ترتيب استشارة'}
            </Link>
         </div>
      </section>
    </div>
  );
}
