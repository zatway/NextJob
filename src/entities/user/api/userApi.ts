import { supabase } from '../../../shared/api/supabase';
import {Profile} from "../models/types";

export const userApi = {
    async getProfile(id: string) {
        return supabase.from('profiles').select('*').eq('id', id).single();
    },
    async updateProfile(id: string, data: Partial<Profile>) {
        return supabase.from('profiles').update(data).eq('id', id);
    },
    async getMyResumes(userId: string) {
        return supabase.from('resumes').select('*').eq('user_id', userId);
    }
};
