export const ROUND_TIME = 10; // 10 seconds per round
export const TIME_BONUS = 1.5; // Time bonus for correct neighborhood
export const MAX_DISTANCE_METERS = 2000; // Maximum distance considered for scoring

export const getProgressBarColor = (timeLeft: number): string => {
  const percentage = (timeLeft / ROUND_TIME) * 100;
  if (percentage > 60) return '#00FF66';
  if (percentage > 30) return '#FFD700';
  return '#FF4444';
};

export const getFeedbackMessage = (distance: number): string => {
  if (distance < 10) return "Perfeito! Você é entende dos bairros!";
  if (distance < 30) return "Impressionante! Você é tão santista que até o peixe te respeita!";
  if (distance < 50) return "Brabo! Você é mais santista que pastel de vento da feira!";
  if (distance < 100) return "Muito bom!";
  if (distance < 300) return "Muito bom! Você já é praticamente um guia turístico de Santos!";
  if (distance < 500) return "Legal! Manja mais muita gente!";
  if (distance < 1000) return "Tá quase lá! Mais um pouco e você já vira morador de Santos!";
  if (distance < 1500) return "Eita! Tá mais perdido que turista no mercado do peixe!";
  if (distance < 2000) return "Vish! Tá mais perdido que doido na Ponta da Praia!";
  return "Olha... errou só por mais de dois quilômetros, sabe nada!";
};

export const FASE_1_BAIRROS = [
  // Orla
  "Gonzaga",
  "Ponta da Praia",
  "José Menino",
  "Embaré",
  "Aparecida",
  "Boqueirão",
  
  // Região Central e Histórica
  "Centro",
  "Valongo",
  "Paquetá",
  "Vila Nova",
  
  // Região Intermediária
  "Vila Mathias",
  "Campo Grande",
  "Marapé",
  "Vila Belmiro",
  "Encruzilhada",
  "Macuco",
  "Estuário",
  
  // Zona Noroeste mais conhecida
  "Rádio Clube",
  "Castelo",
  "Areia Branca",
  
  // Morros mais conhecidos
  "Morro do José Menino",
  "Morro da Nova Cintra",
  "Morro do Marapé",
  "Morro da Penha"
];
