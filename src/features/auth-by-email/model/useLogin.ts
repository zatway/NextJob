import { useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../../../shared/api/supabase';

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Ошибка', 'Введите почту и пароль');
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        setLoading(false);

        if (error) {
            Alert.alert('Ошибка входа', error.message);
        }
    };

    return { email, setEmail, password, setPassword, loading, handleLogin };
};
