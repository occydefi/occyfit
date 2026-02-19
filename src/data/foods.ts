export interface FoodItem {
  name: string;
  calories: number; // per 100g
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  unit: string;
  defaultGrams: number;
}

export const FOODS: Record<string, FoodItem> = {
  banana: { name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, unit: 'unidade média', defaultGrams: 120 },
  mamao: { name: 'Mamão', calories: 43, protein: 0.5, carbs: 11, fat: 0.3, fiber: 1.8, unit: 'fatia', defaultGrams: 150 },
  abacate: { name: 'Abacate', calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7, unit: 'metade', defaultGrams: 100 },
  kiwi: { name: 'Kiwi', calories: 61, protein: 1.1, carbs: 15, fat: 0.5, fiber: 3, unit: 'unidade', defaultGrams: 80 },
  maca: { name: 'Maçã', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, unit: 'unidade', defaultGrams: 150 },
  morango: { name: 'Morango', calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, fiber: 2, unit: 'xícara', defaultGrams: 150 },
  aveia: { name: 'Aveia', calories: 389, protein: 17, carbs: 66, fat: 7, fiber: 11, unit: 'col. sopa', defaultGrams: 30 },
  chia: { name: 'Semente de Chia', calories: 486, protein: 17, carbs: 42, fat: 31, fiber: 34, unit: 'col. sopa', defaultGrams: 15 },
  linhaca: { name: 'Linhaça', calories: 534, protein: 18, carbs: 29, fat: 42, fiber: 27, unit: 'col. sopa', defaultGrams: 15 },
  girassol: { name: 'Semente de Girassol', calories: 584, protein: 21, carbs: 20, fat: 51, fiber: 9, unit: 'col. sopa', defaultGrams: 15 },
  castanha_para: { name: 'Castanha do Pará', calories: 659, protein: 14, carbs: 12, fat: 67, fiber: 8, unit: 'unidade', defaultGrams: 5 },
  castanha_caju: { name: 'Castanha de Caju', calories: 553, protein: 18, carbs: 30, fat: 44, fiber: 3, unit: 'punhado', defaultGrams: 30 },
  amendoa: { name: 'Amêndoa', calories: 579, protein: 21, carbs: 22, fat: 50, fiber: 13, unit: 'punhado', defaultGrams: 28 },
  nozes: { name: 'Nozes', calories: 654, protein: 15, carbs: 14, fat: 65, fiber: 7, unit: 'punhado', defaultGrams: 28 },
  ovo: { name: 'Ovo', calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, unit: 'unidade', defaultGrams: 60 },
  frango: { name: 'Frango (peito)', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, unit: 'porção', defaultGrams: 150 },
  ricota: { name: 'Ricota', calories: 174, protein: 11, carbs: 3, fat: 13, fiber: 0, unit: 'col. sopa', defaultGrams: 50 },
  queijo_minas: { name: 'Queijo Minas', calories: 264, protein: 18, carbs: 3.4, fat: 20, fiber: 0, unit: 'fatia', defaultGrams: 30 },
  arroz_integral: { name: 'Arroz Integral', calories: 123, protein: 2.7, carbs: 26, fat: 0.9, fiber: 1.8, unit: 'col. sopa', defaultGrams: 100 },
  feijao: { name: 'Feijão', calories: 77, protein: 5.2, carbs: 14, fat: 0.5, fiber: 4.8, unit: 'col. sopa', defaultGrams: 80 },
  tapioca: { name: 'Tapioca', calories: 358, protein: 0.2, carbs: 88, fat: 0.3, fiber: 0.9, unit: 'unidade pequena', defaultGrams: 50 },
  iogurte_grego: { name: 'Iogurte Grego', calories: 97, protein: 9, carbs: 6, fat: 5, fiber: 0, unit: 'pote', defaultGrams: 170 },
  abobrinha: { name: 'Abobrinha', calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3, fiber: 1, unit: 'porção', defaultGrams: 100 },
  brocolis: { name: 'Brócolis', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6, unit: 'porção', defaultGrams: 100 },
  cenoura: { name: 'Cenoura', calories: 41, protein: 0.9, carbs: 10, fat: 0.2, fiber: 2.8, unit: 'unidade', defaultGrams: 80 },
  batata_doce: { name: 'Batata Doce', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3, unit: 'porção', defaultGrams: 100 },
  canela: { name: 'Canela', calories: 247, protein: 4, carbs: 81, fat: 1.2, fiber: 53, unit: 'pitada', defaultGrams: 2 },
  mel: { name: 'Mel', calories: 304, protein: 0.3, carbs: 82, fat: 0, fiber: 0.2, unit: 'col. chá', defaultGrams: 10 },
  cafe: { name: 'Café preto', calories: 2, protein: 0.3, carbs: 0, fat: 0, fiber: 0, unit: 'xícara', defaultGrams: 240 },
};

export const MEAL_PRESETS = {
  breakfast: {
    name: 'Café da Manhã Padrão',
    items: ['banana', 'mamao', 'aveia', 'chia', 'linhaca', 'castanha_para', 'ovo', 'cafe'],
  },
  lunch: {
    name: 'Almoço Balanceado',
    items: ['frango', 'arroz_integral', 'feijao', 'abobrinha', 'brocolis'],
  },
  dinner: {
    name: 'Jantar Leve',
    items: ['ovo', 'ricota', 'abobrinha', 'cenoura'],
  },
  snack: {
    name: 'Lanche',
    items: ['iogurte_grego', 'castanha_para', 'amendoa'],
  },
};
