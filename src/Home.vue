<template>
    <div class="px-3 py-10 md:px-10">
        <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
         
            
        <TodoSpinner v-show="load"></TodoSpinner><br>
        <div>
            <FormAdd></FormAdd>
            <FormItems></FormItems>
        </div>
        
        <FormEmpty v-show="!$store.state.todos.length > 0"></FormEmpty>

        </div>
    </div>
</template>
    
<script>
import TodoSpinner from '@/components/TodoSpinner';
import FormAdd from '@/components/FormAdd';
import FormEmpty from '@/components/FormEmpty';
import FormItems from '@/components/FormItems';
import axios from 'axios';
    
export default {
name: 'App',
    
components: {
    TodoSpinner,
    FormAdd,
    FormEmpty,
    FormItems
},
    
data () {
    return{
        load: false,
    }
},

methods:{
    getTodos(){
        this.load = true

        axios.get(process.env.VUE_APP_PATH).then((response) => {
            this.$store.commit('updateStoreStateTodos', response.data)
        })
        .catch(() => {
        })
        .finally(() => {
            this.load = false
        })
    }
},
    
created () {
    this.getTodos()
},

}
</script>
    