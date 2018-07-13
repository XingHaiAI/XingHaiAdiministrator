<template>
   <div id="FeedBackDetails">
     <div class="Feed_header">
     <el-button type="text" style="font-size: 25px;margin-left: 50px;" icon="el-icon-back" @click="backTo">反馈查看</el-button>
     </div>
     <div class="feed_title" style="margin-right: auto;margin-left: auto;text-align: center">
       <span style="font-size: 28px;">反馈详情</span>
     </div>
     <div class="icons_div" style="width: 100%;margin-top: 20px;">
       <el-row :gutter="10" style="width: 50%;margin-right: auto;margin-left: auto">
         <el-col style="width: 30%;text-align: center;">
           <div style="float: right;"><span style="font-size: 25px;">售前咨询</span></div>
           <div style="float: right"><img style="height: 32px" src="../assets/pic/icon1.png"/></div>
         </el-col>
         <el-col style="width: 30%;text-align: center">
           <div style="float: right"><span style="font-size: 25px;">商务咨询</span></div>
           <div style="float: right"><img style="height: 32px;" src="../assets/pic/icon2.png"/></div>
         </el-col>
         <el-col style="width: 30%;text-align: center">
           <!--<el-button type="text" style="font-size: 26px;"><img style="height: 30px;" src="../assets/pic/icon3.png"/>问题反馈</el-button>-->
           <div style="float: right"><span style="font-size: 25px;text-align: center;">问题反馈</span></div>
           <div style="float: right"><img style="height: 32px;" src="../assets/pic/icon3.png"/></div>
         </el-col>
       </el-row>
     </div>
     <div class="feed_details" style="width: 50%;margin-left: auto;margin-right: auto;margin-top: 30px;">
       <el-input type="textarea" :rows="10" style="font-size: 18px;font-weight: bold" v-model="formContact.question"  disabled></el-input>
     </div>
     <div class="person_card" style="margin-top: 30px;width: 50%;margin-right: auto;margin-left: auto">
       <el-card style="height: 223px;">
         <span style="font-size: 30px;">联系方式</span><br/>
         <div style="height: 10px;"></div>
         <span style="font-size: 18px;">手机号：{{formContact.phone}}</span><br/>
         <div style="height: 4px;"></div>
         <span style="font-size: 18px;">公司：{{formContact.company}}</span><br/>
         <div style="height: 4px"></div>
         <span style="font-size: 18px;">邮箱：{{formContact.email}}</span><br/>
         <div style="height: 4px"></div>
         <span style="font-size: 18px;">姓名：{{formContact.name}}</span>
         <div style="height: 4px"></div>
         <span style="font-size: 18px;">反馈类型：{{formContact.type}}</span>
       </el-card>
     </div>
     <div class="feed-bottom" style="text-align: center;margin-top: 20px;margin-bottom: 30px;">
       <el-button type="primary" :disabled="disableStatus" @click="ModifyStatus" >标记为已回复</el-button>
       <el-button type="primary" @click="DeleteFeed">删除</el-button>
     </div>
   </div>
</template>

<script>
    export default {
        name: "FeedBackDetails",
      data(){
          return{
            disableStatus:false,
            formContact:{
              phone:'',
              company:'',
              email:'',
              name:'',
              question:'',
              questionid:'',
              status:0,
              time:''
            }
          }
      },
      methods:{
          ModifyStatus(){
            let _this=this;
            this.$axios({
              method:'get',
              url:'/adm/changeToEnd',
              params:{
                questionid:this.$route.query.id
              }
            }).then(function (response) {
              if(response.data===true){
                alert('标记成功！');
                _this.$data.disableStatus=true;
              }else{
                alert('标记失败！')
              }
            }).catch(function (error) {
              alert('标记失败！');
            })
          },
        DeleteFeed(){
            let _this=this;
            this.$axios({
              method:'get',
              url:'/question/delete',
              params:{
                questionid:this.$route.query.id
              }
            }).then(function (response) {
              if(response.data===true){
                alert('删除成功！');
                _this.$router.push({path:'/FeedBackForm'})
              }else{
                alert('删除失败！');
              }
            }).catch(function (error) {
              alert('删除失败');
            })
        },
        backTo(){
            this.$router.push('/FeedBackForm')
        }
      },
      created(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/question/getMore',
          params:{
            id:this.$route.query.id
          }
        }).then(function (response) {
          if(response.data.type==='1'){
            response.data.type='产品更新'
          }else if(response.data.type==='2'){
            response.data.type='服务公告'
          }else{
            response.data.type='优惠信息'
          }

          if(response.data.status===3){
              _this.$data.disableStatus=true;
          }

          _this.$data.formContact=response.data;
        })
      }
    }
</script>

<style scoped>

</style>
