import { useState, useEffect } from 'react';
import { jobApi } from '../api/jobApi';
import { Job } from './types';

export const useJob = (id: string | undefined) => {
    const [job, setJob] = useState<Job | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJob = async () => {
            if (!id) return;
            try {
                setIsLoading(true);
                const { data, error: apiError } = await jobApi.getJobById(id);
                if (apiError) throw apiError;
                setJob(data as Job);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    return { job, isLoading, error };
};
