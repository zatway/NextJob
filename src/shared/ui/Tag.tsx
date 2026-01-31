import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Colors } from "../lib/theme";

interface TagProps {
    title: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

export const Tag = ({ title, style, textStyle }: TagProps) => (
    <View style={[styles.tag, style]}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    tag: {
        backgroundColor: Colors.surface,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    text: {
        color: Colors.textSecondary,
        fontSize: 13,
        fontWeight: '500'
    },
});
