<template>
    <form class="flex items-center px-4 bg-gray-900 h-15 rounded-sm border-l-2 border-green-400 mb-3"
        @submit.stop.prevent="addTodo">
        <input 
            v-model="newTitle"
            placeholder="Adicione uma nova tarefa ..." 
            type="text" 
            class="bg-gray-900 placeholder-gray-500 text-gray-500 font-light focus:outline-none block w-full appearance-none leading-normal py-3 pr-3"
        >
        <button class="text-green-400 text-xs font-semibold focus:outline-none" type="submit">
            ADICIONAR
        </button>
    </form>
</template>
<script>
import axios from 'axios'

export default {
    
    data (){
        return{
            newTitle: '',
            dataItem:{
                title: '',
                completed: false
            },
            load: false,
        }
    },

    methods: {
        addTodo(){
            this.load = true

            this.dataItem.title = this.newTitle, 
            this.dataItem.completed = false

            if(!this.dataItem.title){
                return;
            }

            axios.post(process.env.VUE_APP_PATH, this.dataItem).then((response) => {
                this.$store.commit('insertStoreStateTodos', response.data)
            })
            .catch(() => {
            })
            .finally(() => {
                this.load = false,
                this.newTitle = ''
            })
        },
    },
}
</script>
