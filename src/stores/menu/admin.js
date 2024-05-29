const adminMenu = [
  {
    path: 'users',
    name: 'user',
    component: () => import('@/views/admin/users.vue'),
    icon: 'user',
    meta: {
      group: 'dashboard',
      title: 'Пользователи',
      role: ['admin']
    }
  },
  {
    path: 'call',
    name: 'call',
    component: () => import('@/views/admin/call.vue'),
    icon: 'phone',
    meta: {
      group: 'dashboard',
      title: 'Звонки',
      role: ['admin']
    }
  },
  {
    path: 'category',
    name: 'category',
    component: () => import('@/views/admin/category.vue'),
    icon: 'list',
    meta: {
      title: 'Категории',
      role: ['admin'],
      group: 'product'
    }
  },
  {
    path: 'brand',
    name: 'brand',
    component: () => import('@/views/admin/brand.vue'),
    icon: 'list',
    meta: {
      title: 'Бренди',
      role: ['admin'],
      group: 'product'
    }
  },
  {
    path: 'attribute',
    name: 'attribute',
    component: () => import('@/views/admin/attribute.vue'),
    icon: 'discount',
    meta: {
      title: 'Атрибуты',
      role: ['admin'],
      group: 'product'
    }
  },
  {
    path: 'product',
    name: 'product',
    component: () => import('@/views/admin/product.vue'),
    icon: 'list',
    meta: {
      title: 'Товары',
      role: ['admin'],
      group: 'product'
    }
  },
  {
    path: 'page',
    name: 'page',
    component: () => import('@/views/admin/page.vue'),
    icon: 'files',
    meta: {
      title: 'Страницы',
      role: ['admin'],
      group: 'content'
    }
  },
  {
    path: 'news',
    name: 'news',
    component: () => import('@/views/admin/news.vue'),
    icon: 'document',
    meta: {
      title: 'Новости',
      role: ['admin'],
      group: 'content'
    }
  },
  {
    path: 'service',
    name: 'service',
    component: () => import('@/views/admin/service.vue'),
    icon: 'finished',
    meta: {
      title: 'Услуги',
      role: ['admin'],
      group: 'content'
    }
  }
]

export { adminMenu }
