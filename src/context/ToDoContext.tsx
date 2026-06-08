import TodoStorage from "../../modules/todo-storage/src/TodoStorageModule";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Task = {
  text: string;
  checked: boolean;
};

type TodoContextType = {
  tasks: Task[];
  addTask: (text: string) => void;
  deleteTask: (index: number) => void;
  toggleTask: (index: number) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await TodoStorage.getString("tasks");

      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.log("Görevler yüklenemedi:", error);
    }
  };

  const saveTasks = async (newTasks: Task[]) => {
    try {
      await TodoStorage.set("tasks", JSON.stringify(newTasks));
    } catch (error) {
      console.log("Görevler kaydedilemedi:", error);
    }
  };

  const addTask = (text: string) => {
    const newTasks = [...tasks, { text, checked: false }];

    setTasks(newTasks);
    saveTasks(newTasks);
    console.log("Görev eklendi:", text);
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);

    setTasks(newTasks);
    saveTasks(newTasks);
    console.log("Görev silindi:", tasks[index].text);
  };

  const toggleTask = (index: number) => {
    const newTasks = [...tasks];

    newTasks[index].checked = !newTasks[index].checked;
    
    const updatedTask = newTasks[index];
    
    setTasks(newTasks);
    saveTasks(newTasks);

    console.log(
    "Görev durumu değiştirildi:",
    updatedTask.text,
    updatedTask.checked ? "tamamlandı" : "tamamlanmadı");
  };

  return (
    <TodoContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodo must be used inside TodoProvider");
  }

  return context;
}
