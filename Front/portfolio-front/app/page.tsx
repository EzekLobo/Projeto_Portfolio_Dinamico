import { getPerfil, getExperiencias, getProjetos } from "@/services/api";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import ProjectSlider from "@/components/ProjectSlider";
import Footer from "@/components/Footer";

// Força a revalidação dos dados a cada solicitação em desenvolvimento
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Chamadas em paralelo para performance máxima (SSR)
  const [perfil, experiencias, projetos] = await Promise.all([
    getPerfil(),
    getExperiencias(),
    getProjetos(),
  ]);

  return (
    <main className="bg-brand-dark text-white min-h-screen relative overflow-x-hidden flex flex-col">
      
      {/* 1. Background fixo (Grid e Gradiente) */}
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-brand-dark/80 to-brand-dark pointer-events-none z-0" />
      
      {/* 2. Navegação */}
      <Navbar />
      
      {/* 3. Conteúdo Principal */}
      <div className="relative z-10 flex-grow">
        
        {/* Hero Section */}
        <Hero perfil={perfil} />
        
        {/* Professional Experience Section */}
        <Experience experiencias={experiencias} />
        
        {/* Projects Carousel Section */}
        <section id="projects" className="border-t border-white/5 overflow-hidden bg-black/20">
           <div className="max-w-7xl mx-auto px-6 mb-8 text-left relative z-20">
              <h2 className="text-3xl font-bold mb-2">
                Meus <span className="text-brand-red">Projetos</span>
              </h2>
              <div className="h-1 w-12 bg-brand-red rounded"></div>
           </div>
           
           {/* Slider com Framer Motion (Client Component) */}
           <ProjectSlider projetos={projetos} />
        </section>

      </div>

      {/* 4. Rodapé Dinâmico */}
      <Footer perfil={perfil} />
      
    </main>
  );
}