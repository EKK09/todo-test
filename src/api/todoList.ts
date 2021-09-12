import { getToken } from 'src/common/localStorageHelper';
import { HttpMethod } from 'src/constant/http';

export enum TODO_LIST_API_PATH {
    LIST = '/list?user=$user_id&page=$page&per_page=$perPage',
    TODO = '/todo'
}

export const fetchTodoListApi = (userId: number, page: number, perPage = 12): Promise<Response> => {
  const url = TODO_LIST_API_PATH.LIST
    .replace('$user_id', userId.toString())
    .replace('$page', page.toString())
    .replace('$perPage', perPage.toString());
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
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
