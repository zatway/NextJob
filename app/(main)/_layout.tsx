import { Stack } from 'expo-router';

export default function MainLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="job/[id]"
                options={{
                    title: 'Вакансия',
                    headerBackTitle: 'Назад'
                }}
            />
            <Stack.Screen
                name="resume"
                options={{ title: 'Мое резюме' }}
            />
        </Stack>
    );
}
