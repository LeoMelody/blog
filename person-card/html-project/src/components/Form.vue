<template>
  <div>
    <div class="form">
      <div class="cell">
        <div class="cell-label">姓名：</div>
        <div class="cell-input">
          <input type="text" class="input" v-model="form.name" placeholder="请输入姓名">
        </div>
      </div>
      <div class="cell">
        <div class="cell-label">住址：</div>
        <div class="cell-input">
          <input type="text" class="input" v-model="form.address" placeholder="请输入住址">
        </div>
      </div>
      <div class="cell">
        <div class="cell-label">电话：</div>
        <div class="cell-input">
          <input type="tel" class="input" v-model="form.phone" placeholder="请输入电话">
        </div>
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
    form: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
$border: 1px solid #e5e5e5;
  .form {
    margin: none;
    padding-left: 10px;
    border-top: $border;
    $border-bottom: $border;
    background: #fff;
    .cell {
      height: 50px;
      display: flex;
      align-items: center;
      border-bottom: $border; 
      &:last-child {
        border: none;
      }
      .cell-label {
        min-width: 120px;
        text-align: left;
      }
      .cell-input {
        flex: 1;
        .input {
          margin-right: auto;
          font-size: 16px;
          outline: none;
          margin: 0;
          border: none;
          text-align: right;
          &:active {
            outline: none;
          }
        }
      }
      
    }
  }
</style>

