"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Projeto } from "@/types";

// URL base do seu backend para as imagens
const BASE_URL = "https://ezeklobo.pythonanywhere.com";

export default function ProjectSlider({ projetos = [] }: { projetos: Projeto[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const items = [...projetos, ...projetos];
  const initialMiddleIndex = Math.floor(items.length / 2);
  const [activeIndex, setActiveIndex] = useState(initialMiddleIndex);

  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  
  const hasDragged = useRef(false);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const children = Array.from(slider.children) as HTMLElement[];
    
    const middleChild = children[initialMiddleIndex];
    if (middleChild) {
      const centerPosition = 
        middleChild.offsetLeft - 
        slider.offsetWidth / 2 + 
        middleChild.offsetWidth / 2;
        
      slider.scrollLeft = centerPosition;
    }

    const handleScroll = () => {
      const sliderCenter = slider.scrollLeft + slider.offsetWidth / 2;

      let closest = 0;
      let closestDistance = Infinity;

      children.forEach((child, index) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(sliderCenter - childCenter);

        if (distance < closestDistance) {
          closest = index;
          closestDistance = distance;
        }
      });

      setActiveIndex(closest);
    };

    handleScroll();
    
    slider.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      slider.removeEventListener("scroll", handleScroll);
    };
  }, [projetos.length, initialMiddleIndex]);

  const scrollByAmount = (dir: "left" | "right") => {
    const slider = sliderRef.current;
    if (!slider) return;

    const firstCard = slider.children[0] as HTMLElement;
    const gap = 32;
    const amount = firstCard.offsetWidth + gap;

    slider.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    hasDragged.current = false; 
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; 
    
    if (Math.abs(walk) > 5) {
      hasDragged.current = true;
    }
    
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  if (!projetos.length) return null;

  return (
    // pb-24 garante que o card não seja cortado embaixo no mobile
    <div className="relative w-full pt-4 pb-24 overflow-hidden select-none">

      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-10" />

      {/* Botão Esquerdo posicionado mais acima (top-[40%]) */}
      <button
        onClick={() => scrollByAmount("left")}
        className="absolute left-4 md:left-6 top-[40%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-2xl hover:bg-red-600 hover:scale-110 transition-all duration-300 shadow-lg"
      >
        ‹
      </button>

      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex items-center py-8 gap-8 overflow-x-auto overflow-y-hidden no-scrollbar px-[15vw] md:px-[25vw] ${
          isDragging 
            ? "cursor-grabbing" 
            : "cursor-grab scroll-smooth snap-x snap-mandatory"
        }`}
      >
        {items.map((projeto, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={index}
              className="snap-center transition-all duration-500"
              style={{
                transform: isActive ? "scale(1.05)" : "scale(0.85)",
                opacity: isActive ? 1 : 0.5,
              }}
            >
              <ProjectCard 
                projeto={projeto} 
                isActive={isActive} 
                isDragging={isDragging}
                onCardClick={() => {
                  if (!hasDragged.current) {
                    return true;
                  }
                  return false;
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Botão Direito posicionado mais acima (top-[40%]) */}
      <button
        onClick={() => scrollByAmount("right")}
        className="absolute right-4 md:right-6 top-[40%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-2xl hover:bg-red-600 hover:scale-110 transition-all duration-300 shadow-lg"
      >
        ›
      </button>
    </div>
  );
}

function ProjectCard({
  projeto,
  isActive,
  isDragging,
  onCardClick,
}: {
  projeto: Projeto;
  isActive: boolean;
  isDragging?: boolean;
  onCardClick: () => boolean;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const capaUrl = projeto.capa 
    ? (projeto.capa.startsWith('http') ? projeto.capa : `${BASE_URL}${projeto.capa}`)
    : null;

  return (
    <div
      className="shrink-0 w-[75vw] md:w-96 h-[420px] [perspective:1000px] cursor-pointer"
      onMouseEnter={() => !isDragging && isActive && setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => {
        if (isActive && onCardClick()) {
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 pointer-events-none md:pointer-events-auto"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRENTE */}
        <div
          className="absolute inset-0 bg-[#0F0F0F] rounded-3xl overflow-hidden border border-white/10 shadow-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="h-52 relative bg-gray-900 pointer-events-none">
            {capaUrl && (
              <Image
                src={capaUrl}
                alt={projeto.titulo}
                fill
                unoptimized
                className="object-cover"
                draggable={false}
              />
            )}
          </div>

          <div className="p-6 pointer-events-none">
            <h3 className="text-xl font-bold text-white">
              {projeto.titulo}
            </h3>

            <p className="text-gray-400 text-sm mt-2 line-clamp-2 md:line-clamp-3">
              {projeto.descricao}
            </p>

            <div className="flex gap-2 flex-wrap mt-4">
              {projeto.tecnologia?.split(",").map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] md:text-xs bg-red-500/10 text-red-400 px-3 py-1 rounded-full border border-red-500/20"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* VERSO */}
        <div
          className="absolute inset-0 bg-[#1A1A1A] rounded-3xl p-8 border border-red-500/30 flex flex-col justify-between items-center text-center shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div>
            <h3 className="text-lg font-bold text-red-500 mb-4 italic">
              Sobre o Projeto
            </h3>
            <p className="text-gray-200 text-xs md:text-sm leading-relaxed pointer-events-none">
              {projeto.descricao}
            </p>
          </div>

          <a
            href={projeto.link_github || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700 transition-colors cursor-pointer"
            onPointerDown={(e) => e.stopPropagation()}
            draggable={false}
          >
            Acessar Repositório
          </a>
        </div>
      </div>
    </div>
  );
}