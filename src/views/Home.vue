<script setup>
import { RouterLink, RouterView } from "vue-router";
import Logo from "../components/Logo.vue";
import { Reading, DocumentAdd } from "@element-plus/icons-vue";
</script>

<template>
  <el-row class="row-bg" justify="center">
    <el-col :xs="20" :sm="18" :md="15" :lg="15" :xl="15" class="card">
      <Logo />

      <el-row class="row-bg" justify="center" style="margin-top: 20px;">
        <nav>
          <RouterLink to="/"
            ><el-icon><Reading /></el-icon> Libros</RouterLink
          >
          <RouterLink to="/create"
            ><el-icon><DocumentAdd /></el-icon> Añadir Libro</RouterLink
          >
        </nav>
      </el-row>
      <el-row class="row-bg" justify="center" style="margin-top: 10px">
        <RouterView />
      </el-row>
    </el-col>
  </el-row>
</template>

<style scoped>
@media screen and (max-width: 1175px) {
  a{
    font-size: large !important;
  }
}
.card {
  background: #f3f4f6;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20vh;
}
a:hover{
  box-shadow: 0px 1.2px 1px -1px #d4597373;
}
a {
    margin: 0 10px;
    font-size: 1.5rem;
  }
</style>
