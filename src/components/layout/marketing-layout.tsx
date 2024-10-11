"use client";

import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { siteConfig } from "@/constants";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronRight, Code, Database, Lock, Zap } from "lucide-react";
import Link from "next/link";
import { MarketingFooter } from "./marketing-footer";
import { MarketingHeader } from "./marketing-header";

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <IntroducingButton>Introducing {siteConfig.name}</IntroducingButton>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Your personal Reddit research app
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Explore any niche. Discover pain points, content opportunities, and what solutions
              people are eager to pay for.
            </p>
          </div>
          <div className="space-x-4">
            <Link href="/dashboard">
              <RainbowButton>Get Started</RainbowButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Features
        </h2>
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Ideate Startups</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Generate innovative startup ideas using AI-powered brainstorming tools and market
                trend analysis.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Code className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Validate Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Test and refine your product concepts with user feedback, market research, and
                prototype testing tools.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Database className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Find Sales Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Discover and qualify potential customers using our advanced lead generation and CRM
                integration features.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Why Choose Our Boilerplate?
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Our boilerplate combines the best of modern web development tools to give you a head
              start on your next project. Here's what makes it special:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-primary" />
                <span>Lightning-fast performance with Next.js</span>
              </li>
              <li className="flex items-center">
                <Code className="h-5 w-5 mr-2 text-primary" />
                <span>Beautiful, accessible UI with shadcn components</span>
              </li>
              <li className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-primary" />
                <span>Efficient data management with Drizzle ORM and Turso DB</span>
              </li>
              <li className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-primary" />
                <span>Secure authentication with Stack Auth</span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] rounded-full blur-3xl" />
              <div className="relative shadow-xl bg-gray-900 border border-gray-800 p-6 rounded-lg">
                <div className="space-y-2">
                  <div className="h-2 w-20 bg-gray-700 rounded" />
                  <div className="h-2 w-16 bg-gray-700 rounded" />
                  <div className="h-2 w-24 bg-gray-700 rounded" />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-2 w-full bg-gray-700 rounded" />
                  <div className="h-2 w-full bg-gray-700 rounded" />
                  <div className="h-2 w-3/4 bg-gray-700 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GetStartedSection() {
  return (
    <section id="get-started" className="w-full py-12 md:py-24 lg:py-32">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get Started Today</h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Start finding pain points, content opportunities, and what solutions people are eager
              to pay for.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/dashboard">
              Lets find that goldmine <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function IntroducingButton({ children }: { children: React.ReactNode }) {
  return (
    <AnimatedGradientText>
      🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
      <span
        className={cn(
          "inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent",
        )}
      >
        {children}
      </span>
      <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
    </AnimatedGradientText>
  );
}
