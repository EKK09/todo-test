import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import useTodoListStore, { Todo } from 'src/store/todoList';
import styled from 'styled-components';

export interface TodoListItemProps {
  todo: Todo
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid palevioletred;
  border-radius: 8px;
  margin-bottom: 4px;
  padding: 0 4px;
`;
const Title = styled.h3`
  font-size: 1.5rem;
  color: #727f8b;
`;
const TagsWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Tag = styled.span`
  background-color: CornflowerBlue;
  border-radius: 4px;
  color: white;
  padding: 4px 6px;
  margin: 4px;
`;
const CheckLabel = styled.span`
  color: #727f8b;
  font-weight: bolder;
`;

const TodoListItem = (props: TodoListItemProps): React.ReactElement => {
  const { todo } = props;
  const { t } = useTranslation();
  const updateTodo = useTodoListStore((state) => state.updateTodo);
  const handleCompletedChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateTodo({
      ...todo,
      completed: event.target.checked,
    });
  };

  return (
    <Wrapper>
      <Title>
        {todo.title}
      </Title>
      <TagsWrapper>
        {todo.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
      </TagsWrapper>
      <div>
        <CheckLabel>
          {t('todo.completed')}
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleCompletedChange}
            data-testid="completed-checkbox"
          />
        </CheckLabel>
      </div>
    </Wrapper>
  );
};

export default TodoListItem;
