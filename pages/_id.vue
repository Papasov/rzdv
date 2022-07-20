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
          <div
            class="slides"
            v-for="project in projects.data"
            v-if="project.attributes.link == id"
          >
            <div
              class="item body"
              v-html="project.attributes.description"
            ></div>
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
              @click="next(index)"
              :src="'https://api.rzdv.ru' + item.attributes.url"
              alt=""
            />
            <div class="desc">{{ project.attributes.name }}</div>
          </div>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="footer">
        <div class="item" v-show="content">
          <div @click="contacts" class="link">текст</div>
          <nuxt-link
            :to="`/${projects.data[index + 1].attributes.link}`"
            v-for="(project, index) in projects.data"
            v-if="project.attributes.link == id"
          >
            <div class="link">следующий проект</div>
          </nuxt-link>
        </div>
        <div class="item-all" v-show="contact">
          <div class="link" @click="back">изображения</div>
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
      listing: 0,
      contact: false,
      content: true,
      header: 'space-between',
      sudid: [],
    }
  },
  mounted() {
    this.id = this.$route.params.id
    axios.get(this.api).then((response) => {
      this.projects = response.data
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
      if (this.counter > 1) {
        this.counter = 0
      }
    },
  },
}
</script>
