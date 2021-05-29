import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "数据看板", icon: "dashboard" }
      }
    ]
  },

  // {
  //   path: '/users',
  //   component: Layout,
  //   redirect: '/users/index',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'UserIndex',
  //       component: () => import('@/views/users/index'),
  //       meta: { title: '用户管理', icon: 'dashboard' }
  //     }
  //   ]
  // },
  // {
  //   path: '/tenant',
  //   component: Layout,
  //   redirect: '/tenant/index',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'TenantIndex',
  //       component: () => import('@/views/tenant/index'),
  //       meta: { title: '租户管理', icon: 'dashboard' }
  //     }
  //   ]
  // },

  // {
  //   path: '/role',
  //   component: Layout,
  //   redirect: '/role/index',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'RoleIndex',
  //       component: () => import('@/views/role/index'),
  //       meta: { title: '角色管理', icon: 'dashboard' }
  //     }
  //   ]
  // },

  // {
  //   path: '/menus',
  //   component: Layout,
  //   redirect: '/menus/index',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'MenuIndex',
  //       component: () => import('@/views/menu/index'),
  //       meta: { title: '菜单管理', icon: 'dashboard' }
  //     }
  //   ]
  // },

  {
    path: "/signin-oidc",
    component: () => import("@/views/signin-oidc"),
    hidden: true
  },
  {
    path: "/signin-oidc-error",
    component: () => import("@/views/signin-oidc-error"),
    hidden: true
  },
  {
    path: "/silent-renew-oidc",
    component: () => import("@/views/redirect-silent-renew"),
    hidden: true,
    meta: {
      isOidcCallback: true
    }
  },
  {
    path: "/signin-oidc-popup",
    component: () => import("@/views/signin-oidc-popup"),
    hidden: true
  }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
