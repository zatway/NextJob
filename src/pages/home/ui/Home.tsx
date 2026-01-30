import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, FlatList, RefreshControl, TextInput} from 'react-native'; // Добавили RefreshControl
import { Colors } from "../../../shared/lib/theme";
import { JobCard } from "../../../entities/job/ui/JobCard";
import { jobApi } from "../../../entities/job/api/jobApi";
import { Job } from "../../../entities/job/model/types";
import {SearchIcon} from "../../../../assets/icons";

export const HomePage = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        void fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const data = await jobApi.getJobs();
            setJobs(data.data as Job[]);
        } catch (e) {
            console.error("Ошибка при загрузке вакансий:", e);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    const onRefresh = async () => {
        setIsRefreshing(true);
        await fetchJobs();
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.searchBar} placeholder={`Поиск`}></TextInput>

            <Text style={styles.h1}>Вакансии</Text>

            {isLoading && !isRefreshing ? (
                <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
                <FlatList
                    data={jobs}
                    keyExtractor={(item: Job) => item.id}
                    renderItem={({ item }) => <JobCard job={item} />}
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ListEmptyComponent={<Text style={styles.h2}>Вакансий пока нет</Text>}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={onRefresh}
                            colors={[Colors.primary]}
                            tintColor={Colors.primary}
                        />
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.surface,
        paddingHorizontal: 16,
    },
    searchBar: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        padding: 12,
        borderRadius: 12,
        marginTop: 25,
        marginBottom: 20,
    },
    searchText: { color: Colors.textSecondary },
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.textMain,
        marginBottom: 16
    },
    h2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textMain,
        marginBottom: 12
    },
});
