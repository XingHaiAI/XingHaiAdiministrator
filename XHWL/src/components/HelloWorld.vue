<template>
  <div class="animated fadeIn">
  <div id="mainBack" style="width:100%;min-width: 1000px;" >
    <!--标签页-->
    <el-dialog :visible.sync="dialogVisible" :lock-scroll="true" :modal="true" :modal-append-to-body="false" title="新建公告">
      <el-form :model="formNewNotice" ref="formNewNotice" :rules="rulesNewNotice">
        <el-form-item prop="logTitle" label="博客标题:">
          <el-input v-model="formNewNotice.logTitle"></el-input>
        </el-form-item>
        <el-form-item prop="logType" label="博客类型">
          <el-radio v-model="formNewNotice.logType" label="1">产品更新</el-radio>
          <el-radio v-model="formNewNotice.logType" label="2">服务公告</el-radio>
          <el-radio v-model="formNewNotice.logType" label="3">优惠服务</el-radio>
        </el-form-item>
        <el-form-item prop="brief" label="博客简介">
          <el-input v-model="formNewNotice.brief"></el-input>
        </el-form-item>
        <el-form-item prop="logContent" label="博客内容">
          <el-input type="textarea" :rows="10" v-model="formNewNotice.logContent"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="ReleaseNewNotice">发布</el-button>
          <el-button @click="CancelNewNotice">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div id="tabs"  style="float:left;width:100%;" >
      <div id="leftMenu"  style="float:left">
        <label style="margin-left: 50px;font-size: 30px;">类型</label>
        <ul>
          <button class="leftItem" style="display: block" @click="showSorts" align="center" >全部类别</button>
          <button class="leftItem" style="display: block" @click="showUpdate" align="center">产品更新</button>
          <button class="leftItem" style="display: block" @click="showNotice" align="center">服务公告</button>
          <button class="leftItem" style="display: block" @click="showSale" align="center">优惠服务</button>
        </ul>
      </div>
      <div class="right">
        <el-button type="primary" style="margin-left: 30px;margin-top: 30px;" @click="dialogVisible=true" plain size="small"><label><i class=" el-icon-plus"/>创建公告</label></el-button>
        <div class="animated fadeInLeft" v-if="index===1">
      <div id="rightSortTab" v-if="index===1">
        <!--公告-->
        <div v-for="item in notices">
         <div class="notice">
           <label style="color:#409EFF;font-size: 22px;">{{item.title}}</label><br/><br/>
           <label style="color:gray;font-size: 14px;">{{item.date}}</label>&emsp;<button style="border:0;outline:0;background-color:transparent;color:#409EFF;font-size: 14px;cursor: pointer;">更新通知</button>
          <p style="margin-top: 30px;font-size:15px;">{{item.content}}</p><br/>
           <button style="border:0;outline:0;background-color:transparent;color:#409EFF;font-size: 14px;cursor: pointer;">>>阅读全文</button>
         <label style="margin-left: 333px;">
           <button style="border:0;outline:0;background-color:transparent;cursor: pointer;" @click="modifyNotice"><img src="../assets/edit.png" width="18px"/>编辑</button>
         </label>
           <label>
             <button style="border:0;outline:0;background-color:transparent;cursor: pointer;" @click="deleteNotice"><img src="../assets/delete.png" width="18px"/>删除</button>
           </label>
         </div>
        </div>
      </div>
          <!--修改Notice框-->
          <div align="left">
            <el-dialog :visible.sync="visibleModifyNotice" :close-on-click-modal="false"  :show-close="false" title="修改公告" @open="openCheck()">
              <el-form :model="noticeForm"  ref="noticeForm" label-width="100px" class="demo-ruleForm" >
                <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
                  <el-input v-model="noticeForm.title" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="日期" prop="title" :label-width="formLabelWidth" required="">
                  <el-date-picker v-model="noticeForm.date" placeholder="请选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="内容" prop="content" :label-width="formLabelWidth">
                  <el-input type="textarea" v-model="noticeForm.content" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" >提交修改</el-button>
                <el-button >取 消</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        dialogVisible:false,
        index:0,     //菜单栏索引

        rulesNewNotice:{

        },


        formNewNotice:{
          logContent:'',
          logTitle:'',
          logType:'1',
          time:'',
          brief:'',

        },

        noticeForm:{
          title:'',
          date:'',
          content:'',
        },
        notices:[{
          title:'语音识别的API文档',
          date:'2018-4-30',
          content:'我是内容hhhhh',
        },],
        noticeNumbers:0,
        visibleNewNotice:false,
        visibleModifyNotice:false,
        formLabelWidth:'100px',
      }
    },
    methods:{
      CancelNewNotice(){
        this.$data.formNewNotice.date='';
        this.$data.formNewNotice.logTitle='';
        this.$data.formNewNotice.logType='1';
        this.$data.formNewNotice.logContent='';
        this.$data.dialogVisible=false;
      },
      ReleaseNewNotice(){
        let _this=this;

        this.$data.formNewNotice.time=new Date();
        let date=this.$data.formNewNotice.time;
        let year=date.getFullYear();
        let month=date.getMonth()+1;
        let day=date.getDate();
        if(month>'0'&&month<'9'){
          month='0'+month;
        }
        if(day>'0'&&day<'9'){
          day='0'+day;
        }
        date=year+'-'+month+'-'+day;
        this.$data.formNewNotice.time=date;
        this.$refs['formNewNotice'].validate((valid)=>{
          if(valid){
            this.$axios({
              method:'get',
              url:'/blog/submit',
              params:this.$data.formNewNotice
            }).then(function (response) {
              if(response.data===true){
                _this.$data.formNewNotice.logContent='';
                _this.$data.formNewNotice.logType='1';
                _this.$data.formNewNotice.logTitle='';
                _this.$data.formNewNotice.time='';
                _this.$data.formNewNotice.brief='';
                _this.$data.dialogVisible=false;
                alert('发布成功！')
              }else {
                alert('!');
              }

            }).catch(function (error) {
              alert('发布失败！');
            })
          }
        })
      },
      showSorts(){
        this.$data.index=1;
      },
      showUpdate(){
        this.$data.index=2;
      },
      showNotice(){
        this.$data.index=3;
      },
      showSale(){
        this.$data.index=4;
      },
      createNewNotice(){
        this.$data.noticeNumbers+=1;
        this.$data.visibleNewNotice=true;
        //this.$data.notices.push({title:'12',date:'12',content:'12'});
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #leftMenu{
    padding-top:60px;
    width:20.83%;
    border:0px;
    height:100%;
  }
  .leftItem{
    width:100%;
    background-color:transparent;
    border: 0px;
    font-size: 17px;
    margin-top: 45px;
    transition: all 0.5s;
  }
  /*.leftItem:hover{*/
    /*width:70%;*/
    /*background-color: cornflowerblue;*/
  /*}*/
  /*.leftItem:focus{*/
    /*width:100%;*/
    /*outline: 0;*/
    /*align:left;*/
    /*border-right:3px solid #409EFF;*/
  /*}*/
  #rightSortTab{
    padding-top: 50px;
    min-height: 700px;
    float:left;
    width:70%;
    padding-left:8.24%;
  }
  .notice{
    padding-top: 40px;
    padding-left: 50px;
    background-color: white;
    border-radius: 3px;
    margin-top: 50px;
    width:650px;
    height:200px;
    box-shadow:3px 0 4px lightgray,
    -1px 0 1px lightgray,
    0px 3px 4px lightgray,
    0px -1px 1px lightgray;
  }
  .right{
    float:left;
    width:79.17%;
    box-shadow:1px 0 4px lightgray,
    -1px 0 1px lightgray,
    0px 0 4px lightgray,
    0px 0 1px lightgray;
    min-height: 700px;
    background-color: #FCFCFC;
  }

</style>
