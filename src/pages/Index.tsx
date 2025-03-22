
import Hero from "@/components/home/Hero";
import ServiceSchedule from "@/components/home/ServiceSchedule";
import FeaturedSermon from "@/components/home/FeaturedSermon";
import Testimonials from "@/components/home/Testimonials";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import DailyVerse from "@/components/home/DailyVerse";
import QuickLinks from "@/components/home/QuickLinks";
import Layout from "@/components/layout/Layout";

export default function Index() {
  return (
    <Layout>
      <Hero />
      <ServiceSchedule />
      <FeaturedSermon />
      <Testimonials />
      <UpcomingEvents />
      <DailyVerse />
      <QuickLinks />
    </Layout>
  );
}
