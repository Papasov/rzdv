<template>
  <div>
    <div class="main">
      <div class="header" @click="home">
        <div class="containerHead">
          <div class="item cursor">раз</div>
          <div class="item dash cursor" :style="{ opacity: this.opacity }">
            –
          </div>
          <div class="item cursor">два</div>
        </div>
      </div>
      <div>
        <div class="content" v-show="contact">
          <div
            class="slides"
            v-for="project in projects.data"
            v-if="project.attributes.link == id"
          >
            <div class="pos body" v-html="project.attributes.description"></div>
          </div>
        </div>
        <div class="content" v-show="content">
          <div
            class="slides"
            v-for="project in projects.data"
            v-if="project.attributes.link == id"
          >
            <img
              v-for="(item, index) in project.attributes.image.data"
              v-show="index == counter"
              @click="next()"
              :src="'https://api.rzdv.ru' + item.attributes.url"
              alt=""
            />
          </div>
          <p
            class="descProject"
            v-for="project in projects.data"
            v-if="project.attributes.link == id"
          >
            {{ project.attributes.name }}
          </p>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="footer">
        <div class="item" v-show="content">
          <div @click="contacts" class="link left"><span>текст</span></div>
          <nuxt-link
            v-for="(project, index) in projects.data"
            :to="`/${projects.data[sort].attributes.link}`"
            v-if="project.attributes.link == id"
            style="width: 50%"
          >
            <div class="link right" @click="nextProject()">
              <span>следующий проект</span>
            </div>
          </nuxt-link>
        </div>
        <div class="item-all" v-show="contact">
          <div class="back" @click="back"><span>изображения</span></div>
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
      api: 'https://api.rzdv.ru/api/projects/?populate=image',
      upload: 'https://api.rzdv.ru',
      projects: [],
      covers: [],
      counter: null,
      listing: 0,
      contact: false,
      content: true,
      result: [],
      result2: [],
      nextLink: [],
      anime: null,
      animeR: null,
      opacity: 0,
      lengthImages: '',
      sort: null,
    }
  },
  mounted() {
    console.log(localStorage.getItem('mode'))
    this.counter = localStorage.getItem('mode') - 1
    if (localStorage.getItem('mode') == null) {
      this.counter = 0
    }
    this.id = this.$route.params.id
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
      this.projects = response.data
      this.covers = response.data
      this.sorts = response.data
      this.sort = this.sorts.data.findIndex((i) => i.attributes.link == this.id)
      this.result = this.covers.data.filter(
        (item) => item.attributes.link == this.id
      )
      this.lengthImages = this.result[0].attributes.image.data.length
    })
  },
  computed: {},
  methods: {
    home() {
      this.$router.push({
        path: `/`,
      })
    },
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
    nextProject() {
      this.sort = this.sort + 1
      if (this.sort > this.projects.data.length - 1) {
        this.sort = 0
      }
    },
    next() {
      this.counter++
      if (this.counter > this.lengthImages - 1) {
        this.counter = 0
      }
    },
  },
}
</script>
