<template>
  <header>
    <label>{{ title }}</label>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: ["title"],
};
</script>

<style lang="scss">
header {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #40a35b;
  color: white;
  padding: 10px;
  font-size: 32px;
  text-transform: uppercase;
}
</style>
