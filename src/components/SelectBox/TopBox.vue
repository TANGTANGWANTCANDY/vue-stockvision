<template>
  <div class="topbox">
    <el-row>
      <el-col :span="7">
        <AnaType @getAnaModel="getAnaModel"></AnaType>
      </el-col>
      <el-col :span="10">
        <DateStartToEnd @getDate="getDate"></DateStartToEnd>
      </el-col>
      <el-col :span="7">
        <ChangeBinSelect @getChangeBin="getChangeBin"></ChangeBinSelect>
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
  import FactorSelect from "@/components/SelectBox/FactorSelect"
  import DateStartToEnd from "@/components/SelectBox/DateStartToEnd"
  import AnaType from "@/components/SelectBox/AnaType"
  import ChangeBinSelect from "@/components/SelectBox/ChangeBinSelect"

  export default {
    name: 'TopBox',

    data() {
      return {
        buttonstate: false,
        buttontext: "确认"
      }
    },
    components: {
      FactorSelect,
      DateStartToEnd,
      AnaType,
      ChangeBinSelect
    },
    methods: {
      getAnaModel(models) {
        this.$emit('newModel', models);
      },
      getChangeBin(changeBin) {
        this.$emit('newChangeBin', changeBin);
      },
      getDate(value2) {
        this.$emit('newDate', value2);
      },
      buttonOn() {
        this.buttonstate = true;
        this.buttontext = "正在加载"
        this.$emit('buttonOn', this.buttonstate);
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
