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
              @click="next"
              :src="
                'https://api.rzdv.ru' +
                project.attributes.image.data[0].attributes.url
              "
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="footer">
        <div class="item" v-show="content">
          <div @click="contacts" class="link">контакты</div>
          <div class="link">к проекту</div>
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
      counter: 0,
      contact: false,
      content: true,
      header: 'space-between',
    }
  },
  mounted() {
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
      if (this.counter > 4) {
        this.counter = 0
      }
    },
  },
}
</script>
