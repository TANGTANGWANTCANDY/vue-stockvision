<template>
  <div class="topbox">
    <el-row>
      <el-col :span="7">
        <IndexCodes @getIndex="getIndex"></IndexCodes>
      </el-col>
      <el-col :span="10">
        <DateStartToEnd @getDate="getDate"></DateStartToEnd>
      </el-col>
      <el-col :span="7">
        <StdLen @getStdLen="getStdLen"></StdLen>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-button type="primary" :loading="buttonstate" style="border-width:0;background-color:#587482;width:100px" @click="buttonOn">{{buttontext}}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import IndexCodes from "@/components/SelectBox/IndexCodes"
  import DateStartToEnd from "@/components/SelectBox/DateStartToEnd"
  import StdLen from "@/components/SelectBox/StdLen"

  export default {
    name: 'TopBox',

    data() {
      return {
        buttonstate: false,
        buttontext: "确认"
      }
    },
    components: {
      IndexCodes,
      DateStartToEnd,
      StdLen
    },
    methods: {
      getIndex(indexValue) {
        this.$emit('newIndex', indexValue);
      },
      getDate(value2) {
        this.$emit('newDate', value2);
      },
      getStdLen(stdLen){
        this.$emit('newStdLen', stdLen);
      },
      buttonOn() {
        this.buttonstate = true;
        this.buttontext = "正在加载"
        this.$emit('volButtonOn', this.buttonstate);
      },
      buttonOff() {
        this.buttonstate = false;
        this.buttontext = "确认"
      }
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 10px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }
</style>
