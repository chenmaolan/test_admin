<template lang="pug">
a-form.enter-x(:model="formData")
  a-form-item.enter-x(name="nickname")
    a-input(v-model:value="formData.nickname" size="large" placeholder="请输入您的昵称")
  a-form-item.enter-x(name="email")
    a-input(v-model:value="formData.email" size="large" placeholder="请输入您的邮箱")
  a-form-item.enter-x(name="account")
    a-input(v-model:value="formData.account" size="large" placeholder="请输入手机号")
      template(#addonBefore)
        a-select(v-model:value="phonePrefix")
          a-selectOption(:value="0") +86
  a-form-item.enter-x(name="verify")
    div(ref="verifyItem")
      BasicDragVerify(:width="verifyWidth")
  a-form-item.enter-x(name="sms")
    CountdownInput(
      size="large"
      v-model:value="formData.sms"
      placeholder="手机验证码"
    )
  a-form-item.enter-x(name="password")
    a-input-password(v-model:value="formData.password" size="large" placeholder="请输入新密码")
  a-form-item.enter-x(name="password")
    a-input-password(v-model:value="formData.repassword" size="large" placeholder="请再输入一次新密码")
  a-form-item.enter-x
    a-Button(type="primary" size="large" block) 注册
  a-form-item.enter-x.tr
    a-Button(type="link" @click="$emit('toggleTabs', 'login')") 账号登录
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, ref } from 'vue';
  import { BasicDragVerify } from '/@/components/Verify/index';
  import { CountdownInput } from '/@/components/CountDown';

  export default defineComponent({
    name: 'LoginForm',
    components: {
      BasicDragVerify,
      CountdownInput,
    },
    setup() {
      let formData = reactive({
        nickname: '',
        email: '',
        account: '',
        password: '',
        repassword: '',
        sms: '',
        rember: true,
        autoLogin: true,
      });
      let verifyItem: any = ref(null);
      let verifyWidth = ref(200);
      onMounted(() => {
        verifyWidth.value = verifyItem.value.scrollWidth;
        console.log(verifyItem, verifyItem.value, verifyWidth, 'verifyItem');
      });
      return {
        phonePrefix: ref(0),
        verifyItem,
        verifyWidth,
        formData,
      };
    },
  });
</script>
