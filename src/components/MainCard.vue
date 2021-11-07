<template>
  <div class="card">
    <div class="card-title">
      <div class="delete-title" ref="titleRef" v-if="activeIndex === list.id">
        <TextArea
          placeholder="Enter title..."
          :value="title"
          name="title"
          @onChange="handleChange"
        />
        <i class="fas fa-trash" @click="emit('deleteToDo', list.id)"></i>
      </div>
      <div class="edit-title" v-else>
        <label>{{ list.title }}</label>
        <i class="fas fa-pencil-alt" @click="toggleTitle"></i>
      </div>
    </div>
    <SubCard
      v-for="(item, index) in list.content"
      :key="index"
      :data="item"
      :id="index"
      :rootId="list.id"
      @toggleEdit="toggleEdit"
      @deleteSubCard="deleteSubCard"
      @updateSubCard="updateSubCard"
    />
    <div class="add-sub-card">
      <div v-if="list.isEdit" class="sub-card-field">
        <div>
          <TextArea
            :value="cardText"
            name="cardText"
            @onChange="handleChange"
          />
          <span class="error-msg" v-if="error">Please enter text</span>
        </div>
        <div class="sub-field-btn">
          <button @click="addCard">Add Card</button>
          <i class="fas fa-times" @click="closeCard"></i>
        </div>
      </div>
      <div v-else class="sub-card-btn">
        <button @click="emit('toggleAddNew', list.id, true)">
          <i class="fas fa-plus"></i><b>Add New Card</b>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SubCard from "@/components/SubCard";
import TextArea from "@/components/TextArea";
import { ref, watch } from "vue";
import { useOnClickOutSide } from "@/composables/useOnClickOutSide";

export default {
  name: "MainCard",
  components: {
    SubCard,
    TextArea,
  },
  props: {
    list: {
      type: Object,
    },
    activeIndex: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const cardText = ref("");

    const title = ref("");

    const error = ref(false);

    const validate = ref(false);

    const titleRef = ref();

    watch(cardText, (val) => {
      if (validate.value) {
        if (val === "") {
          error.value = true;
        } else {
          error.value = false;
        }
      }
    });

    const handleChange = (event) => {
      const { value, name } = event.target;
      if (name === "title") {
        title.value = value;
      } else if (name === "cardText") {
        cardText.value = value;
      }
    };

    const addCard = () => {
      const {
        list: { id },
      } = props;
      validate.value = true;
      if (cardText.value === "") {
        error.value = true;
      } else {
        emit("onAdd", id, cardText.value);
        closeCard();
      }
    };

    const closeCard = () => {
      const {
        list: { id },
      } = props;
      validate.value = false;
      error.value = false;
      cardText.value = "";
      emit("toggleAddNew", id, false);
    };

    const closeTitle = () => {
      const {
        list: { id },
      } = props;
      emit("updateTitle", id, title.value);
      emit("toggleTitle", id, false);
    };

    const toggleTitle = () => {
      const {
        list: { id, title: text },
      } = props;
      title.value = text;
      emit("toggleTitle", id, true);
    };

    const toggleEdit = (data) => {
      emit("toggleEdit", data);
    };

    const deleteSubCard = (data) => {
      emit("deleteSubCard", data);
    };

    const updateSubCard = (data) => {
      emit("updateSubCard", data);
    };

    useOnClickOutSide(titleRef, closeTitle);

    return {
      cardText,
      error,
      title,
      titleRef,
      emit,
      addCard,
      closeCard,
      handleChange,
      toggleTitle,
      toggleEdit,
      deleteSubCard,
      updateSubCard,
    };
  },
};
</script>

<style lang="scss">
.card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #dfe3e6;
  max-width: 300px;
  min-width: 300px;
  height: fit-content;
  padding: 10px;
  border-radius: 10px;
  .card-title {
    .delete-title {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      i {
        background-color: transparent;
        color: #6f7173;
        font-size: 20px;
        padding: 5px;
        border-radius: 4px;
        transition: background-color 0.2s;
        cursor: pointer;
        &:hover {
          background-color: #ccc;
        }
      }
    }
    .edit-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      label {
        font-size: 20px;
        margin: 0px;
      }
      i {
        font-weight: normal;
        opacity: 0;
        background: #ccc;
        color: gray;
        font-size: 13px;
        padding: 5px;
        transition: all 0.2s;
        border-radius: 4px;
        cursor: pointer;
      }
      &:hover {
        i {
          opacity: 1;
        }
      }
    }
  }
  .add-sub-card {
    background-color: #dfe3e6;
    transition: background-color 0.2s;
    box-sizing: border-box;
    .sub-card-btn {
      button {
        display: flex;
        justify-content: flex-start;
        gap: 5px;
        padding: 5px;
        border: none;
        color: #6b808c;
        background-color: inherit;
        font-size: 16px;
        width: 100%;
        transition: color 0.2s;
        outline: none;
        i {
          font-weight: lighter;
        }
      }
    }
    .sub-card-field {
      display: flex;
      flex-direction: column;
      gap: 5px;
      .sub-field-btn {
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
          background: rgb(90, 172, 68);
          border: none;
          padding: 5px 0px;
          color: white;
          font-size: 15px;
          width: 85px;
          border-radius: 4px;
          outline: none;
        }
      }
    }
  }
  &:first-child {
    margin-left: 15px;
  }
  &:last-child {
    margin-right: 15px;
  }
}
</style>
