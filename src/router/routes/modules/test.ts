import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'

const test: AppRouteModule = {
  path: '/test',
  name: 'test',
  component: LAYOUT,
  redirect: '/test/children-one',
  meta: {
    title: '测试页面',
    icon: 'ion:accessibility',
  },
  children: [
    {
      path: 'children-one',
      name: 'childrenOne',
      component: () => import('/@/views/test/index.vue'),
      meta: {
        icon: '',
        title: '第一个子',
      },
    },
    {
      path: 'children-second',
      name: 'childrenSecond',
      component: () => import('/@/views/test/index.vue'),
      meta: {
        icon: '',
        title: '第二个子',
      },
    },
    {
      path: 'children-three',
      name: 'childrenThree',
      component: () => import('/@/views/test/index.vue'),
      meta: {
        icon: '',
        title: '第三个子',
        access: 'childrenThree',
        operation: [
          {
            label: '测试权限',
            accessKey: 'childrenThree',
          },
        ],
      },
    },
  ],
}

export default test
