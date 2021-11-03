<template>
  <textarea
    :placeholder="placeholder"
    class="card-text-field"
    :value="value"
    :name="name"
    @input="emit('onChange', $event)"
  />
</template>

<script>
export default {
  name: "TextArea",
  props: {
    value: {
      type: String,
    },
    name: {
      type: String,
    },
    placeholder: {
      default: "Enter the text for this card...",
      type: String,
    },
  },
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
  max-width: 300px;
  width: 100%;
  outline: none;
  resize: none;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  &::placeholder {
    color: #757775;
  }
}
</style>
