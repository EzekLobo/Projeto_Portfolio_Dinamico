import { Perfil, Experiencia, Projeto, LeituraAmbiente } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL 
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1` 
  : 'https://ezeklobo.pythonanywhere.com/api/v1';

/**
 * Busca os dados do perfil (Tratamento para objeto único)
 */
export async function getPerfil(): Promise<Perfil> {
  const res = await fetch(`${API_URL}/perfil/`, { 
    next: { revalidate: 0 }, 
    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) throw new Error(`Falha ao carregar perfil: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}

/**
 * Busca a lista de experiências profissionais
 */
export async function getExperiencias(): Promise<Experiencia[]> {
  const res = await fetch(`${API_URL}/experiencias/`, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error("Erro ao carregar experiências");
  return res.json();
}

/**
 * Busca a lista de projetos
 */
export async function getProjetos(): Promise<Projeto[]> {
  const res = await fetch(`${API_URL}/projetos/`, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error("Erro ao carregar projetos");
  return res.json();
}

/**
 * IOT: Busca a última leitura de temperatura/umidade
 * Usado pelo componente IotStatus no Footer
 */
export async function getUltimaLeitura(): Promise<LeituraAmbiente | null> {
  try {
    const res = await fetch(`${API_URL}/leitura-ambiente/`, { 
      cache: 'no-store' 
    });
    if (!res.ok) return null;
    
    const data = await res.json();
    // Retorna a leitura mais recente (índice 0 da lista ordenada no Django)
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error("Erro ao buscar telemetria IoT:", error);
    return null;
  }
}

/**
 * IOT: Envia um "Oi" para o hardware (Pico W)
 */
export async function enviarMensagemHardware(nome: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/controle-dispositivo/solicitar_oi/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        nome: nome, 
        dispositivo: 'pico_w_01' 
      }),
    });
    return res.ok;
  } catch (error) {
    console.error("Erro ao enviar mensagem para hardware:", error);
    return false;
  }
}