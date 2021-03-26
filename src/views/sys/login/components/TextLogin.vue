<template lang="pug">
a-form.enter-x(:model="formData")
  a-form-item.enter-x(name="account")
    a-input(v-model:value="formData.account" size="large" placeholder="请输入手机号")
      template(#addonBefore)
        a-select(v-model:value="phonePrefix")
          a-select-option(:value="0") +86
  a-form-item.enter-x(name="verify")
    div(ref="verifyItem")
      BasicDragVerify(:width="verifyWidth")
  a-form-item.enter-x(name="sms")
    CountdownInput(
      size="large"
      v-model:value="formData.sms"
      placeholder="请输入验证码"
    )
  a-form-item.enter-x
    a-checkbox(v-model:checked="formData.rember") 记住我
    a-checkbox(v-model:checked="formData.autoLogin") 自动登录
  a-form-item.enter-x
    a-button(type="primary" size="large" block) 登录
  a-form-item.enter-x.tr
    a-button(type="link" @click="$emit('toggleTabs', 'forget')") 忘记密码
    span.mr-3.ml-3 |
    a-button(type="link"  @click="$emit('toggleTabs', 'regist')") 注册
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
        account: '',
        password: '',
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
