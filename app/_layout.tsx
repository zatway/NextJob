import {TamaguiProvider, Theme} from 'tamagui'
import config from '../tamagui.config'
import {Stack} from 'expo-router'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {StatusBar} from 'expo-status-bar'

export default function RootLayout() {
    return (
        <TamaguiProvider config={config} defaultTheme="light">
            <Theme name="light">
                <SafeAreaProvider>
                    <StatusBar style="auto"/>
                    <Stack screenOptions={{headerShown: false}} initialRouteName='(main)'>
                        <Stack.Screen name="(auth)"/>
                        <Stack.Screen name="(main)"/>
                    </Stack>
                </SafeAreaProvider>
            </Theme>
        </TamaguiProvider>
    );
}
