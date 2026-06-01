import { useState } from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

type Task = {
  text: string;
  checked: boolean;
};

export default function HomeScreen() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (task.trim() === "") {
      return;
    }

    setTasks([...tasks, { text: task, checked: false }]);
    setTask("");
  };
  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTask = (index: number) => {
    const newTasks = [...tasks];

    newTasks[index].checked = !newTasks[index].checked;

    setTasks(newTasks);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/todo.png")}
          style={{ width: 50, height: 50 }}
        />
        <Text style={styles.headerTitle}>To Do List</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Görev ekleyin"
          value={task}
          onChangeText={setTask}
        />

        <Pressable style={styles.addbtn} onPress={addTask}>
          <Text style={styles.buttonText}>Ekle</Text>
        </Pressable>
      </View>

      <View style={styles.taskList}>
        {tasks.map((item, index) => (
          <View key={index} style={styles.taskRow}>
            <Pressable
              key={index}
              style={styles.check}
              onPress={() => toggleTask(index)}
            >
              <Text style={styles.checkbox}>{item.checked ? "☑️" : "⬜"}</Text>
              <Text style={[item.checked && styles.checkedTaskItem]}>
                {item.text}
              </Text>
            </Pressable>
            <Pressable
              style={styles.deletebtn}
              onPress={() => deleteTask(index)}
            >
              <Text style={styles.buttonText}>sil</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },

  headerSubtitle: {
    fontSize: 16,
    color: "#666",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  check: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    fontSize: 20,
    marginRight: 10,
  },

  addbtn: {
    height: 50,
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 10,
  },

  deletebtn: {
    height: 20,
    backgroundColor: "#ff0000",
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
  },

  taskList: {
    marginTop: 20,
  },

  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "#f2f2f2",
  },

  checkedTaskItem: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});
