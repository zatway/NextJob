import React, { useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import {supabase} from "../api/supabase";

interface AuthContextProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthContextProps) {
    const segments = useSegments();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            handleRouting(session);
            setIsLoading(false);
        };

        checkInitialSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            handleRouting(session);
        });

        return () => subscription.unsubscribe();
    }, [segments]);

    const handleRouting = (session: any) => {
        const inAuthGroup = segments[0] === '(auth)';

        if (session && inAuthGroup) {
            router.replace('/(main)');
        } else if (!session && !inAuthGroup) {
            router.replace('/(auth)/login');
        }
    };

    if (isLoading) {
        return null;
    }

    return <>{children}</>;
}
