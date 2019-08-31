<template>
  <div class="list-item">
    <input
      class="list-item__check"
      type="checkbox"
      :checked="todo.completed"
      @change="check"
    />
    <div
      class="list-item__name"
      :class="{ 'list-item__name--completed': todo.completed }"
      @click="editTodo"
      v-if="!editable"
    >
      {{ todo.title }}
    </div>
    <input
      class="list-item__editor"
      type="text"
      v-model="titleCache"
      v-else
      v-focus
      @keydown.enter="doneEdit"
      @blur="doneEdit"
      @keydown.esc="cancelEdit"
    />
    <div class="list-item__remove" @click="removeTodo">
      &times;
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  data() {
    return {
      titleCache: "",
      editable: false
    };
  },
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  },
  methods: {
    check() {
      this.$store.commit("checkTodo", {
        index: this.index,
        completed: !this.todo.completed
      });
    },
    removeTodo() {
      this.$store.commit("removeTodo", this.index);
    },
    editTodo() {
      this.titleCache = this.todo.title;
      this.editable = true;
    },
    doneEdit() {
      if (this.titleCache && this.titleCache !== this.todo.title) {
        this.$store.commit("renameTodo", {
          index: this.index,
          title: this.titleCache
        });
        this.titleCache = "";
      }
      this.editable = false;
    },
    cancelEdit() {
      this.editable = false;
      this.titleCache = "";
    }
  }
};
</script>

<style lang="scss">
@import "../styles/todo-item";
</style>
