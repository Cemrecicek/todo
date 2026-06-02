import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { useTodo } from "../context/ToDoContext";

export default function HomeScreen() {
  const [task, setTask] = useState("");

  const { tasks, addTask, deleteTask, toggleTask } = useTodo();

  const handleAddTask = () => {
    if (task.trim() === "") {
      return;
    }

    addTask(task);
    setTask("");
  };

  return (
    <Box className="flex-1 bg-sky-100 px-5">
      <Box className=" px-5 pt-10 pb-5">
        <Box className="mb-6 flex-row items-center gap-3">
          <Text className="text-3xl">📝</Text>
          <Box>
            <Heading
              size="3xl"
              style={{ fontFamily: "PatrickHand_400Regular" }}
            >
              To Do List
            </Heading>
          </Box>
        </Box>
      </Box>

      <Box className="flex-row items-center gap-3  pt-5">
        <Input
          variant="rounded"
          className="flex-1 border border-white/80 bg-white/70"
        >
          <InputField
            placeholder="Görev ekle..."
            onSubmitEditing={handleAddTask}
            value={task}
            onChangeText={setTask}
            blurOnSubmit={false}
          />
        </Input>

        <Button
          onPress={handleAddTask}
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
