import React from 'react';
import {TextInput, StyleSheet, View, Text, TextInputProps} from 'react-native';
import {Colors} from "../lib/theme";

interface Props extends TextInputProps {
    label?: string;
}

export const MyInput = ({ label, ...props }: Props) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={styles.input}
                placeholderTextColor="#999"
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textMain,
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: Colors.white,
        height: 52,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: Colors.textMain,
    },
});
