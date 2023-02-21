<template>
    <div class="space-y-2">
            <FormItem 
                v-for="todo in $store.state.todos"
                :key="todo.id"
                :todo = "todo" 
            />
    </div>
</template>

<script>
import FormItem from '@/components/FormItem';

export default {
  name: 'App',
  components: {
    FormItem
  }
}
</script>