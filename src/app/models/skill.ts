export interface Skill {
  id: number;
  name: string;
  category: 'technical' | 'soft' | 'tool';
  subcategory: string | null;
  proficiency: number | null;
  icon: string | null;
  description: string | null;
  featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  proficiency_label?: string | null;
}
