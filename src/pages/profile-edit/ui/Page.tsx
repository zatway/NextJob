import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MyInput } from '../../../shared/ui/Input';
import { MyButton } from '../../../shared/ui/Button';
import { Colors, Spacing } from '../../../shared/lib/theme';

export const ProfileEditPage = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.darkHeader}>
                    <View style={styles.avatarWrapper}>
                        {/* Заглушка аватара */}
                        <View style={styles.avatarPlaceholder}>
                            <Text style={{fontSize: 40}}>👤</Text>
                        </View>
                        <TouchableOpacity style={styles.editBadge}>
                            <Text style={{color: 'white', fontSize: 12}}>✎</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.headerTitle}>Редактирование</Text>
                </View>

                <View style={styles.form}>
                    <MyInput label="ФИО" placeholder="Зюзьмин Демьян" value="" onChangeText={() => {}} />
                    <MyInput label="Телефон" placeholder="+79826662615" keyboardType="phone-pad" value="" onChangeText={() => {}} />
                    <MyInput label="Дата рождения" placeholder="YYYY-MM-DD" value="" onChangeText={() => {}} />

                    <View style={styles.saveWrapper}>
                        <MyButton title="Сохранить изменения" onPress={() => {}} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    darkHeader: {
        backgroundColor: Colors.secondary,
        paddingTop: 60,
        paddingBottom: 30,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    avatarWrapper: { position: 'relative', marginBottom: 15 },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#555',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.primary
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.primary,
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.secondary
    },
    headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    form: { padding: Spacing.m, marginTop: 10 },
    saveWrapper: { marginTop: 20 }
});
