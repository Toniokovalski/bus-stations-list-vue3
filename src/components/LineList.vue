<template>
 <div class="p-4 bg-white mb-3">
  <h6>Select bus line</h6>
  <ul class="list-group list-group-horizontal">
   <li
     class="list-group-item border-0"
     :class="{ selected: line === selectedLine }"
     v-for="(line) in getLines" :key="line"
     @click="selectLineNumber(line)"
   >
    <button class="btn btn-primary" type="button">{{ line }}</button>
   </li>
  </ul>
 </div>
</template>

<script lang="ts">
import { mapGetters, mapActions} from 'vuex';
import {defineComponent} from "vue";

export default defineComponent ({
 data() {
  return {
   selectedLine: null as string | null,
  };
 },
 name: 'LineList',
 computed: {
  ...mapGetters(['getLines']),
 },
 methods: {
  ...mapActions(['selectLine', 'selectStop']),
  selectLineNumber(line: string) {
   this.selectedLine = line;
   this.selectLine(line);
   this.selectStop(null);
  },
 },
});
</script>

<style scoped lang="scss">
.list-group-item {
 &.selected button {
  background-color: #2E3E6E;
  border-color: #2E3E6E;
 }
}
</style>
