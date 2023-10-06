<template>
 <div class="bg-light min-vh-100 main-app-container p-5">
  <h1>Timetable</h1>

  <nav class="navbar navbar-expand-lg bg-white p-4 pb-0 d-flex gap-2 mb-3">
   <router-link :to="{ name: 'home' }">
    <div class="nav-link px-4 pb-4">Bus Lines</div>
   </router-link>
   <router-link :to="{ name: 'stops' }">
    <div class="nav-link px-4 pb-4">Stops</div>
   </router-link>
  </nav>

  <router-view></router-view>
 </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
export default defineComponent({
 name: 'App',
});
</script>

<style scoped lang="scss">
.navbar {
 a {
  text-decoration: none;
  color: #9A9DA4;

  &.router-link-active {
   color: #33373C;

   div {
    border-bottom: 2px solid rgba(25, 82, 225, 1);
   }
  }
 }
}
</style>
