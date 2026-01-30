import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../lib/theme';

interface BadgeProps {
    title: string
}

export const Badge = ({title}: BadgeProps) => (
    <View style={styles.badge}>
        <Text style={styles.text}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    badge: {
        backgroundColor: Colors.lightSalad,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
        marginBottom: 8
    },
    text: {color: Colors.textSecondary, fontSize: 10, fontWeight: '600'},
});
