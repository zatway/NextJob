import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native';
import {ResumeCard} from "../../../entities/user/ui/ResumeCard";
import {Colors} from "../../../shared/lib/theme";

export const ProfilePage = () => (
    <View style={styles.container}>
        <View style={styles.darkHeader}>
            <View style={styles.avatar}>
                <Image source={{uri: 'URL_АВАТАРА'}} style={styles.avatar}/>
                <TouchableOpacity style={styles.createBtn}><Text>✏️</Text></TouchableOpacity>
            </View>
            <Text style={styles.userName}>Зюзьмин Демьян</Text>
            <Text style={styles.userPhone}>+79826662615</Text>
            <TouchableOpacity style={styles.createBtn}><Text style={styles.createBtnText}>Создать
                резюме</Text></TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
            <Text style={styles.sectionTitle}>Мои резюме</Text>
            <ResumeCard
                title="UI/UX Дизайнер"
                date="19 июля 2022 года"
                description="Я - начинающий дизайнер, хочу работать и набираться опыта в сфере UI/UX..."
                stats={[
                    {label: 'Показы', value: '120'},
                    {label: 'Просмотры', value: '120'},
                    {label: 'Приглашения', value: '120'},
                    {label: 'Отказы', value: '120'},
                ]}
            />
        </ScrollView>

        <TouchableOpacity style={styles.logoutBtn}><Text style={styles.logoutText}>Выйти</Text></TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: Colors.background},
    darkHeader: {
        backgroundColor: Colors.secondary,
        padding: 30,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    avatar: {width: 100, height: 100, borderRadius: 50, marginBottom: 15},
    userName: {color: Colors.background, fontSize: 22, fontWeight: 'bold'},
    userPhone: {color: '#AAA', marginBottom: 20},
    createBtn: {backgroundColor: Colors.primary, paddingHorizontal: 40, paddingVertical: 12, borderRadius: 12},
    createBtnText: {color: 'white', fontWeight: 'bold'},
    content: {padding: 20},
    sectionTitle: {fontSize: 22, fontWeight: 'bold', marginBottom: 20},
    logoutBtn: {backgroundColor: '#333', margin: 20, padding: 16, borderRadius: 12, alignItems: 'center'},
    logoutText: {color: 'white', fontWeight: 'bold'}
});
