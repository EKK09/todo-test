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
  const { todoList, isFetching, fetchTodoList } = useTodoListStore(
    (state) => ({
      todoList: state.todoList,
      isFetching: state.isFetching,
      fetchTodoList: state.fetchTodoList,
    }),
  );
  const todoListItems = todoList.map((todo) => <TodoListItem key={todo.id} todo={todo} />);

  useEffect(() => {
    fetchTodoList();
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
