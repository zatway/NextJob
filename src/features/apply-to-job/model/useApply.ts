import { useState, useEffect } from 'react';
import { supabase } from '../../../shared/api/supabase';

export const useApply = (jobId: string, userId?: string) => {
    const [hasApplied, setHasApplied] = useState(false);
    const [isApplying, setIsApplying] = useState(false);

    useEffect(() => {
        if (userId && jobId) checkStatus();
    }, [jobId, userId]);

    const checkStatus = async () => {
        const { data } = await supabase
            .from('applications')
            .select('id')
            .eq('job_id', jobId)
            .eq('user_id', userId)
            .single();
        if (data) setHasApplied(true);
    };

    const apply = async (resumeId: string) => {
        setIsApplying(true);
        try {
            // 1. Создаем отклик
            const { error: appError } = await supabase
                .from('applications')
                .insert({ job_id: jobId, resume_id: resumeId, user_id: userId });

            if (appError) throw appError;

            await supabase.rpc('increment_resume_appearances', { row_id: resumeId });

            setHasApplied(true);
            return { success: true };
        } catch (e) {
            return { success: false, error: e };
        } finally {
            setIsApplying(false);
        }
    };

    return { hasApplied, isApplying, apply };
};
