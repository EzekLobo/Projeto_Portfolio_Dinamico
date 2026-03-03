import { Experiencia } from "@/types";

export default function Experience({ experiencias }: { experiencias: Experiencia[] }) {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold">
            Experiência <span className="text-brand-red">Profissional</span>
          </h2>
          <div className="h-1 w-20 bg-brand-red rounded mt-4"></div>
        </div>

        <div className="space-y-12 border-l-2 border-white/10 ml-3 pl-8 relative">
          {experiencias?.map((exp) => (
            <div key={exp.id} className="relative group">

              <span className="absolute -left-[41px] top-2 w-5 h-5 rounded-full bg-brand-red border-4 border-brand-dark group-hover:scale-125 transition-all" />
              
              <h3 className="text-xl font-bold text-white group-hover:text-brand-red transition-colors">
                {exp.cargo}
              </h3>

              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1 mb-3">
                <span className="text-gray-300 font-semibold text-sm">
                  {exp.empresa}
                </span>
                <span className="hidden sm:block text-gray-600">•</span>
                <p className="text-brand-red font-mono text-xs uppercase tracking-wider">
                  {exp.data_inicio} — {exp.atual ? 'Atual' : exp.data_fim}
                </p>
              </div>
              
              <div className="bg-white/5 p-4 rounded-lg border border-white/5 mb-4 shadow-sm">
                <p className="text-gray-400 text-sm leading-relaxed">
                  {exp.descricao}
                </p>
              </div>

              <div className="flex gap-2 flex-wrap">
                {exp.tecnologias_usadas && exp.tecnologias_usadas.split(',').map((tech) => (
                  <span 
                    key={tech} 
                    className="text-[10px] border border-white/10 px-2 py-1 rounded text-gray-500 uppercase font-medium hover:border-brand-red/30 hover:text-gray-300 transition-colors"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}