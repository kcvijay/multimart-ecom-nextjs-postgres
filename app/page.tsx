import About from '@/app/ui/mainComponents/About';
import BestSellers from '@/app/ui/home/BestSellers';
import Hero from '@/app/ui/home/Hero';
import Testimonials from '@/app/ui/home/Testimonials';

export default async function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Testimonials />
    </main>
  );
}
