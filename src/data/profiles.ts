export interface UserProfile {
  name: string;
  age: number;
  heightCm: number;
  weightKg: number;
  goal: 'emagrecer' | 'manter' | 'ganhar_massa';
  activityLevel: 'sedentario' | 'leve' | 'moderado' | 'ativo';
}

export function calculateTDEE(profile: UserProfile): number {
  // Mifflin-St Jeor
  const bmr = 10 * profile.weightKg + 6.25 * profile.heightCm - 5 * profile.age - 161;
  const activityMultiplier = {
    sedentario: 1.2,
    leve: 1.375,
    moderado: 1.55,
    ativo: 1.725,
  }[profile.activityLevel];
  return Math.round(bmr * activityMultiplier);
}

export function calculateGoalCalories(profile: UserProfile): number {
  const tdee = calculateTDEE(profile);
  if (profile.goal === 'emagrecer') return tdee - 350;
  if (profile.goal === 'ganhar_massa') return tdee + 300;
  return tdee;
}

export function calculateProteinGoal(profile: UserProfile): number {
  return Math.round(profile.weightKg * 1.8);
}

export const DEFAULT_PROFILES: Record<string, UserProfile> = {
  roberta: {
    name: 'Roberta',
    age: 41,
    heightCm: 162,
    weightKg: 56,
    goal: 'emagrecer',
    activityLevel: 'moderado',
  },
  luiz: {
    name: 'Luiz',
    age: 38,
    heightCm: 175,
    weightKg: 78,
    goal: 'manter',
    activityLevel: 'moderado',
  },
};
