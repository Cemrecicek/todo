import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useLocalSearchParams } from "expo-router";
import { useTodo } from "../context/ToDoContext";
import { NativeHeaderView } from "../../modules/native-header/src";

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

  return (
    <Box className="flex-1 bg-sky-100">
      <NativeHeaderView
        userName={userName}
        style={{ width: "100%", height: 250 }}
        onInputChange={(event) => {
          setUserName(event.nativeEvent.text);
        }}
      />

      <Box className="flex-1 px-5">
        <Box className="flex-row justify-between items-center mt-2 px-1">
          <Box>
            {userName ? (
              <Text className="text-sm font-bold text-sky-700">
                Kullanıcı: {userName}
              </Text>
            ) : (
              <Text className="text-sm text-gray-400">
                Kullanıcı belirlenmedi
              </Text>
            )}
          </Box>

          <Text className="text-[10px] text-gray-400 uppercase tracking-widest">
            {Device.osName}
          </Text>
        </Box>

        <Box className="flex-row items-center gap-3 pt-5">
          <Input
            variant="rounded"
            className="flex-1 border border-white/80 bg-white/70"
          >
            <InputField
              placeholder="Görev ekle..."
              value={task}
              onChangeText={setTask}
              onSubmitEditing={handleSubmitTask}
              blurOnSubmit={false}
            />
          </Input>

          <Button
            onPress={handleSubmitTask}
            size="md"
            className="rounded-full border-white/80 bg-white/70 px-5"
          >
            <ButtonText>Ekle</ButtonText>
          </Button>
        </Box>

        <Box className="mt-6">
          {tasks.length === 0 && (
            <Text className="mt-10 text-center text-gray-400">
              Henüz görev eklenmedi
            </Text>
          )}

          {tasks.map((item, index) => (
            <Box
              key={index}
              className="mb-3 flex-row items-center justify-between rounded-xl border border-white/80 bg-white/70 p-4"
            >
              <Pressable
                className="flex-1 flex-row items-center"
                onPress={() => toggleTask(index)}
              >
                <Text className="mr-3 text-xxl text-green-600">
                  {item.checked ? "✓" : "⬜"}
                </Text>
                <Text
                  className={
                    item.checked
                      ? "flex-1 text-gray-400 line-through"
                      : "flex-1 text-gray-800"
                  }
                >
                  {item.text}
                </Text>
              </Pressable>

              <Button
                size="xs"
                className="bg-red-500/80"
                onPress={() => deleteTask(index)}
              >
                <ButtonText className="text-white">X</ButtonText>
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
