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
    a-button(type="primary" size="large" block @click="handleLogin" :loading="loading") 登录
  a-form-item.enter-x.text-right
    a-button(type="link" @click="$emit('toggleTabs', 'forget')") 忘记密码
    span.mr-3.ml-3 |
    a-button(type="link"  @click="$emit('toggleTabs', 'regist')") 注册
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, onMounted, computed, watch, nextTick } from 'vue'
  import { CountdownInput } from '/@/components/CountDown'
  import { BasicDragVerify } from '/@/components/Verify/index'
  import { appStore } from '/@/store/modules/app'
  import { userStore } from '/@/store/modules/user'
  import { getFormRule } from '../userLogin'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { useKeyPress } from '/@/hooks/event/useKeyPress'
  import { KeyCodeEnum } from '/@/enums/keyCodeEnum'
  export default defineComponent({
    name: 'LoginForm',
    components: {
      CountdownInput,
      BasicDragVerify,
    },
    setup() {
      let formData = reactive({
        account: '18959257879',
        password: 'test123456',
        verify: false, // 输入两次错误进行拖动校验
        rember: ref(userStore.rememberMeState),
        autoLogin: ref(userStore.autoLoginState),
      })
      let formRules = computed(() => getFormRule(formData, 'login'))
      let formRef: any = ref()
      let verifyItem: any = ref(null)
      let verifyWidth = ref(300)
      let loading = ref(false)
      // 密码输入两次不正确展示滑动按钮
      let inputPasswordErrorNum = computed(() => appStore.inputPasswordErrorNum)
      const { notification } = useMessage()
      const { t } = useI18n()
      useKeyPress(['enter'], (events) => {
        const keyCode = events.keyCode

        if (keyCode === KeyCodeEnum.ENTER) {
          handleLogin()
        }
      })
      watch(
        () => inputPasswordErrorNum.value,
        (value) => {
          if (value >= 2) {
            nextTick(() => {
              verifyWidth.value = verifyItem.value.clientWidth
            })
          }
        },
        { immediate: true }
      )
      async function handleLogin() {
        try {
          loading.value = true
          let userData = await formRef.value.validateFields()
          let userinfo = await userStore.login(userData)
          if (userinfo) {
            userStore.commitRememberMe(formData.rember)
            userStore.commitAutoLogin(formData.autoLogin)
            userStore.commitUser(userinfo)
            notification.success({
              message: t('sys.login.loginSuccessTitle'),
              description: `${t('sys.login.loginSuccessDesc')}: ${userinfo.realName}`,
              duration: 3,
            })
          }
        } catch (err) {
          // 不加catch 报警告，对于报错事件未处理
          console.log(err, 'catch----')
        } finally {
          loading.value = false
        }
        // 表单验证
      }
      function verifySuccess(successData) {
        formData.verify = successData.isPassing
      }
      onMounted(() => {
        if (appStore.inputPasswordErrorNum >= 2) {
          verifyWidth.value = verifyItem.value.clientWidth
        }
      })

      return {
        formData,
        verifyItem,
        verifyWidth,
        inputPasswordErrorNum,
        handleLogin,
        formRules,
        formRef,
        verifySuccess,
        loading,
      }
    },
  })
</script>
