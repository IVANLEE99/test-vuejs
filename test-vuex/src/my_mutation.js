export const MY_STORAGE_KEY = 'mytodos'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

export const state = {
  todos: JSON.parse(window.localStorage.getItem(MY_STORAGE_KEY) || '[]'),
}
export const getters={
  doneTodos:function(state){
    return state.todos.filter(todo => todo.done)
  },
  notDoneTodos:function(state){
    return state.todos.filter(todo=>!todo.done)
  }
}
export const mutations = {
  //添加todolist
  addTodo (state, { text }) {
    state.todos.push({
      text,
      done: false
    })
  },
  //删除
  deleteTodo (state, { todo }) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  },
  //切换
  toggleTodo (state, { todo }) {
    todo.done = !todo.done
  },
  //修改
  editTodo (state, { todo, value }) {
    todo.text = value
  },
  //全部状态切换
  toggleAll (state, { done }) {
    state.todos.forEach((todo) => {
      todo.done = done
    })
  },
  //清空完成的
  clearCompleted (state) {
    state.todos = state.todos.filter(todo => !todo.done)
  }
}