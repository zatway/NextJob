import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { MyButton } from '../../../shared/ui/Button';
import { MyInput } from '../../../shared/ui/Input';
import { useRegister } from '../model/useRegister';
import { Spacing } from '../../../shared/lib/theme';

export const RegisterForm = () => {
    const {
        email, setEmail,
        password, setPassword,
        fullName, setFullName,
        phone, setPhone,
        birthday, setBirthday,
        loading, handleRegister
    } = useRegister();

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <View style={styles.form}>
                <MyInput
                    label="ФИО"
                    placeholder="Иванов Иван Иванович"
                    value={fullName}
                    onChangeText={setFullName}
                />
                <MyInput
                    label="Электронная почта"
                    placeholder="example@mail.ru"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <MyInput
                    label="Телефон"
                    placeholder="+7 (999) 000-00-00"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
                <MyInput
                    label="Дата рождения"
                    placeholder="YYYY-MM-DD"
                    value={birthday}
                    onChangeText={setBirthday}
                />
                <MyInput
                    label="Пароль"
                    placeholder="Минимум 6 символов"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <View style={styles.buttonWrapper}>
                    <MyButton
                        title="Зарегистрироваться"
                        onPress={handleRegister}
                        loading={loading}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
    },
    form: {
        width: '100%',
        paddingBottom: Spacing.xl,
    },
    buttonWrapper: {
        marginTop: Spacing.m,
    },
});
