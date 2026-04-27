"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/fade-in";
import { ArrowRight, ArrowLeft, X, Shield, Landmark, Building2, Scale, Globe, Briefcase, TrendingUp, FileText } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

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

export function PracticeAreasGrid({ areas }: { areas: any[] }) {
  const tPractice = useTranslations('PracticeAreas');
  const locale = useLocale();
  const [activeArea, setActiveArea] = useState<string | null>(null);

  const handleCardInteraction = (id: string) => {
    // Only toggle on mobile. On desktop, hover handles it via CSS if we wanted, 
    // but React state handles both cleanly.
    setActiveArea((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* Global Backdrop */}
      <div
        className={`fixed inset-0 bg-background/60 dark:bg-background/80 backdrop-blur-sm z-40 transition-all duration-500 ${activeArea ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onPointerEnter={(e) => { if (e.pointerType === 'mouse') setActiveArea(null); }}
        onClick={() => setActiveArea(null)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {areas.map((area) => (
          <FadeIn key={area.id}>
            <div
              className={`group relative bg-background border p-6 transition-all duration-500 rounded-sm min-h-[160px] flex flex-col justify-center cursor-pointer ${activeArea === area.id ? 'z-50 scale-[1.02] border-transparent' : 'z-10 border-border hover:border-accent-500 shadow-sm hover:shadow-md'
                }`}
              onPointerEnter={(e) => { if (e.pointerType === "mouse") setActiveArea(area.id); }}
              onClick={() => handleCardInteraction(area.id)}
            >
              {/* Base Card Content (Icon + Title) */}
              <div className={`flex flex-col items-center justify-center text-center gap-4 relative z-10 transition-all duration-500 ${activeArea === area.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                <div className="text-accent-500 shrink-0">
                  {getPracticeIcon(area.id, "w-10 h-10 md:w-12 md:h-12")}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-primary-900 dark:text-white font-serif">
                  {tPractice(`${area.id}.title`)}
                </h3>
              </div>

              {/* Glassmorphism Overlay */}
              <div
                className={`absolute top-0 left-0 w-full h-auto min-h-full bg-background/95 dark:bg-background/95 backdrop-blur-xl z-20 flex flex-col p-5 md:p-6 transition-all duration-500 rounded-sm ${activeArea === area.id
                    ? "opacity-100 translate-y-0 ring-1 ring-accent-500 shadow-2xl border border-transparent"
                    : "opacity-0 translate-y-4 pointer-events-none border border-accent-500/20"
                  }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-base md:text-lg font-bold text-primary-900 dark:text-white font-serif flex-1 pr-4 rtl:pr-0 rtl:pl-4 line-clamp-1">
                    {tPractice(`${area.id}.title`)}
                  </h4>
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveArea(null); }}
                    className="text-foreground/50 hover:text-accent-500 transition-colors p-1 -mr-2 rtl:-mr-0 rtl:-ml-2 lg:hidden"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-foreground/80 text-sm md:text-base leading-relaxed mb-auto">
                  {tPractice(`${area.id}.description`)}
                </p>

                <div className="mt-4 pt-3 border-t border-border/50">
                  <Link
                    href="/practice-areas"
                    onClick={(e) => e.stopPropagation()}
                    className="text-accent-600 hover:text-accent-500 font-bold text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 group/link w-fit"
                  >
                    Read More
                    {locale === 'ar' ? (
                      <ArrowLeft className="w-4 h-4 transform group-hover/link:-translate-x-1 transition-transform" />
                    ) : (
                      <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </>
  );
}
