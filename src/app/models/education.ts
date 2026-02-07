export interface Education {
  id: number;
  institution: string;
  degree: string;
  field_of_study: string | null;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  current: boolean;
  status: 'completed' | 'in_progress' | 'paused';
  certificate_url: string | null;
  location: string | null;
  order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  period?: string;
}
