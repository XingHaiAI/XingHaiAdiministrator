<template>
  <div class="animated fadeInLeft" v-if="true" style="width:100%;">
    <div id="fbBack"   align="left" v-if="true">
      <el-form  ref="form" :model="form" style="margin-left: 10.41%;">
        <el-form-item label="反馈时间 ">
          <el-col :span="5">
            <el-date-picker type="date" placeholder="选择开始日期" v-model="form.startDate" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">&emsp;——</el-col>
          <el-col :span="5">
            <el-date-picker type="date" placeholder="选择结束日期" v-model="form.endDate" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="回复情况 ">
          <el-select v-model="form.replyStatus" placeholder="请选择回复情况" class="in">
            <el-option label="全部" value="0"></el-option>
            <el-option label="未读" value="1"></el-option>
            <el-option label="已读" value="2"></el-option>
            <el-option label="已回复" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="反馈类型 ">
          <el-col :span="6">
            <el-select v-model="form.reedBackType" placeholder="请选择反馈类型">
              <el-option label="全部" value="0"></el-option>
              <el-option label="售前咨询" value="1"></el-option>
              <el-option label="问题反馈" value="2"></el-option>
              <el-option label="商务咨询" value="3"></el-option>
            </el-select>
          </el-col>
          <el-col :span="1">
            <button class="filter"><label class="el-icon-search" style="color:white;font-size: 14px;"> 筛选</label></button>
          </el-col>
        </el-form-item>
      </el-form>

      <el-table :data="fbResults" height="500px" :row-class-name="tableRowClassName"  class="fbTable">
        <el-table-column prop="username" label="用户名" width="180" align="center"></el-table-column>
        <el-table-column prop="fbTime" label="反馈时间" width="180" align="center"></el-table-column>
        <el-table-column prop="replyStatus" label="回复情况" align="center"></el-table-column>
        <el-table-column prop="fbType" label="反馈类型" width="180" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
  </div>
</template>

<script>
    export default {
        name: "FeedBackForm",
      data(){
          return{
            form:{
              startDate:'',
              endDate:'',
              replyStatus:'',
              reedBackType:'',
            },
            fbResults:[{
              id:'',
              username:'我',
              fbTime:'2018-1-1',
              replyStatus:'',
              fbType:'',
            },
              {
                id:'',
                username:'我',
                fbTime:'2018-1-1',
                replyStatus:'',
                fbType:'',
              },
              {
                id:'',
                username:'我',
                fbTime:'2018-1-1',
                replyStatus:'',
                fbType:'',
              },
            ],
            pageNumber:'',
          }
      },
      created(){
          let _this=this;

          this.$axios({
            method:'get',
            url:'/question/get',
            params:{
              type:'4'
            }
          }).then(function (response) {
            _this.$data.fbResults=response.data;
          })
      },
      methods: {
        tableRowClassName({row, rowIndex}) {
          if (rowIndex === 1) {
            return 'warning-row';
          } else if (rowIndex === 3) {
            return 'success-row';
          }
          return '';
        },
        handleClick(row){
          this.$router.push({path:'/FeedDetails',query:{id:row.id}})
        }
      },
    }
</script>

<style >
  #fbBack{
    background-image: url("../assets/背景底纹.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding-top: 5.5%;
    width:100%;
    height:600px;
    min-width: 1100px;
 }
  .filter{
    margin-left: 2px;
    border:0;
    outline: 0;
    border-radius: 8px;
    background-color: #0080ED;
    width:80px;
    height:40px;
  }
  .fbTable{
    border-radius: 6px;
    border:1px solid lightgray;
    width:78.98%;
    height:45.84%;
    margin-left: 10.41%;
    background-color: transparent;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }


</style>
