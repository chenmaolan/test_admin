import { ref, unref, Ref } from 'vue'
import { RuleObject } from 'ant-design-vue/lib/form/interface'
import { appStore } from '/@/store/modules/app'
import { userStore } from '/@/store/modules/user'

const phoneReg = /^1([3|5|6|7|8|9])\d{9}$/
const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
const code = /^([0-9])\d{6}$/
// 多条正则验证思路就是分开验证是否包含数字、字母、长度等限制条件
const passwordReg = /^(?=.*?[a-z)(?=.*>[A-Z])(?=.*?[0-9])[a-zA_Z0-9]{6,10}$/

// 手机验证码规则
const phoneValidate = async (_: RuleObject, value: string) => {
  if (!value) return Promise.reject('请输入账号')
  if (!phoneReg.test(value)) return Promise.reject('请输入正确的手机号码')
  Promise.resolve()
}
// 邮箱验证码规则
const emailValidate = async (_: RuleObject, value: string) => {
  if (!value) return Promise.reject('请输入邮箱')
  if (!emailReg.test(value)) return Promise.reject('请输入正确的邮箱账号')
  Promise.resolve()
}

// 账号验证规则
const accountValidate = async (_: RuleObject, value: string) => {
  if (!value) {
    return Promise.reject('请输入账号')
  } else if (!phoneReg.test(value) && !emailReg.test(value)) {
    return Promise.reject('请输入正确的手机号或邮箱')
  } else {
    return Promise.resolve()
  }
}
// 密码验证规则
const passwordValidate = async (_: RuleObject, value: string) => {
  if (!value) return Promise.reject('请输入密码')
  if (!passwordReg.test(value))
    return Promise.reject('请输入正确的密码格式（至少包含数字、字母组成6~10位字符）')
  return Promise.resolve()
}

// 拖动校验
const verifyValidate = async (_: RuleObject, value: Boolean) => {
  return !value ? Promise.reject('请拖动滑块') : Promise.resolve()
}

type formType = 'login' | 'textLogin' | 'forgetPassword' | 'register'
/**
 *
 * @param formData 表单
 * @param formType 表单类型
 */
export function getFormRule(formData, formType: formType) {
  // 重复密码校验
  const repasswordValidate = async (_: RuleObject, value: string) => {
    const { password } = formData
    if (!password) return Promise.reject('请先输入密码')
    if (!value) return Promise.reject('重复密码不能为空')
    if (value !== password) return Promise.reject('两次密码输入不一致')
    Promise.resolve()
  }

  // 短信验证码
  const codeValidate = async (_: RuleObject, value: string) => {
    if (!formData.verify) return Promise.reject('请先拖动滑块')
    if (!value) return Promise.reject('请输入验证码')
    if (!code.test(value)) return Promise.reject('请输入正确的验证码')
    Promise.resolve()
  }

  const getNicknameFormRule = [{ require: true, message: '请输入昵称', trigger: 'change' }]
  const getAccountFormRule = [{ validator: accountValidate, trigger: 'change' }]
  const getEmailFormRule = [{ validator: emailValidate, trigger: 'change' }]
  const getPhoneFormRule = [{ validator: phoneValidate, trigger: 'change' }]
  const getCodeFormRule = [{ validator: codeValidate, trigger: 'change' }]
  const getPasswordRule = [{ validator: passwordValidate, trigger: 'change' }]
  const getRePasswordRule = [{ validator: repasswordValidate, trigger: 'change' }]
  const getVerifyRule = [{ validator: verifyValidate, trigger: 'change' }]

  const inputPasswordErrorNum = ref(appStore.inputPasswordErrorNum)
  const formRule = {}
  switch (formType) {
    case 'login':
      formRule['account'] = getAccountFormRule
      formRule['password'] = getPasswordRule
      if (inputPasswordErrorNum.value >= 2) {
        formRule['verify'] = getVerifyRule
      }
      break
    case 'textLogin':
      formRule['phone'] = getPhoneFormRule
      formRule['verify'] = getVerifyRule
      formRule['code'] = getCodeFormRule
      break
    case 'forgetPassword':
      formRule['phone'] = getPhoneFormRule
      formRule['verify'] = getVerifyRule
      formRule['code'] = getCodeFormRule
      formRule['password'] = getPasswordRule
      formRule['repassword'] = getRePasswordRule
      break
    case 'register':
      formRule['nickname'] = getNicknameFormRule
      formRule['email'] = getEmailFormRule
      formRule['phone'] = getPhoneFormRule
      formRule['verify'] = getVerifyRule
      formRule['code'] = getCodeFormRule
      formRule['password'] = getPasswordRule
      formRule['repassword'] = getRePasswordRule
      break
  }

  return formRule
}

export function setRememberMe(status): void {
  userStore.commitRememberMe(status)
}

export function setAutoLogin(status): void {
  userStore.commitAutoLogin(status)
}

export function useFormValid<T extends Object = any>(formRef: Ref<any>) {
  async function validForm() {
    const form = unref(formRef)
    if (!form) return
    const data = await form.validate()
    return data as T
  }

  return { validForm }
}
