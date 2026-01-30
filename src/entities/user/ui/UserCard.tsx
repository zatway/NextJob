import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors, Spacing } from '../../../shared/lib/theme';

interface UserCardProps {
    fullName: string;
    phone: string;
}

export const UserCard = ({ fullName, phone }: UserCardProps) => (
    <View style={styles.card}>
        <View style={styles.avatarPlaceholder}>
            <View style={styles.circle} />
        </View>
        <Text style={styles.name}>{fullName || 'Имя не указано'}</Text>
        <Text style={styles.phone}>{phone || 'Телефон не указан'}</Text>
    </View>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.secondary, // Темный фон из макета
        padding: Spacing.xl,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#555',
        marginBottom: Spacing.m,
    },
    circle: { flex: 1, borderRadius: 50 },
    name: { color: 'white', fontSize: 22, fontWeight: 'bold' },
    phone: { color: '#ccc', fontSize: 16, marginTop: 4 },
});
