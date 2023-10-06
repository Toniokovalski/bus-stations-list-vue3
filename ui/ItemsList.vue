<template>
 <ul class="list-group">
  <li
    v-for="(stop) in items" :key="stop"
    class="list-group-item border border-top-0 border-start-0 border-end-0 border-bottom-1 border-light"
    :class="{ selected: stop === clickedStop }"
    @click="selectStopName(stop, shouldUpdateName)"
  >
   {{ stop }}
  </li>
 </ul>
</template>

<script lang="ts">
import {mapActions} from "vuex";
import {defineComponent} from "vue";

export default defineComponent ({
 data() {
  return {
   clickedStop: null,
  };
 },
 props: {
  items: {
   type: Array,
   required: true
  },
  shouldUpdateName: {
   type: Boolean,
   required: true
  }
 },
 methods: {
  ...mapActions(['selectStop']),
  selectStopName(stop, shouldUpdateName) {
   if (shouldUpdateName) {
    this.clickedStop = stop;
    this.selectStop(stop);
   } else {
    this.clickedStop = stop;
   }
  },
 }
});
</script>

<style scoped lang="scss">
ul {
 height: 388px;
 overflow-y: scroll;
 padding-right: 35px;
 box-sizing: content-box;
 width: 100%;
}

li {
 cursor: pointer;
 padding: 20px 24px;
 border: none;
 margin-right: -20px;

 &:hover {
  background-color: #F3F4F9;
 }

 &.selected {
  color: #1952E1;
 }
}
</style>
