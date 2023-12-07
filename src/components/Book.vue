<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import Swal from 'sweetalert2'
import axios from 'axios';
const envRoute = process.env.VITE_ROUTE_BACK

interface ReglasCampos {
  title: string;
  author: string;
  publicationYear: number;
  isbn: string;
}

const RefForm = ref<FormInstance>();
const modeloForm = reactive<ReglasCampos>({
  title: "",
  author: "",
  publicationYear: 0,
  isbn: "",
});

const validateTitle = (rule: any, value: any, callback: any) => {
  let regex = /^[A-Za-z0-9\s]+$/g;
  if (regex.test(modeloForm.title)) {
    if (!RefForm.value) return
    // RefForm.value.validateField('title', () => null)
  }else{
    callback(new Error('Este campo solo puede tener letras y numeros'))
  }
  callback()
}
const validateAuthor = (rule: any, value: any, callback: any) => {
  let regex = /^[A-Za-z\s]+$/g;
  if (regex.test(modeloForm.author)) {
    if (!RefForm.value) return
    // RefForm.value.validateField('author', () => null)
  }else{
    callback(new Error('Este campo solo puede tener letras'))
  }
  callback()
}
const validatePublicationYear = (rule: any, value: any, callback: any) => {
  if(modeloForm.publicationYear===0){
    callback(new Error('Este campo es requerido'))
  }
  if (new Date(modeloForm.publicationYear).getFullYear()<= new Date().getFullYear() ) {
    if (!RefForm.value) return
    // RefForm.value.validateField('publicationYear', () => null)
  }else{
    callback(new Error('Este no puede ser mayor al año actual'))
  }
  callback()
}
const validateIsbn = (rule: any, value: any, callback: any) => {
  let regex = /^[\-0-9]+$/g;
  if (regex.test(modeloForm.isbn)) {
    if (!RefForm.value) return
    // RefForm.value.validateField('isbn', () => null)
  }else{
    callback(new Error('Este campo solo puede tener números y guiones'))
  }
  callback()
}
const rules = reactive<FormRules<ReglasCampos>>({
  title: [
    { required: true, message: "Este campo es requerido", trigger: "blur" },
    { validator: validateTitle, trigger: 'blur'}
  ],
  author: [
    { required: true, message: "Este campo es requerido", trigger: "blur" },
    { validator: validateAuthor, trigger: 'blur'}
  ],
  publicationYear: [
    { required: true, message: "Este campo es requerido", trigger: "blur" },
    { validator: validatePublicationYear, trigger: 'blur'}
  ],
  isbn: [
    { required: true, message: "Este campo es requerido", trigger: "blur" },
    { validator: validateIsbn, trigger: 'blur'}
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid, fields) => {
    if (valid) {
      axios
        .post(`${envRoute}/books`, modeloForm)
        .then((response) => {
          if (response.status == 200) {
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
              text: "El libro no se ha guardado correctamente.",
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
            text: "El libro no se ha guardado correctamente.",
            icon: "error",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        });
    } 
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
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
    style="width: 90%;margin-top:20px"
  >
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
    
    <el-row class="row-bg" style="margin-top: 20px;">
      <el-col :span="24">
        <el-row justify="center">
          <el-button type="danger" @click="resetForm(RefForm)">Borrar datos</el-button>
          <el-button type="primary" @click="submitForm(RefForm)">
            Guardar
          </el-button>
        </el-row>
        
      </el-col>
    </el-row>
  </el-form>
</template>

<style>
.demo-ruleForm .el-form-item__label {
  color: #181818;
  font-size: 1.5rem;
}

.el-button>span {
  margin: 0 10px;
  font-size: 1.5rem;
}

.el-button--primary {
  border-color: #C0B2A4;
  background: #C0B2A4;
}
.el-button--danger {
  background: cadetblue;
  border-color: cadetblue;
}
.el-button--danger.el-button:focus, .el-button--danger.el-button:hover {
  background: rgb(106, 183, 185);
  border-color: rgb(106, 183, 185);
}
.el-button--primary.el-button:focus, .el-button--primary.el-button:hover {
  background: #dac8b6;
  border-color: #dac8b6;
}

</style>
