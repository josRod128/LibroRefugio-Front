<script setup>
</script>

<template>
  <el-table :data="tableData" style="width: 100%" max-height="250">
    <el-table-column label="Titulo" />
    <el-table-column label="Autor" />
    <el-table-column label="Año de publicacion"/>
    <el-table-column label="ISBN"/>
    <!-- <el-table-column prop="address" label="Address" width="600" /> -->
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="deleteRow(scope.$index)"
        >
          Remove
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
