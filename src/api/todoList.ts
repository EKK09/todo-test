import { sleep } from 'src/common/asyncHelper';
import { getToken } from 'src/common/localStorageHelper';
import { HttpMethod } from 'src/constant/http';
import { Todo } from 'src/store/todoList';

export enum TODO_LIST_API_PATH {
    LIST = '/list?user=$user_id&page=$page&per_page=$perPage',
    TODO = '/todo'
}

const todoList: Todo[] = [
  {
    id: 1, title: 'Listen English Podcast', tags: ['learning', 'every night'], completed: false,
  },
  {
    id: 2, title: 'Feed The Dog', tags: ['every day'], completed: false,
  },
  {
    id: 3, title: 'Do 10 Push-ups', tags: ['before sleep', 'exercise'], completed: false,
  },
];

export const fetchTodoListApi = async (
  userId: number, page: number, perPage = 12,
): Promise<any> => {
  await sleep(2);
  const successResponse = {
    ok: true,
    json: async () => todoList,
  };

  return new Promise((res) => {
    res(successResponse);
  });
};

export interface CreateTodoApiData {
  userId: number;
  title: string;
  tags: string[];
  completed: boolean;
}

export const createTodoApi = (data: CreateTodoApiData): Promise<Response> => fetch(
  TODO_LIST_API_PATH.TODO, {
    method: HttpMethod.POST,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  },
);

export interface UpdateTodoApiData {
  userId: number;
  id: number;
  title: string;
  tags: string[];
  completed: boolean;
}

export const updateTodoApi = (data: UpdateTodoApiData): Promise<Response> => fetch(
  TODO_LIST_API_PATH.TODO, {
    method: HttpMethod.PUT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,

    },
    body: JSON.stringify(data),
  },
);

export interface DeleteTodoApiData {
  userId: number;
  id: number;
}

export const deleteTodoApi = (data: DeleteTodoApiData): Promise<Response> => fetch(
  TODO_LIST_API_PATH.TODO, {
    method: HttpMethod.DELETE,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  },
);
