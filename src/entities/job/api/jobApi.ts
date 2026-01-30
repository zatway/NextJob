import { supabase } from '../../../shared/api/supabase';
import {Job} from "../model/types";
import {PostgrestSingleResponse} from "@supabase/supabase-js";

export const jobApi = {
    async getJobs() {
        return supabase.from('jobs').select('*').order('created_at', { ascending: false });
    },
    async getJobById(id: string) {
        return supabase.from('jobs').select('*').eq('id', id).single();
    }
};
