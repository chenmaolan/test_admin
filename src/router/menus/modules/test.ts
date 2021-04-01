import type { MenuModule } from '/@/router/types'

const test: MenuModule = {
  orderNo: 1,
  menu: {
    path: '/test',
    name: '测试',
    children: [
      {
        path: 'children-one',
        name: '第一个子集',
      },
      {
        path: 'children-second',
        name: '第二个子集',
      },
      {
        path: 'children-three',
        name: '第三个子集',
      },
    ],
  },
}
export default test
