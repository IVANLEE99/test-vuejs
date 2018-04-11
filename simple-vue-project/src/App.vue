<template>
  <div id="app">
    <!-- 这是唱碟的背景 -->
    <div class="bg-blur"></div>
    <!-- 这是会旋转的唱碟 -->
    <div class="dist">
      <div class="song-img"></div>

    </div>
    <!-- 播放控制条 -->
    <div class="ctr-box"></div>
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
    left: 50px;
    top: 50px;
    border: 2px solid #131313;
  }


</style>
