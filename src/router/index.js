import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true
  },

  {
    path: '/home',
    name: 'Home',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Homepages',
        component: () => import('@/views/Home')
      }
    ],
    meta: {
      title: 'Home',
      icon: 'el-icon-s-home'
    }
  },
  {
    path: '/ChangePassword',
    name: 'ChangePassword',
    component: Layout,
    hidden:true,
    children :[
      {
        path: 'index',
        name: 'ChangePassword',
        component: () => import('@/views/ChangePassword'),
      },
    ],
    meta: {
      title: 'ChangePassword',
    }
  },

  {
    path: '/PersonalInfo',
    name: 'PersonalInfo',
    component: Layout,
    hidden:true,
    children :[
      {
        path: 'index',
        name: 'PersonalInfo',
        component: () => import('@/views/PersonalInfo'),
      },
    ],
    meta: {
      title: 'PersonalInfo',
    }
  },
  {
    path: '/people',
    name: 'People',
    component: Layout,
    children: [
      {
        path: 'student',
        name: 'StudentManagement',
        component: () => import('@/views/people/student'),
        meta: {
          title: 'Student Management'
        }
      },
      {
        path: 'student/bulkupload',
        name:'bulkupload',
        component: () => import('@/views/people/student/bulkupload'),
        hidden: true,
        meta: {
          title: 'Bulk Upload'
          }
        },
      {
        path: 'student/add',
        name:'add',
        component: () => import('@/views/people/student/add'),
        hidden: true,
        meta: {
          title: 'Add Manually'
          }
        },
      {
        path: 'group',
        name: 'GroupManagement',
        component: () => import('@/views/people/group'),
        meta: {
        title: 'Group Management'
        }

}
    ],
    meta: {
      title: 'Student & Group',
      icon: 'el-icon-user-solid'
    }
  },
  {
    path: '/project',
    name: 'ProjectManagement',
    component: Layout,
    children: [
      {
        path: 'upload',
        name: 'ProjectUpload',
        component: () => import('@/views/project/upload'),
        meta: {
          title: 'Project Upload'
        }
      },
      {
        path: 'list',
        name: 'ProjectList',
        component: () => import('@/views/project/list'),
        meta: {
          title: 'Project List'
        }
      },
      {
        path: 'list/detail',
        name: 'ProjectDetail',
        component: () => import('@/views/project/list/detail'),
        hidden:true,
        meta: {
          title: 'Project Detail'
        }
      },
      {
        path: 'list/edit',
        name: 'ProjectEdit',
        component: () => import('@/views/project/list/edit'),
        hidden:true,
        meta: {
          title: 'Project Edit'
        }
      }
    ],
    meta: {
      title: 'Project Management',
      icon: 'el-icon-s-cooperation'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Layout,
    redirect: '/admin/list',
    children: [
      {
        path: 'list',
        name: 'AdminList',
        component: () => import('@/views/admin/list'),
        meta: {
          title: 'Admin list',
        }
      },
      {
        path: 'add',
        name: 'AddAdmin',
        component: () => import('@/views/admin/add'),
        meta: {
          title: 'Add admin',
        }
      },
      {
        path: 'add/:id',
        name: 'EditAdmin',
        component: () => import('@/views/admin/add'),
        meta: {
          title: 'Edit admin'
        },
        hidden: true
      }
    ],
    meta: {
      title: 'Admin Management',
      icon: 'el-icon-s-custom',
      roles: ['super_admin']
    }
  },

  {
    path: '/allocation',
    name: 'ProjectAllocation',
    component: Layout,
    children: [
      {
        path: 'result',
        name: 'ProjectResult',
        component: () => import('@/views/allocation/project_result'),
        meta: {
          title: 'Project result',
        }
      },
      {
        path: 'allocate',
        name: 'Allocate',
        component: () => import('@/views/allocation/project_allocation'),
      
        meta: {
          title: 'Allocation',
        }
      },
      {
        path: 'invalidGroup',
        name: 'invalidGroup',
        component: () => import('@/views/allocation/invalidGroup'),
      
        meta: {
          title: 'Invalid Group',
        },
      },
    ],
    meta: {
      title: 'Project Allocation',
      icon: 'el-icon-s-ticket'
    }
  },

  {
    path: '/announcement',
    name: 'Announcement',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'AnnouncementList',
        component: () => import('@/views/announcement/list'),
        meta: {
          title: 'Announcement list',
        }
      },
      {
        path: 'upload',
        name: 'AnnouncementUpload',
        component: () => import('@/views/announcement/upload'),
        meta: {
          title: 'Announcement upload',
        }
      },
      {
        path: 'edit/:id',
        name: 'AnnouncementEdit',
        component: () => import('@/views/announcement/upload'),
        hidden: true,
        meta: {
          title: 'Announcement edit',
        }
      },
    ],
    meta: {
      title: 'Announcement',
      icon: 'el-icon-bell'
    }
  }

]

export const asyncRoutes = [
  {
    path: '/admin',
    name: 'Admin',
    component: Layout,
    redirect: '/admin/list',
    children: [
      {
        path: 'list',
        name: 'AdminList',
        component: () => import('@/views/admin/list'),
        meta: {
          title: 'Admin list',
        }
      },
      {
        path: 'add',
        name: 'AddAdmin',
        component: () => import('@/views/admin/add'),
        meta: {
          title: 'Add admin',
        }
      },
      {
        path: 'add/:id',
        name: 'EditAdmin',
        component: () => import('@/views/admin/add'),
        meta: {
          title: 'Edit admin'
        },
        hidden: true
      }
    ],
    meta: {
      title: 'Admin Management',
      icon: 'el-icon-s-custom',
      roles: ['super_admin']
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
