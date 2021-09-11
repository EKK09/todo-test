import { fetchTodoListApi } from 'src/api/todoList';
import create from 'zustand';
import useNotificationStore, { NotificationStatus } from './notification';
import useUserStore from './user';

export interface Todo {
  id: number;
  title: string;
  tags: string[];
  completed: boolean;
}

interface TodoListStore {
  todoList: Todo[];
  currentPage: number;
  isFetching: boolean;
  appendTodoList: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  removeTodoById: (id: number) => void;
  updateTodo: (todo: Todo) => void;
  setIsFetching: (isFetching: boolean) => void;
  fetchTodoList: () => Promise<void>;
}

const useTodoListStore = create<TodoListStore>((set, get) => ({
  todoList: [],
  currentPage: 1,
  isFetching: false,

  appendTodoList: (todos: Todo[]) => {
    set((state) => ({ todoList: state.todoList.concat(todos) }));
  },

  addTodo: (todo: Todo) => {
    set((state) => ({ todoList: state.todoList.concat(todo) }));
  },

  removeTodoById: (id: number) => {
    set((state) => ({ todoList: state.todoList.filter((todo) => todo.id !== id) }));
  },

  updateTodo: (newTodo: Todo) => {
    set((state) => ({
      todoList: state.todoList.map((todo) => (newTodo.id === todo.id ? newTodo : todo)),
    }));
  },

  setIsFetching: (isFetching: boolean) => {
    set({ isFetching });
  },

  fetchTodoList: async () => {
    try {
      get().setIsFetching(true);
      const userId = useUserStore.getState().id;
      const response = await fetchTodoListApi(userId, get().currentPage);
      if (!response.ok) {
        throw new Error();
      }
      const todos: Todo[] = await response.json();
      get().appendTodoList(todos);
    } catch (error) {
      useNotificationStore.getState().showNotification(
        'fetch Todo List error',
        NotificationStatus.FAIL,
      );
    } finally {
      get().setIsFetching(false);
    }
  },
}));

export default useTodoListStore;
