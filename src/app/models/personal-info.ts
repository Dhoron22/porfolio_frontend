export interface PersonalInfo {
  id: number;
  nombre_completo: string;
  titulo: string;
  bio: string;
  location: string;
  phone: string;
  email: string;
  github_url: string | null;
  linkedin_url: string | null;
  age: number | null;
  profile_image: string | null;
  created_at: string;
  updated_at: string;
  first_name?: string;
  initials?: string;
}
