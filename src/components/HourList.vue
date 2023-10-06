<template :key="stopName">
 <div v-if="arrivalTime.length" class="bg-white wrap">
  <h6 class="p-4 pb-2">Bus stop: {{ stopName }}</h6>
  <ItemsList :items="arrivalTime" :shouldUpdateName="false" />
 </div>
 <div v-else class="bg-white wrap align-items-center justify-content-center dashed">
  <div>Please select the bus stop first</div>
 </div>
</template>

<script>
import {mapGetters} from 'vuex';
import ItemsList from "../../ui/ItemsList.vue";

export default {
 data() {
  return {
   stopName: null,
   arrivalTime: [],
  };
 },
 name: "HoursList",
 components: {
  ItemsList,
 },
 computed: {
  ...mapGetters(['getSelectedStop', 'getSelectedLine']),
 },
 methods: {
  compareTime(a, b) {
   const [aHours, aMinutes] = a.split(':').map(Number);
   const [bHours, bMinutes] = b.split(':').map(Number);

   const aTotalMinutes = aHours * 60 + aMinutes;
   const bTotalMinutes = bHours * 60 + bMinutes;

   return aTotalMinutes - bTotalMinutes;
  }
 },
 watch: {
  'getSelectedStop'(newStop) {
   if (newStop === null || !this.getSelectedLine) {
    this.stopName = null;
    this.arrivalTime = [];
   } else {
    this.stopName = newStop;
    const linesDataObj = this.$store.state.linesDataObj;

    if (linesDataObj && linesDataObj[this.getSelectedLine] && linesDataObj[this.getSelectedLine][newStop]) {
     const timeList = Object.values(linesDataObj[this.getSelectedLine][newStop]);
     this.arrivalTime = Array.from(new Set(timeList)).sort(this.compareTime);
    }
   }
  }
 },
};
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
   right: -7px;
   bottom: -7px;
   border: 9px dashed rgb(154, 157, 164);
   border-radius: 14px;
   box-sizing: border-box;
  }
 }
}
</style>
