<template>
  <div class="header">
  <a class="logo invert"><img :src="alien" height="40"/></a>
  <div class="header-right">
    <a >{{currentTime}}</a>
    <a v-bind:class="{'invert': wifiStatus,  'invert-50': !wifiStatus}"><img :src="wifi" height="25"/></a>
    <a class="invert"><img :src="battery" height="25"/></a>
  </div>
</div>
</template>

<script>
import alien from '../assets/alien.png';
import wifi from '../assets/wifi.png';
import battery from '../assets/battery.png';
export default {
  name: 'HelloWorld',
  components: {
    
    },
  data() {
    return{
      wifiStatus: true,
      alien,
      wifi,
      battery,
      currentTime: '10:00 AM'
    }
  },
  methods : {
    getCurrentTime : function getCurrentTime(){
      setInterval(()=>{
        let time = new Date();
        console.log(time);
        this.currentTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      },1000);
    },
  },
  mounted()  {
    this.getCurrentTime();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}
.header {
  overflow: hidden;
  background: transparent;
  background-image: linear-gradient(to bottom, #000000, #20202070, transparent);
}

.header a {
  float: left;
  text-align: center;
  padding: 12px;
  font-size: 18px; 
  line-height: 25px;
  color: #ffffff;
  font-weight: 600;
}

.header a.logo {
  font-size: 25px;
  font-weight: bold;
}

.invert, .footer-options img{
  filter: invert(100%);
}

.invert-50 {
  filter: invert(30%);
}

.header-right {
  float: right;
}

</style>
