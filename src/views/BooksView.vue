<script>
import AvailabilityButton from '../components/AvailabilityButton.vue';
export default {
    data() {
        return {
            books: [],
            searchInput: "",
            totalDatos: 0,
            currentPage: 1,
        };
    },
    components: {
        AvailabilityButton,
    },
    mounted() {
        this.getBooks();
    },
    methods: {
        getBooks() {
          this.$axios.get(`${this.$envRoute}/books/${this.currentPage}`).then((response) => {
            this.books = response.data.books;
            this.totalDatos = response.data.total;
          });
        },
        deleteRow(book) {
            console.log(book);
            this.$swal
                .fire({
                title: "¿Estás seguro?",
                text: "¡No podrás revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, bórralo!",
                cancelButtonText: "Cancelar",
            })
                .then((result) => {
                if (result.isConfirmed) {
                    this.$swal.fire({
                        title: "Ingresa el nombre del autor",
                        input: "text",
                        showCancelButton: true,
                        confirmButtonText: "Confirmar",
                        showLoaderOnConfirm: true,
                        preConfirm: async (namAut) => {
                            if (namAut.toLowerCase() === book.author.toLowerCase()) {
                                await this.$axios.delete(`${this.$envRoute}/book/${book.id}`);
                                if (this.searchInput != "") {
                                    this.search();
                                }
                                else {
                                  await this.getBooks();
                                }

                                this.$swal.fire({
                                    title: "¡Eliminado!",
                                    text: "El libro ha sido eliminado.",
                                    icon: "success",
                                    timer: 2000,
                                    timerProgressBar: true,
                                    showConfirmButton: false,
                                });
                            }
                            else {
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
                        allowOutsideClick: () => !Swal.isLoading(),
                    });
                }
            });
        },
        currentPageChange(val) {
          if (this.searchInput == "") {
            this.$axios.get(`${this.$envRoute}/books/${val}`).then((response) => {
              this.books = response.data.books;
              this.totalDatos = response.data.total;
            });
          }
          else {
            this.search();
          }
        },
        search() {
            if (this.searchInput != "") {
                this.$axios
                    .get(`${this.$envRoute}/books/search/${encodeURIComponent(this.searchInput)}/${this.currentPage}`)
                    .then((response) => {
                      this.books = response.data.books;
                      this.totalDatos = response.data.total;
                });
            }
        }
    },
    watch: {
        searchInput() {
            if (this.searchInput == "") {
                this.getBooks();
            }
            else {
                this.search();
            }
        },
    },
};
</script>

<template>
  <el-row class="row-bg" justify="end" style="margin-bottom: 5px; width: 100%;" >
    <div>
      <el-input       
        v-model="searchInput"
        placeholder="Titulo o autor del libro"
        prefix-icon="Search"
        input-style="display: inline-block;"
        clearable
      />
    </div>
  </el-row>
  <el-table :data="books" max-height="250">
    <el-table-column prop="title" label="Titulo" />
    <el-table-column prop="author" label="Autor" />
    <el-table-column prop="yearPublication" label="Año de publicación" />
    <el-table-column prop="isbn" label="ISBN" />
    <!-- <el-table-column prop="address" label="Address" width="600" /> -->
    <el-table-column prop="available" label="Disponible">
      <template #default="scope">
        <AvailabilityButton :available="scope.row.available" :id="scope.row.id" />
      </template>
    </el-table-column>

    <el-table-column fixed="right" label="Acción" width="100">
      <template #default="scope">
        <el-row justify="space-around">
          <router-link :to="`/book/${scope.row.id}`">
            <el-icon class="edit"><Edit /></el-icon>
          </router-link>
          <el-icon v-on:click="deleteRow(scope.row)" class="delete"
            ><DeleteFilled
          /></el-icon>
        </el-row>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="totalDatos" v-model:current-page="currentPage" @current-change="currentPageChange"/>
</template>

<style scoped>
@media screen and (max-width: 922px) {
  button{
    width: 100%;
  }
}
@media screen and (max-width: 743px) {
  button{
    width: 100%;
    font-size: xx-small;
  }
}
@media screen and (max-width: 696px) {
  button{
    width: 100%;
    font-size: xx-small;
  }
}
a,i{
  display: flex;
  font-size: large;
}
.cell {
  font-size: 1.2rem;
}
i {
  cursor: pointer;
}
.edit {
  color: #409eff;
}
.delete {
  color: #f56c6c;
}
</style>
