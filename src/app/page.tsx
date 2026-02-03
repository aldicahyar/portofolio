import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/sections/footer";
import { MatrixRain } from "@/components/ui/matrix-rain";
import { CircuitLines } from "@/components/ui/circuit-lines";
import { DataStream } from "@/components/ui/data-stream";
import { ScrollToTop } from "@/components/utils/scroll-to-top";

export default function Home() {
  return (
    <>
      <ScrollToTop />
      <main id="main-content" className="relative md:ml-[72px] focus:outline-none" tabIndex={-1}>
        <HeroSection />
        
        {/* About Section - Matrix Rain Background */}
        <section id="about" className="relative min-h-screen flex flex-col justify-start overflow-hidden pt-16 pb-24 scroll-mt-0">
          <MatrixRain />
          <AboutSection />
        </section>

        {/* Experience Section */}
        <ExperienceSection />
        
        {/* Projects Section - Circuit Lines Background */}
        <section id="projects" className="relative min-h-screen flex flex-col justify-start overflow-hidden pt-16 pb-24 scroll-mt-0">
          <CircuitLines />
          <ProjectsSection />
        </section>
        
        {/* Contact Section - Data Stream Background */}
        <section id="contact" className="relative min-h-screen flex flex-col justify-start overflow-hidden pt-16 pb-24 scroll-mt-0">
          <DataStream />
          <ContactSection />
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
