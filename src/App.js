import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, moveTodo } from './actions';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 8,
    padding: 8,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  todoListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todoList: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  todoTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  moveButton: {
    backgroundColor: '#2196f3',
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
  },
  moveButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

const TodoList = ({ category, todos, onMove }) => (
  <View style={styles.todoList}>
    <Text style={styles.title}>{category}</Text>
    {todos.map((todo) => (
      <View key={todo.id} style={{ marginBottom: 8 }}>
        <Text style={styles.todoTitle}>{todo.title}</Text>
        <TouchableOpacity
          style={styles.moveButton}
          onPress={() => onMove(todo.id)}
        >
          <Text style={styles.moveButtonText}>Move</Text>
        </TouchableOpacity>
      </View>
    ))}
  </View>
);

const App = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);
  
    const [todoTitle, setTodoTitle] = useState('');
    const [todoCategory, setTodoCategory] = useState('Todo');
  
    const handleAddTodo = () => {
      if (todoTitle.trim() !== '') {
        dispatch(addTodo(todoTitle, todoCategory));
        setTodoTitle('');
      }
    };
  
    const handleMoveTodo = (id) => {
      dispatch(moveTodo(id, 'Done'));
    };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Todo List Kanban</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter todo title"
          value={todoTitle}
          onChangeText={(text) => setTodoTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter category"
          value={todoCategory}
          onChangeText={(text) => setTodoCategory(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>Add Todo</Text>
        </TouchableOpacity>
        <View style={styles.todoListContainer}>
          <TodoList
            category="Todo"
            todos={todos.filter((todo) => todo.category === 'Todo')}
            onMove={handleMoveTodo}
          />
          <TodoList
            category="Done"
            todos={todos.filter((todo) => todo.category === 'Done')}
            onMove={handleMoveTodo}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
