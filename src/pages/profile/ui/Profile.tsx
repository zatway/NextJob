import React, {useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Image} from 'react-native';
import {useFocusEffect, useRouter} from 'expo-router';
import {useProfile} from '../../../entities/user/model/useProfile';
import {Colors} from "../../../shared/lib/theme";
import {supabase} from "../../../shared/api/supabase";
import {useResume} from "../../../entities/user/model/useResume";
import {ResumeCard} from "../../../entities/user/ui/ResumeCard";
import {EditIcon} from "../../../../assets/icons";

export const ProfilePage = () => {
    const {profile, isLoadingProfile,setIsLoadingProfile, refreshProfile} = useProfile();
    const {resumes, isLoadingResume, refreshResume} = useResume(profile);
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            refreshProfile();
            refreshResume()
        }, [])
    );

    if (isLoadingProfile && !profile) {
        return <ActivityIndicator style={{flex: 1}} color={Colors.primary}/>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.darkHeader}>
                <View style={styles.avatarContainer}>
                    {profile?.avatar_url ? (
                        <Image
                            source={{ uri: profile.avatar_url }}
                            style={styles.avatarImage}
                        />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Text style={{fontSize: 60}}>👤</Text>
                        </View>
                    )}

                    <TouchableOpacity
                        style={styles.editIcon}
                        onPress={() => router.push('/profile-edit')}
                    >
                        <EditIcon size={24}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.userFullName}>{profile?.full_name || 'Имя не указано'}</Text>
                <Text style={styles.userPhone}>{profile?.phone || 'Телефон не указан'}</Text>

                <TouchableOpacity
                    style={styles.createBtn}
                    onPress={() => router.push('/resume')}
                >
                    <Text style={styles.createBtnText}>Создать резюме</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                <Text style={styles.sectionTitle}>Мои резюме</Text>
                {isLoadingResume && <ActivityIndicator color={Colors.primary} style={{marginBottom: 10}}/>}
                {resumes?.length > 0 ?
                    resumes.map((resume) => (
                        <TouchableOpacity
                            key={resume.id}
                            onPress={() => router.push(`/resume?id=${resume.id}`)}
                        >
                            <ResumeCard resume={resume}/>
                        </TouchableOpacity>
                    ))
                    : <Text style={{color: Colors.textSecondary}}>У вас пока нет резюме</Text>
                }
            </ScrollView>

            <TouchableOpacity
                style={styles.logoutBtn}
                onPress={async () => {
                    setIsLoadingProfile(true);
                    await supabase.auth.signOut()
                }}
            >
                <Text style={styles.logoutText}>Выйти</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    },
    darkHeader: {
        backgroundColor: Colors.secondary,
        padding: 30,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        marginBottom: 15,
        position: 'relative',
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: Colors.white,
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.primary,
        padding: 8,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: Colors.secondary
    },
    userFullName: {color: Colors.white, fontSize: 20, marginBottom: 5, fontWeight: 'bold'},
    userPhone: {color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 15,},
    createBtn: {
        margin: 10,
        backgroundColor: Colors.primary,
        paddingHorizontal: 60,
        paddingVertical: 15,
        borderRadius: 12
    },
    createBtnText: {color: Colors.white, fontWeight: '600'},
    content: {padding: 20},
    sectionTitle: {fontSize: 22, marginBottom: 20, fontWeight: 'bold', color: Colors.textMain},
    logoutBtn: {
        backgroundColor: Colors.danger,
        marginHorizontal: 20,
        marginBottom: 30,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center'
    },
    logoutText: {color: Colors.white, fontSize: 18, fontWeight: 'bold'}
});
