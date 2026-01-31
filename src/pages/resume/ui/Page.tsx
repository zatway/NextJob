import React, {useCallback, useEffect} from 'react';
import {ScrollView, StyleSheet, View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import {useFocusEffect, useLocalSearchParams, useRouter} from 'expo-router';
import {MyInput} from '../../../shared/ui/Input';
import {MyButton} from '../../../shared/ui/Button';
import {Colors, Spacing} from '../../../shared/lib/theme';
import {Tag} from '../../../shared/ui/Tag';
import {SkillTag} from "../../../shared/enums/SkillTag";
import {useProfile} from '../../../entities/user/model/useProfile';
import {useResume} from '../../../entities/user/model/useResume';
import {useResumeMutations} from "../../../entities/user/model/useResumeMutations";

export const ResumePage = () => {
        const {id} = useLocalSearchParams<{ id: string }>();
        const router = useRouter();
        const {profile, refreshProfile} = useProfile();
        const {resumes} = useResume(profile);

        useFocusEffect(
            useCallback(() => {
                void refreshProfile();
            }, [])
        );

        const existingResume = resumes.find(r => r.id === id);

        const {
            title, setTitle,
            about, setAbout,
            selectedSkills, toggleSkill,
            isLoading, handleSave, handleDelete
        } = useResumeMutations(existingResume, profile?.user_id);

        if (isLoading) return <ActivityIndicator style={{flex: 1}} color={Colors.primary}/>;

        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <Text style={styles.title}>
                    {id ? 'Редактирование' : 'Создание'} резюме
                </Text>

                <MyInput
                    label="Желаемая должность"
                    placeholder="Например, UI/UX Дизайнер"
                    value={title}
                    onChangeText={setTitle}
                />

                <MyInput
                    label="О себе"
                    placeholder="Расскажите о своих достижениях..."
                    multiline
                    numberOfLines={6}
                    style={styles.textArea}
                    value={about}
                    onChangeText={setAbout}
                />

                <Text style={styles.label}>Выберите ключевые навыки</Text>
                <View style={styles.tagsContainer}>
                    {Object.values(SkillTag).map((skill) => {
                        const isSelected = selectedSkills.includes(skill);
                        return (
                            <TouchableOpacity key={skill} onPress={() => toggleSkill(skill)}>
                                <Tag
                                    title={skill}
                                    style={isSelected ? styles.tagActive : styles.tagInactive}
                                    textStyle={isSelected ? styles.tagTextActive : {}}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={styles.buttonWrapper}>
                    <MyButton
                        title={id ? "Сохранить изменения" : "Опубликовать резюме"}
                        loading={isLoading}
                        onPress={() => handleSave(() => router.back())}
                    />
                </View>
                {id && (<View style={styles.buttonWrapper}>
                    <MyButton
                        title="Удалить резюме"
                        loading={isLoading}
                        onPress={() => handleDelete(() => router.back())}
                    />
                </View>)}
            </ScrollView>
        );
    }
;

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: Colors.background},
    content: {padding: Spacing.m, paddingBottom: 40},
    title: {fontSize: 28, fontWeight: 'bold', marginBottom: Spacing.xl, color: Colors.textMain},
    label: {fontSize: 14, fontWeight: '600', color: Colors.textMain, marginBottom: 12, marginLeft: 4},
    textArea: {height: 120, textAlignVertical: 'top'},
    tagsContainer: {flexDirection: 'row', flexWrap: 'wrap', marginBottom: 24},
    buttonWrapper: {marginTop: 10},
    tagActive: {
        backgroundColor: Colors.lightSalad,
        borderColor: Colors.lightSalad,
    },
    tagInactive: {
        backgroundColor: 'transparent',
        borderColor: Colors.surface,
    },
    tagTextActive: {
        color: 'white'
    }
});
