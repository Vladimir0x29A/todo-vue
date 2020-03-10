import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
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
    initTodo(state, payload) {
      state.todos = payload;
    },
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
  actions: {
    fetchTodos({commit}) {
      return new Promise((resolve, reject) => {
        axios.get('http://todo-api/todos')
          .then(response => {
            commit('initTodo', response.data);
            resolve(response);
          });
      });
    },
    fetchAddingTodo({commit}) {
      return new Promise((resolve, reject) => {
        axios.post('http://todo-api/add-todo')
          .then(response => {
            // commit('addTodo', response.data);
            // resolve(response);
          });
      });
    },
  }
});
