<template>
  <div id="mainBack" style="width:100%;min-width: 1000px;" >

    <!--标签页-->
    <div class="tabsInter"  style="float:left;width:100%;" >
      <div class="animated fadeInDown" >
      <div class="leftMenuInter"  style="float:left">
        <label style="margin-left: 50px;font-size: 30px;">类型</label>
        <ul>
          <button class="leftItemInter" style="display: block" @click="userInterface" align="center" v-if="!btn1Clicked">用户情况</button>
          <button class="leftItemInterClicked" style="display: block" @click="userInterface" align="center" v-if="btn1Clicked">用户情况</button>
          <button class="leftItemInter" style="display: block" @click="interfaceAudit" align="center" v-if="!btn2Clicked">接口审核</button>
          <button class="leftItemInterClicked" style="display: block" @click="interfaceAudit" align="center" v-if="btn2Clicked">接口审核</button>
        </ul>
      </div>
      </div>
      <div class="rightInter">
        <!--用户情况-->
        <div class="animated fadeInRight" v-if="index===1" key="2">
          <div class="interfaceBack1"   align="left" v-if="index===1">
            <el-form  ref="userForm" :model="userForm" style="margin-left: 7%;">
              <el-form-item label="创建时间 ">
                <el-col :span="5">
                  <el-date-picker type="date" placeholder="选择开始日期" v-model="interfaceForm.createTimeStart" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">&emsp;——</el-col>
                <el-col :span="5">
                  <el-date-picker type="date" placeholder="选择结束日期" v-model="interfaceForm.createTime" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
            </el-form>
            <el-table :data="userTable" height="500px" class="intTable1">
              <el-table-column prop="account" label="用户名" width="200" align="center"></el-table-column>
              <el-table-column prop="time" label="用户创建时间" width="240" align="center"></el-table-column>
              <el-table-column prop="email" label="用户邮箱" align="center"></el-table-column>
              <el-table-column label="操作" width="230" align="center">
                <template slot-scope="scope">
                  <el-button @click="GotoUser(scope.row)" type="text" size="small">详情</el-button>
                </template>
              </el-table-column>
            </el-table>

          </div>
        </div>
        <!--接口审核-->
        <div class="animated fadeInRight" v-if="index===2" key="1">
          <div class="interfaceBack"   align="left" v-if="index===2">
            <el-form  ref="interfaceForm" :model="interfaceForm"  style="margin-left: 7%;">
              <el-form-item label="创建时间 ">
                <el-col :span="5">
                  <el-date-picker type="date" placeholder="选择开始日期" v-model="interfaceForm.createTimeStart" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">&emsp;——</el-col>
                <el-col :span="5">
                  <el-date-picker type="date" placeholder="选择结束日期" v-model="interfaceForm.createTime" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
            </el-form>

            <el-table :data="interfaceTable" height="500px"  class="intTable">
              <el-table-column prop="account" label="用户名" width="180" align="center"></el-table-column>
              <el-table-column prop="apikey" label="APIKEY" width="185" align="center"></el-table-column>
              <el-table-column prop="name" label="名称" width="230" align="center"></el-table-column>
              <el-table-column prop="status" label="状态" width="230" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.status===1">未审核</div>
                  <div v-else-if="scope.row.status===3"  style="color: yellowgreen">已通过</div>
                  <div v-else="scope.row.status===2"  style="color: darkred;font-weight: bold">已回绝</div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="230" align="center">
                <template slot-scope="scope">
                  <el-button @click="showInterDetails(scope.row)" type="primary"  size="small">详情</el-button>
                  <el-button @click="rejectAPI(scope.row)" type="danger" size="small" v-if="scope.row.status===1" key="2221">回绝</el-button>
                  <el-button @click="passAPI(scope.row)" type="success" size="small" v-if="scope.row.status===1" key="2848">通过</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "Interface",
      data () {
        return {
          index:1,     //菜单栏索引
          userForm:{            //用户接口表单
            createTime: '',
            phone: '',
            username: '',
            usertype: '',
            email:'',
          },
          interfaceForm:{       //接口审核表单
            createTimeStart: '',
            createTimeEen: '',
            username: '',
            interfaceType: '',
          },
          userTable:[         //用户接口表格
          ],
          page4interface:1,
          total4interface:0,
          interfaceTable:[],//[{    //接口审核表格
            // account:'',
            // apikey:'',
            // name:'',
            // status:'',
          //}],
          btn1Clicked:false,   //按钮是否点击
          btn2Clicked:false,
        }
      },
      methods:{
        rejectAPI(row){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/adm/refuseApi',
            params:{
              apikey:row.apikey
            }
          }).then(function (response) {
            if(response.data===true){
              alert('操作成功！');
              row.status=2;
            }else{
              alert('操作失败')
            }
          })
        },
        passAPI(row){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/adm/acceptAPi',
            params:{
              apikey:row.apikey
            }
          }).then(function (response) {
            if(response.data===true){
              alert('操作成功！')
              row.status=3;
            }else{
              alert('操作失败！')
            }
          }).catch(function (error) {
            alert('操作失败')
          })
        },
        GotoUser(row){
          this.$router.push({path:'/UserDetails',query:{id:row.account}});
        },
        userInterface(){
          this.$data.index=1;
          this.$data.btn1Clicked=true;
          this.$data.btn2Clicked=false;
        },
        interfaceAudit(){
          this.$data.index=2;
          this.$data.btn1Clicked=false;
          this.$data.btn2Clicked=true;
        },
        showInterDetails(rows){
          this.$router.push({path:'InterfaceDetails',query:{id:rows.apikey}});
        }
      },
      created(){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/adm/getAccountList',
            params:{
              page:'1',
              first:'2000-01-01',
              second:'2020-01-01'
            }
          }).then(function (response) {
            _this.$data.userTable=response.data.accounts
          })

          this.$axios({
            method:'get',
            url:'/adm/getApiStatus',
            params:{
              status:4,
              page:1
            }
          }).then(function (response) {
            _this.$data.interfaceTable=response.data.apis;

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
  .interfaceBack1{
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
  .intTable1{
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
