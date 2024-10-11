import {
  Features,
  GetStartedSection,
  Hero,
  MarketingLayout,
} from "@/components/layout/marketing-layout";

export default function Page() {
  return (
    <MarketingLayout>
      <Hero />
      <Features />
      <GetStartedSection />
    </MarketingLayout>
  );
}