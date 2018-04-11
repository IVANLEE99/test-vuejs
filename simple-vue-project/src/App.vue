<template>
  <div id="app">
    <!-- 这是唱碟的背景 -->
    <div class="bg-blur"></div>
    <!-- 这是会旋转的唱碟 -->
    <div class="dist">
      <div class="song-img"></div>

    </div>
    <!-- 播放控制条 -->
    <div class="ctr-box">
      <div class="pre"></div>
      <div class="play"></div>
      <div class="next"></div>
      <div class="voice-box">
        <div>
          <div class="voice-icon-oh"></div>
          <div class="voice-icon-ov"></div>
        </div>
        <input type="range" min="0" max="100" class="voice-range">
      </div>
    </div>
    <!-- 右侧的部分歌词标题 -->
    <div class="right-part"></div>
    <!-- 这是播放进度条 -->
    <div class="progress"></div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>
<style>
  #app,.bg-blur{
    margin: 0;
    padding: 0;
    top:50%;
    left:50%;
    min-width: 922px;
    height: 667px;
    background-color: white;
    position: fixed;
    transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
  }
  #app{
    background: rgba(0, 0, 0, .8);
  }
  .bg-blur{
    border: 1px solid gray;
    z-index: -1;
    background-image: url("http://pic.xiami.net/images/album/img60/1260/21003502061466736281_1.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(20px);
  }
  .dist{
    width: 300px;
    height: 300px;
    position: relative;
    left: 10%;
    top: 10%;
    background-image: radial-gradient(5em 30em ellipse, #fff, #000);
    border: 2px solid #131313;
    border-radius: 150px;
    box-shadow: 0 0 0 10px #343935;
    opacity: .7;
    transform:rotate(45deg);
  }
  .song-img{
    height: 200px;
    width: 200px;
    border-radius: 100px;
    background: url("http://pic.xiami.net/images/album/img60/1260/21003502061466736281_1.jpg") center no-repeat;
    background-size: cover;
    position: relative;
    left: 50%;
    top: 50%;
    border: 2px solid #131313;
    transform: translate(-50%,-50%) rotate(0deg);
    -ms-transform:  translate(-50%,-50%) rotate(0deg);
    -moz-transform:  translate(-50%,-50%) rotate(0deg);
    -webkit-transform:  translate(-50%,-50%) rotate(0deg);
    -o-transform:  translate(-50%,-50%) rotate(0deg);
    transform-origin:center;
    animation: animations1 10s linear infinite forwards;
    /* animation-play-state: paused; */
  }
  @keyframes animations1 {
    0%{
      transform: translate(-50%,-50%) rotate(0deg);
    }
    25%{
      transform: translate(-50%,-50%) rotate(90deg);
    }
    50%{
      transform: translate(-50%,-50%) rotate(180deg);
    }
    100%{
      transform: translate(-50%,-50%) rotate(360deg);
    }
    
  }
  .ctr-box{
    background-color: rgba(0, 0, 0, .3);
    margin: 15% 0 0 10%;
    /* width: 200px; */
    /* height: 50px; */
    vertical-align: middle;
    padding-left: 10px;
    border-radius: 10px;
  }
  .pre,.play,.next{
    width: 36px;
    height: 36px;
    border-radius: 36px;
    border: 2px solid white;
    cursor: pointer;
    display: inline-block;
    position: relative;
  }
  .pre::before{
    content: '';
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
  .pre::after{
    content: '';
    width: 4px;
    height: 20px;
    display: inline-block;
    position: relative;
    background-color: white;
    left: 10px;
    top: -12px;
  }
  .play{
    display: inline-block;
    margin: 0 20px;
  }
  .play::after{
    width: 0;
    height: 0;
    content: '';
    display: block;
    border-top: 10px solid transparent;
    border-right: 0;
    border-bottom: 10px solid transparent;
    border-left: 10px solid #fff;
    position: relative;
    top: 8px;
    left: 15px;
  }
  .next{
    display: inline-block;
    position: relative;
  }
  .next::after{
    content: '';
    display: block;
    width: 4px;
    height: 20px;
    background: #fff;
    position: relative;
    top: -12px;
    right: -22px;
  }
  .next::before{
    content: '';
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
  .voice-box{
    width: 150px;
    height: 42px;
    margin-left: 20px;
    display: inline-block;
    position: relative;
  }
.voice-icon-oh{
  position: absolute;
  height: 10px;
  width: 10px;
  display: block;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.voice-icon-oh::before{
  content: '';
  width: 6px;
  height: 8px;
  display: block;
  background-color: #ffffff;
}
.voice-icon-oh::after{
  content: '';
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
.voice-icon-ov{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 2px;
}
.voice-icon-ov::before{
  content: '';
  height: 19px;
  width: 15px;
  display: block;
  border: 2px solid transparent;
  border-right: 2px solid #ffffff;
  border-radius: 20px;
}
.voice-icon-ov::after{
  content: '';
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
input[type='range']{
  appearance: none;
  -webkit-appearance:none;
  height: 8px;
  border-radius: 10px;
}
input[type=range]:focus{
  outline: none;
}
.voice-range{
  background: linear-gradient(to right, rgb(235, 116, 112), rgb(235, 116, 112) 48%, white 48%, white);
  float: right;
  width: 100px;
  margin: 16px 20px 0 0;
}



</style>
