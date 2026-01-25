import React from 'react';
import {StyleSheet, View, Text, KeyboardAvoidingView, Platform, TouchableOpacity} from 'react-native';
import { RegisterForm } from '../../../features/auth-by-email/ui/RegisterForm';
import { Colors, Spacing } from '../../../shared/lib/theme';
import {useRouter} from "expo-router";

export const RegisterPage = () => {
    const router = useRouter();

    return (
        <View style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Регистрация</Text>
                        <Text style={styles.subtitle}>Создайте аккаунт, чтобы найти работу мечты</Text>
                    </View>

                    <RegisterForm />

                    <TouchableOpacity
                        style={styles.footer}
                        onPress={() => router.push('/(auth)/login')}
                    >
                        <Text style={styles.footerText}>
                            Есть аккаунт? <Text style={styles.link}>Войдите</Text>
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
    header: { marginBottom: Spacing.xl, marginTop: Spacing.xl },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.textMain,
        marginBottom: Spacing.s,
    },
    footer: {
        marginBottom: Spacing.xl,
        alignItems: 'center',
    },
    footerText: {
        color: Colors.textSecondary,
        fontSize: 14,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
    },
    link: {
        color: Colors.primary,
        fontWeight: '600',
    },
});
