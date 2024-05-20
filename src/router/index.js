import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import Articles from '../views/Articles.vue'
import store from './../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/signin'
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/articles',
    name: 'articles',
    component: Articles
  },
  {
    path: '/articles/:id',
    name: 'article',
    component: () => import('../views/Article.vue')
  },
  {
    path: '/new-article',
    name: 'new-article',
    component: () => import('../views/NewArticle.vue')
  },
  {
    path: '/edit-article/:id',
    name: 'edit-article',
    component: () => import('../views/EditArticle.vue')
  },
  {
    path: '/categories/:id',
    name: 'categories',
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../views/User.vue')
  },
  {
    path: '/admin',
    exact: true,
    redirect: '/admin/articles'
  },
  {
    path: '/admin/articles',
    name: 'admin-articles',
    component: () => import('../views/AdminArticles.vue')
  },
  {
    path: '/admin/categories',
    name: 'admin-categories',
    component: () => import('../views/AdminCategories.vue')
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach(async (to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  // 比較 localStorage 和 store 中的 token 是否一樣
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  const pathsWithoutAuthentication = ['sign-up', 'sign-in']
  // 如果 token 無效，想去需要有效 token 的頁面，則轉址到登入頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }

  // 如果 token 有效，想去登入、註冊頁，則轉址到文章列表
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/articles')
    return
  }

  next()
})

export default router
