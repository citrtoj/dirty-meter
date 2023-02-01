<template>
    <div class="song" @click="searchSong">
        <h2 class="song-title">{{songTitle}}</h2>
        <h4 class="artist">{{artist.map(({ name }) => name).join(', ')}}</h4>
        <h4 class="album">{{album}}</h4>
    </div>
</template>

<script>
import { assertStandardized } from '@babel/types';
const azlyrics = require('js-azlyrics')
export default {
    name:'Song',
    props:{
        songTitle:String,
        artist:Array,
        album:String,
    },
    methods:{
        async searchSong() {
            
            //TODO: change how the lyrics work
            fetch(`https://some-random-api.ml/lyrics?title=${this.artist[0].name + " " + this.songTitle}`)
                .then(response => response.json())
                .then(response => {
                this.$emit('lyrics-box', response, this.songTitle, this.artist.map(({ name }) => name).join(', '));
                }).catch(err => {this.$emit('error')
            });
        },
    }
};
</script>

<style scoped>
    .song{text-align:left;
    padding:.5rem;
    background-color:rgb(236, 236, 236);
    margin-bottom:.5rem;
        cursor:pointer;
    }
    h2,h4{
        margin:0.5rem;
    }
</style>