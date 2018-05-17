<template>
  <li>
    <input type="checkbox" :id="id" v-model='todo.done' @change="handleChange(todo)">
    <label :for="id" v-text="todo.text" :class="{'done':todo.done}"></label>
    <button @click.prevent="handleDelete(todo)">X</button>
  </li>
</template>
<script>
import { mapMutations } from 'vuex';
import {state,MY_STORAGE_KEY} from '../my_mutation';
export default {
  props:['todo'],
  data:function () {
    let i =1;
    return{
      id:'id-'+Number(Math.random().toString().substr(3,10) + Date.now()).toString(36)
    }
  },
  methods:{
    ...mapMutations(['deleteTodo','toggleTodo','editTodo']),
    handleChange:function(todo){
      // this.toggleTodo({todo});
			window.localStorage.setItem(MY_STORAGE_KEY,JSON.stringify(state.todos))    
    },
    handleDelete:function(todo){
      this.deleteTodo({todo});
			window.localStorage.setItem(MY_STORAGE_KEY,JSON.stringify(state.todos));      
    }
  }
}
</script>
<style scoped>
  li{
    list-style: none;
    text-align: left;
  }
  li button{
    float: right;
    cursor: pointer;
  }
  li label,li input{
    cursor: pointer;
  }
  li:hover{
    background: silver;
  }
  label.done{
    text-decoration: line-through;
  }
</style>


