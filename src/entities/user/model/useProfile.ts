import {useState, useEffect} from 'react';
import {supabase} from '../../../shared/api/supabase';
import {userApi} from '../api/userApi';
import {Profile} from './types';
import {Alert} from "react-native";

export const useProfile = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);

    const fetchProfile = async () => {
        try {
            setIsLoadingProfile(true);
            const data = await supabase.auth.getUser();
            if (data.data.user?.id) {
                const profileData = await userApi.getProfile(data.data.user?.id);
                setProfile(profileData.data as Profile);
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            setIsLoadingProfile(false);
        }
    };

    const updateProfile = async (newData: Partial<Profile>) => {
        if (!profile?.id) return {error: 'No profile id'};
        const {error} = await userApi.updateProfile(profile.id, newData);
        console.log(error)
        if (!error) {
            setProfile(prev => prev ? {...prev, ...newData} : null);
        }
        return {error};
    };

    return {profile, isLoadingProfile,setIsLoadingProfile, updateProfile, refreshProfile: fetchProfile};
};
