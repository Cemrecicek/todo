import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { useState, useEffect } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useTodo } from "../context/ToDoContext";
import { LegacyEventEmitter } from "expo-modules-core";
import {
  CapacitorLoginView,
  CentralBridge,
} from "../../modules/native-header/src";
import NativeHeaderModule from "../../modules/native-header/src/CentralBridge";
import { Heading } from "@/components/ui/heading";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen() {
  const [task, setTask] = useState("");
  const { tasks, addTask, deleteTask, toggleTask } = useTodo();
  const [userName, setUserName] = useState("");
  const [text, setText] = useState(""); 
  const [currentScreen, setCurrentScreen] = useState<"login" | "todo">("login");

  useEffect(() => {
    const emitter = new LegacyEventEmitter(CentralBridge as any);

    const subscription = emitter.addListener(
      "onCapacitorDataReceived",
      (event: { text: string } | string) => {
        const text = typeof event === "string" ? event : event?.text;
        if (text) {
          setUserName(text);
          setCurrentScreen("todo");
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const sendNotification = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") return;
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }
    await Notifications.scheduleNotificationAsync({
      content: { title: "Todo", body: "Görev eklendi!" },
      trigger: null,
    });
  };

  const handleAddTask = () => {
    if (task.trim() === "") return false;
    addTask(task.trim());
    setTask("");
    return true;
  };

  const handleSubmitTask = () => {
    if (handleAddTask()) {
      sendNotification();
    }
  };


  const handleSend = () => {
    if (!text.trim()) return;

    setCurrentScreen("login");

    setTimeout(() => {
      try {
        NativeHeaderModule.sendToWeb(text);
        console.log("Kotlin'e başarıyla gönderildi:", text);
      } catch (e) {
        console.error("Köprü tetiklenirken hata:", e);
      }
      setText(""); 
    }, 150);
  };

  const handleLogout = () => {
    setUserName("");
    setCurrentScreen("login");
  };

  return (
    <Box className="flex-1 bg-white">

      <Box 
        style={{ 
          display: currentScreen === "login" ? "flex" : "none", 
          width: "100%", 
          height: "100%" 
        }}
      >
        <CapacitorLoginView style={{ width: "100%", height: "100%" }} />
      </Box>

      {currentScreen === "todo" && (
        <Box className="flex-1 bg-sky-100 p-5 pt-8 absolute top-0 left-0 right-0 bottom-0">
          <Box className="mb-4 pt-8  flex-row items-center justify-between">
            <Box className="flex-row items-center gap-3">
              <Text className="text-3xl">📝</Text>
              <Heading size="3xl" style={{ fontFamily: "PatrickHand_400Regular" }}>
                To Do List
              </Heading>
            </Box>
          </Box>

          <Box className="mb-4 px-1 flex-row justify-between items-center">
            <Box>
              <Text className="text-sm font-bold text-sky-700">
                Kullanıcı: {userName}
              </Text>
              <Text className="text-[10px] text-gray-600 uppercase tracking-widest mt-1">
                {Device.osName}
              </Text>
            </Box>
            
            <Button size="xs" className="bg-sky-700 rounded-lg" onPress={() => setCurrentScreen("login")}>
              <ButtonText className="text-white text-[11px]">Capacitor'e Geç</ButtonText>
            </Button>
          </Box>

          <Box className="mb-6 p-4 bg-white/50 rounded-xl border border-white/60 gap-3">
            <Text className="text-xs font-semibold text-gray-600">Capacitor Katmanına Veri Gönder</Text>
            <Box className="flex-row items-center gap-3">
              <Input variant="rounded" className="flex-1 border border-white bg-white">
                <InputField
                  placeholder="Web'e gönderilecek veri..."
                  value={text}
                  onChangeText={setText}
                />
              </Input>
              <Button
                onPress={handleSend}
                size="md"
                className="rounded-full bg-sky-600 px-4"
              >
                <ButtonText className="text-white">Gönder</ButtonText>
              </Button>
            </Box>
          </Box>

          <Box className="flex-row items-center gap-3 pt-2">
            <Input variant="rounded" className="flex-1 border border-white/80 bg-white/70">
              <InputField
                placeholder="Görev ekle..."
                value={task}
                onChangeText={setTask}
                onSubmitEditing={handleSubmitTask}
                blurOnSubmit={false}
              />
            </Input>
            <Button onPress={handleSubmitTask} size="md" className="rounded-full border-white/80 bg-white/70 px-5">
              <ButtonText>Ekle</ButtonText>
            </Button>
          </Box>

          <Box className="mt-6">
            {tasks.length === 0 && (
              <Text className="mt-10 text-center text-gray-400">Henüz görev eklenmedi</Text>
            )}
            {tasks.map((item, index) => (
              <Box key={index} className="mb-3 flex-row items-center justify-between rounded-xl border border-white/80 bg-white/70 p-4">
                <Pressable className="flex-1 flex-row items-center" onPress={() => toggleTask(index)}>
                  <Text className="mr-3 text-xl text-green-600">{item.checked ? "✓" : "⬜"}</Text>
                  <Text className={item.checked ? "flex-1 text-gray-400 line-through" : "flex-1 text-gray-800"}>{item.text}</Text>
                </Pressable>
                <Button size="xs" className="bg-red-500/80 rounded-lg" onPress={() => deleteTask(index)}>
                  <ButtonText className="text-white">X</ButtonText>
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}