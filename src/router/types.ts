import type { RouteRecordRaw } from 'vue-router'
import { RoleEnum } from '/@/enums/roleEnum'

import { defineComponent } from 'vue'

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

export interface RouteMeta {
  // title 路由title  一般必填
  title: string
  // Whether to ignore permissions 是否忽略权限，只在权限模式为Role的时候有效
  ignoreAuth?: boolean
  // role info 可以访问的角色，只在权限模式为Role的时候有效
  roles?: RoleEnum[]
  // Whether not to cache 是否忽略KeepAlive缓存
  ignoreKeepAlive?: boolean
  // Is it fixed on tab 是否固定标签
  affix?: boolean
  // icon on tab 图标，也是菜单图标
  icon?: string
  // 内嵌iframe的地址
  frameSrc?: string

  // current page transition 指定该路由切换的动画名
  transitionName?: string

  // Whether the route has been dynamically added 隐藏该路由在面包屑上面的显示
  hideBreadcrumb?: boolean

  // Hide submenu  隐藏所有子菜单
  hideChildrenInMenu?: boolean

  // Carrying parameters 如果该路由会携带参数，且需要在tab页上面显示。则需要设置为true
  carryParam?: boolean

  // Used internally to mark single-level menus 用于内部标记单级菜单
  single?: boolean

  // Currently active menu 当前激活的菜单。用于配置详情页时左侧激活的菜单路径
  currentActiveMenu?: string

  // Never show in tab 当前路由不再标签页显示
  hideTab?: boolean

  // Never show in menu  当前路由不再菜单显示
  hideMenu?: boolean

  isLink?: boolean

  access?: string // 页面权限

  operation?: operationAccess[] // 细粒度权限
}

// 操作权限类型
export interface operationAccess {
  label: string
  accessKey: string
}

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string
  meta: RouteMeta
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  props?: Recordable
  fullPath?: string
}
export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success'
  content?: string
  dot?: boolean
}

export interface Menu {
  name: string

  icon?: string

  path: string

  disabled?: boolean

  children?: Menu[]

  orderNo?: number

  roles?: RoleEnum[]

  meta?: Partial<RouteMeta>

  tag?: MenuTag

  hideMenu?: boolean
}

export interface MenuModule {
  orderNo?: number
  menu: Menu
}

// export type AppRouteModule = RouteModule | AppRouteRecordRaw;
export type AppRouteModule = AppRouteRecordRaw
