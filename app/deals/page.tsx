import { DealsSection } from "@/components/DealsSection";
import { dealsConfig } from "@/config/dealsConfig";

export default function DealsPage() {
  return (
    <>
      <header className="text-center px-4 py-10 bg-black text-white">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
          Grab{" "}
          <span className="text-purple-500 drop-shadow-[0_0_5px_rgba(168,85,247,1)]">
            Free Game Deals
          </span>{" "}
          Before They&apos;re Gone!
        </h1>
      </header>

      <main className=" relative h-auto px-18 py-12   text-white">
        {/* Placeholder for dynamic list */}
        {/* Replace this with <Suspense> or your DealsList component later */}
        {/* <p className="text-purple-400 animate-pulse text-xl mt-10">
          🚀 Deals loading soon... Stay tuned!
        </p> */}

        <DealsSection
          title={dealsConfig.epic.title}
          games={dealsConfig.epic.games}
          colorConfig={dealsConfig.epic.colorConfig}
        />
      </main>
    </>
  );
}
