<template>
  <div class="container">
    <div class="login">
      <h2>登入</h2>
      <div class="login-form">
        <Form :model="form" :rules="rules" label-align="top">
          <FormItem label="用户名" prop="loginName">
            <Input></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input type="password" plain-password></Input>
          </FormItem>
          <FormItem action>
            <FormSubmit @submit="handleSubmit" @error="handleError" style="width: 100%">登入</FormSubmit>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { LoginForm, login, loginOut } from '@/api/login/index';
import router from '@/router/index';
import { setToken } from '@/utils/auth';

const userStore = useUserStore();

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

const handleSubmit = async () => {
  const res = await login(form);
  setToken(res.token);
  userStore.setUserId(res.userId);
  userStore.setLoginName(res.loginName);
  userStore.setUserName(res.userName);
  userStore.setMobile(res.mobile);
  userStore.setDeptId(res.deptId);
  userStore.setUserType(res.userType);
  userStore.setRoleId(res.roleIds);
  router.push('/');
  Message.success('登入成功');
};
const handleError = (errors: string[]) => {
  Message.error(errors);
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
