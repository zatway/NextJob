import React from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {Colors, Spacing} from '../../../shared/lib/theme';
import {LoginForm} from "../../../features/auth-by-email/ui/LoginForm";

export const LoginPage = () => {
    const router = useRouter();

    return (
        <View style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>С возвращением!</Text>
                        <Text style={styles.subtitle}>Войдите в профиль, чтобы продолжить</Text>
                    </View>

                    <LoginForm />

                    <TouchableOpacity
                        style={styles.footer}
                        onPress={() => router.push('/(auth)/register')}
                    >
                        <Text style={styles.footerText}>
                            Нет аккаунта? <Text style={styles.link}>Зарегистрироваться</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    container: { flex: 1 },
    content: {
        flex: 1,
        paddingHorizontal: Spacing.m,
        justifyContent: 'center',
    },
    header: { marginBottom: Spacing.xl },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.textMain,
        marginBottom: Spacing.s,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
    },
    footer: {
        alignItems: 'center',
    },
    footerText: {
        color: Colors.textSecondary,
        fontSize: 14,
    },
    link: {
        color: Colors.primary,
        fontWeight: '600',
    },
});
