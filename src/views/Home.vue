<template>
  <div class="container">
    <Header title="Trello App" />
    <div class="card-wrapper">
      <MainCard
        v-for="(list, index) in toDoList"
        :key="index"
        :list="list"
        :activeIndex="activeIndex"
        @toggleAddNew="toggleAddNew"
        @onAdd="onAdd"
      />
      <div class="add-list" ref="toDoRef">
        <AddCard
          v-if="isOpen"
          :toDoItems="toDoList"
          @addToDo="addToDo"
          @toggle="toggle"
        />
        <button class="add-list-btn" @click="toggle" v-else>
          <i class="fas fa-plus"></i><span>Add List</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import MainCard from "@/components/MainCard";
import AddCard from "@/components/AddCard";
import { ref, onMounted } from "vue";
import { useOnClickOutSide } from "@/composables/useOnClickOutSide";

export default {
  name: "Home",
  components: {
    Header,
    MainCard,
    AddCard,
  },
  setup() {
    const toDoList = ref([
      {
        id: 0,
        title: "First List",
        subTitle: ["Loreum Ispum", "Loreum Ispum"],
      },
      {
        id: 1,
        title: "Second List",
        subTitle: ["Loreum Ispum", "Loreum Ispum"],
      },
    ]);

    const toDoRef = ref(null);

    const isOpen = ref(false);

    const activeIndex = ref(null);

    onMounted(() => {
      let list = localStorage.getItem("todo");
      if (list !== null) {
        toDoList.value = JSON.parse(list);
      }
    });

    const toggle = () => {
      isOpen.value = !isOpen.value;
    };

    const closeToDoList = () => {
      isOpen.value = false;
    };

    useOnClickOutSide(toDoRef, closeToDoList);

    const addToDo = (data) => {
      toDoList.value = [...toDoList.value, data];
      localStorage.setItem("todo", JSON.stringify(toDoList.value));
      toggle();
    };

    const toggleAddNew = (id, isOpen) => {
      activeIndex.value = isOpen ? id : null;
    };

    const onAdd = (id, data) => {
      toDoList.value = toDoList.value.map((list) => {
        return list.id === id
          ? { ...list, subTitle: [...list.subTitle, data] }
          : list;
      });
      localStorage.setItem("todo", JSON.stringify(toDoList.value));
    };

    return {
      toDoList,
      isOpen,
      toDoRef,
      activeIndex,
      toggle,
      addToDo,
      toggleAddNew,
      onAdd,
    };
  },
};
</script>

<style lang="scss">
.container {
  width: 100%;
  min-height: 100vh;
  background: #4bbf6b;
  .card-wrapper {
    display: flex;
    flex-wrap: nowrap;
    gap: 15px;
    overflow-x: auto;
    width: 100%;
    min-height: calc(100vh - 83px);
    margin-top: 15px;
    .add-list {
      width: 300px;
      height: fit-content;
      margin-left: 15px;
      .add-list-btn {
        background: rgba(0, 0, 0, 0.12);
        padding: 10px 10px;
        border-radius: 10px;
        border: none;
        width: 200px;
        color: white;
        display: flex;
        gap: 5px;
        justify-content: flex-start;
        align-items: center;
        outline: none;
        i {
          font-size: 16px;
          font-weight: normal;
          margin-top: -2px;
        }
        span {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
