<script>
export default {
  data() {
    return {
      books: [],
    };
  },
  mounted() {
    this.$axios.get(`${this.$envRoute}/books`).then((response) => {
      this.books = response.data;
    });
  },
  methods: {
    deleteRow(index) {
      this.books.splice(index, 1);
    },
    prueba() {
      console.log("prueba");
    },
  },
};
</script>

<template>
  <el-table :data="books" style="width: 100%" max-height="250">
    <el-table-column prop="titulo" label="Titulo" />
    <el-table-column prop="autor" label="Autor" />
    <el-table-column prop="yearPublication" label="Año de publicacion" />
    <el-table-column prop="isbn" label="ISBN" />
    <!-- <el-table-column prop="address" label="Address" width="600" /> -->

    <el-table-column fixed="right" label="Acción" width="100">
      <template #default="scope">
          <el-row justify="space-around">
            <el-icon v-on:click.prevent="prueba()" class="edit"><Edit /></el-icon>
            <el-icon v-on:click.prevent="deleteRow(scope.$index)" class="delete"><DeleteFilled/></el-icon>

          </el-row>
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
.cell{
  font-size: 1.2rem;
}
i{
  cursor: pointer;
}
.edit{
  color: #409EFF;
}
.delete{
  color: #F56C6C;
}

</style>
