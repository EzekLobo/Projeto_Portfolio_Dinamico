"use client";

import { useState, useEffect } from "react";

export default function IotStatus() {
  const [dados, setDados] = useState({ temperatura: 0, umidade: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [nome, setNome] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    setIsMounted(true); 

    const fetchDados = async () => {
      try {
        const res = await fetch("https://ezeklobo.pythonanywhere.com/api/v1/leitura-ambiente/");
        const json = await res.json();
        if (json && json.length > 0) setDados(json[0]);
      } catch (e) {
        console.error("Erro IoT:", e);
      }
    };

    fetchDados();
    const interval = setInterval(fetchDados, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || enviando) return;
    setEnviando(true);
    try {
      await fetch("https://ezeklobo.pythonanywhere.com/api/v1/controle-dispositivo/solicitar_oi/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, dispositivo: "pico_w_01" }),
      });
      setNome("");
      alert("Oi enviado para o hardware!");
    } catch {
      alert("Erro ao enviar.");
    } finally {
      setEnviando(false);
    }
  };

  if (!isMounted) return <div className="py-10" />; 

  return (
    <div className="flex flex-col gap-6 w-full py-6 border-y border-white/5 my-8">
      <div className="flex justify-center items-center gap-8 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
          <span className="text-gray-500 uppercase tracking-widest">Lab Status:</span>
        </div>
        <div className="flex gap-4">
          <span className="text-white">TEMP <span className="text-brand-red font-bold">{dados.temperatura}°C</span></span>
          <span className="text-white">UMID <span className="text-brand-red font-bold">{dados.umidade}%</span></span>
        </div>
      </div>

      <form onSubmit={handleSend} className="flex flex-col sm:flex-row justify-center gap-3 px-4">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Mande um oi para o hardware..."
          className="bg-white/5 border border-white/10 rounded px-4 py-2 text-sm outline-none focus:border-brand-red/50 transition-all sm:w-64 text-center sm:text-left text-white"
        />
        <button
          disabled={enviando}
          className="px-6 py-2 rounded text-sm font-bold transition-all bg-brand-red hover:bg-red-700 text-white disabled:opacity-50"
        >
          {enviando ? "..." : "ENVIAR"}
        </button>
      </form>
    </div>
  );
}