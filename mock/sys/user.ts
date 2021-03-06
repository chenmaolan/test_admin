import { MockMethod } from 'vite-plugin-mock'
import { resultError, resultSuccess } from '../_util'

function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'vben',
      realName: 'Vben Admin',
      phone: '',
      email: '',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
    },
    {
      userId: '2',
      username: 'test',
      phone: '',
      email: '',
      password: '123456',
      realName: 'test user',
      desc: 'tester',
      token: 'fakeToken2',
      roles: [
        {
          roleName: 'Tester',
          value: 'test',
        },
      ],
    },
    {
      userId: '3',
      username: 'Mao',
      password: 'test123456',
      phone: '18955555555',
      email: '123456@qq.com',
      realName: 'MaoXiXi',
      desc: 'MaoXiXi--tester',
      token: 'fakeToken3',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
      access: [],
      // access: ['childrenThree'],
    },
  ]
}

const fakeCodeList: any = {
  '1': ['1000', '3000', '5000'],

  '2': ['2000', '4000', '6000'],
}
export default [
  // mock user login
  {
    url: '/basic-api/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { username, password, phone, email, account } = body
      const checkUser = createFakeUserList().find(
        (item) =>
          (item.username === username ||
            item.phone === phone ||
            item.email === email ||
            item.phone === account ||
            item.email === account) &&
          password === item.password
      )
      if (!checkUser) {
        return resultError('Incorrect account or password！')
      }
      const { userId, username: _username, token, realName, desc, roles } = checkUser
      return resultSuccess({
        roles,
        userId,
        username: _username,
        token,
        realName,
        desc,
      })
    },
  },
  {
    url: '/basic-api/getUserInfoById',
    method: 'get',
    response: ({ query }) => {
      const { userId } = query
      const checkUser = createFakeUserList().find((item) => item.userId === userId)
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!')
      }
      return resultSuccess(checkUser)
    },
  },
  {
    url: '/basic-api/getPermCodeByUserId',
    timeout: 200,
    method: 'get',
    response: ({ query }) => {
      const { userId } = query
      if (!userId) {
        return resultError('userId is not null!')
      }
      const codeList = fakeCodeList[userId]

      return resultSuccess(codeList)
    },
  },
] as MockMethod[]
