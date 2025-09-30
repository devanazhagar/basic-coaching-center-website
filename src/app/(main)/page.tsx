import Hero from './_components/hero';
import Stats from './_components/stats';
import FeaturedCourses from './_components/featured-courses';
import Testimonials from './_components/testimonials';
import CtaSection from './_components/cta-section';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedCourses />
      <Testimonials />
      <CtaSection />
    </>
  );
}
