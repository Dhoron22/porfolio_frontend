export interface Language {
  id: number;
  name:string;
  proficiency: string;
  level_code: string | null;
  description: string | null;
  order: number;
  created_at: string;
  updated_at: string;
  flag_emoji?: string;
}
