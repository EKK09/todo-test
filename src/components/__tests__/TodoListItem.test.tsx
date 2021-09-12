import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n, { Lang } from 'src/i18n';
import useTodoListStore, { Todo } from 'src/store/todoList';
import TodoListItem from '../TodoListItem';

describe('TodoListItem component', () => {
  const fooTodo: Todo = {
    id: 1234,
    title: 'fooTitle',
    tags: ['fooTag'],
    completed: false,
  };

  it('Render TodoListItem english version', async () => {
    i18n.changeLanguage(Lang.EN_US);
    const component = render(
      <I18nextProvider i18n={i18n}>
        <TodoListItem todo={fooTodo} />
      </I18nextProvider>,
    );

    expect(component.container).toMatchSnapshot();
  });

  it('Render TodoListItem chinese version', async () => {
    i18n.changeLanguage(Lang.ZH_TW);
    const component = render(
      <I18nextProvider i18n={i18n}>
        <TodoListItem todo={fooTodo} />
      </I18nextProvider>,
    );

    expect(component.container).toMatchSnapshot();
  });

  describe('TodoListItem checkbox status', () => {
    it('todo completed', async () => {
      const { getByTestId } = render(
        <I18nextProvider i18n={i18n}>
          <TodoListItem todo={{ ...fooTodo, completed: true }} />
        </I18nextProvider>,
      );
      const checkbox = getByTestId('completed-checkbox') as HTMLInputElement;

      expect(checkbox.checked).toBeTruthy();
    });

    it('todo not completed', async () => {
      const { getByTestId } = render(
        <I18nextProvider i18n={i18n}>
          <TodoListItem todo={{ ...fooTodo, completed: false }} />
        </I18nextProvider>,
      );
      const checkbox = getByTestId('completed-checkbox') as HTMLInputElement;

      expect(checkbox.checked).toBeFalsy();
    });
  });

  it('toggle todo completed status', async () => {
    const mockUpdateTodo = jest.fn();
    useTodoListStore.setState({ updateTodo: mockUpdateTodo });
    const { getByTestId } = render(
      <I18nextProvider i18n={i18n}>
        <TodoListItem todo={fooTodo} />
      </I18nextProvider>,
    );
    const checkbox = getByTestId('completed-checkbox');
    fireEvent.click(checkbox);

    expect(mockUpdateTodo).toBeCalledWith({
      ...fooTodo,
      completed: !fooTodo.completed,
    });
  });
});
