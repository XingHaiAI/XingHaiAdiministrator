<template>
  <div id="app">
    <!--导航栏-->
    <div id="head" style="float: left">
      <img src="./assets/LOGO.png"  height="30" style="float:left;margin-top: 10px;margin-left: -15px;">
      <ul class="headBar">
        <li @click="toFeedBack">反馈查看</li>
        <li @click="toInterface">调用接口查看</li>
        <li @click="backToHome">博客更新</li>
        <li @click="logout">注销</li>
      </ul>
      <ul style="margin-left: 66px;" class="headBar">
        <li title="返回首页" @click="backToHome">{{admin}}</li>
      </ul>
    </div>

    <div class="headBack">
    </div>
    <!--主图-->
    <div id="backImg" >
      <label style="color: snow;margin-left: 90px;font-size: 20px;">欢迎使用，兴海物联AI平台管理系统</label><br/><br/>
      <button id="userButton">用户界面</button>
    </div>
    <!--登陆框-->
    <div class="log" v-if="isLogin===false">
      <el-dialog :visible.sync="checked" width="400px" title="管理员登陆" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <el-form :model="user"  ref="user" label-width="100px" class="demo-ruleForm" >
          <el-form-item label="用户名" prop="username" :label-width="labelWidth">
            <input class="logIn" id="na"v-model="user.username" placeholder="请输入用户名" type="text"  @blur="checkName"><br/>
            <span><span v-if="warnName" style="font-size: 10px;color: red;">*不存在该用户名</span>
            <span v-if="!warnName&clickName"class="el-icon-check" style="color:green"></span>&emsp;</span>
          </el-form-item>
          <el-form-item label="密码" prop="password" :label-width="labelWidth" >
            <input class="logIn" id="pw" v-model="user.password" placeholder="请输入密码" type="password" @blur="checkPass"><br/>
            <span> <span v-if="warnPass" style="font-size: 10px;color: red;">*密码错误</span>
             <span v-if="!warnPass&clickPass"class="el-icon-check" style="color:green"></span>&emsp;</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="adminLogin">
            登 陆 <i class="eell-icon-jiantouyou"/>
          </el-button>
        </div>
      </el-dialog>
    </div>
    <router-view/>
  </div>

</template>

<script>
  export default {
    name: 'App',
    data(){
      return {
        isLogin:false,
        admin: '',
        user: {
          username: '',
          password: '',
        },
        checked:true,
        labelWidth:'100px',
        warnName:false,
        warnPass:false,
        clickName:false,
        clickPass:false,
      }
    },
    methods:{
      logout(){
        var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys)
        {
          for (var i = keys.length; i--;)
          {
            document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString();
          }
        }
        this.$data.isLogin=false;

      },
      adminLogin(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/adm/login',
          params:{
            account:this.$data.user.username,
            password:this.$data.user.password
          }
        }).then(function (response) {
          if(response.data===true){
            _this.$data.isLogin=true;
            _this.$data.checked=false;
            _this.$router.push({path:'/'});
            document.cookie='account='+_this.$data.user.username;
            document.cookie='password='+_this.$data.user.password;
          }else{
            alert('登录失败！')
          }
        }).catch(function (error) {
          alert('登录失败！')
        })
      },
      toFeedBack(){
        this.$router.push('/FeedBackForm');
      },
      toInterface(){
        this.$router.push('/Interface');
      },
      backToHome(){
        this.$router.push("/");
      },
      checkName() {                   //姓名验证
        var text = document.getElementById("na").value;//获得输入框的文本值
        this.$data.warnName=false;
        this.$data.clickName=true;
      },
      checkPass(){                 //密码验证
        var text = document.getElementById("pw").value;//获得输入框的文本值
        this.$data.warnPass=false;
        this.$data.clickPass=true;
        i
      },
      verify(){
        if(this.$data.warnName===false&&this.$data.warnPass===false)
          this.$data.checked=false;
        var text = document.getElementById("na").value;//获得输入框的文本值
        this.$data.admin=text;
      },

    },created(){

      let token=document.cookie.split(';');
      if(token) {
        let username = token[0].split('=');
        let password = token[1].split('=');
        console.log(token)
        let _this = this;
        this.$axios({
          method: 'get',
          url: '/adm/login',
          params: {
            account: username[1],
            password: password[1]
          }
        }).then(function (response) {
          if (response.data === true) {
            _this.$message({
              type: 'success',
              message: '欢迎回来！管理员'
            })
            _this.$data.isLogin = true;
          } else {
            _this.$data.isLogin = false;
            document.cookie = '';
            _this.$message({
              type: 'error',
              message: '登录信息已过期！请重新登录'
            })
          }
        })
      }
    }


  }
</script>

<style>
  body{
    padding: 0px;
    margin: 0px;
    min-width: 1100px;
  }
  .headBar {
    float:left;
    list-style-type: none;
    margin: 0;
    margin-top: 5px;
    margin-left: 750px;
  }
  li {
    padding: 10px 18px;
    font-size: 16px;
    color: white;
    float: left;
    transition: all 0.5s;
  }
  /*li:hover{*/
  /*color: #409EFF;*/
  /*font-size: 15px;*/
  /*}*/
  #head{
    width:100%;
    min-width: 1100px;
    height:50px;
    background-color: black;
    position: fixed;
    top:0;
    z-index: 100;
    opacity: 0.8;
  }
  .headBack{
    width:100%;
    min-width: 1100px;
    height:40px;
    background-color: black;
  }
  #backImg{
    padding-top: 56px;
    background-image: url("./assets/banner.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width:100%;
    min-width: 1100px;
    height:223px;
  }
  #userButton{
    margin-left: 90px;
    margin-top: 10px;
    cursor: pointer;
    border:0;
    border-radius: 3px;
    width:70px;
    height:25px;
    background: -webkit-linear-gradient( left, #4190f7, #184af4);
  }
  .logIn{
    border:0;
    outline: 0;
    font-size: 15px;
    width:200px;
    height:30px;
    border-bottom: 2px solid #409EFF;
    transition: all 0.5s;
  }
  .logIn:focus{
    height:31px;
    width:220px;
    font-size: 18px;
  }
  .logBtn{
    margin-right: 55px;
    border:0;
    outline: 0;
    width:130px;
    font-size: 18px;
    background-color: transparent;
    border-radius: 8px;
    height:32px;
    transition: all 0.5s;
  }
  .logBtn:hover{
    width:80px;
    background: #409EFF;
  }


</style>
