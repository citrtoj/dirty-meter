<template>
    <div v-if="boolLyrics">
        <div v-if="this.swearCount>=0">
        <h2 v-if="this.swearCount>=0">{{currentSong}} by {{currentArtists}} is 
            <span v-if="this.songLyrics==0">precisely</span><span v-if="this.songLyrics>0">(approximately)</span>
            {{songLyrics}}% dirty.
        </h2>
       
        <h4 v-if="this.songLyrics==0">You're good. Most likely, anyway. You might want to check for metaphors and all that before your parents hear you playing this - but at least it's radio-friendly. Well done.</h4>
        
        <h4 v-if="this.swearCount>0&&this.swearCount<=5">Not quite fully radio-friendly, but with {{swearCount}} word<span v-if="this.swearCount>1">s</span> it can be easily censored and played on the air. If your parents are understandable enough, I doubt this'll be a problem, so you're in the safe zone.</h4>

        <h4 v-if="this.swearCount>5&&this.swearCount<=14">It doesn't sound like much, but trust me, with {{swearCount}} swear words, it's not to be underestimated. Perhaps don't play this at any family parties. Or do. Whatever you want to do. I can't make decisions for you. I'm just a Vue project. Have fun listening to, er, {{currentArtists}}, I guess.</h4>
        
        <h4 v-if="this.swearCount>14">Oh, sweet mother of God. {{swearCount}} swear words is... something. I'm, uh, not going to say anything about that - after all, I'm here to count all of them. But, for the love of God, do not play this around your parents. Just saying.</h4>
        
        <h4 v-if="this.swearCount>=0">Try another one?</h4>
        </div>
        <div class="err" v-if="this.songLyrics<0">
            <h2>An error occured.</h2>
      
            <h4>Sorry.</h4>
            <h4>This most likely happened because the requested lyrics aren't available.</h4>
            <h4>Feel free to pick another song.</h4>
        </div>
        
    </div>
</template>

<script>
export default {
    name:'Lyrics',
    props:{
        swearCount:{
            type:Number,default:-1
        },
        currentArtists:{
            type:String,default:''
        },
        songLyrics:{
            type:Number,default:-1
        },
        boolLyrics: Boolean,

        currentSong:{
            type:String,default:''
        },
    }
    
}
</script>
