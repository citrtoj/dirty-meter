<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height:100%;
  display:flex;
  justify-content:center;
}
.flex{
  display:flex;
}

.song-results, .lyrics{
  flex: 1 1 0px;
  margin:1em;
}
.lyrics{
  background-color:rgb(236, 236, 236);
  height:fit-content;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  padding:1em;
}
.column{
  flex-direction:column;
}
.footer{
  width:100%;
  justify-self:center;
  align-self:center;
  display:flex;
}
.btn,.search-song,.lyrics,.song{
  border-radius:8px;
}
</style>


<template>
<div class="flex column wrapper">
  <div class="main">
    <Header title="Dirty-Meter"/>
    <Search class="search" @search-title="searchTitle"/>
  </div>
  <div class="flex column">
    <div class="flex bottom">
      <div class="song-results"  v-if="boolResults">
        <Song @error="errorHandle" @lyrics-box="setLyrics" v-bind:key="song.id" v-for="song in songs" :songTitle="song.name"  :artist="song.artists" :album="song.album.name"/>
      </div>
      <LyricMessage class="lyrics" :currentSong="currentSong" :currentArtists="currentArtists" :songLyrics="percentage" :boolLyrics="boolLyrics" :swearCount="swearCount"/>
    </div>
    <Footer class="footer"/>
  </div>
</div>
</template>

<script>
import Header from './components/Header.vue'
import Search from './components/Search.vue'
import Song from './components/Song.vue'
import LyricMessage from './components/Lyrics.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header, Search, Song, LyricMessage, Footer,
  },
  data() {
    return {
      songs: [],
      percentage: -1,
      boolResults: false,
      boolLyrics: false,
      currentSong: '',
      currentArtists: '',
      swearCount: -1,
    }
  },
  methods: {
    checkMobileLayout() {
      if (window.innerWidth <= 720) {
        if (this.boolLyrics == true) {
          this.boolResults = false;
        }
      }
    },

    reset() {
      this.percentage = -1;
      this.swearCount = -1;
      this.checkMobileLayout();
    },

    setLyrics(lyrics, title, artist) {
      this.boolLyrics = true;
      this.checkMobileLayout();
      window.scrollTo ({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      
      if (lyrics.lyrics === undefined) {
        this.reset();
        return;
      }
      const lyricsString = lyrics.lyrics.split('\r').pop().replace(/ *\[[^\]]*]/g, '');
      var regWords = /\b(\S+)\b/gmui;
      var regCurse = /\b(4r5e|dicks|5h1t|5hit|a55|anal|anus|ar5e|arrse|arse|ass|ass-fucker|asses|assfucker|assfukka|asshole|assholes|asswhole|a_s_s|b!tch|b00bs|b17ch|b1tch|ballbag|balls|ballsack|bastard|beastial|beastiality|bellend|bestial|bestiality|bi\+ch|biatch|bitch|bitcher|bitchers|bitches|bitchin|bitching|bloody|blow job|blowjob|blowjobs|boiolas|bollock|bollok|boner|boob|boobs|booobs|boooobs|booooobs|booooooobs|breasts|buceta|bugger|bum|bunny fucker|butt|butthole|buttmuch|buttplug|c0ck|c0cksucker|carpet muncher|cawk|chink|cipa|cl1t|clit|clitoris|clits|cnut|cock|cock-sucker|cockface|cockhead|cockmunch|cockmuncher|cocks|cocksuck|cocksucked|cocksucker|cocksucking|cocksucks|cocksuka|cocksukka|cok|cokmuncher|coksucka|coon|cox|crap|cum|cummer|cumming|cums|cumshot|cunilingus|cunillingus|cunnilingus|cunt|cuntlick|cuntlicker|cuntlicking|cunts|cyalis|cyberfuc|cyberfuck|cyberfucked|cyberfucker|cyberfuckers|cyberfucking|d1ck|damn|dick|dickhead|dildo|dildos|dink|dinks|dirsa|dlck|dog-fucker|doggin|dogging|donkeyribber|doosh|duche|dyke|ejaculate|ejaculated|ejaculates|ejaculating|ejaculatings|ejaculation|ejakulate|f u c k|f u c k e r|f4nny|fag|fagging|faggitt|faggot|faggs|fagot|fagots|fags|fanny|fannyflaps|fannyfucker|fanyy|fatass|fcuk|fcuker|fcuking|feck|fecker|felching|fellate|fellatio|fingerfuck|fingerfucked|fingerfucker|fingerfuckers|fingerfucking|fingerfucks|fistfuck|fistfucked|fistfucker|fistfuckers|fistfucking|fistfuckings|fistfucks|flange|fook|fooker|fuck|fucka|fucked|fucker|fuckers|fuckhead|fuckheads|fuckin|fucking|fuckings|fuckingshitmotherfucker|fuckme|fucks|fuckwhit|fuckwit|fudge packer|fudgepacker|fuk|fuker|fukker|fukkin|fuks|fukwhit|fukwit|fux|fux0r|f_u_c_k|gangbang|gangbanged|gangbangs|gaylord|gaysex|goatse|God|god-dam|god-damned|goddamn|goddamned|hardcoresex|hell|heshe|hoar|hoare|hoer|homo|hore|horniest|horny|hotsex|jack-off|jackoff|jap|jerk-off|jism|jiz|jizm|jizz|kawk|knob|knobead|knobed|knobend|knobhead|knobjocky|knobjokey|kock|kondum|kondums|kum|kummer|kumming|kums|kunilingus|l3i\+ch|l3itch|labia|lust|lusting|m0f0|m0fo|m45terbate|ma5terb8|ma5terbate|masochist|master-bate|masterb8|masterbat\*|masterbat3|masterbate|masterbation|masterbations|masturbat|mo-fo|mof0|mofo|mothafuck|mothafucka|mothafuckas|mothafuckaz|mothafucked|mothafucker|mothafuckers|mothafuckin|mothafucking|mothafuckings|mothafucks|mother fucker|motherfuck|motherfucked|motherfucker|motherfuckers|motherfuckin|motherfucking|motherfuckings|motherfuckka|motherfucks|muff|mutha|muthafecker|muthafuckker|muther|mutherfucker|n1gga|n1gger|nazi|nigg3r|nigg4h|nigga|niggah|niggas|niggaz|nigger|niggers|nob|nob jokey|nobhead|nobjocky|nobjokey|numbnuts|nutsack|orgasim|orgasims|orgasm|orgasms|p0rn|pawn|pecker|penis|penisfucker|phonesex|phuck|phuk|phuked|phuking|phukked|phukking|phuks|phuq|pigfucker|pimpis|piss|pissed|pisser|pissers|pisses|pissflaps|pissin|pissing|pissoff|poop|porn|porno|pornography|pornos|prick|pricks|pron|pube|pula|pusse|pussi|pussies|pussy|pussys|rectum|retard|rimjaw|rimming|s hit|s\.o\.b\.|sadist|schlong|screwing|scroat|scrote|scrotum|semen|sex|sh!\+|sh!t|sh1t|shag|shagger|shaggin|shagging|shemale|shi\+|shit|shitdick|shite|shited|shitey|shitfuck|shitfull|shithead|shiting|shitings|shits|shitted|shitter|shitters|shitting|shittings|shitty|skank|slut|sluts|smegma|smut|snatch|son-of-a-bitch|spac|spunk|s_h_i_t|t1tt1e5|t1tties|teet|teez|testical|testicle|tit|titfuck|tits|titt|tittie5|tittiefucker|titties|thot|thott|tittyfuck|tittywank|titwank|tosser|turd|tw4t|twat|twathead|twatty|twunt|twunter|v14gra|v1gra|vagina|viagra|vulva|w00se|wang|wank|wanker|wanky|whoar|whor|willies|willy|xrated|xxx|hoe|hoes)(e*?)((ing)*?)(s*?)\b/gmui;
      this.currentSong = title;
      this.currentArtists = artist;
      this.percentage = -1;
      
      var countSwears = ((lyricsString || '').match(regCurse) || []).length;
      var countWords = ((lyricsString || '').match(regWords) || []).length;
      if (countWords > 0) {
        this.swearCount = countSwears;
        var percentage = (countSwears / countWords * 100).toFixed(2);
        this.percentage = percentage;
      }
      else {
        this.percentage = -1;
      }
    },

    async searchTitle(title){
      this.boolResults = true;
      this.boolLyrics = false;
      window.scrollTo({
        top: 0,
        bottom: 0,
        behavior: 'smooth'
      });

      fetch('.netlify/functions/spotify').then(function (resp) {
        return resp.json();
      })
      .then((data) => {
        var auth=data.data.access_token;
        return fetch(`https://api.spotify.com/v1/search?q=${title}` + '&type=track&limit=10', {
          headers: {
            'Authorization': `Bearer ${auth}`,
            "Content-Type": "application/json"
          }
        });
      })
      .then(response => response.json())
      .then(response => {
        const songItems = response.tracks.items;
        this.songs = songItems;
        this.mobileSongs();
      }).catch(function (err) {
        console.log('something went wrong', err);

      });
    },
  }
}
</script>