import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MyButton } from '../../../shared/ui/Button';
import { MyInput } from '../../../shared/ui/Input';
import { useLogin } from '../model/useLogin';
import { Spacing } from '../../../shared/lib/theme';

export const LoginForm = () => {
    const { email, setEmail, password, setPassword, loading, handleLogin } = useLogin();

    return (
        <View style={styles.form}>
            <MyInput
                label="Электронная почта"
                placeholder="example@mail.ru"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <MyInput
                label="Пароль"
                placeholder="Введите пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={styles.buttonWrapper}>
                <MyButton
                    title="Войти"
                    onPress={handleLogin}
                    loading={loading}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    form: { width: '100%' },
    buttonWrapper: { marginTop: Spacing.m },
});
