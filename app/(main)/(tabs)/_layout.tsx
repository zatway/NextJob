import { Tabs } from 'expo-router';
import {Colors} from "../../../src/shared/lib/theme";
import {HomeIcon, ProfileIcon} from "../../../assets/icons";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors.textMain,
            tabBarInactiveTintColor: Colors.textSecondary,
            headerShown: false,
            tabBarStyle: { height: 60, paddingBottom: 10 }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Вакансии',
                    tabBarIcon: ({ color }) => <HomeIcon color={color} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Профиль',
                    tabBarIcon: ({ color }) => <ProfileIcon color={color} />
                }}
            />
        </Tabs>
    );
}
