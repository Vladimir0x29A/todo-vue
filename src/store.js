import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [
      {
        id: 0,
        title: "Какое-то задание",
        completed: false
      },
      {
        id: 1,
        title: "Еще одно задание",
        completed: false
      }
    ]
  },
  getters: {
    total(state) {
      return state.todos.length;
    },
    remaining(state) {
      return state.todos.filter(item => !item.completed).length;
    }
  },
  mutations: {
    addTodo(state, { id, title }) {
      state.todos.push({
        id,
        title,
        completed: false
      });
    },
    removeTodo(state, index) {
      state.todos.splice(index, 1);
    },
    checkTodo(state, { index, completed }) {
      state.todos[index].completed = completed;
    },
    removeCompleted(state) {
      state.todos = state.todos.filter(item => !item.completed);
    },
    renameTodo(state, { index, title }) {
      state.todos[index].title = title;
    },
    checkAll(state, isAllChecked) {
      state.todos.forEach(item => {
        item.completed = isAllChecked;
      });
    }
  },
  actions: {}
});
