import React, { useCallback } from "react";
import { AuthProvider } from "./src/hooks/auth";

import { StatusBar } from "expo-status-bar";

import { Home } from "./src/screens/Home";

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Home />
    </AuthProvider>
  );
}
