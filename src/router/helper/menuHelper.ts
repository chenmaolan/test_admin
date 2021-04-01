import { AppRouteModule } from '/@/router/types'
import type { MenuModule, Menu, AppRouteRecordRaw } from '/@/router/types'

import { findPath, treeMap } from '/@/utils/helper/treeHelper'
import { cloneDeep } from 'lodash-es'
import { isUrl } from '/@/utils/is'

export function getAllParentPath<T = Recordable>(treeData: T[], path: string) {
  const menuList = findPath(treeData, (n) => n.path === path) as Menu[]
  return (menuList || []).map((item) => item.path)
}

function joinParentPath(menus: Menu[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index]
    // https://next.router.vuejs.org/guide/essentials/nested-routes.html
    // Note that nested paths that start with / will be treated as a root path.
    // This allows you to leverage the component nesting without having to use a nested URL.
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      // path doesn't start with /, nor is it a url, join parent path
      menu.path = `${parentPath}/${menu.path}`
    }
    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.path)
    }
  }
}

// Parsing the menu module
export function transformMenuModule(menuModule: MenuModule): Menu {
  const { menu } = menuModule

  const menuList = [menu]

  joinParentPath(menuList)
  return menuList[0]
}

export function transformRouteToMenu(routeModList: AppRouteModule[]) {
  const cloneRouteModList = cloneDeep(routeModList)
  const routeList: AppRouteRecordRaw[] = []

  cloneRouteModList.forEach((item) => {
    if (item.meta?.single) {
      const realItem = item?.children?.[0]
      realItem && routeList.push(realItem)
    } else {
      routeList.push(item)
    }
  })
  const list = treeMap(routeList, {
    conversion: (node: AppRouteRecordRaw) => {
      const { meta: { title, hideMenu = false } = {} } = node
      return {
        ...(node.meta || {}),
        meta: node.meta,
        name: title,
        hideMenu,
        path: node.path,
      }
    },
  })
  joinParentPath(list)
  return cloneDeep(list)
}

// 判断当前页面权限
export function hasPermission(route: Menu, access: string[]): boolean {
  if (!route.meta || !route.meta.access) return true
  return access.includes(route.meta.access)
}

// 筛选 符合当前角色的 权限路由
export function filterAsyncRouter(asyncRoutes: Menu[], access: string[]): Menu[] {
  const res: Menu[] = []
  asyncRoutes.forEach((route) => {
    if (hasPermission(route, access)) {
      if (route.children) {
        route.children = filterAsyncRouter(route.children, access)
      }
      res.push(route)
    }
  })
  return res
}
