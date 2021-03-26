<template lang="pug">
a-form.enter-x(:model="formData")
  a-form-item.enter-x(name="account")
    a-input(v-model:value="formData.account" size="large" placeholder="请输入手机号")
  a-form-item.enter-x(name="password")
    a-input-password(v-model:value="formData.password" size="large" placeholder="请输入密码")
  a-form-item.enter-x(name="verify" v-show="inputPasswordErrorNum >= 2")
    div(ref="verifyItem")
      BasicDragVerify(:width="verifyWidth")
  a-form-item.enter-x
    a-checkbox(v-model:checked="formData.rember") 记住我
    a-checkbox(v-model:checked="formData.autoLogin") 自动登录
  a-form-item.enter-x
    a-button(type="primary" size="large" block @click="login") 登录
  a-form-item.enter-x.tr
    a-button(type="link" @click="$emit('toggleTabs', 'forget')") 忘记密码
    span.mr-3.ml-3 |
    a-button(type="link"  @click="$emit('toggleTabs', 'regist')") 注册
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, onMounted, computed, watch, nextTick } from 'vue';
  import { CountdownInput } from '/@/components/CountDown';
  import { BasicDragVerify } from '/@/components/Verify/index';
  import { appStore } from '/@/store/modules/app';
  export default defineComponent({
    name: 'LoginForm',
    components: {
      CountdownInput,
      BasicDragVerify,
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
      let verifyWidth = ref(300);
      let inputPasswordErrorNum = computed(() => appStore.inputPasswordErrorNum);
      console.log(inputPasswordErrorNum.value, 'inputPasswordErrorNum.value');

      watch(
        () => inputPasswordErrorNum.value,
        (value) => {
          if (value >= 2) {
            nextTick(() => {
              verifyWidth.value = verifyItem.value.clientWidth;
            });
          }
        },
        { immediate: true }
      );
      function login() {
        appStore.setInputPasswordErrorNum();
      }
      onMounted(() => {
        if (appStore.inputPasswordErrorNum >= 2) {
          verifyWidth.value = verifyItem.value.clientWidth;
        }
      });

      return {
        formData,
        verifyItem,
        verifyWidth,
        inputPasswordErrorNum,
        login,
      };
    },
  });
</script>
