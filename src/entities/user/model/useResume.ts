import {useState, useEffect} from 'react';
import {userApi} from '../api/userApi';
import {Profile, Resume} from './types';

export const useResume = (profile: Profile | null) => {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [isLoadingResume, setIsLoadingResume] = useState(true);

    const fetchResumes = async () => {
        try {
            setIsLoadingResume(true);
            if (profile) {
                const data = await userApi.getMyResumes(profile.user_id);
                if (data.data) {
                    setResumes(data.data);
                }
            }
            else setResumes([])
        } catch (error) {
            console.error('Error loading resumes:', error);
        } finally {
            setIsLoadingResume(false);
        }
    };

    useEffect(() => {
        void fetchResumes();
    }, [profile]);

    return {resumes, isLoadingResume, refreshResume: fetchResumes};
};
