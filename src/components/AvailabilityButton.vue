<template>
  <el-button v-on:click="change" :type="checkDisponible ? 'primary' : 'danger'">{{
    checkDisponible ? "Disponible" : "No disponible"
  }}</el-button>
</template>

<script>

export default {
  data() {
    return {
      disponible: null,
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    change() {
      this.$swal
                .fire({
        title: "¿Estás seguro?",
        text: "¿Quieres cambiar el estado del libro?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willChange) => {
        if (willChange.isConfirmed) {
          if(this.checkDisponible){
            this.disponible = this.available;
          }
          this.$axios
            .put(`${this.$envRoute}/book/${this.id}`, {
              available: !this.disponible,
            })
            .then((response) => {
              console.log(response.status);
              if (response.status == 200) {
                this.disponible = !this.disponible;
                this.$swal
                .fire({
                  title: "¡Cambiado!",
                  text: "El estado del libro ha sido cambiado.",
                  icon: "success",
                  timer: 2000,
                  timerProgressBar: true,
                  showConfirmButton: false,
                })
              }else{
                this.$swal
                .fire({
                  title: "¡Error!",
                  text: "El estado del libro no ha sido cambiado.",
                  icon: "error",
                  timer: 2000,
                  timerProgressBar: true,
                  showConfirmButton: false,
                })
              }
            })
            .catch((error) => {
              this.$swal
                .fire({
                  title: "¡Error!",
                  text: error.message,
                  icon: "error",
                  timerProgressBar: true,
                  showConfirmButton: false,
                })
            });
        }
      });
    },
  },
  computed: {
    checkDisponible() {
      if(this.disponible == null){
        return this.available;
      }else{
        return this.disponible;
      }
    },
  }
};
</script>

<style lang="scss" scoped></style>
