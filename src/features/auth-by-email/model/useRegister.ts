import { useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../../../shared/api/supabase';

export const useRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState(''); // Формат YYYY-MM-DD
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!email || !password || !fullName) {
            Alert.alert('Ошибка', 'Почта, пароль и ФИО обязательны');
            return;
        }

        setLoading(true);

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) {
            Alert.alert('Ошибка регистрации', authError.message);
            setLoading(false);
            return;
        }

        if (authData.user) {
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    full_name: fullName,
                    phone_text: phone,
                    birthday: birthday || null,
                    updated_at: new Date(),
                })
                .eq('id', authData.user.id);

            if (profileError) {
                console.error('Ошибка профиля:', profileError.message);
            }
        }

        setLoading(false);
        Alert.alert('Успех', 'Аккаунт создан! Подтвердите почту.');
    };

    return {
        email, setEmail,
        password, setPassword,
        fullName, setFullName,
        phone, setPhone,
        birthday, setBirthday,
        loading, handleRegister
    };
};
