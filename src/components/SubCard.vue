<template>
  <div class="edi-sub-card" v-if="data.isEdit">
    <TextArea :value="data.text" name="subCardText" @onChange="handleChange" />
    <span v-if="error" class="error-msg">Please enter text</span>
    <div class="edit-sub-card-btn">
      <button class="save-btn" @click="onSave">Save</button>
      <button class="delete-btn" @click="emit('deleteSubCard', { rootId, id })">
        Delete
      </button>
      <i
        class="fas fa-times"
        @click="emit('toggleEdit', { rootId, id, isOpen: false })"
      ></i>
    </div>
  </div>
  <div class="sub-card" v-else>
    <i
      class="fas fa-pencil-alt"
      @click="emit('toggleEdit', { rootId, id, isOpen: true })"
    ></i>
    <p>{{ data.text }}</p>
  </div>
</template>

<script>
import TextArea from "@/components/TextArea";
import { ref, watch } from "vue";

export default {
  name: "SubCard",
  components: {
    TextArea,
  },
  props: {
    data: {
      type: Object,
    },
    rootId: {
      type: Number,
    },
    id: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const subCardText = ref("");

    const error = ref(false);

    const validate = ref(false);

    watch(subCardText, (val) => {
      if (validate.value) {
        if (val === "") {
          error.value = true;
        } else {
          error.value = false;
        }
      }
    });

    const handleChange = (event) => {
      const { value } = event.target;
      subCardText.value = value;
    };

    const onSave = () => {
      const { rootId, id } = props;
      validate.value = true;
      if (subCardText.value === "") {
        error.value = true;
      } else {
        emit("updateSubCard", { rootId, id, text: subCardText });
      }
    };

    return {
      subCardText,
      error,
      emit,
      handleChange,
      onSave,
    };
  },
};
</script>

<style lang="scss">
.sub-card {
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 0 rgba(9, 45, 66, 0.25);
  padding: 10px;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  cursor: default;
  position: relative;
  i {
    position: absolute;
    top: 0;
    right: 0;
    font-weight: normal;
    opacity: 0;
    background: #dcdcdc;
    color: gray;
    font-size: 13px;
    padding: 5px;
    transition: all 0.2s;
    border-radius: 0px 0px 0px 4px;
    cursor: pointer;
  }
  p {
    margin: 0px;
  }
  &:hover {
    i {
      opacity: 1;
    }
  }
}

.edit-sub-card-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 5px;
  button {
    width: 70px;
    border: none;
    border-radius: 4px;
    padding: 5px 0px;
    color: white;
    font-size: 16px;
    outline: none;
  }
  .save-btn {
    background-color: rgb(90, 172, 68);
  }
  .delete-btn {
    background-color: rgb(234, 37, 37);
  }
  i {
    color: #6f7173;
    font-size: 18px;
    font-weight: normal;
    cursor: pointer;
  }
}
</style>
