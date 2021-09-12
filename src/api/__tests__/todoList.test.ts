import { HttpMethod } from 'src/constant/http';
import {
  fetchTodoListApi,
  createTodoApi,
  CreateTodoApiData,
  UpdateTodoApiData,
  updateTodoApi,
  DeleteTodoApiData,
  deleteTodoApi,
} from '../todoList';

const fooToken = 'fooToken';

jest.mock('src/common/localStorageHelper', () => ({
  getToken: () => fooToken,
}));

describe('todo list api', () => {
  const fooUserId = 1234;
  const fooFetchResponse: Promise<Response> = new Promise((res) => res(new Response()));
  const fetchMock = jest.fn(() => fooFetchResponse);
  window.fetch = fetchMock;

  beforeEach(() => {
    fetchMock.mockClear();
  });

  describe('fetch todo list api', () => {
    const fooPage = 2;
    const fooPerPage = 15;
    const expectdData = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${fooToken}`,
      },
    };
    it('fetch with correct argumemts', () => {
      const expectdUrl = `/list?user=${fooUserId}&page=${fooPage}&per_page=${fooPerPage}`;
      const response = fetchTodoListApi(fooUserId, fooPage, fooPerPage);

      expect(fetchMock).toBeCalledWith(expectdUrl, expectdData);
      expect(fetchMock).toBeCalledTimes(1);
      expect(response).toBe(fooFetchResponse);
    });
    it('when perPage is undefined, default value is 12', () => {
      const expectdEndpoint = `/list?user=${fooUserId}&page=${fooPage}&per_page=${12}`;
      const response = fetchTodoListApi(fooUserId, fooPage);

      expect(fetchMock).toBeCalledWith(expectdEndpoint, expectdData);
      expect(fetchMock).toBeCalledTimes(1);
      expect(response).toBe(fooFetchResponse);
    });
  });

  it('create todo api', () => {
    const fooData: CreateTodoApiData = {
      userId: fooUserId,
      title: 'fooTitle',
      tags: ['fooTag'],
      completed: false,
    };
    const expectdEndpoint = '/todo';
    const expectedRequestInit: RequestInit = {
      method: HttpMethod.POST,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${fooToken}`,
      },
      body: JSON.stringify(fooData),
    };
    const response = createTodoApi(fooData);

    expect(fetchMock).toBeCalledWith(expectdEndpoint, expectedRequestInit);
    expect(fetchMock).toBeCalledTimes(1);
    expect(response).toBe(fooFetchResponse);
  });

  it('update todo api', () => {
    const fooData: UpdateTodoApiData = {
      userId: fooUserId,
      id: 1234,
      title: 'fooTitle',
      tags: ['fooTag'],
      completed: false,
    };
    const expectdEndpoint = '/todo';
    const expectedRequestInit: RequestInit = {
      method: HttpMethod.PUT,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${fooToken}`,
      },
      body: JSON.stringify(fooData),
    };
    const response = updateTodoApi(fooData);

    expect(fetchMock).toBeCalledWith(expectdEndpoint, expectedRequestInit);
    expect(fetchMock).toBeCalledTimes(1);
    expect(response).toBe(fooFetchResponse);
  });

  it('delete todo api', () => {
    const fooData: DeleteTodoApiData = {
      userId: fooUserId,
      id: 1234,
    };
    const expectdEndpoint = '/todo';
    const expectedRequestInit: RequestInit = {
      method: HttpMethod.DELETE,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${fooToken}`,
      },
      body: JSON.stringify(fooData),
    };
    const response = deleteTodoApi(fooData);

    expect(fetchMock).toBeCalledWith(expectdEndpoint, expectedRequestInit);
    expect(fetchMock).toBeCalledTimes(1);
    expect(response).toBe(fooFetchResponse);
  });
});
