import React from 'react';
import { render } from '@testing-library/react';
import { create } from 'react-test-renderer';
import TodoList from 'src/components/TodoList';
import HomePage from '../HomePage';

describe('HomePage component', () => {
  it('Render HomePage', async () => {
    const wrapper = render(<HomePage />);

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render Todolist component', async () => {
    const wrapper = create(<HomePage />);
    const todoListComponents = wrapper.root.findAllByType(TodoList);

    expect(todoListComponents.length).toBe(1);
  });
});
