<template>
  <div>
    <div style="margin-left: 30px;margin-top: 30px;">
      <el-button type="text" style="font-size: 22px;font-weight: bold" @click="backTo"><i class="el-icon-back"/> 接口查看</el-button>
    </div>
  <div class="animated fadeInRight">
    <div class="interfaceBack"   align="left" >
      <el-form  ref="userInfo" :model="userInfo" style="margin-left: 7%;">
        <el-form-item label="用户名">
          <el-col :span="6">
            <el-input type="text" disabled v-model="userInfo.account" style="width: 100%;"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-col :span="6">
            <el-input  v-model="userInfo.email" disabled  class="inInter"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <el-table :data="InterfaceTable" height="500px"  class="intTable">
        <el-table-column prop="name" label="接口名" width="180" align="center"></el-table-column>
        <el-table-column prop="apikey" label="APIKEY" width="180" align="center"></el-table-column>
        <el-table-column prop="apitype" label="类型" align="center">
          <template slot-scope="scope">
            <span >免费</span>

          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="140" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">未审核</span>
            <span v-if="scope.row.status===2" style="color:darkred;font-weight: bold">已回绝</span>
            <span v-if="scope.row.status===3" style="color: cornflowerblue;font-weight: bold">已通过</span>
          </template>
        </el-table-column>
        <el-table-column prop="apipassword" label="APIPassword" width="140" align="center"></el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small">详情</el-button>
            <el-button v-if="scope.row.status===1" @click="RejectAPI(scope.row)" type="danger" size="small">拒绝</el-button>
            <el-button v-if="scope.row.status===1" @click="PassAPI(scope.row)" type="success" size="small">通过</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
  </div>
</template>

<script>
    export default {
        name: "UserDetails",
      data(){
          return{
            account:'',
            userInfo:{
              account:'',
              email:'',
              time:''
            },
            InterfaceTable:[],   //[{
           /*   apikey:'',
              apipassword:'',
              apitype:'',
              name:'',
              status:''
            }],*/
            userTable:[{         //用户接口表格
              account:'',
              email:'',
              num:0,
              time:'',
            }],
            total:0,
            page:1

          }
      },
      methods:{
          handleClick(row){
            this.$router.push({path:'/InterfaceDetails',query:{id:row.apikey}});
          },
          backTo(){
            this.$router.push({path:'/Interface'})
          },
        RejectAPI(row){
          let _this=this;
          this.$axios({
            method:'get',
            url:'adm/refuseApi',
            params:{
              apikey:row.apikey
            }
          }).then(function (response) {
            if(response.data===true){
              alert('回绝成功！');
              row.status=2;
            }else{
              alert('回绝失败！')
            }
          }).catch(function (error) {
            alert('回绝失败！')
          })
        },
        PassAPI(row){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/adm/acceptApi',
            params:{
              apikey:row.apikey
            }
          }).then(function (response) {
            if(response.data===true){
              alert('操作成功！');
              row.status=3;
            }else{
              alert('操作失败')
            }
          })
        }
      },
      created(){
        this.$data.account=this.$route.query.id;

        let _this=this;

        this.$axios({
          method:'get',
          url:'adm/getAccountMore',
          params:{
            account:this.$data.account
          }
        }).then(function (response) {
            _this.$data.userInfo=response.data;
        })

        this.$axios({
          method:'get',
          url:'/api/getApi',
          params:{
            account:this.$data.account,
            page:1
          }
        }).then(function (response) {
          _this.$data.InterfaceTable=response.data.apiVos;
          _this.$data.total=response.data.all;
          _this.$data.page=response.data.part;
        })


      }
    }
</script>

<style scoped>
  .leftMenuInter{
    padding-top:60px;
    width:20.83%;
    border:0px;
    height:100%;
  }
  .leftItemInter{
    width:100%;
    border: 0;
    outline: 0;
    font-size: 17px;
    margin-top: 45px;
    background-color: transparent;
    transition: all 0.5s;
  }
  .leftItemInter:hover{
    width:100%;
    font-size: 20px;
    border-right:3px solid #409EFF;
  }
  .leftItemInterClicked{
    background-color:transparent;
    border: 0px;
    font-size: 20px;
    margin-top: 45px;
    width:100%;
    outline: 0;
    transition: all 1s;
    border-right:3px solid #409EFF;
  }
  .leftItemInterClicked:hover{
    width:100%;
    border-right:3px solid #409EFF;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;

  }

  .rightInter{
    float:left;
    width:79.17%;
    box-shadow:1px 0 4px lightgray,
    -1px 0 1px lightgray,
    0px 0 4px lightgray,
    0px 0 1px lightgray;
    min-height: 700px;
    background-color: #FCFCFC;
  }

  .interfaceBack{
    background-image: url("../assets/背景底纹.png");
    background-size: 100% auto;
    background-repeat: no-repeat;
    padding-top: 5.5%;
    width:100%;
    height:800px;
    min-width: 900px;
  }
  .filterInter{
    margin-left: 2px;
    border:0;
    outline: 0;
    border-radius: 8px;
    background-color: #0080ED;
    width:80px;
    height:40px;
  }
  .intTable{
    margin-left: 7%;
    border-radius: 6px;
    border:1px solid lightgray;
    width:88%;
    height:45.84%;
    background-color: transparent;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
