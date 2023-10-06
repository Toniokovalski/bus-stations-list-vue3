<template :key="lineNumber">
 <div v-if="busStations.length" class="bg-white wrap">
  <h6 class="p-4 pb-2">Bus Line: {{ lineNumber }}</h6>
  <ItemsList :items="busStations" :shouldUpdateName="true" />
 </div>
 <div class="bg-white wrap d-flex align-items-center justify-content-center dashed" v-else>
  <div>Please select the bus line first</div>
 </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {mapGetters} from 'vuex';
import ItemsList from "../../ui/ItemsList.vue";

export default defineComponent ({
 data() {
  return {
   lineNumber: null as string | null,
   busStations: [] as string[],
   currentStop: null as string | null
  };
 },
 name: "StopList",
 components: {
  ItemsList,
 },
 computed: {
  ...mapGetters(['getSelectedLine', 'getSelectedStop']),
 },
 watch: {
  'getSelectedLine'(newLine) {
   this.lineNumber = newLine
   this.busStations = Object.keys(this.$store.state.linesDataObj[newLine])
  },
  'getSelectedStop'(newStop) {
   this.currentStop = newStop
  }
 },
});
</script>

<style scoped lang="scss">
.wrap {
 width: 680px;
 min-height: 388px;
 max-height: 388px;
 overflow: hidden;
 border-radius: 4px;
 padding-bottom: 60px;
 box-sizing: content-box;

 &.dashed {
  display: inline-flex;
  position: relative;
  clip-path: inset(0 round 8px 8px 8px 8px);

  &::before {
   content: "";
   position: absolute;
   left: -7px;
   top: -7px;
   right: -6px;
   bottom: -7px;
   border: 9px dashed rgb(154, 157, 164);
   border-radius: 14px;
   box-sizing: border-box;
  }
 }
}
</style>
