import Vue from 'vue'
import Router from 'vue-router'
import NewBank from './views/banks/NewBank'
import NewQuestion from './views/questions/NewQuestion'
import NewQuestionType from './views/question_types/NewQuestionType'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'NewQuestion',
      component: NewQuestion
    },
    {
      path: '/banks/new',
      name: 'newBank',
      component: NewBank
    },
    {
        path: '/question_types/new',
        name: 'newQuestionType',
        component: NewQuestionType
    }
  ]
})
