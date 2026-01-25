import { Tabs } from 'expo-router';

export default function MainLayout() {
    return (
        <Tabs >
            <Tabs.Screen name="index" options={{ title: 'Вакансии' }} />
            <Tabs.Screen name="profile" options={{ title: 'Профиль' }} />
        </Tabs>
    );
}
