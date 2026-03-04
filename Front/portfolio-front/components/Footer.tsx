import { Perfil } from "@/types";
import IotStatus from "./IotStatus";

export default function Footer({ perfil }: { perfil: Perfil }) {
  const nomeCompleto = perfil?.nome || "Ezequiel Lobo Oliveira";
  const anoAtual = new Date().getFullYear();

  return (
    <footer id="contact" className=" border-t border-white/5 text-center bg-brand-dark/50 backdrop-blur-md z-10 mt-auto relative">
      <div className="max-w-4xl mx-auto px-6">

        <IotStatus />

        <h2 className="text-2xl font-bold text-white mb-2">Vamos construir algo incrível?</h2>
        <p className="text-gray-400 mb-4 text-sm">Estou disponível para projetos e oportunidades.</p>
        
        

        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 text-sm font-mono text-gray-300 items-center">
          <a 
            href={`mailto:${perfil?.email || 'ezeklobo.dev@gmail.com'}`}
            className="flex items-center gap-2 px-4 py-2 rounded bg-white/5 border border-white/5 hover:border-brand-red/50 hover:text-white transition-colors"
          >
            <span>✉</span> {perfil?.email || "ezeklobo.dev@gmail.com"}
          </a>
          <span className="flex items-center gap-2 px-4 py-2 rounded bg-white/5 border border-white/5">
            <span>📱</span> (73) 99168-8956
          </span>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5">
          <p className="text-gray-600 text-xs">
            © {anoAtual} {nomeCompleto}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}