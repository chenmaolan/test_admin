<template lang="pug">
a-form.enter-x(ref="formRef" :model="formData" :rules="formRules")
  a-form-item.enter-x(name="account")
    a-input(v-model:value="formData.account" size="large" placeholder="请输入手机号")
  a-form-item.enter-x(name="password")
    a-input-password(v-model:value="formData.password" size="large" placeholder="请输入密码")
  a-form-item.enter-x(name="verify" v-show="inputPasswordErrorNum >= 2")
    div(ref="verifyItem")
      BasicDragVerify(:width="verifyWidth" @success="verifySuccess")
  a-form-item.enter-x
    a-checkbox(v-model:checked="formData.rember") 记住我
    a-checkbox(v-model:checked="formData.autoLogin") 自动登录
  a-form-item.enter-x
    a-button(type="primary" size="large" block @click="login") 登录
  a-form-item.enter-x.text-right
    a-button(type="link" @click="$emit('toggleTabs', 'forget')") 忘记密码
    span.mr-3.ml-3 |
    a-button(type="link"  @click="$emit('toggleTabs', 'regist')") 注册
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, onMounted, computed, watch, nextTick } from 'vue';
  import { CountdownInput } from '/@/components/CountDown';
  import { BasicDragVerify } from '/@/components/Verify/index';
  import { appStore } from '/@/store/modules/app';
  import { getFormRule } from '../userLogin';
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
        verify: false, // 输入两次错误进行拖动校验
        rember: true,
        autoLogin: true,
      });
      let formRules = computed(() => getFormRule(formData, 'login'));
      let formRef: any = ref();
      let verifyItem: any = ref(null);
      let verifyWidth = ref(300);
      let inputPasswordErrorNum = computed(() => appStore.inputPasswordErrorNum);

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
        // 密码输入两次不正确展示滑动按钮
        // appStore.setInputPasswordErrorNum()

        // 表单验证
        formRef.value.validateFields().then((res) => {
          console.log(res, '=======');
          // res 返回表单数据 验证通过调用登录接口
        });
      }
      function verifySuccess(successData) {
        formData.verify = successData.isPassing;
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
        formRules,
        formRef,
        verifySuccess,
      };
    },
  });
</script>
