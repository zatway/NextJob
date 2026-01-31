export interface Profile {
    id?: string;
    user_id: string;
    full_name: string | null;
    phone: string | null;
    birth_date: string | null;
    avatar_url?: string;
}

export interface Resume {
    id: string;
    user_id: string;
    title: string;
    about: string | null;
    skills: string[];
    views_count: number;
    appearances_count: number;
    created_at: string;
    updated_at: string;
}
