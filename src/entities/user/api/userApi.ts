import { supabase } from '../../../shared/api/supabase';
import {Profile, Resume} from "../model/types";

export const userApi = {
    async getProfile(id: string) {
        return supabase.from('profiles').select('*').eq('user_id', id).single();
    },
    async updateProfile(id: string, data: Partial<Profile>) {
        return supabase.from('profiles').update(data).eq('id', id);
    },
    async getMyResumes(userId: string) {
        return supabase.from('resumes').select('*').eq('user_id', userId);
    },
    async saveResume(resume: Partial<Resume>) {
        return supabase
            .from('resumes')
            .upsert(resume)
            .select()
            .single();
    },
    async deleteResume(resumeId: string) {
        return supabase
            .from('resumes')
            .delete()
            .eq('id', resumeId);
    }
};
