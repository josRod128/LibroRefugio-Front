<script lang="ts" setup>
import { reactive, ref, onBeforeMount } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import Swal from "sweetalert2";
import axios from "axios";
const envRoute = process.env.VITE_ROUTE_BACK;
var edit = false;

const props = defineProps({
  id: {
    type: String,
  },
});

onBeforeMount(() => {
  if (props.id) {
    axios
      .get(`${envRoute}/book/${props.id}`)
      .then((response) => {
        if (response.data.status == 200) {
          modeloForm.title = response.data.book.title;
          modeloForm.author = response.data.book.author;
          modeloForm.publicationYear = new Date(
            response.data.book.yearPublication,
            0
          );
          modeloForm.isbn = response.data.book.isbn;
          modeloForm.available = response.data.book.available;
          edit = true;
        } else {
          Swal.fire({
            title: "¡Error!",
            text: "El libro no se ha encontrado.",
            icon: "error",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "¡Error!",
          text: error.message+":  --"+error.response.data+"--",
          icon: "error",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      });
  }
});

interface ReglasCampos {
  title: string;
  author: string;
  publicationYear: Date;
  isbn: string;
  available: boolean;
}

const RefForm = ref<FormInstance>();
const modeloForm = reactive<ReglasCampos>({
  title: "",
  author: "",
  publicationYear: new Date(),
  isbn: "",
  available: true,
});

const validateTitle = (rule: any, value: any, callback: any) => {
  let regex = /^[A-Za-zÀ-ÿ\u00f1\u00d10-9\s]+$/g;
  if (regex.test(modeloForm.title)) {
    if (!RefForm.value) return;
    // RefForm.value.validateField('title', () => null)
  } else {
    callback(new Error("Este campo solo puede tener letras y numeros"));
  }
  callback();
};
const validateAuthor = (rule: any, value: any, callback: any) => {
  let regex = /^[A-Za-zÀ-ÿ\u00f1\u00d1\s]+$/g;
  if (regex.test(modeloForm.author)) {
    if (!RefForm.value) return;
    // RefForm.value.validateField('author', () => null)
  } else {
    callback(new Error("Este campo solo puede tener letras"));
  }
  callback();
};
const validatePublicationYear = (rule: any, value: any, callback: any) => {
  if (
    new Date(modeloForm.publicationYear).getFullYear() <=
    new Date().getFullYear()
  ) {
    if (!RefForm.value) return;
    // RefForm.value.validateField('publicationYear', () => null)
  } else {
    callback(new Error("Este no puede ser mayor al año actual"));
  }
  callback();
};
const validateIsbn = (rule: any, value: any, callback: any) => {
  let regex = /^[\-0-9]+$/g;
  if (regex.test(modeloForm.isbn)) {
    if (!RefForm.value) return;
    // RefForm.value.validateField('isbn', () => null)
  } else {
    callback(new Error("Este campo solo puede tener números y guiones"));
  }
  callback();
};
const rules = reactive<FormRules<ReglasCampos>>({
  title: [
    { required: true, message: "Este campo es requerido", trigger: "blur" },
    { validator: validateTitle, trigger: "blur" },
  ],
  author: [
    { required: true, message: "Este campo es requerido", trigger: "blur" },
    { validator: validateAuthor, trigger: "blur" },
  ],
  publicationYear: [
    { required: true, message: "Este campo es requerido", trigger: "blur" },
    { validator: validatePublicationYear, trigger: "blur" },
  ],
  isbn: [
    { required: true, message: "Este campo es requerido", trigger: "blur" },
    { validator: validateIsbn, trigger: "blur" },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid, fields) => {
    if (valid) {
      if (props.id) {
        if (edit){
          axios
            .put(`${envRoute}/book/${props.id}`, modeloForm)
            .then((response) => {
              if (response.data.status == 200) {
                Swal.fire({
                  title: "¡Guardado!",
                  text: "El libro se ha guardado correctamente.",
                  icon: "success",
                  timer: 2000,
                  timerProgressBar: true,
                  showConfirmButton: false,
                });
                resetForm(formEl);
              } else {
                Swal.fire({
                  title: "¡Error!",
                  text: response.data.message,
                  icon: "error",
                  timerProgressBar: true,
                  showConfirmButton: false,
                });
              }
            })
            .catch((error) => {
              Swal.fire({
                title: "¡Error!",
                text: error.message+":  --"+error.response.data+"--",
                icon: "error",
                timerProgressBar: true,
                showConfirmButton: false,
              });
            });
        }else{
          Swal.fire({
            title: "¡Error!",
            text: "No tenemos este libro en nuestra base de datos.",
            icon: "error",
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      } else {
        axios
          .post(`${envRoute}/book`, modeloForm)
          .then((response) => {
            if (response.data.status == 200) {
              Swal.fire({
                title: "¡Guardado!",
                text: "El libro se ha guardado correctamente.",
                icon: "success",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
              resetForm(formEl);
            } else {
              Swal.fire({
                title: "¡Error!",
                text: response.data.message,
                icon: "error",
                timerProgressBar: true,
                showConfirmButton: false,
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "¡Error!",
              text: error.message+":  --"+error.response.data+"--",
              icon: "error",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          });
      }
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  if (props.id) return;
  formEl.resetFields();
};
</script>

<template>
  <el-form
    ref="RefForm"
    label-position="top"
    :model="modeloForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    status-icon
    style="width: 90%; margin-top: 20px"
  >
    <el-row class="row-bg" justify="end" v-if="props.id">
      <el-col  :xs="20" :sm="18" :md="15" :lg="15" :xl="15">
        <el-row class="row-bg" :gutter="20" align="bottom" justify="end">
          <el-form-item class="switch" :label="`Marcar como ${(modeloForm.available)?'no disponible':'disponible'}`">
            <el-switch v-model="modeloForm.available" />
          </el-form-item>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="row-bg" justify="end">
      <el-col :span="12">
        <el-row class="row-bg" :gutter="20" align="bottom">
          <el-col :xs="24" :sm="24" :md="12">
            <el-form-item label="Año de publicación" prop="publicationYear">
              <el-date-picker
                v-model="modeloForm.publicationYear"
                type="year"
                placeholder="Año de publicación"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" :md="12">
            <el-form-item label="ISBN" prop="isbn">
              <el-input v-model="modeloForm.isbn" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="row-bg" :gutter="20">
      <el-col :xs="24" :sm="24" :md="12">
        <el-form-item label="Título" prop="title">
          <el-input v-model="modeloForm.title" />
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12">
        <el-form-item label="Autor" prop="author">
          <el-input v-model="modeloForm.author" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row class="row-bg" style="margin-top: 20px">
      <el-col  :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-row justify="center">
          <el-button type="danger" @click="resetForm(RefForm)"
            >Borrar datos</el-button
          >
          <el-button type="primary" @click="submitForm(RefForm)">
            Guardar
          </el-button>
        </el-row>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped>
@media screen and (max-width: 441px) {
  .el-button--primary{
    margin-top: 10px;
  }
}
.el-button{
  font-size: 1.5rem;
}
.el-form-item .el-form-item__label {
  font-size: 1.5rem !important;
}
.switch {
  align-items: center;
  display: flex !important;  
}
.switch label {
  font-size: 1.2rem !important;
}
.switch .el-form-item__label {
  display: contents !important;
}
.switch .el-form-item__content {
  margin-left: 10px;
}
.demo-ruleForm .el-form-item__label {
  color: #181818;
  font-size: 1.5rem;
}

.el-button > span {
  margin: 0 10px;
  font-size: 1.5rem;
}
</style>
