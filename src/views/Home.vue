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
        @toggleTitle="toggleTitle"
        @deleteToDo="deleteToDo"
        @updateTitle="updateTitle"
        @toggleEdit="toggleEdit"
        @deleteSubCard="deleteSubCard"
        @updateSubCard="updateSubCard"
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
        content: [
          { text: "Loreum Ispum", isEdit: false },
          { text: "Loreum Ispum", isEdit: false },
        ],
        isEdit: false,
      },
      {
        id: 1,
        title: "Second List",
        content: [
          { text: "Loreum Ispum", isEdit: false },
          { text: "Loreum Ispum", isEdit: false },
        ],
        isEdit: false,
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

    const addToDo = (data) => {
      toDoList.value = [...toDoList.value, data];
      saveToDo();
      toggle();
    };

    const toggleAddNew = (id, isOpen) => {
      toDoList.value = toDoList.value.map((list, index) => {
        return id === index ? { ...list, isEdit: isOpen } : list;
      });
    };

    const onAdd = (id, data) => {
      toDoList.value = toDoList.value.map((list) => {
        return list.id === id
          ? {
              ...list,
              isEdit: false,
              content: [...list.content, { text: data, isEdit: false }],
            }
          : list;
      });
      saveToDo();
    };

    const toggleTitle = (id, isOpen) => {
      activeIndex.value = isOpen ? id : null;
    };

    const deleteToDo = (id) => {
      if (window.confirm("Are you sure to delete this?")) {
        toDoList.value = toDoList.value.filter((list, index) => {
          return index !== id;
        });
        saveToDo();
      }
    };

    const updateTitle = (id, data) => {
      toDoList.value = toDoList.value.map((list, index) => {
        return index === id ? { ...list, title: data } : list;
      });
      saveToDo();
    };

    const toggleEdit = ({ rootId, id, isOpen }) => {
      toDoList.value = toDoList.value.map((list, index) => {
        return index === rootId
          ? {
              ...list,
              content: list.content.map((item, idx) => {
                return idx === id ? { ...item, isEdit: isOpen } : item;
              }),
            }
          : list;
      });
    };

    const deleteSubCard = ({ rootId, id }) => {
      toDoList.value = toDoList.value.map((list, index) => {
        return index === rootId
          ? {
              ...list,
              content: list.content.filter((_, idx) => {
                return idx !== id;
              }),
            }
          : list;
      });
    };

    const updateSubCard = ({ rootId, id, text }) => {
      toDoList.value = toDoList.value.map((list, index) => {
        return index === rootId
          ? {
              ...list,
              content: list.content.map((item, idx) => {
                return idx === id ? { ...item, isEdit: false, text } : item;
              }),
            }
          : list;
      });
      saveToDo();
    };

    const saveToDo = () => {
      localStorage.setItem("todo", JSON.stringify(toDoList.value));
    };

    useOnClickOutSide(toDoRef, closeToDoList);

    return {
      toDoList,
      isOpen,
      toDoRef,
      activeIndex,
      toggle,
      addToDo,
      toggleAddNew,
      onAdd,
      deleteToDo,
      toggleTitle,
      updateTitle,
      toggleEdit,
      deleteSubCard,
      updateSubCard,
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
