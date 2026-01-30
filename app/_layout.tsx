import {Stack} from 'expo-router'
import {AuthProvider} from "../src/shared/provider/AuthProvider";

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="(auth)"/>
                <Stack.Screen name="(main)"/>
            </Stack>
        </AuthProvider>
    );
}
