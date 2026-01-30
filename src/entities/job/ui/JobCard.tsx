import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, Touchable, Alert} from 'react-native';
import {Badge} from '../../../shared/ui/Badge';
import {Colors} from '../../../shared/lib/theme';
import {Job} from "../model/types";
import {HeartIcon} from "../../../../assets/icons";
import {TouchpadIcon} from "lucide-react-native";
import {getCreatedDate} from "../../../shared/utils/dateUtils";
import {useRouter} from "expo-router";

interface JobCardProps {
    job: Job;
}

export const JobCard = ({job}: JobCardProps) => {
    const router = useRouter();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (isFavorite)
            Alert.alert("Предупреждение", "Добавление в избранное в данный момент не поддерживается")
    }, [isFavorite])

    const handlePress = () => {
        router.push(`/job/${job.id}`);
    };

    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={handlePress}>
            <View style={styles.header}>
                <View style={styles.headerText}>
                    <Text style={styles.title}>{job.title}</Text>
                    <Text style={styles.price}>{job.salary_from} – {job.salary_to} ₽</Text>
                </View>
                <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => setIsFavorite(!isFavorite)}
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                >
                    <HeartIcon
                        color={isFavorite ? Colors.danger : Colors.textSecondary}
                        size={22}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.company}>{job.company_name} ✓</Text>
            <Text style={styles.location}>{job.address}</Text>
            <Badge title="Будьте первыми"/>
            <Text style={styles.description} numberOfLines={3}>{job.description}</Text>
            <Text style={styles.date}>Опубликовано {getCreatedDate(job.created_at)}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.background,
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: Colors.textSecondary,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    favoriteButton: {
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {flexDirection: 'column', justifyContent: 'space-between', marginBottom: 4},
    title: {fontSize: 18, fontWeight: 'bold', color: Colors.textMain},
    price: {fontSize: 16, fontWeight: '600', color: Colors.textMain},
    company: {fontSize: 14, color: Colors.secondary, marginBottom: 2},
    location: {fontSize: 12, color: Colors.textSecondary, marginBottom: 10},
    description: {fontSize: 13, color: Colors.textMain, lineHeight: 18, marginBottom: 10},
    date: {fontSize: 11, color: Colors.textSecondary},
});
