import React, { useEffect } from 'react';
import useTodoListStore from 'src/store/todoList';
import styled from 'styled-components';
import TodoListItem from './TodoListItem';

const LoadingWrapper = styled.div`
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
`;

const TodoList = (): React.ReactElement => {
  const {
    todoList, isFetching, fetchTodoList, restTodoList,
  } = useTodoListStore(
    (state) => ({
      todoList: state.todoList,
      isFetching: state.isFetching,
      fetchTodoList: state.fetchTodoList,
      restTodoList: state.resetTodoList,
    }),
  );
  const todoListItems = todoList.map((todo) => <TodoListItem key={todo.id} todo={todo} />);

  useEffect(() => {
    fetchTodoList();
    return function cleanup() {
      restTodoList();
    };
  }, []);

  if (isFetching) {
    return <LoadingWrapper>Loading ....</LoadingWrapper>;
  }

  return (
    <div>
      {todoListItems}
    </div>
  );
};

export default TodoList;
