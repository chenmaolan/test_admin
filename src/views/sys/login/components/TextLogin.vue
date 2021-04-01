<template lang="pug">
a-form.enter-x(ref="formRef" :model="formData" :rules="formRules")
  a-form-item.enter-x(name="phone")
    a-input.phone-box(v-model:value="formData.phone" size="large" placeholder="请输入手机号")
      template(#addonBefore)
        a-select(v-model:value="phonePrefix")
          a-select-option(:value="0") +86
  a-form-item.enter-x(name="verify")
    div(ref="verifyItem")
      BasicDragVerify(:width="verifyWidth" @success="verifySuccess")
  a-form-item.enter-x(name="code")
    CountdownInput(
      size="large"
      v-model:value="formData.code"
      placeholder="请输入验证码"
    )
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
  import { defineComponent, onMounted, reactive, ref, computed } from 'vue'
  import { BasicDragVerify } from '/@/components/Verify/index'
  import { CountdownInput } from '/@/components/CountDown'
  import { getFormRule } from '../userLogin'

  export default defineComponent({
    name: 'LoginForm',
    components: {
      BasicDragVerify,
      CountdownInput,
    },
    setup() {
      let formData = reactive({
        phone: '',
        code: '',
        rember: true,
        autoLogin: true,
        verify: false,
      })
      let verifyItem: any = ref(null)
      let verifyWidth = ref(200)
      let formRef: any = ref(null)
      let formRules = computed(() => getFormRule(formData, 'textLogin'))
      onMounted(() => {
        verifyWidth.value = verifyItem.value.scrollWidth
      })
      function verifySuccess(successData) {
        formData.verify = successData.isPassing
      }
      function login() {
        // 表单验证
        formRef.value.validateFields().then((res) => {
          console.log(res, '=======')
          // res 返回表单数据 验证通过调用登录接口
        })
      }
      return {
        phonePrefix: ref(0),
        verifyItem,
        verifyWidth,
        formData,
        formRef,
        formRules,
        verifySuccess,
        login,
      }
    },
  })
</script>
<style scoped>
  /* .phone-box ::v-deep(.has-error .ant-select:not(.ant-select-borderless) .ant-select-selector, -has-error .ant-select:not(.ant-select-borderless) .ant-select-selector) {
  border-color: none !important;
} */
</style>
