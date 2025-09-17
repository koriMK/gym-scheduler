export interface Trainer {
  id: number;
  name: string;
  bio: string;
  specialization: string;
  phone_number: string;
}

export interface Trainee {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  age: number;
}

export interface Session {
  id: number;
  day: string;
  activity: string;
  trainer_id: number;
  trainee_id: number;
}