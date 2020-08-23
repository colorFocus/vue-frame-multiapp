<style lang="less">
@import url('../../assets/less/var.less');

.ts-header{
  height: 50px;
  line-height: 50px;
  background-color: #e2effa;
  padding-left: 30px;
  color: @kg-text-1;
  *{
    vertical-align: middle;
  }
  .ts-logo{
    height: 20px;
  }
  .ts-line{
    display: inline-block;
    height: 25px;
    border-right: 2px solid #babec8;
    margin-left: 16px;
  }
  h1{
    font-size: 18px;
    display: inline-block;
    margin-left: 16px;
  }
}
</style>

<template>
  <div id="app">
    <div class="page-container">
      <header class="ts-header">
        <img class="ts-logo" src="@/assets/logo.png" />
        <span class="ts-line"></span>
        <h1>电子病历结构化--Mobile</h1>
      </header>
      <router-view/>
    </div>
  </div>
</template>
