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
    deleteRow(book) {
      console.log(book)
      this.$swal.fire({
        title: "¿Estas seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, bórralo!",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal.fire({
            title: "Ingresa el nombre del autor",
            input: "text",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            showLoaderOnConfirm: true,
            preConfirm: async (namAut) => {
              if (namAut.toLowerCase() === book.autor.toLowerCase()) {
                await this.$axios.delete(`${this.$envRoute}/book/${book.id}`);
                this.books.splice(book, 1);
                this.$swal.fire({
                  title: "¡Eliminado!",
                  text: "El libro ha sido eliminado.",
                  icon: "success",
                  timer: 2000,
                  timerProgressBar: true,
                  showConfirmButton: false,
                });
              } else {
                this.$swal.fire({
                  title: "¡Error!",
                  text: "El nombre del autor no coincide.",
                  icon: "error",
                  timer: 2000,
                  timerProgressBar: true,
                  showConfirmButton: false,
                });
              }
            },
            allowOutsideClick: () => !Swal.isLoading()
          })
        }
      });
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
            <el-icon v-on:click.prevent="deleteRow(scope.row)" class="delete"><DeleteFilled/></el-icon>

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
