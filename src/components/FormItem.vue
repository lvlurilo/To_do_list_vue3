<template>
    <div class="bg-gray-300 rounded-sm">
        <div class="flex items-center px-4 py-3 border-b border-gray-400 last:border-b-0">
            <div class="flex items-center justify-center mr-2">
                <button 
                    @click="checkTodoItem"
                    :class="{
                    'text-gray-400': !isCompleted,
                    'text-green-600': isCompleted,
                    }"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </button>
            </div>
            <div class="w-full">
                <input
                    type="text"
                    placeholder="Digite a sua tarefa"
                    v-model="title"
                    class="bg-gray-300 placeholder-gray-500 text-gray-700 font-light focus:outline-none block w-full appearance-none leading-normal mr-3"
                    @keyup.enter="updateTodoTitle">
            </div>
            <div class="ml-auto flex items-center justify-center">
                <button 
                    @click="deleteTodoItem"    
                    class="focus:outline-none">
                    <svg class="ml-3 h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 
                                19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    props: {
        todo: { type: Object, default: ()=> Object }
    },

    data(){
        return {
            title: this.todo.title,
            isCompleted: this.todo.completed
        }
    },

    methods: {
        updateTodoTitle(){
            if(!this.title){
                return
            }
            
            this.updateTodoItem();
        },

        checkTodoItem(){
            this.isCompleted = !this.isCompleted;
            this.updateTodoItem();
        },

        updateTodoItem(){
            
            this.load = true

            if(!this.title){
                return;
            }

            const newItem = {
                id: this.todo.id,
                data: {
                    title: this.title,
                    completed: this.isCompleted
                }
            }

            axios.put(process.env.VUE_APP_PATH +`/${newItem.id}`, newItem.data).then((response) => {
                this.$store.commit('updateStoreStateItem', response.data)
            })
            .catch(() => {
            })
            .finally(() => {
                this.load = false           
            })
        },

        deleteTodoItem(){
            this.load = true

            const idItem = this.todo.id
            axios.delete(process.env.VUE_APP_PATH +`/${idItem}`).then((response) => {
                this.$store.commit('deleteStoreStateItem', response.data)
            })
            .catch(() => {
            })
            .finally(() => {
                this.load = false ,
                this.refreshPage()             
            })
        },

        refreshPage(){
            window.location.reload();
        }
    }
}
</script>