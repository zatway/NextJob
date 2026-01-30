import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { MyInput } from '../../../shared/ui/Input';
import { MyButton } from '../../../shared/ui/Button';
import { Colors, Spacing } from '../../../shared/lib/theme';
import { Tag } from '../../../shared/ui/Tag';
import {SkillTag} from "../../../shared/enums/SkillTag";

export const ResumePage = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>Создание резюме</Text>

            <MyInput label="Желаемая должность" placeholder="Например, UI/UX Дизайнер" value="" onChangeText={() => {}} />

            <MyInput
                label="О себе"
                placeholder="Расскажите о своих достижениях..."
                multiline
                numberOfLines={6}
                style={styles.textArea}
                value=""
                onChangeText={() => {}}
            />

            <Text style={styles.label}>Выберите ключевые навыки</Text>
            <View style={styles.tagsContainer}>
                {Object.values(SkillTag).map((skill) => (
                    <Tag key={skill} title={skill} />
                ))}
            </View>

            <View style={styles.buttonWrapper}>
                <MyButton title="Опубликовать резюме" onPress={() => {}} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    content: { padding: Spacing.m, paddingBottom: 40 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: Spacing.xl, color: Colors.textMain },
    label: { fontSize: 14, fontWeight: '600', color: Colors.textMain, marginBottom: 12, marginLeft: 4 },
    textArea: { height: 120, textAlignVertical: 'top' },
    tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 24 },
    buttonWrapper: { marginTop: 10 }
});
