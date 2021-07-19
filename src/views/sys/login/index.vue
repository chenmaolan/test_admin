<template lang="pug">
.w-full.h-full(:class='prefixCls')
  Row.enter-x
    Col(span='8')
      .mt-10.ml-10.mr-10.enter-x
        Tabs(v-model:activeKey='activeKey', :class='`${prefixCls}-tabs`')
          TabPane(
            key='login',
            :tab='t("sys.login.accountLogin")',
            v-if='activeKey === "login" || activeKey === "textlogin"'
          )
            LoginForm(@toggleTabs='toggleTabs')
          TabPane(
            key='textlogin',
            :tab='t("sys.login.textLogin")',
            v-if='activeKey === "login" || activeKey === "textlogin"'
          )
            TextLogin(@toggleTabs='toggleTabs')
          TabPane(
            key='forget',
            :tab='t("sys.login.forgetFormTitle")',
            v-if='activeKey === "forget"'
          )
            ForgetPasswordForm(@toggleTabs='toggleTabs')
          TabPane(
            key='regist',
            :tab='t("sys.login.signUpFormTitle")',
            v-if='activeKey === "regist"'
          )
            RegistForm(@toggleTabs='toggleTabs')
    Col(span='16')
      span image
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { Tabs, Row, Col } from 'ant-design-vue'
  import { useI18n } from '/@/hooks/web/useI18n'
  import ForgetPasswordForm from './components/ForgetPasswordForm.vue'
  import LoginForm from './components/LoginForm.vue'
  import RegistForm from './components/RegistForm.vue'
  import TextLogin from './components/TextLogin.vue'
  export default defineComponent({
    name: 'Login',
    components: {
      Tabs,
      TabPane: Tabs.TabPane,
      Row,
      Col,
      LoginForm,
      TextLogin,
      ForgetPasswordForm,
      RegistForm,
    },
    setup() {
      const { prefixCls } = useDesign('login')
      const { t } = useI18n()
      let activeKey = ref('login')
      function toggleTabs(key) {
        activeKey.value = key
      }
      return {
        t,
        prefixCls,
        activeKey,
        toggleTabs,
      }
    },
  })
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-login';
</style>
