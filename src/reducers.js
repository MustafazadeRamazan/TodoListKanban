import { ADD_TODO, MOVE_TODO } from './actions';

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.todos.length + 1,
            title: action.payload.title,
            category: action.payload.category,
          },
        ],
      };
    case MOVE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, category: action.payload.category }
            : todo
        ),
      };
    default:
      return state;
  }
};

export default todoReducer;
