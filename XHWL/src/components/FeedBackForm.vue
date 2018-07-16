<template>
  <div class="animated fadeInLeft" v-if="true" style="width:100%;">
    <div id="fbBack"   align="left" v-if="true">
      <el-form  ref="form" :model="form" style="margin-left: 10.41%;">
        <el-form-item label="反馈类型 ">
          <el-col :span="6">
            <el-select v-model="form.reedBackType"  placeholder="请选择反馈类型"  @change="changeContents">
              <el-option label="全部" value="4"></el-option>
              <el-option label="售前咨询" value="1"></el-option>
              <el-option label="问题反馈" value="2"></el-option>
              <el-option label="商务咨询" value="3"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>

      <el-table :data="fbResults"   class="fbTable" style="width: 65%">
        <el-table-column prop="name" label="用户名" width="180" align="center"></el-table-column>
        <el-table-column prop="time" label="反馈时间" width="180" align="center"></el-table-column>
        <el-table-column prop="status" label="回复情况" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">未读</span>
            <span v-if="scope.row.status===2">已读</span>
            <span v-if="scope.row.status===3">已回复</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="反馈类型" width="180" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type===1">售前咨询</span>
            <span v-if="scope.row.type===2">问题反馈</span>
            <span v-if="scope.row.type===3">商务咨询</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageDiv" style="width: 100%">
        <div class="block" style="width: 300px;height:50px;margin-left: 200px;">
          <!--<el-pagination-->
            <!--:current-page.sync="page"-->
            <!--:page-size="5"-->
            <!--@current-change="handleChange"-->
            <!--layout="prev, pager, next"-->
            <!--:total="total">-->
          <!--</el-pagination>-->
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
          url:'/adm/getQuestion',
          params:{
            type:'4',
            page:1,
            firstTime:'2000-01-01',
            secondTime:'2020-01-01'
          }
        }).then(function (response) {
          // _this.$data.fbResults.splice(0,this.$data.fbResults.length);
          // _this.$data.fbResults=response.data;
          for(let index=0;index<response.data.questions.length;index++){
            _this.$data.fbResults.push(response.data.questions[index]);
          }

        })
        // this.$axios({
        //   method:'get',
        //   url:'/question/get',
        //   params:{
        //     type:'2',
        //   }
        // }).then(function (response) {
        //   for(let index=0;index<response.data.length;index++){
        //     _this.$data.fbResults.push(response.data[index]);
        //   }
        // })
        // this.$axios({
        //   method:'get',
        //   url:'/question/get',
        //   params:{
        //     type:'3'
        //   }
        // }).then(function (response) {
        //  for(let index=0;index<response.data.length;index++){
        //     _this.$data.fbResults.push(response.data[index]);
        //   }
        // })
      },
      methods: {
          changeContents(){
            let _this=this;
            this.$axios({
              method:'get',
              url:'/adm/getQuestion',
              params:{
                type:this.$data.form.reedBackType,
                page:1,
                firstTime:'2000-01-01',
                secondTime:'2020-01-01'
              }
            }).then(function (response) {
              _this.$data.fbResults=response.data.questions;
            })

          },
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
    /*height:600px;*/
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
    /*height:45.84%;*/
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
