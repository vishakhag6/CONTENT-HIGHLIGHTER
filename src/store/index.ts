import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogObj: {
      id: '',
      title: '',
      author: '',
      content: ''
    },
    blogArr: []
  },
  mutations: {
    updateBlogObj (state: any, { key, value }) {
      state.blogObj[key] = value
    },
    setBlogData (state, value) {
      state.blogArr = value
    }
  }
})
