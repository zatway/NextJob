import React, {useState, useEffect, useCallback} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import {useFocusEffect, useRouter} from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useProfile } from '../../../entities/user/model/useProfile';
import { MyInput } from '../../../shared/ui/Input';
import { MyButton } from '../../../shared/ui/Button';
import { Colors } from '../../../shared/lib/theme';
import { validateAge } from '../../../shared/utils/dateUtils';

export const ProfileEditPage = () => {
    const { profile, updateProfile, isLoadingProfile, refreshProfile } = useProfile();
    const router = useRouter();
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [form, setForm] = useState({
        full_name: '',
        phone: '',
        birth_date: '',
        avatar_url: ''
    });

    useFocusEffect(
        useCallback(() => {
            void refreshProfile();
        }, [])
    );

    useEffect(() => {
        if (profile) {
            setForm({
                full_name: profile.full_name || '',
                phone: profile.phone || '',
                birth_date: profile.birth_date || '',
                avatar_url: profile.avatar_url || ''
            });
        }
    }, [profile]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            setForm(prev => ({ ...prev, avatar_url: result.assets[0].uri }));
        }
    };

    const handleSave = async () => {
        if (form.birth_date && !validateAge(form.birth_date)) {
            Alert.alert("Доступ ограничен", "Редактирование профиля доступно только лицам старше 18 лет.");
            return;
        }

        const { error } = await updateProfile(form);
        if (error) {
            Alert.alert("Ошибка", "Не удалось сохранить изменения");
        } else {
            Alert.alert("Готово", "Данные обновлены", [{ text: "OK", onPress: () => router.back() }]);
        }
    };

    if (isLoadingProfile) return <ActivityIndicator style={{flex: 1}} color={Colors.primary} />;

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <View style={styles.avatarSection}>
                <TouchableOpacity onPress={pickImage} style={styles.avatarCircle}>
                    {form.avatar_url ? (
                        <Image source={{ uri: form.avatar_url }} style={styles.avatarImage} />
                    ) : (
                        <Text style={{ fontSize: 40 }}>👤</Text>
                    )}
                    <View style={styles.editBadge}>
                        <Text style={{ color: 'white', fontSize: 18 }}>+</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.form}>
                <MyInput
                    label="ФИО"
                    value={form.full_name}
                    onChangeText={(t) => setForm(prev => ({ ...prev, full_name: t }))}
                />

                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <View pointerEvents="none">
                        <MyInput
                            label="Дата рождения"
                            value={form.birth_date ? new Date(form.birth_date).toLocaleDateString() : ''}
                            editable={false}
                        />
                    </View>
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        value={form.birth_date ? new Date(form.birth_date) : new Date()}
                        mode="date"
                        onChange={(e, date) => {
                            setShowDatePicker(false);
                            if (date) setForm(prev => ({ ...prev, birth_date: date.toISOString() }));
                        }}
                    />
                )}

                <MyInput
                    label="Телефон"
                    value={form.phone}
                    keyboardType="phone-pad"
                    onChangeText={(t) => setForm(prev => ({ ...prev, phone: t }))}
                />

                <View style={{ marginTop: 20 }}>
                    <MyButton title="Сохранить изменения" onPress={handleSave} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    avatarSection: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20
    },
    avatarCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#E1E1E1',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'visible'
    },
    avatarImage: {
        width: 120,
        height: 120,
        borderRadius: 60
    },
    editBadge: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: Colors.primary,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white'
    },
    form: { paddingHorizontal: 20 },
});
