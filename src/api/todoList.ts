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
  return fetch(url);
};

export const createTodoApi = (body: BodyInit): Promise<Response> => fetch(
  TODO_LIST_API_PATH.TODO, {
    method: HttpMethod.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  },
);

export const updateTodoApi = (body: BodyInit): Promise<Response> => fetch(
  TODO_LIST_API_PATH.TODO, {
    method: HttpMethod.PUT,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  },
);

export const deleteTodoApi = (body: BodyInit): Promise<Response> => fetch(
  TODO_LIST_API_PATH.TODO, {
    method: HttpMethod.DELETE,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  },
);
