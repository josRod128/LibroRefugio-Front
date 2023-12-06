<script setup>
import { RouterLink, RouterView } from "vue-router";
import Logo from "./components/Logo.vue";
import { Reading, DocumentAdd } from "@element-plus/icons-vue";
</script>

<template>
  <el-row class="row-bg" justify="center">
    <el-col :span="12" class="card">
      <Logo />

      <el-row class="row-bg" justify="center">
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
.card {
  background: #f3f4f6;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20vh;
}

a {
    margin: 0 10px;
    font-size: 1.5rem;
  }
</style>
