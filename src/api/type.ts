export interface User {
  id: string;
  nickname: string;
  height: string;
  weight: string;
}

export interface SignupState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface LoginPayload {
  id: string;
  password: string;
}
export interface ExerciseState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  exercise: Exercise[];
}

export type ExerciseDetail = {
  _id?: string;
  duration: string;
  type: EXERCISE_TYPE;
  force: EXERCISE_FORCE_TYPE;
};

export interface ExerciseList {
  currentPage: number;
  items: Exercise[];
  totalItems: number;
  totalPages: number;
}

export interface GetExercisePayload {
  userId: string;
  startDate?: string;
  endDate?: string;
}

export interface GetExerciseListPayload {
  userId: string;
  page: number;
  limit: number;
}

export interface PostExercisePayload {
  userId: string;
  date: string;
  totalDuration: string;
  isPT: string;
  detail: ExerciseDetail[];
}

export interface DeleteExerciseDetailPayload {
  exerciseId: string;
  detailIds: string[];
}

export interface Exercise {
  _id: string;
  date: string;
  totalDuration: string;
  isPT: string;
  detail: ExerciseDetail[];
}

export const EXERCISE_TYPE = {
  WEIGHT: 'weight',
  CARDIO: 'cardio',
} as const;
export type EXERCISE_TYPE = (typeof EXERCISE_TYPE)[keyof typeof EXERCISE_TYPE];

export const EXERCISE_FORCE_TYPE = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;
export type EXERCISE_FORCE_TYPE =
  (typeof EXERCISE_FORCE_TYPE)[keyof typeof EXERCISE_FORCE_TYPE];
