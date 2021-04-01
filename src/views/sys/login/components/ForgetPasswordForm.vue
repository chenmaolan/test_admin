<template lang="pug">
a-form.enter-x(ref="formRef" :model="formData" :rules="formRules")
  a-form-item.enter-x(name="phone")
    a-input(v-model:value="formData.phone" size="large" placeholder="请输入手机号")
      template(#addonBefore)
        a-select(v-model:value="phonePrefix")
          a-selectOption(:value="0") +86
  a-form-item.enter-x(name="verify")
    div(ref="verifyItem")
      BasicDragVerify(:width="verifyWidth" @success="verifySuccess")
  a-form-item.enter-x(name="code")
    CountdownInput(
      size="large"
      v-model:value="formData.code"
      placeholder="手机验证码"
    )
  a-form-item.enter-x(name="password")
    a-input-password(v-model:value="formData.password" size="large" placeholder="请输入新密码")
  a-form-item.enter-x(name="repassword")
    a-input-password(v-model:value="formData.repassword" size="large" placeholder="请再输入一次新密码")
  a-form-item.enter-x
    a-button(type="primary" size="large" block @click="confirm") 重设密码
  a-form-item.enter-x.text-right
    a-button(type="link" @click="$emit('toggleTabs', 'login')") 账号登录
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
        password: '',
        repassword: '',
        code: '',
        verify: false,
        rember: true,
        autoLogin: true,
      })
      let verifyItem: any = ref(null)
      let verifyWidth = ref(200)
      let formRef: any = ref(null)
      let formRules = computed(() => getFormRule(formData, 'forgetPassword'))
      onMounted(() => {
        verifyWidth.value = verifyItem.value.scrollWidth
        console.log(verifyItem, verifyItem.value, verifyWidth, 'verifyItem')
      })
      onMounted(() => {
        verifyWidth.value = verifyItem.value.scrollWidth
      })
      function verifySuccess(successData) {
        formData.verify = successData.isPassing
      }
      function confirm() {
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
        formRules,
        verifySuccess,
        formRef,
        confirm,
      }
    },
  })
</script>
