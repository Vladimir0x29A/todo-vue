<template>
  <div id="app" class="container">
    <input
      type="text"
      class="add"
      placeholder="Что нужно сделать"
      v-model="newTodo"
      @keydown.enter="addTodo"
    />
    <transition-group tag="div" name="list-group">
      <transition-group tag="div" name="list-group" class="list" key="list-tg">
        <TodoItem
          class="list__item"
          :todo="item"
          :index="index"
          v-for="(item, index) in shownTodos"
          :key="item.id"
          @removeTodo="removeTodo"
          @renameTodo="renameTodo"
          @checkTodo="checkTodo"
        />
      </transition-group>
      <div class="list-bottom" key="bottom-top">
        <label class="list-bottom__label">
          <input
            class="list-bottom__check"
            type="checkbox"
            @change="checkAll"
            :checked="isAllChecked"
          />Отметить все
        </label>
        <span class="list-bottom__stream-el"
          >Всего: <span class="list-bottom__bold">{{ total }}</span></span
        >
        <span class="list-bottom__stream-el"
          >Осталось:
          <span class="list-bottom__bold">{{ remaining }}</span></span
        >
      </div>
      <div class="list-bottom" key="bottom-bottom">
        <button
          class="list-bottom__stream-el list-bottom__button"
          :class="{ 'list-bottom__button--active': filter === 0 }"
          @click="filter = 0"
        >
          Все
        </button>
        <button
          class="list-bottom__stream-el list-bottom__button"
          :class="{ 'list-bottom__button--active': filter === 1 }"
          @click="filter = 1"
        >
          Активные
        </button>
        <button
          class="list-bottom__stream-el list-bottom__button"
          :class="{ 'list-bottom__button--active': filter === 2 }"
          @click="filter = 2"
        >
          Завершенные
        </button>
        <transition name="fade">
          <button
            v-if="total !== remaining"
            class="list-bottom__button list-bottom__button--clear"
            @click="removeCompleted"
          >
            Очистить выполненные
          </button>
        </transition>
      </div>
    </transition-group>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem";
export default {
  name: "App",
  components: { TodoItem },
  data: () => ({
    nextId: 0,
    newTodo: "",
    isAllChecked: false,
    filter: 0,
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
  }),
  computed: {
    shownTodos() {
      switch (this.filter) {
        case 0:
          return this.todos;
        case 1:
          return this.todos.filter(item => !item.completed);
        case 2:
          return this.todos.filter(item => item.completed);
      }
    },
    total() {
      return this.todos.length;
    },
    remaining() {
      return this.todos.filter(item => !item.completed).length;
    }
  },
  watch: {
    remaining(val) {
      if (val === this.total) {
        this.isAllChecked = false;
      } else if (!val) {
        this.isAllChecked = true;
      }
    },
    total() {
      if (this.remaining || !this.total) {
        this.isAllChecked = false;
      }
    }
  },
  methods: {
    checkAll() {
      this.isAllChecked = !this.isAllChecked;
      this.todos.forEach(item => {
        item.completed = this.isAllChecked;
      });
    },
    addTodo() {
      if (this.newTodo) {
        this.todos.push({
          id: this.nextId,
          title: this.newTodo,
          completed: false
        });
        this.newTodo = "";
        this.nextId++;
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    renameTodo({ index, title }) {
      this.todos[index].title = title;
    },
    checkTodo({ index, completed }) {
      this.todos[index].completed = completed;
    },
    removeCompleted() {
      this.todos = this.todos.filter(item => !item.completed);
    }
  },
  created() {
    this.nextId = this.todos.length;
  }
};
</script>

<style lang="scss">
@import "styles/main";
</style>
