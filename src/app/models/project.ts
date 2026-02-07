export interface Project {
    id: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    status:string;
    type: string;
    image: string | null;
    url_demo: string | null;
    url_github: string | null;
    technologies: string[];
    featured: boolean;
    order: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    is_current?: boolean;
    period?: string;
    duration_in_months?: number;
}
