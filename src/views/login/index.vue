<template>
  <div class="container">
    <div class="login">
      <h2>登入</h2>
      <div class="login-form">
        <el-form :model="form" :rules="rules" label-position="top">
          <el-form-item label="用户名" prop="loginName">
            <el-input v-model="form.loginName" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" show-password />
          </el-form-item>
          <el-form-item action>
            <el-button type="primary" style="width: 100%" :loading="loading" @click="handleLogin">登入</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { LoginForm, login } from '@/api/login/index';
import router from '@/router/index';
import Cookies from 'js-cookie';
import { setToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';

const userStore = useUserStore();

const loading = ref<boolean>(false);

const form = reactive<LoginForm>({
  loginName: '',
  password: '',
});

const rules = {
  username: {
    required: true,
    message: '请输入用户名',
  },
  password: {
    required: true,
    message: '请输入密码',
  },
};

const handleLogin = async () => {
  try {
    loading.value = true;
    const res = await login(form);
    setToken(res.token as string);
    userStore.setUserInfo(res.data);
    Cookies.set('user_info', JSON.stringify(res.data));
    router.push('/');
    ElMessage.success('登入成功');
  } catch {
    form.password = '';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;

  .login {
    width: 600px;
    height: 400px;
    border: 1px solid #eee;
    background-color: #fff;
    border-radius: 6px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: auto;

    > h2 {
      height: 2rem;
      line-height: 2rem;
      text-align: center;
    }

    &-form {
      padding: 20px;
    }
  }
}
</style>
