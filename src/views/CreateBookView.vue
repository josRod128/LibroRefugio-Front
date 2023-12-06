<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

interface RuleForm {
  title: string | number;
  author: string;
  publicationYear: number;
  ISBN: string;
}

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  title: "",
  author: "",
  publicationYear: 0,
  ISBN: "",
});

const rules = reactive<FormRules<RuleForm>>({
  title: [
    { required: true, message: "Este campo es requerido", trigger: "blur" },
    {
      type: "string",
      message: "solo son aceptados numeros y letras",
      trigger: "blur",
    },
  ],
  author: [
    { required: true, message: "Este campo es requerido", trigger: "blur" },
    {
      type: "string",
      message: "solo son aceptados numeros y letras",
      trigger: "blur",
    },
  ],
  publicationYear: [
    { required: true, message: "Este campo es requerido", trigger: "blur" },
    // {type: 'number', message: 'solo son aceptados numeros', trigger: 'blur'},
    {
      min: 1,
      max: new Date().getFullYear(),
      message: "No puede ser mayor al año actual",
      trigger: "blur",
    },
  ],
  ISBN: [
    { required: true, message: "Este campo es requerido", trigger: "blur" },
    {
      type: "string",
      message: "solo son aceptados numeros y guiones",
      trigger: "blur",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
</script>

<template>
  <el-form
    ref="ruleFormRef"
    label-position="top"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
    :inline="true"
  >
    <el-col :xs="24" :sm="12" :span="12">
      <el-form-item label="Título" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :span="12">
      <el-form-item label="Autor" prop="author">
        <el-input v-model="ruleForm.author" />
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="8" :span="4">
      <el-form-item label="Año de publicación" prop="publicationYear">
        <el-input v-model="ruleForm.publicationYear" />
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="16" :span="20">
      <el-form-item label="ISBN" prop="ISBN">
        <el-input v-model="ruleForm.ISBN" />
      </el-form-item>
    </el-col>

    
    <el-col :span="24">
      <el-row justify="center">
        <el-button type="danger" @click="resetForm(ruleFormRef)">Borrar datos</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Guardar
        </el-button>
      </el-row>
      
    </el-col>
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
