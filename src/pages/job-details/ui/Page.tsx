import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { JobDetails } from '../../../entities/job/ui/JobDetails';
import { MyButton } from '../../../shared/ui/Button';
import { Colors } from "../../../shared/lib/theme";
import { HeartIcon } from "../../../../assets/icons";

export const JobDetailsPage = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (isFavorite) {
            Alert.alert("Предупреждение", "Добавление в избранное в данный момент не поддерживается");
        }
    }, [isFavorite]);

    const handleApply = () => {
        Alert.alert("Успех", "Ваш отклик отправлен!", [
            { text: "OK", onPress: () => router.push('/(tabs)/home') }
        ]);
    };

    return (
        <View style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
                    <Text style={styles.iconText}>←</Text>
                </TouchableOpacity>
                <View style={styles.rightIcons}>
                    <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={() => setIsFavorite(!isFavorite)}
                    >
                        <HeartIcon color={isFavorite ? Colors.danger : Colors.textSecondary} size={22} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                 <JobDetails id={id} />
            </ScrollView>

            <View style={styles.footer}>
                <MyButton title="Откликнуться" onPress={handleApply} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F5F5F7' },
    header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
    rightIcons: { flexDirection: 'row', alignItems: 'center' },
    iconBtn: { padding: 8 },
    iconText: { fontSize: 24, fontWeight: '300' },
    favoriteButton: { padding: 8, marginLeft: 10 },
    footer: {
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10
    }
});
