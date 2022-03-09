<template>
  <el-container>
    <el-main>
      <div class="login-wrap">
        <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="form.userName" @keyup.enter="onSubmit(formRef)">
              <template #prefix>
                <el-icon class="el-input__icon">
                  <avatar />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input show-password v-model="form.password" @keyup.enter="onSubmit(formRef)">
              <template #prefix>
                <el-icon class="el-input__icon">
                  <key />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label prop></el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="isloading" @click="onSubmit(formRef)">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script lang="ts" >
import { ref, reactive, defineComponent, onMounted } from 'vue';
// import Menu from '@/layout/component/menu.vue';
// import * as user from '@/api/login'
import type { ElForm } from 'element-plus'
import { useRouter } from 'vue-router'
import useStore from '@/store'
export default defineComponent({
  name: 'Login',
  components: {
  },
  setup() {
    type FormInstance = InstanceType<typeof ElForm>
    const formRef = ref<FormInstance>();
    const isloading = ref<boolean>(false)
    const routerInstance = useRouter()
    const form = reactive({
      userName: '',
      password: ''
    })

    const rules = reactive({
      userName: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 5,
          message: 'Length should be 3 to 5',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 6,
          message: 'Length should be 3 to 5',
          trigger: 'blur'
        }
      ]
    })
    const onSubmit = (formEl: FormInstance | undefined) => {
      isloading.value = true;
      if (!formEl) {
        isloading.value = false;
        return
      }
      formEl.validate((valid) => {
        if (valid) {
          console.log('submit!')
          useStore.dispatch('user/login', form).then((result) => {
            isloading.value = false;
            routerInstance.replace('/')
          }).catch(() => {
            isloading.value = false;
          })
        } else {
          console.log('error submit!')
          isloading.value = false;
        }
      })
    }
    return {
      isloading,
      form,
      rules,
      formRef,
      onSubmit
    }
  }
})
</script>
<style scoped lang="scss">
.el-container {
  height: 100%;
  overflow: auto;
  background: url("../../assets/login/login_background.png");
  background-repeat: no-repeat;
  background-size: cover;
  // background-attachment: fixed;
  .el-main {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-wrap {
      width: 30vw;
      min-width: 400px;
      height: 20vw;
      min-height: 300px;
      padding: 50px 15px;
      background-color: #fff;
      border-radius: 0.9vw;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }
}
</style>
