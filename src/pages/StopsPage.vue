<template>
 <div class="bus-stops-wrap bg-white">
  <input
    type="text"
    v-model="filterText"
    class="form-control filter-stops-input m-2 search-input"
    placeholder="Search..."
    @input="filterStations"
  />

  <h6 class="m-4">Bus stops</h6>

  <ItemsList :items="filteredStations" :shouldUpdateName="true" />
 </div>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import ItemsList from "../../ui/ItemsList.vue";
import { mapGetters, useStore } from "vuex";

export default defineComponent({
 name: 'StopsPage',
 data() {
  return {
   filterText: "",
  };
 },
 components: {
  ItemsList,
 },
 computed: {
  ...mapGetters(['getAllStationsList']),
  filteredStations() {
   const store = useStore();
   const filterText = this.filterText.toLowerCase();
   const allStationsList = store.getters.getAllStationsList;
   return allStationsList.filter((station:string) =>
     station.toLowerCase().includes(filterText)
   );
  },
 },
 methods: {
  filterStations() {
   if (this.filterText.length > 0) {
    this.filteredStations = this.getAllStationsList.filter((station: string) =>
      station.toLowerCase().includes(this.filterText.toLowerCase())
    );
   } else {
    this.filteredStations = this.getAllStationsList
   }
  },
 },
});
</script>

<style scoped lang="scss">
.bus-stops-wrap {
 overflow: hidden;
}

.form-control {
 &.search-input {
  background-image: url("../../public/search-icon.svg");
  background-repeat: no-repeat;
  background-position: right 16px top 50%;
  padding-right: 40px;

  &:focus {
   background-image: url("../../public/search-icon-blue.svg");
   background-repeat: no-repeat;
   background-position: right 16px top 50%;
   border-color: #1952E1;
   outline: none;
   box-shadow: none;
  }
 }
}

ul {
 height: 500px;
}

.filter-stops-input {
 max-width: 256px;
 padding: 12px 16px;
}
</style>
