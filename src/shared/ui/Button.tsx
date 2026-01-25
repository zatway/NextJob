import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import {Colors} from "../lib/theme";

interface Props {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
    loading?: boolean;
}

export const MyButton = ({ title, onPress, variant = 'primary', loading }: Props) => {
    const isPrimary = variant === 'primary';

    return (
        <TouchableOpacity
            style={[styles.button, isPrimary ? styles.primary : styles.secondary]}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 52,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    primary: {
        backgroundColor: Colors.primary,
    },
    secondary: {
        backgroundColor: Colors.secondary,
    },
    text: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
});
