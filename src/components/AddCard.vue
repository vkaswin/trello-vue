<template>
  <div class="add-list-card">
    <div>
      <textarea v-model="title" />
      <span v-if="error" class="error-msg">Please enter title</span>
    </div>
    <div class="add-todo-btn">
      <button @click="addToDo">Add List</button>
      <i class="fas fa-times" @click="emit('toggle')"></i>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "AddCard",
  props: ["toDoItems"],
  setup(props, { emit }) {
    const title = ref("");

    const validate = ref(false);

    const error = ref(false);

    watch(title, (val) => {
      if (validate.value) {
        if (val === "") {
          error.value = true;
        } else {
          error.value = false;
        }
      }
    });

    const addToDo = () => {
      validate.value = true;
      if (title.value === "") {
        error.value = true;
      } else {
        const { toDoItems } = props;
        emit("addToDo", {
          id: toDoItems.length,
          title,
          subTitle: [],
        });
      }
    };

    return {
      title,
      error,
      emit,
      addToDo,
    };
  },
};
</script>

<style lang="scss">
.add-list-card {
  background-color: #dfe3e6;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 250px;
  height: fit-content;
  padding: 10px;
  border-radius: 4px;
  .add-todo-btn {
    display: flex;
    gap: 10px;
    align-items: center;
    i {
      color: #6f7173;
      font-size: 18px;
      font-weight: normal;
      cursor: pointer;
    }
    button {
      background-color: rgb(90, 172, 68);
      border: none;
      padding: 5px 0px;
      color: white;
      font-size: 16px;
      width: 80px;
      border-radius: 4px;
      outline: none;
    }
  }
}
</style>
