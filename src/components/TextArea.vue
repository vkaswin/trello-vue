<template>
  <textarea
    class="card-text-field"
    :value="value"
    @input="emit('onChange', $event)"
  />
</template>

<script>
export default {
  name: "TextArea",
  props: ["value"],
  setup(_, { emit }) {
    return {
      emit,
    };
  },
};
</script>

<style lang="scss">
.card-text-field {
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 0 rgba(9, 45, 66, 0.25);
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  outline: none;
  resize: none;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
}
</style>
