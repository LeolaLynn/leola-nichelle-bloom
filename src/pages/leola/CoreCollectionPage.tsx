import { PageShell } from "@/components/leola/PageShell";
import { ScentCard } from "@/components/leola/ScentCard";
import { CORE_SCENTS } from "@/components/leola/scents";

const CoreCollectionPage = () => (
  <PageShell
    eyebrow="The Core Collection"
    title="Six scents. One ritual."
    intro="The signature chapter of the house — six fragrances designed to melt into skin and memory."
  >
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {CORE_SCENTS.map((s) => <ScentCard key={s.slug} scent={s} />)}
    </div>
  </PageShell>
);
export default CoreCollectionPage;
