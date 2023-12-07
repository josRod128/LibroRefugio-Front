<template>
  <el-row class="row-bg" justify="center">
    <el-col :span="12" class="card">
        <Book />
    </el-col>
  </el-row>
</template>
<script setup>
import Book from "../components/Book.vue";

</script>
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
