import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import ProofWall from "@/components/ProofWall";

export const metadata: Metadata = {
  title: "Proof Wall",
  description:
    "Every public repository read as a case file: the problem, the approach, how it was validated, and what it taught.",
};

export default function ProofWallPage() {
  return (
    <div className="mx-auto max-w-deck px-6 pb-16 pt-9">
      <SectionHeader
        eyebrow="06 · PROOF WALL"
        title="Evidence, not claims"
        intro="Every public repository, read as a case file: the problem it solves, the approach taken, how it was validated, and what it taught. Shipped repos link to source; planned ones show the intended method, not invented results."
      />
      <ProofWall />
    </div>
  );
}
