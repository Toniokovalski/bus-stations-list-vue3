<template>
 <LineList/>

 <div class="d-flex gap-4">
  <StopList class="col"/>
  <HourList class="col"/>
 </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import LineList from "@/components/LineList.vue";
import StopList from "@/components/StopList.vue";
import HourList from "@/components/HourList.vue";

export default defineComponent ({
 data() {
  return {
   lines: [],
  };
 },
 name: 'HomePage',
 components: {
  LineList,
  StopList,
  HourList
 },
});
</script>
