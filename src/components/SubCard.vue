<template>
  <div class="edi-sub-card" v-if="data.isEdit">
    <TextArea />
    <div class="edit-sub-card-btn">
      <button class="save-btn">Save</button>
      <button class="delete-btn">Delete</button>
      <i class="fas fa-times"></i>
    </div>
  </div>

  <div class="sub-card" v-else>
    <i class="fas fa-pencil-alt"></i>
    <p>{{ data.text }}</p>
  </div>
</template>

<script>
import TextArea from "@/components/TextArea";
export default {
  name: "SubCard",
  components: {
    TextArea,
  },
  props: ["data"],
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
  button {
    width: 70px;
    border: none;
    border-radius: 4px;
    padding: 5px 0px;
    color: white;
    font-size: 16px;
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
