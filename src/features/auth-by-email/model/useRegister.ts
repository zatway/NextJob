import { useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../../../shared/api/supabase';
import {Profile} from "../../../entities/user/model/types";
import {validateAge} from "../../../shared/utils/dateUtils";

export const useRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!email || !password || !fullName) {
            Alert.alert('Ошибка', 'Почта, пароль и ФИО обязательны');
            return;
        }

        if (!validateAge(birthday)) {
            Alert.alert('Ошибка', 'Регистрация доступна только лицам старше 16 лет');
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
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            Alert.alert('Ошибка авторизации', error.message);
            setLoading(false);
            return;
        }

        if (authData.user) {
            const isoDate = new Date(birthday).toISOString().split('T')[0];

            const profileData = {
                user_id: authData.user.id,
                full_name: fullName,
                phone: phone,
                birth_date: isoDate,
            }

            const { error: profileError } = await supabase
                .from('profiles')
                .upsert(profileData, { onConflict: 'user_id' });

            if (profileError) {
                console.log('DEBUG PROFILE ERROR:', JSON.stringify(profileError, null, 2));
                Alert.alert('Ошибка БД', profileError.message);
            } else {
                Alert.alert('Успех', 'Профиль создан успешно!');
            }
        }

        setLoading(false);
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
