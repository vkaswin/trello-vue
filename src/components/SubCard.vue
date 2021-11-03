<template>
  <div class="sub-card">
    <i class="fas fa-pencil-alt"></i>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: "SubCard",
  props: ["text"],
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
</style>
