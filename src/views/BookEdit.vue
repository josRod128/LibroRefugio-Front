<template>
  <el-row class="row-bg" justify="center">
      <el-col :span="12" class="card">
        <router-link to="/">
          <el-button type="primary" :icon="ArrowLeft">Previous Page</el-button>
        </router-link>
        <Logo text="Edicion"/>
        <Book :id="props.id" />
    </el-col>
  </el-row>
</template>
<script setup>
import Book from "../components/Book.vue";
import Logo from "../components/Logo.vue";
import {
  ArrowLeft,
} from '@element-plus/icons-vue'

const props = defineProps({
    id: {
        type: String,
        required: true,
    }
  })
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
