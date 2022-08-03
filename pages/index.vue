<template>
  <div>
    <div class="main">
      <div class="header">
        <div class="containerHead">
          <div class="item">раз</div>
          <div class="item dash" :style="{ opacity: this.opacity }">–</div>
          <div class="item">два</div>
        </div>
      </div>
      <div>
        <div class="content" v-show="contact">
          <div class="slides">
            <div class="item" v-for="item in info">
              <div v-html="item.body"></div>
            </div>
          </div>
        </div>
        <div class="content" v-show="content">
          <div
            class="slides"
            v-for="(home, index) in homes.data"
            v-show="index == randomNumber - 1"
          >
            <img
              v-for="(item, index) in home.attributes.image.data"
              @click="next(index)"
              :src="'https://api.rzdv.ru' + item.url"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="footer">
        <div class="item" v-show="content">
          <div @click="contacts" class="link left"><span>контакты</span></div>
          <nuxt-link
            :to="`/${item.attributes.link}`"
            v-for="(item, index) in homes.data"
            v-show="index == randomNumber - 1"
            style="width: 50%"
          >
            <div class="link right"><span>к проекту</span></div>
          </nuxt-link>
        </div>
        <div class="item-all" v-show="contact">
          <div class="back" @click="back"><span>проекты</span></div>
        </div>
      </div>
      <div class="spacer"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      api: 'https://api.rzdv.ru/api/homes/?populate=image',
      apiContact: 'https://api.rzdv.ru/api/contact',
      upload: 'https://api.rzdv.ru',
      homes: [],
      contact: false,
      content: true,
      info: [],
      bridges: [],
      result: [],
      header: 'space-between',
      chosenNumber: null,
      numbersArray: [],
      randomIndex: null,
      randomNumber: null,
      anime: null,
      animeR: null,
      opacity: 0,
    }
  },
  mounted() {
    if (this.$mq === 'sm') {
      this.width = '107.61px'
      this.speed = 1
    } else {
      this.width = '187.23px'
      this.speed = 250
    }
    this.anime = this.$anime({
      targets: '.containerHead',
      width: this.width,
      duration: this.speed,
      easing: 'easeInSine',
      autoplay: false,
    })
    axios.get(this.api).then((response) => {
      this.homes = response.data
      this.bridges = response.data
      this.counter = this.homes.data.length
      this.numbersArray = []
      for (let i = 1; i <= this.counter; i++) {
        this.numbersArray.push(i)
      }
      this.randomIndex = Math.floor(Math.random() * this.numbersArray.length)
      this.randomNumber = this.numbersArray[this.randomIndex]
      this.numbersArray.splice(this.randomIndex, 1)
      this.result = this.bridges.data[this.randomNumber - 1].attributes.sort
      if (process.browser) {
        localStorage.setItem('mode', this.result)
      }
    })
    axios.get(this.apiContact).then((response) => {
      this.info = response.data.data
    })
  },
  computed: {},
  methods: {
    contacts() {
      this.contact = true
      this.content = false
      this.anime.play()
      this.opacity = 1
    },
    back() {
      this.contact = false
      this.content = true
      this.opacity = 0
      this.animeR = this.$anime({
        targets: '.containerHead',
        width: '100%',
        duration: this.speed,
        easing: 'easeInSine',
      })
    },
    next(index) {
      this.randomIndex = Math.floor(Math.random() * this.numbersArray.length)
      this.randomNumber = this.numbersArray[this.randomIndex]
      this.numbersArray.splice(this.randomIndex, 1)
      if (this.numbersArray.length == 0) {
        this.counter = this.homes.data.length
        for (let i = 1; i <= this.counter; i++) {
          this.numbersArray.push(i)
        }
      }
      this.result = this.bridges.data[this.randomNumber - 1].attributes.sort
      if (process.browser) {
        localStorage.setItem('mode', this.result)
      }
      console.log(this.randomNumber)
    },
  },
}
</script>
