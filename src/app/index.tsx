import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { useTodo } from "../context/ToDoContext";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

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

  

  const sendNotification = async () => {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== "granted") {
    console.log("Bildirim izni verilmedi");
    return;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Todo",
      body: "Görev eklendi!",
    },
    trigger: {
      seconds: 2,
      channelId: "default",
    },
  });
};

  const handleAddTask = () => {
    if (task.trim() === "") {
      return false;
    }

    addTask(task.trim());
    setTask("");
    return true;
  };

  return (
    <Box className="flex-1 bg-sky-100 px-5">
      <Box className=" px-5 pt-10 pb-5">
        <Box className="mb-6 flex-row items-center justify-between">
          <Text className="text-3xl">📝</Text>
          <Box>
            <Heading
              size="3xl"
              style={{ fontFamily: "PatrickHand_400Regular" }}
            >
              To Do List
            </Heading>
          </Box>
          <Text className="text-xs text-gray-500">
            {Device.osName}
          </Text>
        </Box>
      </Box>

      <Box className="flex-row items-center gap-3  pt-5">
        <Input
          variant="rounded"
          className="flex-1 border border-white/80 bg-white/70"
        >
          <InputField
            placeholder="Görev ekle..."
            onSubmitEditing={() => {
              const added = handleAddTask();
              
              if (added) {
                sendNotification();
              }
}}
            value={task}
            onChangeText={setTask}
            blurOnSubmit={false}
          />
        </Input>

        <Button
          onPress={() => {
          const added = handleAddTask();
          if (added) {
            sendNotification();
          }   
        }} 
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
              <Text className="mr-3 text-xxl text-green-600 ">
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
  );
}