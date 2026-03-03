import { Perfil, Experiencia, Projeto } from "@/types";

// Note o /v1 incluído conforme o seu urls.py do projeto
const API_URL = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1` : 'http://127.0.0.1:8000/api/v1';

/**
 * Busca os dados do perfil.
 * Tratamos o retorno caso o Django envie um array [ {} ] 
 * ou um objeto direto {}.
 */
export async function getPerfil(): Promise<Perfil> {
  const res = await fetch(`${API_URL}/perfil/`, { 
    next: { revalidate: 0 }, 
    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Erro no Django:", errorText);
    throw new Error(`Falha ao carregar perfil: ${res.status}`);
  }

  const data = await res.json();
  
  // Se o ViewSet retornar uma lista, pegamos o primeiro objeto
  return Array.isArray(data) ? data[0] : data;
}

/**
 * Busca a lista de experiências profissionais
 */
export async function getExperiencias(): Promise<Experiencia[]> {
  const res = await fetch(`${API_URL}/experiencias/`, { 
    next: { revalidate: 0 } 
  });

  if (!res.ok) throw new Error("Erro ao carregar experiências");
  
  return res.json();
}


export async function getProjetos(): Promise<Projeto[]> {
  const res = await fetch(`${API_URL}/projetos/`, { 
    next: { revalidate: 0 } 
  });

  if (!res.ok) throw new Error("Erro ao carregar projetos");
  
  return res.json();
}