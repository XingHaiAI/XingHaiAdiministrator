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
        <el-table-column prop="name" label="用户名" width="180" align="center"></el-table-column>
        <el-table-column prop="time" label="反馈时间" width="180" align="center"></el-table-column>
        <el-table-column prop="status" label="回复情况" align="center"></el-table-column>
        <el-table-column prop="type" label="反馈类型" width="180" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageDiv" style="width: 100%">
        <div class="block" style="width: 300px;margin-left: 200px;">
          <el-pagination
            :current-page="page"
            @current-change="handleChange"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </div>
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
            total:0,
            page:1,
            fbResults:[
              // {
            //   id:'',
            //   name:'',
            //   phone:'',
            //   type:'',
            //   question:'',
            //   time:'',
            //   status:'',
            //   questionid:'',
            //   email:'',
            //   company:''
            // }
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
            type:'4',
            page:'1'
          }
        }).then(function (response) {
          // _this.$data.fbResults.splice(0,this.$data.fbResults.length);
          _this.$data.fbResults=response.data;
          // for(let index=0;index<response.data.length;index++){
          //   _this.$data.fbResults.push(response.data[index]);
          // }

        })
        this.$axios({
          method:'get',
          url:'/question/get',
          params:{
            type:'2',
          }
        }).then(function (response) {
          for(let index=0;index<response.data.length;index++){
            _this.$data.fbResults.push(response.data[index]);
          }
        })
        this.$axios({
          method:'get',
          url:'/question/get',
          params:{
            type:'3'
          }
        }).then(function (response) {
         for(let index=0;index<response.data.length;index++){
            _this.$data.fbResults.push(response.data[index]);
          }
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
          this.$router.push({path:'/FeedBackDetails',query:{id:row.questionid}})
        },
        handleChange(){
          let total1=0;
          let total2=0;
          let total3=0;
          let _this=this;
          this.$axios({
            method:'get',
            url:'/question/get',
            params:{
              type:'1'
            }
          }).then(function (response) {
            // _this.$data.fbResults.splice(0,this.$data.fbResults.length);
            total1=response.data.all;
            for(let index=0;index<response.data.length;index++){
              _this.$data.fbResults.push(response.data[index]);
            }
            console.log(_this.$data.fbResults);
          })
          this.$axios({
            method:'get',
            url:'/question/get',
            params:{
              type:'2'
            }
          }).then(function (response) {
            total2=response.data.all;
            for(let index=0;index<response.data.length;index++){
              _this.$data.fbResults.push(response.data[index]);
            }
          })
          this.$axios({
            method:'get',
            url:'/question/get',
            params:{
              type:'3'
            }
          }).then(function (response) {
            total3=response.data.all
            for(let index=0;index<response.data.length;index++){
              _this.$data.fbResults.push(response.data[index]);
            }
          })

          this.$data.total=total1+total2+total3;
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
