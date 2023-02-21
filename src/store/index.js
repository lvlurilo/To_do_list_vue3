import { createStore } from 'vuex'

export default createStore({
  state: {
    todos: []
  },

  mutations: {
    updateStoreStateTodos(state, newData){
       state.todos = newData
    },

    updateStoreStateItem(state, newData){
      const index = state.todos(todo => todo.id === newData.id)

       if(index >= 0){
        state.todos.splice(index, 1, newData)
       }
    },

    deleteStoreStateItem(state, idData){
      const index = state.todos(todo => todo.id === idData)

       if(index >= 0){
        state.todos.splice(index, 1)
       }
    },

    insertStoreStateTodos(state, newData){
      state.todos.push(newData)
      //state.todos.unshift(newData) add na primeira posicao
    }
  },

  actions: {
  },
  
  getters: {
  },
})
