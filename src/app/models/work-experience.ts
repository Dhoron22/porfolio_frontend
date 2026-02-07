export interface WorkExperience {
  id: number;
  company: string;
  position: string;
  description: string;
  location: string | null;
  start_date: string;
  end_date: string | null;
  current: boolean;
  responsabilities: string[] | null;
  reference_name: string | null;
  reference_phone: string | null;
  order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  period?: string;
  duration_in_months?: number;
}
