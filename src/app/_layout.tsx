import { PatrickHand_400Regular } from "@expo-google-fonts/patrick-hand";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { TodoProvider } from "../context/ToDoContext";
import "../global.css";

export default function RootLayout() {
  const [loaded] = useFonts({
    PatrickHand_400Regular,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!loaded) {
    return null;
  }

  return (
    <TodoProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TodoProvider>
  );
}
