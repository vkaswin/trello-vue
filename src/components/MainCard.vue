<template>
  <div class="card">
    <div class="card-title">
      <label>{{ list.title }}</label>
    </div>
    <SubCard v-for="(item, index) in list.subTitle" :key="index" :text="item" />
    <div class="add-sub-card">
      <div v-if="list.id === activeIndex" class="sub-card-field">
        <div>
          <textarea placeholder="Enter the text for this card..." />
        </div>
        <div class="sub-field-btn">
          <button>Add Card</button>
          <i
            class="fas fa-times"
            @click="emit('toggleAddNew', list.id, false)"
          ></i>
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

export default {
  name: "MainCard",
  components: {
    SubCard,
  },
  props: ["list", "activeIndex"],
  setup(_, { emit }) {
    return {
      emit,
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
  width: 300px;
  height: fit-content;
  padding: 10px;
  border-radius: 10px;
  .card-title {
    label {
      font-size: 20px;
      margin: 0px;
    }
  }
  .add-sub-card {
    background-color: #dfe3e6;
    border-radius: 0px 0px 10px 10px;
    transition: background-color 0.2s;
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
      max-width: 100%;
      textarea {
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.12);
        box-shadow: 0 1px 0 rgba(9, 45, 66, 0.25);
        border-radius: 5px;
        width: calc(100% - 20px);
        padding: 10px;
        outline: none;
        resize: none;
        &::placeholder {
          color: #757775;
        }
      }
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
