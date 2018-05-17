<template>
	<div id="d">
		<!-- <h1>MY TO DO LIST</h1> -->
		<div>
			<input type="text" placeholder="添加todo" v-model="newTodo.text"
			@keyup.enter="handleEnter(newTodo)">
		</div>
		<div class="options">
			<span>还剩下{{notDoneTodos.length}}个没完成！</span>
			<button :class="{ active:type=='all'}" @click.prevent="handleFilter('all')">全部({{todos.length}})</button>
			<button :class="{ active:type=='not'}" @click.prevent="handleFilter('not')">未完成({{notDoneTodos.length}})</button>
			<button :class="{ active:type=='done'}" @click.prevent="handleFilter('done')">已完成({{doneTodos.length}})</button>
			<button :class="{ active:type=='clear'}" @click.prevent="handleFilter('clear')">清空完成</button>
		</div>
		<div>
			<ul>
				<my-todo v-for="item in showTodos" :key="item.id" v-bind:todo="item">
				</my-todo>
			</ul>
		</div>
	</div>
</template>
<script>
import { mapMutations } from 'vuex';
import { mapState,mapGetters } from 'vuex';
import {state,MY_STORAGE_KEY} from '../my_mutation';
import my_todo from '../components/my_todo';
export default {
	data:function(){
		return {
			newTodo:{
				text:'',
				done:false
			},
			showTodos:this.todos || [],
			type:'all'
		}
	},
	created:function(){
		this.showTodos=this.todos || []
	},
	components:{
		'my-todo':my_todo
	},
	computed:{
		// ...mapState(['todos'])
		todos:function(){
			console.log(this.$store.state.todos);
			return this.$store.state.todos;
		},
		...mapGetters(['doneTodos','notDoneTodos'])
	},
	methods:{
		...mapMutations(['addTodo','toggleAll','clearCompleted']),
		handleEnter:function (todo,e) {
			if (!todo.text) {
				return;
			}
			this.addTodo(todo);
			window.localStorage.setItem(MY_STORAGE_KEY,JSON.stringify(this.todos))
			this.newTodo.text = '';
			this.handleFilter('all');
		},
		handleFilter:function(type){
			if (type == 'all') {
				this.showTodos = this.todos;
			}
			if (type == 'not') {
				this.showTodos = this.notDoneTodos
			}
			if (type=='done') {
				this.showTodos = this.doneTodos;
			}
			if (type=='clear') {
				this.clearCompleted();
				window.localStorage.setItem(MY_STORAGE_KEY,JSON.stringify(this.todos));
				this.handleFilter(this.type);

			}
			if (type&&type!='clear') {
				this.type = type;
			}
		}
	}
}
</script>
<style scoped>
	div.options{
		margin-top: 50px;
	}
	div.options button{
		cursor: pointer;
		padding: 5px;
		border: 1px solid salmon;
	}
	div.options button.active{
		background: #1e67d2;
		color: white;
		border:0;
	}
</style>


