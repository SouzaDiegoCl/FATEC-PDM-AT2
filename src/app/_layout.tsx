import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout(){
    return (
        <>
        <StatusBar style='auto' />
        <Stack initialRouteName="(tabs)">
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        </>
    )
}
