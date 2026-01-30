export interface Job {
    id: string;
    title: string;
    company_name: string;
    salary_from: number;
    salary_to: number;
    address: string;
    description: string;
    responsibilities: string[];
    skills: string[];
    created_at: string;
}
