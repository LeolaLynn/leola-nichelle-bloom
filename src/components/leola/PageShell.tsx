import { ReactNode } from "react";

export const PageShell = ({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) => (
  <>
    <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10 gradient-warm opacity-50" />
      <div className="container max-w-3xl text-center">
        {eyebrow && (
          <span className="text-xs uppercase tracking-[0.4em] text-rose-gold">{eyebrow}</span>
        )}
        <h1 className="font-serif text-4xl md:text-6xl text-primary mt-3 text-balance leading-[1.05]">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 font-serif italic text-xl text-cocoa/80 text-balance">{intro}</p>
        )}
      </div>
    </section>
    <section className="pb-24 md:pb-32">
      <div className="container max-w-4xl">{children}</div>
    </section>
  </>
);
