import useTodoListStore, { Todo } from 'src/store/todoList';

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
describe('TodoList Store', () => {
  useTodoListStore.setState({ todoList: fooTodoList });
  const INITIAL_STATE = useTodoListStore.getState();

  beforeEach(() => {
    useTodoListStore.setState(INITIAL_STATE, true);
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
});
