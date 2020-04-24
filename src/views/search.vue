<template>
    <div class="app-container">
      <h3>增删改查</h3>
      <el-button v-on:click = 'goback'>获取数据</el-button>
      <p>{{item}}</p>
      <el-button v-on:click = 'goup'>股票数据</el-button>
      <div v-for="lis in li">
        <p>{{lis}}</p>
      </div>

    </div>

</template>

<script>
  export default {
    name: 'Search',
    data(){
      return{
        item: "test",
        li: ["test1"]
      }
    },
    methods:{
      goback:function(){
        let _this = this;
        console.log('hah');
        this.$axios
          .get('/list')
          .then(res => {
            //this.request.response = res.data
            _this.item = res.data; //把取item的数据赋给 item
            console.log(res.data);
          })
          .catch(err => {
            alert('请求失败');
          })
      },
      goup:function(){
        let _this = this
        console.log('hah');
        this.$axios
          .get('/c/000001.SZ/20100104/books')
          .then(res => {
            //this.request.response = res.data
            _this.li = res.data//把取item的数据赋给 item
            console.log(res.data);
          })
          .catch(err => {
            alert('请求失败');
          })
      }
    }
  }
</script>

<style scoped>

</style>
