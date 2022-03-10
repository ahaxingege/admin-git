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
          <el-form-item label="验证码" prop="code">
            <div class="flex-box">
              <el-input v-model="form.code" @keyup.enter="onSubmit(formRef)">
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <check />
                  </el-icon>
                </template>
              </el-input>
              <vue-img-verify ref="verifyRef"></vue-img-verify>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="isloading" @click="onSubmit(formRef)">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script lang='ts' >
import { ref, reactive, defineComponent, onMounted } from 'vue';
import type { ElForm } from 'element-plus'
import { useRouter } from 'vue-router'
import useStore from '@/store'
import * as user from '@/api/login'
import useGetters from '@/store/hooks/useGetters'
import vueImgVerify from '@/components/identy.vue';
export default defineComponent({
  name: 'Login',
  components: {
    vueImgVerify
  },
  setup() {
    type FormInstance = InstanceType<typeof ElForm>
    // 表单实例
    const formRef = ref<FormInstance>();
    const isloading = ref<boolean>(false)
    const verifyRef: any = ref(null);
    const routerInstance = useRouter()
    const keyPath = routerInstance.currentRoute.value.query.redirect as string;
    const params: any = routerInstance.currentRoute.value.query;
    delete params.redirect
    const { token } = useGetters('', ['token'])
    const form = reactive({
      userName: 'admin',
      password: '123456',
      code: ''
    })
    const checkCode = (rule: any, value: any, callback: any) => {
      if (!value) {
        return callback(new Error('请输入验证码'))
      } else if (verifyRef.value.imgCode !== value) {
        callback(new Error('请输入正确验证码'))
      } else {
        callback()
      }
    }
    const rules = reactive({
      userName: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 10,
          message: 'Length should be 3 to 10',
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
          message: 'Length should be 3 to 6',
          trigger: 'blur'
        }
      ],
      code: [
        {
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        },
        {
          trigger: 'blur',
          validator: checkCode
        }
      ]
    })
    user.isLogin().then((result: any) => {
      const { sessionId } = result.data
      if (sessionId === token.value) {
        routerInstance.replace({ path: keyPath || '/', query: { ...params } })
      }
    })
    const onSubmit = (formEl: FormInstance | undefined) => {
      isloading.value = true;
      console.log(verifyRef.value.imgCode, form.code)
      if (!formEl) {
        isloading.value = false;
        return
      }
      formEl.validate((valid) => {
        if (valid) {
          console.log('submit!')
          useStore.dispatch('user/login', form).then(() => {
            isloading.value = false;
            console.log(typeof params)
            params ? routerInstance.replace({ path: keyPath || '/', query: { ...params } }) : routerInstance.replace({ path: '/' })
          }).catch(() => {
            isloading.value = false;
          })
        } else {
          console.log('error submit!')
          isloading.value = false;
        }
      })
    }
    onMounted(() => {
      console.log(verifyRef.value.imgCode)
    })
    return {
      token,
      verifyRef,
      isloading,
      form,
      rules,
      formRef,
      onSubmit
    }
  }
})
</script>
<style scoped lang='scss'>
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
      .flex-box {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        .el-input {
          flex: 1;
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
