import { createMMKV } from 'react-native-mmkv'
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

const storage = createMMKV();


const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const storedTasks = storage.getString("tasks");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  };
  const saveTasks = (newTasks: Task[]) => {
    storage.set("tasks", JSON.stringify(newTasks));
  };

  const addTask = (text: string) => {
    const newTasks = [...tasks, { text, checked: false }];

    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);

    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const toggleTask = (index: number) => {
    const newTasks = [...tasks];

    newTasks[index].checked = !newTasks[index].checked;

    setTasks(newTasks);
    saveTasks(newTasks);
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
