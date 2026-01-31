import {View, Text, StyleSheet} from 'react-native';
import {Colors} from "../lib/theme";

interface TagProps {
    title: string
}

export const Tag = ({title}: TagProps) => (
    <View style={styles.tag}>
        <Text style={styles.text}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    tag: {
        backgroundColor: Colors.surface,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginRight: 8,
        marginBottom: 8
    },
    text: {color: Colors.textSecondary, fontSize: 12},
});
