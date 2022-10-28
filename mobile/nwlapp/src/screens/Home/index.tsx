import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import React, { useCallback } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { Header } from "../../components/Header";
import { MessageList } from "../../components/MessageList";
import { SendMessageForm } from "../../components/SendMessageForm";
import { SignInBox } from "../../components/SignInBox";
import { styles } from "./styles";
import * as SplashScreen from "expo-splash-screen";
import { useAuth } from "../../hooks/auth";

SplashScreen.preventAutoHideAsync();

export function Home() {
  const { user } = useAuth();

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Header />
        <MessageList />
        {user ? <SendMessageForm /> : <SignInBox />}
      </View>
    </KeyboardAvoidingView>
  );
}
