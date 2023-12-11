export const ADD_TODO = 'ADD_TODO';
export const MOVE_TODO = 'MOVE_TODO';

export const addTodo = (title, category) => ({
  type: ADD_TODO,
  payload: { title, category },
});

export const moveTodo = (id, category) => ({
  type: MOVE_TODO,
  payload: { id, category },
});
