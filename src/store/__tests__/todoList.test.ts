import { fetchTodoListApi } from 'src/api/todoList';
import { FETCH_TODO_LIST_ERROR } from 'src/constant/errorMessage';
import useTodoListStore, { Todo } from 'src/store/todoList';
import useNotificationStore, { NotificationStatus } from '../notification';
import useUserStore from '../user';

jest.mock('src/api/todoList', () => ({
  __esModule: true,
  fetchTodoListApi: jest.fn(),
}));

describe('TodoList Store', () => {
  const INITIAL_STATE = useTodoListStore.getState();
  it('initial state', () => {
    useTodoListStore.setState(INITIAL_STATE);
    const { todoList, isFetching, currentPage } = useTodoListStore.getState();

    expect(todoList.length).toBe(0);
    expect(currentPage).toBe(0);
    expect(isFetching).toBeFalsy();
  });

  describe('interact state', () => {
    const fooTodo: Todo = {
      id: 1,
      title: 'fooTitle',
      tags: ['fooTag'],
      completed: false,
    };
    const barTodo: Todo = {
      id: 2,
      title: 'barTitle',
      tags: ['fooTag', 'barTag'],
      completed: true,
    };
    const bazTodo: Todo = {
      id: 3,
      title: 'bazTitle',
      tags: ['bazTag'],
      completed: true,
    };
    const fooTodoList: Todo[] = [fooTodo, barTodo];
    useTodoListStore.setState({ todoList: fooTodoList });
    const fooState = useTodoListStore.getState();

    beforeEach(() => {
      useTodoListStore.setState(fooState, true);
    });

    describe('fetch todo list', () => {
      const fooUserId = 1234;
      const fooCurrentPage = 2;
      const mockAppendTodoList = jest.fn();
      const mockSetIsFetching = jest.fn();
      const mockShowNitification = jest.fn();
      beforeEach(() => {
        mockAppendTodoList.mockClear();
        mockSetIsFetching.mockClear();
        mockShowNitification.mockClear();
        (fetchTodoListApi as jest.Mock).mockClear();
        useTodoListStore.setState({
          currentPage: fooCurrentPage,
          appendTodoList: mockAppendTodoList,
          setIsFetching: mockSetIsFetching,
        });
        useUserStore.setState({ id: fooUserId });
        useNotificationStore.setState({ showNotification: mockShowNitification });
      });

      it('success response', async () => {
        const fooResponseList = [bazTodo];
        const fooResponse = {
          json: () => fooResponseList,
          ok: true,
        };
        (fetchTodoListApi as jest.Mock).mockImplementation(() => fooResponse);
        await useTodoListStore.getState().fetchTodoList();

        expect(mockSetIsFetching).toHaveBeenNthCalledWith(1, true);
        expect(fetchTodoListApi).toBeCalledWith(fooUserId, fooCurrentPage);
        expect(mockAppendTodoList).toBeCalledWith(fooResponseList);
        expect(mockSetIsFetching).toHaveBeenNthCalledWith(2, false);
      });

      it('fail response', async () => {
        const fooResponse = {
          ok: false,
        };
        (fetchTodoListApi as jest.Mock).mockImplementation(() => fooResponse);
        await useTodoListStore.getState().fetchTodoList();

        expect(mockSetIsFetching).toHaveBeenNthCalledWith(1, true);
        expect(fetchTodoListApi).toBeCalledWith(fooUserId, fooCurrentPage);
        expect(mockShowNitification).toBeCalledWith(FETCH_TODO_LIST_ERROR, NotificationStatus.FAIL);
        expect(mockSetIsFetching).toHaveBeenNthCalledWith(2, false);
      });

      it('server error', async () => {
        (fetchTodoListApi as jest.Mock).mockImplementation(() => { throw Error(); });
        await useTodoListStore.getState().fetchTodoList();

        expect(mockSetIsFetching).toHaveBeenNthCalledWith(1, true);
        expect(fetchTodoListApi).toBeCalledWith(fooUserId, fooCurrentPage);
        expect(mockShowNitification).toBeCalledWith(FETCH_TODO_LIST_ERROR, NotificationStatus.FAIL);
        expect(mockSetIsFetching).toHaveBeenNthCalledWith(2, false);
      });
    });

    it('get todo list from store', () => {
      const { todoList } = useTodoListStore.getState();

      expect(todoList).toEqual(fooTodoList);
    });

    it('get isFetching from store', () => {
      const { isFetching } = useTodoListStore.getState();

      expect(isFetching).toBeFalsy();
    });

    it('append todo list', () => {
      const appendedTodoList: Todo[] = [bazTodo];
      const expectedTodoList: Todo[] = fooTodoList.concat(appendedTodoList);
      useTodoListStore.getState().appendTodoList(appendedTodoList);

      expect(useTodoListStore.getState().todoList).toEqual(expectedTodoList);
    });

    it('reset todo list', () => {
      useTodoListStore.getState().resetTodoList();

      expect(useTodoListStore.getState().todoList.length).toBe(0);
    });

    it('add todo to todo list', () => {
      useTodoListStore.getState().addTodo(bazTodo);

      expect(useTodoListStore.getState().todoList).toContain(bazTodo);
    });

    it('remove todo from todo list by id', () => {
      useTodoListStore.getState().removeTodoById(fooTodo.id);

      expect(useTodoListStore.getState().todoList).not.toContain(fooTodo);
    });

    it('update todo from todo list', () => {
      const newTodo: Todo = {
        ...fooTodo,
        completed: true,
      };
      useTodoListStore.getState().updateTodo(newTodo);
      const updatedTodo = useTodoListStore.getState().todoList.filter(
        (todo) => todo.id === fooTodo.id,
      )[0];

      expect(updatedTodo).toEqual(newTodo);
    });

    it('set isFetching', () => {
      const isFetching = true;
      useTodoListStore.getState().setIsFetching(isFetching);

      expect(useTodoListStore.getState().isFetching).toEqual(isFetching);
    });

    it('set currentPage', () => {
      const fooPage = 10;
      useTodoListStore.getState().setCurrentPage(fooPage);

      expect(useTodoListStore.getState().currentPage).toEqual(fooPage);
    });

    it('reset currentPage', () => {
      const fooPage = 10;
      useTodoListStore.setState({ currentPage: fooPage });
      useTodoListStore.getState().resetCurrentPage();

      expect(useTodoListStore.getState().currentPage).toBe(0);
    });

    it('increment currentPage', () => {
      const { currentPage } = useTodoListStore.getState();
      useTodoListStore.getState().incrementCurrentPage();

      expect(useTodoListStore.getState().currentPage).toBe(currentPage + 1);
    });
  });
});
