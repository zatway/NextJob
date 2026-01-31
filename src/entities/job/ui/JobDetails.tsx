import React, {useCallback} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {Tag} from '../../../shared/ui/Tag';
import {Colors, Spacing} from '../../../shared/lib/theme';
import {useJob} from '../model/useJob';
import { MyButton } from '../../../shared/ui/Button';
import { useApply } from '../../../features/apply-to-job/model/useApply';
import {useFocusEffect, useRouter} from "expo-router";
import {useProfile} from "../../user/model/useProfile";
import {useResume} from "../../user/model/useResume";

interface JobDetailsProps {
    id: string;
}

export const JobDetails = ({id}: JobDetailsProps) => {
    const {job, isLoading, error} = useJob(id);

    const router = useRouter();

    const { profile, refreshProfile } = useProfile();
    const { resumes } = useResume(profile);
    const { hasApplied, isApplying, apply } = useApply(id, profile?.user_id);

    useFocusEffect(
        useCallback(() => {
            refreshProfile();
        }, [])
    );

    const handleClickCompanyCard = () => {
        Alert.alert("Предупреждение", "Переход на страницу компании")
    };

    if (isLoading) return <ActivityIndicator size="large" color={Colors.primary} style={{marginTop: 20}}/>;
    if (!id || error || !job) return <Text style={styles.errorText}>Ошибка загрузки данных вакансии</Text>;

    const handleApplyPress = () => {
        if (hasApplied) {
            Alert.alert("Уже откликнулись", "Вы уже отправляли резюме на эту вакансию.");
            return;
        }

        if (!resumes || resumes.length === 0) {
            Alert.alert("Нет резюме", "Сначала создайте резюme в профиле", [
                { text: "В профиль", onPress: () => router.push('/profile') }
            ]);
            return;
        }

        Alert.alert(
            "Выберите резюме",
            "Каким резюме вы хотите откликнуться?",
            [
                ...resumes.map(r => ({
                    text: r.title,
                    onPress: () => submitApplication(r.id)
                })),
                { text: "Отмена", style: "cancel" as const }
            ]
        );
    };

    const submitApplication = async (resumeId: string) => {
        const { success } = await apply(resumeId);
        if (success) {
            Alert.alert("Успех", "Отклик успешно отправлен!");
        } else {
            Alert.alert("Ошибка", "Не удалось отправить отклик");
        }
    };

    const renderListSection = (title: string, data: string[]) => {
        if (!data || data.length === 0) return null;
        return (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{title}:</Text>
                {data.map((item, i) => (
                    <Text key={i} style={styles.listItem}>• {item}</Text>
                ))}
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.title}>{job.title}</Text>
                    <Text style={styles.price}>
                        {job.salary_from?.toLocaleString()} – {job.salary_to?.toLocaleString()} ₽
                    </Text>

                    <View>
                        <Text style={styles.infoText}>
                            Требуемый опыт: <Text>{job.experience}</Text>
                        </Text>
                        <Text style={styles.infoText}>
                            {job.employment}, {job.work_mode}
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.companyCard} onPress={handleClickCompanyCard}>
                        <View style={styles.companyHeader}>
                            <Text style={styles.companyName}>{job.company_name}</Text>
                            <Text style={styles.location}>{job.address}</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Описание:</Text>
                        <Text style={styles.listItem}>{job.description}</Text>
                    </View>

                    {renderListSection('Обязанности', job.responsibilities)}
                    {renderListSection('Требования', job.requirements)}
                    {renderListSection('Условия', job.conditions)}

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Ключевые навыки:</Text>
                        <View style={styles.tagsContainer}>
                            {job.skills?.map((skill, i) => (
                                <Tag key={i} title={skill}/>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <MyButton
                    title={hasApplied ? "Вы откликнулись" : "Откликнуться"}
                    onPress={handleApplyPress}
                    loading={isApplying}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {paddingLeft: Spacing.m, paddingRight: Spacing.m, paddingBottom: Spacing.m},
    title: {fontSize: 26, fontWeight: 'bold', color: Colors.textMain, marginBottom: 8},
    price: {fontSize: 20, color: Colors.textMain, marginBottom: 5},
    infoText: {fontSize: 14, color: Colors.textMain, marginBottom: 5},
    companyCard: {backgroundColor: Colors.lightYellow, padding: 16, borderRadius: 16, marginBottom: 24, marginTop: 24},
    companyHeader: {flexDirection: 'column', alignItems: 'flex-start'},
    companyName: {fontSize: 18, color: Colors.textMain, fontWeight: 'bold'},
    location: {fontSize: 12, color: Colors.textMain, marginTop: 2},
    section: {marginBottom: 10},
    sectionTitle: {fontSize: 14, color: Colors.textSecondary, fontWeight: 'bold', marginBottom: 1},
    listItem: {fontSize: 14, color: Colors.textSecondary, marginLeft: 4, lineHeight: 20},
    tagsContainer: {flexDirection: 'row', flexWrap: 'wrap', marginTop: 8},
    errorText: {color: Colors.danger, textAlign: 'center', marginTop: 20},
    footer: {
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
        shadowOpacity: 0.05,
        shadowRadius: 10
    }
});
