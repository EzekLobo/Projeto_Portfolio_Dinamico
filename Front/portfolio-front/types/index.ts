export interface Perfil {
  nome: string;
  cargo: string;
  bio: string;
  email: string;
  linkedin: string;
  github: string;
  foto: string;
  cv: string;
}

export interface Experiencia {
  id: number;
  empresa: string;
  cargo: string;
  descricao: string;
  tecnologias_usadas: string;
  data_inicio: string;
  data_fim?: string;
  atual: boolean;
}

export interface Projeto {
  id: number;
  titulo: string;
  descricao: string;
  tecnologia: string;
  capa: string;
  link_github: string;
}
export interface LeituraAmbiente {
  id: number;
  dispositivo: string;
  temperatura: number;
  umidade: number;
  data_criacao: string; // O Django envia como string ISO
}

export interface ControleDispositivo {
  id: number;
  dispositivo: string;
  ultima_mensagem: string;
  status_pendente: boolean;
}

export interface RespostaChecarOi {
  tem_oi: boolean;
  total: number;
  mensagens: string[];
}