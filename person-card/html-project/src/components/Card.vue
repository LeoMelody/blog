<template>
  <div class="card">
    <div class="title">{{data.name}}</div>
    <div class="content">
      <div class="item">
        <div class="label">住址：</div>
        <div class="value">{{data.address}}</div>
      </div>
      <div class="item">
        <div class="label">电话：</div>
        <div class="value">{{data.phone}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },

  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
  .card {
    width: 320px;
    height: 180px;
    margin: 0 auto;
    border-radius: 5px;
    background-image: linear-gradient(to right, #29bdd9 0%, #276ace 100%);
    color: #fff;
    padding: 10px 0;
    font-size: 16px;
    .title {
      text-align: center;
      line-height: 50px;
      font-size: 24px;
    }
    .content {
      margin-top: 10px;
      .item {
        display: flex;
        height: 50px;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>
