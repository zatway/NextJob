import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Tag } from '../../../shared/ui/Tag';
import { Colors, Spacing } from '../../../shared/lib/theme';
import { useJob } from '../model/useJob';

interface JobDetailsProps {
    id: string;
}

export const JobDetails = ({ id }: JobDetailsProps) => {
    const { job, isLoading, error } = useJob(id);

    if (isLoading) return <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 20 }} />;
    if (!id || error || !job) return <Text style={styles.errorText}>Ошибка загрузки данных вакансии</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{job.title}</Text>
            {/* Форматируем цену из salary_from и salary_to */}
            <Text style={styles.price}>
                {job.salary_from?.toLocaleString()} – {job.salary_to?.toLocaleString()} ₽
            </Text>

            <View style={styles.infoRow}>
                <Text style={styles.infoText}>Требуемый опыт: не указан</Text>
                <Text style={styles.infoText}>Полная занятость, полный день</Text>
            </View>

            <View style={styles.companyCard}>
                <View style={styles.companyHeader}>
                    <View style={styles.logoCircle}><Text style={{fontSize: 20}}>▲</Text></View>
                    <View>
                        <Text style={styles.companyName}>{job.company_name} ✓</Text>
                        <Text style={styles.rating}>5,0 ★ <Text style={styles.reviews}>20 отзывов</Text></Text>
                        <Text style={styles.location}>{job.address}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Описание и обязанности:</Text>
                <Text style={styles.descriptionText}>{job.description}</Text>
                {job.responsibilities?.map((item, i) => (
                    <Text key={i} style={styles.listItem}>• {item}</Text>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ключевые навыки:</Text>
                <View style={styles.tagsContainer}>
                    {job.skills?.map((skill, i) => (
                        <Tag key={i} title={skill} />
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: Spacing.m },
    title: { fontSize: 26, fontWeight: 'bold', color: Colors.textMain, marginBottom: 8 },
    price: { fontSize: 20, fontWeight: '700', color: Colors.textMain, marginBottom: 12 },
    infoRow: { marginBottom: 24 },
    infoText: { fontSize: 14, color: '#666', marginBottom: 4 },
    companyCard: { backgroundColor: 'white', padding: 16, borderRadius: 16, marginBottom: 24 },
    companyHeader: { flexDirection: 'row', alignItems: 'center' },
    logoCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    companyName: { fontSize: 18, fontWeight: 'bold' },
    rating: { fontSize: 14, color: '#FFB800' },
    reviews: { color: '#BBB', fontWeight: '400' },
    location: { fontSize: 12, color: '#999', marginTop: 2 },
    section: { marginBottom: 20 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
    descriptionText: { fontSize: 14, color: '#444', marginBottom: 10, lineHeight: 20 },
    listItem: { fontSize: 14, color: '#444', lineHeight: 20, marginBottom: 4 },
    tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
    errorText: { color: Colors.danger, textAlign: 'center', marginTop: 20 }
});
