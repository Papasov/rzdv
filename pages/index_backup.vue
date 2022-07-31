<template>
  <div>
    <div class="main">
      <div class="header">
        <div class="item" :style="{ justifyContent: this.header }">
          <div>раз</div>
          <div v-show="contact" class="dash">–</div>
          <div>два</div>
        </div>
      </div>
      <div>
        <div class="content" v-show="contact">
          <div class="slides">
            <div class="item">
              <p>+7123456789</p>
              <p>+7123456789</p>
              <p>instagram</p>
            </div>
          </div>
        </div>
        <div class="content" v-show="content">
          <div
            class="slides"
            v-for="(project, index) in projects.data"
            v-show="index == counter"
          >
            <img
              v-for="(item, index) in project.attributes.image.data"
              v-show="item.attributes.caption == 'main'"
              @click="next"
              :src="'https://api.rzdv.ru' + item.attributes.url"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="footer">
        <div class="item" v-show="content">
          <div @click="contacts" class="link">контакты</div>
          <nuxt-link
            :to="`/${project.attributes.link}`"
            v-for="(project, index) in projects.data"
            v-show="index == counter"
          >
            <div class="link">к проекту</div>
          </nuxt-link>
        </div>
        <div class="item-all" v-show="contact">
          <div class="link" @click="back">проекты</div>
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
      counter: 0,
      contact: false,
      content: true,
      header: 'space-between',
      id: 0,
      sudid: [],
    }
  },
  mounted() {
    axios.get(this.api).then((response) => {
      this.projects = response.data
      this.covers = response.data.data
      this.covers.filter((cover) => {
        if (cover.attributes.id != 1) {
          this.subid = cover.attributes.image.data[this.id].attributes.url
          console.log('one:' + this.subid)
        }
      })
      //this.subid = this.covers.filter((cover) => cover.id == 1).shift().subname
    })
  },
  methods: {
    contacts() {
      this.contact = true
      this.content = false
      this.header = 'center'
    },
    back() {
      this.contact = false
      this.content = true
      this.header = 'space-between'
    },
    next(index) {
      this.counter++
      if (this.counter > this.projects.data.length - 1) {
        this.counter = 0
      }
    },
  },
}
</script>
