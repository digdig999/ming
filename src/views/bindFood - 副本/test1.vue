<template>
  <div>
    <!-- <p style="text-align:center;margin:50vh auto;" @click="go">测试1</p> -->
  </div>
</template>

<script>
export default {
  components: {
  },
  name: '',
  data() {
    return {
      scrollY: 0,//获取实时滚动位置
          heightList: [],//获取每一个li的高度
      menus: [
            {
    name: '菜单1',
    data: [
      {
        name: '苹果'
      },
      {
        name: '橘子'
      },
      {
        name: '香蕉'
      },
      {
        name: '菠萝'
      },
      {
        name: '梨子'
      },
      {
        name: '西瓜'
      }
    ]
    }
      ],
    }
  },
  methods: {
      go(){
          this.$router.push({name:'test'})
      }
  },
  mounted(){},
};
</script>

<style lang='scss' scoped>
</style>
