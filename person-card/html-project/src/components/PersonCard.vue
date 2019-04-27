<template>
  <div>
    <div class="edit" v-show="isEdit">
      <v-form :form="form"></v-form>
      <div class="link" @click="createPersonCard">生成个人名片</div>
    </div>
    <div :class="['show-wrap', isEdit ? '' : 'show']" v-show="!isEdit">
      <v-card :data="form" ref="tmp-card" v-show="showCard"></v-card>
      <img :src="src" class="img"/>
      <div class="link" @click="() => {isEdit = true}">更新我的名片</div>
      <button @click="download" class="btn">下载名片</button>
      <a :href="src" download="" ref="link"></a>
    </div>
  </div>
</template>

<script>
import vForm from './Form'
import vCard from './Card'
import html2canvans from 'html2canvas'

export default {
  data() {
    return {
      form: {
        name: '王一衡',
        address: '飞云之上',
        phone: '13838383838'
      },
      isEdit: true,
      src: '',
      showCard: false
    }
  },
  components: {
    vForm,
    vCard
  },
  methods: {
    createPersonCard() {
      let flag = true
      Object.keys(this.form).map(attr => {
        !this.form[attr] && (flag = false)
      })
      if (!flag) {
        alert('请填写完整信息')
        return 
      }
      this.showCard = true
      this.isEdit = false
      this.createImg()
    },
    async createImg() {
      const card = this.$refs['tmp-card'].$el
      await html2canvans(card).then(can => {
        this.hideCard()
        this.src = can.toDataURL("image/png")
      })
    },
    hideCard() {
      this.showCard = false
    },
    download() {
      const link = this.$refs['link']
      link.click()
    }
  }
}
</script>

<style lang="scss">
  .link {
    padding-top: 10px;
    color: #32e;
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba($color: #545454, $alpha: .7);
    padding-top: 50px;
  }
  .hide-wrap {
    position: relative;
    z-index: -1;
  }
  .show {
    animation: show 1s ease forwards;
  }

  @keyframes show {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .show-wrap {
    text-align: center;
    .btn {
      margin-top: 20px;
      width: 120px;
      height: 50px;
      background: #2f9b41;
      color: #fff;
      font-size: 18px;
      border-radius: 4px;
      outline: none;
    }

    .img {
      width: 320px;
      height: auto;
    }
  }
</style>
