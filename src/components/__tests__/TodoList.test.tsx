import React from 'react';
import { render } from '@testing-library/react';
import useTodoListStore, { Todo } from 'src/store/todoList';
import TodoListItem from 'src/components/TodoListItem';
import { create } from 'react-test-renderer';
import TodoList from '../TodoList';

jest.mock('src/components/TodoListItem', () => 'Mock-TodoListItem');

describe('TodoList component', () => {
  const fooTodo: Todo = {
    id: 1,
    title: 'fooTitle',
    tags: ['fooTag'],
    completed: false,
  };
  const barTodo: Todo = {
    id: 2,
    title: 'barTitle',
    tags: ['barTag'],
    completed: true,
  };
  const fooTodoList = [fooTodo, barTodo];
  const mockFetchTodoList = jest.fn();

  beforeEach(() => {
    mockFetchTodoList.mockClear();
  });

  describe('render TodoList', () => {
    it('todo list is not ready', async () => {
      useTodoListStore.setState({ isFetching: true, fetchTodoList: mockFetchTodoList });
      const component = render(<TodoList />);

      expect(component.container).toMatchSnapshot();
    });

    it('todo list is ready', async () => {
      useTodoListStore.setState({ isFetching: false, todoList: fooTodoList });
      const component = render(<TodoList />);

      expect(component.container).toMatchSnapshot();
    });
  });

  it('fetch todo list after component mounted', async () => {
    useTodoListStore.setState({ fetchTodoList: mockFetchTodoList });
    render(<TodoList />);

    expect(mockFetchTodoList).toBeCalledTimes(1);
  });

  it('pass todo to TodoListItem component', async () => {
    useTodoListStore.setState({ fetchTodoList: mockFetchTodoList, todoList: fooTodoList });
    const testRenderer = create(<TodoList />);

    fooTodoList.forEach((todo, index) => {
      const todoListItem = testRenderer.root.findAllByType(TodoListItem)[index];
      expect(todoListItem.props.todo).toEqual(todo);
    });
  });
});
