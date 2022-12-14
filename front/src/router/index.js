import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexView from '@/views/IndexView'
import LoginView from '@/views/LoginView'
import ProfileView from '@/views/ProfileView'
import MyMovieView from '@/views/MyMovieView'
import SearchMovieView from '@/views/SearchMovieView'
import TicketingView from '@/views/TicketingView'
import MovieDetailView from '@/views/MovieDetailView'
import SignUpView from '@/views/SignUpView'

import TmpView from '@/views/TmpView'
import TmpReviewC from '@/views/TmpReviewC'
import TmpBadgeDataCreate from '@/views/TmpBadgeDataCreate'
import DatePickerTestView from '@/views/DatePickerTestView'
import PaymentView from '@/views/PaymentView'

import store from '@/store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'IndexView',
    component: IndexView
  },
  {
    path: '/Login',
    name: 'LoginView',
    component: LoginView,
    beforeEnter(to, from, next) {
      if (store.getters.isLogin) {
        next({name: 'IndexView'})
      } else {
        next()
      }
    }
  },
  {
    path: '/profile/:username',
    name: 'ProfileView',
    component: ProfileView
  },
  {
    path: '/mymovie',
    name: 'MyMovieView',
    component: MyMovieView
  },
  {
    path: '/search',
    name: 'SearchMovieView',
    component: SearchMovieView
  },
  {
    path: '/moviedetail/:moviePk', 
    name: 'MovieDetailView',
    component: MovieDetailView,
  },
  {
    path: '/ticketing/:moviePk',
    name: 'TicketingView',
    component: TicketingView
  },
  {
    path: '/sign-up',
    name: 'SignUpView',
    component: SignUpView,
    beforeEnter(to, from, next) {
      if (store.getters.isLogin) {
        next({name: 'IndexView'})
      } else {
        next()
      }
    }
  },
  {
    path: '/tmp',
    name: 'TmpView',
    component: TmpView
  },
  {
    path: '/tmp/c',
    name: 'TmpReviewC',
    component: TmpReviewC

  },
  {
    path: '/TmpBadgeDataCreate',
    name: 'TmpBadgeDataCreate',
    component: TmpBadgeDataCreate
  },
  {
    path: '/DatePickerTestView',
    name: 'DatePickerTestView',
    component: DatePickerTestView
  },
  {
    path: '/PaymentView',
    name: 'PaymentView',
    component: PaymentView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // ?????? ?????? ??????(????????? ????????? true, ???????????? ????????? false)
  const authenticationState = store?.state?.token? true : false
  
  // ????????? ???????????? ????????? ????????? ?????? ???????????? ??????
  const authentication = ['SignUpView', 'LoginView'].includes(to.name)? false: true

  console.log('authenticationState', authenticationState)
  console.log('authentication', authentication)

  console.log(from, to)
  // ???????????? ?????? && ???????????????(?????????) ???????????? ????????? ????????? ?????? ???????????? ?????? 
  if (!authenticationState && authentication) {
    next({name: 'LoginView'})
  }
  else {
    next()
  }
  // else if (to != from) {
  //   next()
  // }

})

export default router
