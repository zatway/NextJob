export interface Profile {
    id: string;
    full_name: string | null;
    phone: string | null;
    birth_date: string | null;
    avatar_url?: string;
}

export interface Resume {
    id: string;
    user_id: string;
    title: string;
    about: string;
    skills: string[];
    created_at: string;
}
