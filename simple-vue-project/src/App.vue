<template>
  <div id="app">
    <!-- 这是唱碟的背景 -->
    <div class="bg-blur" :style="'background-image:url('+currentSong.album_logo+')'"></div>
    <!-- 这是会旋转的唱碟 -->
    <div class="dist">
      <div class="song-img" ref="songimg" :style="'background-image:url('+currentSong.album_logo+')'"></div>
    </div>
    <!-- 播放控制条 -->
    <div class="ctr-box">
      <div class="pre" @click="preSong"></div>
      <div v-bind:class="isPlay?'play':'paused'" v-on:click="toogleplay"></div>
      <div class="next" @click="nextSong"></div>
      <div class="voice-box">
        <div>
          <div class="voice-icon-oh"></div>
          <div class="voice-icon-ov"></div>
        </div>
        <input type="range" min="0" max="100" class="voice-range" ref="voiceRange" v-model="voice"
        :style="'background: linear-gradient(to right,rgb(235, 116, 112),rgb(235, 116, 112) '+voice+'%,white '+voice+'%,white)'">
      </div>
    </div>
    <!-- 右侧的部分歌词标题 -->
    <div class="right-part">
      <p class="title">{{currentSong.song_name}}</p>
      <p class="artist">{{currentSong.artist_name}}</p>
      <div class="lyrics">
        <!-- <p class="">告白气球 - 周杰伦
      </p><p class="">作词：方文山
      </p><p class="">作曲：周杰伦
      </p><p class="">编曲：林迈可
      </p><p class="">制作人：周杰伦
      </p><p class="">吉他：林迈可
      </p><p class="">录音师：杨瑞代
      </p><p class="">录音室：JVR Studio
      </p><p class="">混音师：林迈可
      </p><p class="pink">混音室：VIP Music
      </p><p class="">塞纳河畔 左岸的咖啡
      </p><p class="">我手一杯 品尝你的美
      </p><p class="">留下唇印的嘴
      </p><p class="">花店玫瑰 名字写错谁
      </p><p class="">告白气球 风吹到对街
      </p><p class="">微笑在天上飞
      </p><p class="">你说你有点难追
      </p><p class="">想让我知难而退
      </p><p class="">礼物不需挑最贵
      </p><p class="">只要香榭的落叶
      </p><p class="">喔 营造浪漫的约会
      </p><p class="">不害怕搞砸一切
      </p><p class="">拥有你就拥有 全世界
      </p><p class="">亲爱的 爱上你 从那天起
      </p><p class="">甜蜜的很轻易
      </p><p class="">亲爱的 别任性 你的眼睛
      </p><p class="">在说我愿意
      </p><p class="">塞纳河畔 左岸的咖啡
      </p><p class="">我手一杯 品尝你的美
      </p><p class="">留下唇印的嘴
      </p><p class="">花店玫瑰 名字写错谁
      </p><p class="">告白气球 风吹到对街
      </p><p class="">微笑在天上飞
      </p><p class="">你说你有点难追
      </p><p class="">想让我知难而退
      </p><p class="">礼物不需挑最贵
      </p><p class="">只要香榭的落叶
      </p><p class="">喔 营造浪漫的约会
      </p><p class="">不害怕搞砸一切
      </p><p class="">拥有你就拥有 全世界
      </p><p class="">亲爱的 爱上你 从那天起
      </p><p class="">甜蜜的很轻易
      </p><p class="">亲爱的 别任性 你的眼睛
      </p><p class="">在说我愿意
      </p><p class="">亲爱的 爱上你 恋爱日记
      </p><p class="">飘香水的回忆
      </p><p class="">一整瓶 的梦境 全都有你
      </p><p class="">搅拌在一起
      </p><p class="">亲爱的别任性 你的眼睛
      </p><p class="">在说我愿意
      </p> -->
      <p>暂无歌词</p>
      </div>
    </div>
    <!-- 这是播放进度条 -->
    <div class="progress">
      <span class="time">{{currentTime | date}}</span>
      <input type="range" class="progress-range" min="0" max="100" ref="progress" :value="percent">
      <span class="time">{{duration | date}}</span>
    </div>
    <audio :src="currentSong.listen_file" ref="audio" preload="metadata" :volume="voice/100" 
    @loadedmetadata="loadedmetadata"
    @durationchange="durationchange"
    @timeupdate="timeupdate"
    @ended="ended"></audio>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      isPlay:false,
      voice:100,
      times:'',
      currentTime:'',
      duration:'',
      songIndex:2,
      percent:0,
      lyrics:[],
      songLists: [
        {
          song_id: 1776156051,
          song_name: "告白气球",
          album_id: 2100350206,
          album_name: "周杰伦的床边故事",
          album_logo:
            "http://pic.xiami.net/images/album/img60/1260/21003502061466736281_1.jpg",
          artist_id: 1260,
          artist_name: "周杰伦",
          artist_logo:
            "http://pic.xiami.net/images/artistlogo/36/15162027033536_1.jpg",
          listen_file:
            "http://m128.xiami.net/260/1260/2100350206/1776156051_1493963551486.mp3?auth_key=1524020400-0-0-a49230c8a56988278104e1e2149584b9",
          demo: 0,
          need_pay_flag: 2,
          lyric: "http://img.xiami.net/lyric/51/1776156051_1505273986_2447.trc",
          purview_roles: [
            {
              quality: "e",
              operation_list: [
                { purpose: 1, upgrade_role: 0 },
                { purpose: 2, upgrade_role: 4 }
              ]
            },
            {
              quality: "f",
              operation_list: [
                { purpose: 1, upgrade_role: 0 },
                { purpose: 2, upgrade_role: 4 }
              ]
            },
            {
              quality: "l",
              operation_list: [
                { purpose: 1, upgrade_role: 0 },
                { purpose: 2, upgrade_role: 4 }
              ]
            },
            {
              quality: "h",
              operation_list: [
                { purpose: 1, upgrade_role: 4 },
                { purpose: 2, upgrade_role: 4 }
              ]
            },
            {
              quality: "s",
              operation_list: [
                { purpose: 1, upgrade_role: 4 },
                { purpose: 2, upgrade_role: 4 }
              ]
            }
          ],
          is_play: 0,
          play_counts: 0,
          singer: ""
        },
        {
          song_id: 376016,
          song_name: "听妈妈的话",
          album_id: 6641,
          album_name: "依然范特西",
          album_logo:
            "http://pic.xiami.net/images/album/img7/958707/66411509958708_1.jpg",
          artist_id: 1260,
          artist_name: "周杰伦",
          artist_logo:
            "http://pic.xiami.net/images/artistlogo/36/15162027033536_1.jpg",
          listen_file:
            "http://m128.xiami.net/260/1260/6641/376016_14750_l.mp3?auth_key=1524106800-0-0-1c5a904b506964e411b64d5342369900",
          demo: 0,
          need_pay_flag: 2,
          lyric: "http://img.xiami.net/lyric/16/376016_1505124212_3927.trc",
          purview_roles: [
            {
              quality: "e",
              operation_list: [
                { purpose: 1, upgrade_role: 0 },
                { purpose: 2, upgrade_role: 4 }
              ]
            },
            {
              quality: "f",
              operation_list: [
                { purpose: 1, upgrade_role: 0 },
                { purpose: 2, upgrade_role: 4 }
              ]
            },
            {
              quality: "l",
              operation_list: [
                { purpose: 1, upgrade_role: 0 },
                { purpose: 2, upgrade_role: 4 }
              ]
            },
            {
              quality: "h",
              operation_list: [
                { purpose: 1, upgrade_role: 4 },
                { purpose: 2, upgrade_role: 4 }
              ]
            },
            {
              quality: "s",
              operation_list: [
                { purpose: 1, upgrade_role: 4 },
                { purpose: 2, upgrade_role: 4 }
              ]
            }
          ],
          is_play: 0,
          play_counts: 0,
          singer: ""
        },
        {
          song_id: 388455,
          song_name: "青花瓷",
          album_id: 32627,
          album_name: "我很忙",
          album_logo:
            "http://pic.xiami.net/images/album/img93/405993/326271517405994_1.png",
          artist_id: 1260,
          artist_name: "周杰伦",
          artist_logo:
            "http://pic.xiami.net/images/artistlogo/36/15162027033536_1.jpg",
          listen_file:
            "http://m128.xiami.net/260/1260/32627/388455_2603789_l.mp3?auth_key=1524106800-0-0-90a0dac059af8116cdcc71bf2c4e096a",
          demo: 0,
          need_pay_flag: 2,
          lyric: "http://img.xiami.net/lyric/55/388455_1505184095_6391.trc",
          purview_roles: [
            {
              quality: "e",
              operation_list: [
                { purpose: 1, upgrade_role: 0 },
                { purpose: 2, upgrade_role: 4 }
              ]
            },
            {
              quality: "f",
              operation_list: [
                { purpose: 1, upgrade_role: 0 },
                { purpose: 2, upgrade_role: 4 }
              ]
            },
            {
              quality: "l",
              operation_list: [
                { purpose: 1, upgrade_role: 0 },
                { purpose: 2, upgrade_role: 4 }
              ]
            },
            {
              quality: "h",
              operation_list: [
                { purpose: 1, upgrade_role: 4 },
                { purpose: 2, upgrade_role: 4 }
              ]
            },
            {
              quality: "s",
              operation_list: [
                { purpose: 1, upgrade_role: 4 },
                { purpose: 2, upgrade_role: 4 }
              ]
            }
          ],
          is_play: 0,
          play_counts: 0,
          singer: ""
        }
      ]
    };
  },
  computed:{
    currentSong:function(){
      return this.songLists[this.songIndex];
    }
  },
  methods:{
    toogleplay:function(event){
      var audio = this.$refs.audio;
      var songimg = this.$refs.songimg;
      songimg.style.animationPlayState="paused";
      this.isPlay=!this.isPlay;
      if(this.isPlay){
        audio.play();
      songimg.style.animationPlayState="running";        
      }else{
        audio.pause();
        songimg.style.animationPlayState="paused";
      }
      console.log(audio.volume);
      
    },
    nextSong:function(){
      this.songIndex = (this.songIndex+1)%this.songLists.length;
    },
    preSong:function(){
      this.songIndex = (this.songIndex+this.songLists.length-1)%this.songLists.length;
    },
    
    handdlekey:function(evt){
      // console.log(evt.keyCode);
      
      if (evt.keyCode === 32) {
       this.toogleplay();
      }
      if(evt.keyCode ===40){
        this.nextSong()
      }
      if(evt.keyCode ===38){
        this.preSong()
      }
    },
    loadedmetadata:function(e){
      this.duration= this.$refs.audio.duration;
      this.currentTime = this.$refs.audio.currentTime;
      // console.log(this.$refs.audio.currentTime);
      // console.log(this.$refs.audio.duration);
      // this.
      // this.$set('duration',this.$refs.audio.duration)
      // this.$set('currentTime',this.$refs.audio.currentTime)
    },
    timeupdate:function(e){
      // console.log(e);
      this.currentTime = this.$refs.audio.currentTime;
      this.percent = this.currentTime/this.duration*100;
      this.$refs.progress.style.backgroundImage=`linear-gradient(
    to right,
    rgb(235, 116, 112),
    rgb(235, 116, 112) ${this.currentTime/this.duration*100}%,
    white ${this.currentTime/this.duration*100}%,
    white
  )`
      
    },
    ended:function(e){
      this.nextSong();
    },
    durationchange:function(e){
      // console.log(e,'durationchange');
      
    }

    
  },
  filters:{
            date(value) {
                if (!value)return '00:00';
                let min, sed;
                parseInt(value / 60) > 9 ? min = parseInt(value / 60) : min = '0' + parseInt(value / 60);
                (value % 60).toFixed(0) > 9 ? sed = (value % 60).toFixed(0) : sed = '0' + (value % 60).toFixed(0);
                return `${min}:${sed}`;
            }
  },
  watch:{
    voice:function(){
        this.$refs.audio.volume = this.voice / 100;
        this.$refs.voiceRange.style.background = `linear-gradient(to right, #eb7470, #eb7470 ${this.voice}%, white ${this.voice}%, white)`;
    }
  },
  created: function() {
    document.addEventListener('keyup', this.handdlekey);
    this.$http.get('http://127.0.0.1:3000/lyric?url='+this.songLists[this.songIndex].lyric)
    .then(function (d) {
      this.lyrics = d;
      console.log(d);
      
    }).catch(function (e) {
      console.log('error:'+e.message);
      console.log(e);
      
    });
  }

};
</script>
<style>
#app,
.bg-blur {
  margin: 0;
  padding: 0;
  top: 50%;
  left: 50%;
  min-width: 922px;
  height: 667px;
  background-color: white;
  position: fixed;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
}
#app {
  background: rgba(0, 0, 0, 0.8);
}
.bg-blur {
  border: 1px solid gray;
  z-index: -1;
  background-image: url("http://pic.xiami.net/images/album/img60/1260/21003502061466736281_1.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(20px);
}
.dist {
  width: 300px;
  height: 300px;
  position: relative;
  left: 10%;
  top: 10%;
  background-image: radial-gradient(5em 30em ellipse, #fff, #000);
  border: 2px solid #131313;
  border-radius: 150px;
  box-shadow: 0 0 0 10px #343935;
  opacity: 0.7;
  transform: rotate(45deg);
}
.song-img {
  height: 200px;
  width: 200px;
  border-radius: 100px;
  background: url("http://pic.xiami.net/images/album/img60/1260/21003502061466736281_1.jpg")
    center no-repeat;
  background-size: cover;
  position: relative;
  left: 50%;
  top: 50%;
  border: 2px solid #131313;
  transform: translate(-50%, -50%) rotate(0deg);
  -ms-transform: translate(-50%, -50%) rotate(0deg);
  -moz-transform: translate(-50%, -50%) rotate(0deg);
  -webkit-transform: translate(-50%, -50%) rotate(0deg);
  -o-transform: translate(-50%, -50%) rotate(0deg);
  transform-origin: center;
  animation: animations1 10s linear infinite forwards;
  /* animation-play-state: paused; */
}
@keyframes animations1 {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  25% {
    transform: translate(-50%, -50%) rotate(90deg);
  }
  50% {
    transform: translate(-50%, -50%) rotate(180deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.ctr-box {
  background-color: rgba(0, 0, 0, 0.3);
  margin: 20% 0 0 10%;
  /* width: 200px; */
  /* height: 50px; */
  vertical-align: middle;
  padding-left: 10px;
  border-radius: 10px;
  width: 39%;
}
.pre,
.play,
.paused,
.next {
  outline: none;
  width: 36px;
  height: 36px;
  border-radius: 36px;
  border: 2px solid white;
  cursor: pointer;
  display: inline-block;
  position: relative;
}
.pre::before {
  content: "";
  height: 0;
  width: 0;
  display: block;
  /* border: 10px transparent solid;
    border-right-color: white;
    border-left-width: 0; */
  border-top: 10px solid transparent;
  border-right: 10px solid white;
  border-bottom: 10px solid transparent;
  border-left: 0;
  position: relative;
  left: 16px;
  top: 8px;
}
.pre::after {
  content: "";
  width: 4px;
  height: 20px;
  display: inline-block;
  position: relative;
  background-color: white;
  left: 10px;
  top: -12px;
}
.play,.paused {
  display: inline-block;
  margin: 0 20px;
}
.paused::after {
  width: 0;
  height: 0;
  content: "";
  display: block;
  border-top: 10px solid transparent;
  border-right: 0;
  border-bottom: 10px solid transparent;
  border-left: 10px solid #fff;
  position: relative;
  top: 8px;
  left: 15px;
}
.play {
  display: inline-block;
  margin: 0 20px;
}
.play::after {
  width: 4px;
  height: 20px;
  content: "";
  display: block;
  position: relative;
  background-color: #fff;
  top: -12px;
  left: 10px;
}
.play::before {
  width: 4px;
  height: 20px;
  content: "";
  display: block;
  position: relative;
  background-color: #fff;  
  top: 8px;
  left: 20px;
}
.next {
  display: inline-block;
  position: relative;
}
.next::after {
  content: "";
  display: block;
  width: 4px;
  height: 20px;
  background: #fff;
  position: relative;
  top: -12px;
  right: -22px;
}
.next::before {
  content: "";
  height: 0;
  width: 0;
  display: block;
  border-top: 10px solid transparent;
  border-right: 0;
  border-bottom: 10px solid transparent;
  border-left: 10px solid #fff;
  position: relative;
  top: 8px;
  left: 10px;
}
.voice-box {
  width: 150px;
  height: 42px;
  margin-left: 20px;
  display: inline-block;
  position: relative;
}
.voice-icon-oh {
  position: absolute;
  height: 10px;
  width: 10px;
  display: block;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.voice-icon-oh::before {
  content: "";
  width: 6px;
  height: 8px;
  display: block;
  background-color: #ffffff;
}
.voice-icon-oh::after {
  content: "";
  display: block;
  height: 8px;
  width: 0;
  border: 5px transparent solid;
  border-left-width: 0;
  border-right-color: #ffffff;
  position: absolute;
  top: 50%;
  left: 6px;
  transform: translateY(-50%);
}
.voice-icon-ov {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 2px;
}
.voice-icon-ov::before {
  content: "";
  height: 19px;
  width: 15px;
  display: block;
  border: 2px solid transparent;
  border-right: 2px solid #ffffff;
  border-radius: 20px;
}
.voice-icon-ov::after {
  content: "";
  display: block;
  height: 15px;
  width: 15px;
  border: 2px solid transparent;
  border-right: 2px solid #ffffff;
  border-radius: 15px;
  position: absolute;
  top: 2px;
  left: -4px;
}
input[type="range"] {
  /* appearance: none; */
  -webkit-appearance: none;
  height: 8px;
  border-radius: 10px;
}
input[type="range"]::-webkit-slider-thumb,
input[type="range"]::-moz-range-thumb,
input[type="range"]::-ms-thumb {
  -webkit-appearance: none;
  height: 13px;
  width: 13px;
  border-radius: 13px;
  background-color: rgb(235, 116, 112);
  border: 3px solid white;
  cursor: pointer;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
}
input[type="range"]:focus {
  outline: none;
}
.voice-range {
  background: linear-gradient(
    to right,
    rgb(235, 116, 112),
    rgb(235, 116, 112) 48%,
    white 48%,
    white
  );
  float: right;
  width: 100px;
  margin: 16px 20px 0 0;
}

.progress {
  width: 100%;
  position: relative;
  color: #ffffff;
  position: fixed;
  left: 20px;
  bottom: 20px;
}
.time {
  color: white;
}
.progress-range {
  /* background: linear-gradient(
    to right,
    rgb(235, 116, 112),
    rgb(235, 116, 112) 48%,
    white 48%,
    white
  ); */
  width: 80%;
}
/* 右侧 */
.right-part {
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 600px;
  overflow: hidden;
  color: white;
}
.title {
  font-size: 30px;
  margin: 50px 0 0 30px;
}
.artist {
  margin: 0 30px;
  font-size: 16px;
  line-height: 50px;
  border-bottom: 1px solid #fff;
}
.lyrics {
  margin-top: 20px;
  padding-right: 25px;
  width: 100%;
  height: 400px;
  line-height: 35px;
  overflow-y: scroll;
  color: #fff;
  white-space: pre-line;
  text-align: center;
}
</style>
