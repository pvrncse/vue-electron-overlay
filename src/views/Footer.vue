<template>
  <div>
  <div class="footer">
  <div class="display-flex">
        <div class="btn-group"
          v-gamepad:button-dpad-up.repeat="up"
          v-gamepad:button-dpad-down.repeat="down"
          v-gamepad:left-analog-up.repeat="up"
          v-gamepad:left-analog-down.repeat="down"
          v-gamepad:button-a="confirm"
          >
          <button class="footer-options" title="Home" @click="footerOption($event)">
            <img title="Home" :src="home" height="20" />
          </button>
          <button class="footer-options" title="Brightness" @click="footerOption($event)">
            <img :src="brightness" height="20" />
          </button>
          <button class="footer-options" title="" @click="footerOption($event)">
            <img :src="speaker" height="20" />
          </button>
           <button class="footer-options" title="" @click="footerOption($event)">
            <img :src="aeroplane" height="20" />
          </button>


          <button class="footer-options" title="" @click="footerOption($event)">
            <img :src="windows" height="20" />
          </button>

          <button class="footer-options" title="" @click="footerOption($event)">
            <img :src="game" height="20" />
          </button>
          <button class="footer-options" title="" @click="footerOption($event)">
            <img :src="camera" height="20" />
          </button>
          <button class="footer-options" title="" @click="footerOption($event)">
            <img :src="mic" height="20" />
          </button>
          <button class="footer-options" title="" @click="footerOption($event)">
            <img :src="settings" height="20" />
          </button>
        </div>
      </div>
</div>
</div>
</template>

<script>
import home from '../assets/home.png';
import brightness from '../assets/Brightness.png';
import speaker from '../assets/Speaker.png';
import aeroplane from '../assets/Aeroplanemode.png';
import windows from '../assets/Windows1.png';
import game from '../assets/Game.png';
import camera from '../assets/Camera.png';
import mic from '../assets/Mic.png';
import settings from '../assets/Settings.png';

export default {
  name: 'HelloWorld',
  components: {
    
    },
  data() {
    return{
      selected:0,
      home,
      brightness,
      speaker,
      aeroplane,
      windows,
      game,
      camera,
      mic,
      settings,
    }
  },
  methods : {
    footerOption(ev){
      let obj = document.getElementsByClassName('footer-options');
      for (let index = 0; index < obj.length; index++) {
        obj[index].classList.remove('selected');
        obj[index].classList.remove('gamepad-nav');
      }
      if(ev.target.title === 'Home'){
        console.log('here');
        window.electronAPI.openLauncher();
      }
      if(ev.target.title === 'Brightness'){
        // window.electronAPI.toggleApp(this.toggle);
      }
      ev.target.nodeName == "BUTTON" ? ev.target.classList.add('selected') :
        ev.target.parentElement.classList.add('selected');
    },
    up() {
      this.selected--;

      if (this.selected < 0) {
        this.selected = document.getElementsByClassName('footer-options').length - 1;
      }

      let obj = document.getElementsByClassName('footer-options');
      for (let index = 0; index < obj.length; index++) {
        obj[index].classList.remove('gamepad-nav');
      }
      document.getElementsByClassName('footer-options')[this.selected].classList.add('gamepad-nav');
    },
    down() {
      this.selected++;

      if (this.selected >= document.getElementsByClassName('footer-options').length) {
        this.selected = 0;
      }
      let obj = document.getElementsByClassName('footer-options');
      for (let index = 0; index < obj.length; index++) {
        obj[index].classList.remove('gamepad-nav');
      }
      document.getElementsByClassName('footer-options')[this.selected].classList.add('gamepad-nav');
    },
    confirm() {
      // this.message = `You selected item: ${this.options[this.selected]} (${this.selected})`;
      let obj = document.getElementsByClassName('footer-options');
      for (let index = 0; index < obj.length; index++) {
        obj[index].classList.remove('selected');
        obj[index].classList.remove('gamepad-nav');
      }
      if(document.getElementsByClassName('footer-options')[this.selected].title === 'Home'){
        window.electronAPI.openLauncher();
        // window.location.href = 'Banshee://a';
      }
      document.getElementsByClassName('footer-options')[this.selected].classList.add('selected');
    }
  },
  mounted(){
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}

.footer {
   position: fixed;
   left: 0;
   bottom: 0;
   height: 80px;
   width: 100%;
   color: white;
   background-image: linear-gradient(to bottom, transparent, #20202070, #000000);
   text-align: center;
}

.btn-group button {
  background-color: #5f5f6090;
  color: rgb(245, 236, 236);
  padding: 10px 24px;
  cursor: pointer;
  float: left;
  margin: 5px;
  border-radius: 5px;
}

button {
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  padding: 0;
  cursor: pointer;
}

button:focus{
  outline: none;
}

button.selected {
  color: #ffffff;
  box-shadow: 0 0 10px #ffffff;
}

button.gamepad-nav{
  box-shadow: 0 0 5px rgb(246, 252, 125, 0.7);
}

.display-flex {
  display: flex;
  padding-top: 28px;
}

.btn-group {
  margin: auto;
}

.btn-group:after {
  content: "";
  clear: both;
  display: inline-block;
}

.btn-group button:not(:last-child) {
  border-right: none;
}

.footer-options img{
  filter: invert(100%);
}
</style>
