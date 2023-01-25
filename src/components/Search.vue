<template>
    <form class="form" @submit="onSubmit">
        <input class="search-song" type="text" v-model="text" placeholder="Title, artist..." />
        <input type="submit" value="Search" class="btn">
    </form>
</template>

<script>
export default {
    name: 'Search',
    data() {
        return {
            text:''
        }
    },
    methods:{
        onSubmit (e) {
            e.preventDefault();
            if (!this.text){
                return;
            }
            else {
                const title = this.text;
                this.text = '';
                this.$emit('search-title', title)
            }
        }
    }
}
</script>
<style scoped>
    .form{
        margin:0;
  width:100%;
    }
    .search-song{
        font-family: 'Outfit', sans-serif;
        border:none;
        background-color:rgb(236, 236, 236);
        color:#5f5369;
        padding:.7em;
        margin:.7em;
        width:25em;
    }
    .btn{
        padding:.7em;
        margin:.7em;
        border:none;
        background-color:#5f5369;
        color:rgb(236, 236, 236);
        cursor:pointer;
        transition:.3s;
        font-family: 'Outfit', sans-serif;
    }
    .btn:hover{
        background-color:#94899c;
    }
</style>