<template>
    <div class="header">
      <div class="header-left"><div class="iconfont icon-back">&#xe624;</div></div>
      <!--<div class="header-input"><span class="iconfont">&#xe632;</span><span class="warn">搜索商品信息</span></div>-->
      <router-link to="/city" v-model="productname">
       <!--<div class="header-right"><span class="city">城市</span><span class="iconfont arrow-icon">&#xe64a;</span></div>-->
      </router-link>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped lang="stylus">
@import '~styles/varibles.styl'
  .header
    display: flex
    height : .86rem
    background:$bgColor
    line-height :.86rem
    color :#ffffff
    .header-left
      width :.64rem
      float:left
      .icon-back
        text-align :center
        font-size: .4rem

    .header-input
      flex:1
      background : #ffffff
      -webkit-border-radius: .1rem
      -moz-border-radius: .1rem
      border-radius: .1rem
      margin-top :.12rem
      margin-left :.1rem
      padding-left: .2rem
      height :.64rem
      line-height:.64rem
      color :#ccc
    .header-right
      width:1.24rem
      float :right
      text-aligin:center
      font-size :0px
      margin-left: .2rem
      color: #ffffff
      .arrow-icon
        margin-left :-.04rem
        font-size :.24rem
      .city
        font-size :.24rem


</style>
