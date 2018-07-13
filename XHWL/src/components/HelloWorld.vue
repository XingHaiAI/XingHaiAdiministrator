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
    <el-dialog :visible.sync="dialogVisible1" :lock-scroll="true" :modal="true" :modal-append-to-body="false" title="修改公告">
      <el-form :model="formModify" ref="formModify" :rules="rulesModify">
        <el-form-item prop="logTitle" label="博客标题:">
          <el-input v-model="formModify.logtitle" disabled></el-input>
        </el-form-item>
        <el-form-item prop="logType" label="博客类型">
          <el-radio v-model="formModify.logtype" label="1" disabled>产品更新</el-radio>
          <el-radio v-model="formModify.logtype" label="2" disabled>服务公告</el-radio>
          <el-radio v-model="formModify.logtype" label="3" disabled>优惠服务</el-radio>
        </el-form-item>
        <el-form-item prop="brief" label="博客简介">
          <el-input v-model="formModify.brief" disabled></el-input>
        </el-form-item>
        <el-form-item prop="logContent" label="博客内容">
          <el-input type="textarea" :rows="10" v-model="formModify.logcontent"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="ReleaseModify">修改</el-button>
          <el-button @click="CancelNewNotice">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div id="tabs"  style="float:left;width:100%;" >
      <div id="leftMenu"  style="float:left">
        <label style="margin-left: 50px;font-size: 30px;">类型</label>
        <ul>
          <span class="leftItem" style="display: block" @click="showSorts" align="center" >全部类别</span>
          <span class="leftItem" style="display: block" @click="showUpdate" align="center">产品更新</span>
          <span class="leftItem" style="display: block" @click="showNotice" align="center">优惠服务</span>
          <span class="leftItem" style="display: block" @click="showSale" align="center">产品服务</span>
        </ul>
      </div>
      <div class="right">
        <el-button type="primary" style="margin-left: 30px;margin-top: 30px;" @click="dialogVisible=true" plain size="small"><label><i class=" el-icon-plus"/>创建公告</label></el-button>
        <div class="animated fadeInRight" v-if="index===1" key="1">
          <div v-if="total4All===0" style="text-align: center;width: 300px;margin-left: auto;margin-right: auto">暂无信息~</div>
      <div class="rightSortTab" v-if="index===1">
        <!--公告-->

        <el-card style="width: 100%;margin-top: 30px;" v-for="(item,index) in blogAll" :key="index">
          <div style="background-color: bisque">
            <span style="font-size:24px;font-weight: bold;float: left" class="name"><i class="el-icon-bell" style="color: cornflowerblue;"/> {{item.logtitle}}</span>
            <span style="float:right;font-size:12px;"><a style="color: darkgray;text-align: center;float: right;font-size: 15px;"><i class="el-icon-tickets"/>{{item.logtype}}</a></span>
          </div>
          <div style="height: 46px;"></div>
          <div class="texts4blogUpdate" style="padding: 0.1rem" v-show="!item.ashow">
            <span style="margin-left:22px;font-size: 16px">发布于{{item.time}}</span><br/><br/>
            <span style="margin-left: 22px;font-size: 16px;color: darkgray;">{{item.brief}}</span>

          </div>
          <el-collapse-transition>
            <div style="padding: 10px;" v-show="item.ashow">
              <p style="font-size: 20px">具体内容</p>
              <div style="height: 15px"></div>
              <p style="font-size: 16px">-{{item.logcontent}}</p>
            </div>
          </el-collapse-transition>
          <div style="position: relative;margin-bottom:5%;margin-top: 2%;" >
            <div style="height: 20px"></div>
            <el-button type="text"   @click="modifyBlog(item)" style="font-size: 15px;float: right;margin-left: 6px;color: gray"><img src="../assets/edit.png"/>编辑</el-button>
            <el-button type="text"   @click="deleteBlog(item)" style="font-size: 15px;float: right;color: gray"><img src="../assets/delete.png"/>删除</el-button>
            <el-button type="text"   @click="item.ashow=!item.ashow" style="font-size: 15px;float: left">{{item.ashow?'收起详情':'查看详情'}}</el-button>
          </div>
        </el-card>
        <div class="pageDiv">
          <div class="block">
            <el-pagination
              @current-change="blogAllChange"
              :current-page.sync="page4All"
              :page-size="5"
              :total="total4All">
            </el-pagination>
          </div>
        </div>
      </div>
        </div>
        <div class="animated fadeInRight" v-if="index===2">
          <div v-if="total4Update===0" style="text-align: center;width: 300px;margin-left: auto;margin-right: auto">暂无信息~</div>
          <div class="rightSortTab" v-if="index===2">
            <!--公告-->
            <el-card style="width: 100%;margin-top: 30px;" v-for="(item,index) in blogUpdate" :key="index">
              <div style="background-color: bisque">
                <span style="font-size:24px;font-weight: bold;float: left" class="name"><i class="el-icon-bell" style="color: cornflowerblue;"/> {{item.logtitle}}</span>
                <span style="float:right;font-size:12px;"><a style="color: darkgray;text-align: center;float: right;font-size: 15px;"><i class="el-icon-tickets"/>{{item.logtype}}</a></span>
              </div>
              <div style="height: 46px;"></div>
              <div class="texts4blogUpdate" style="padding: 0.1rem" v-show="!item.ashow">
                <span style="margin-left:22px;font-size: 16px">发布于{{item.time}}</span><br/><br/>
                <span style="margin-left: 22px;font-size: 16px;color: darkgray;">{{item.brief}}</span>

              </div>
              <el-collapse-transition>
                <div style="padding: 10px;" v-show="item.ashow">
                  <p style="font-size: 20px">具体内容</p>
                  <div style="height: 15px"></div>
                  <p style="font-size: 16px">-{{item.logcontent}}</p>
                </div>
              </el-collapse-transition>
              <div style="position: relative;margin-bottom:5%;margin-top: 2%;" >
                <div style="height: 20px"></div>
                <el-button type="text"   @click="modifyBlog(item)"  style="font-size: 15px;float: right;margin-left: 6px;color: gray"><img src="../assets/edit.png"/>编辑</el-button>
                <el-button type="text"   @click="deleteBlog(item)" style="font-size: 15px;float: right;color: gray"><img src="../assets/delete.png"/>删除</el-button>
                <el-button type="text"   @click="item.ashow=!item.ashow" style="font-size: 15px;float: left">{{item.ashow?'收起详情':'查看详情'}}</el-button>
              </div>
            </el-card>
            <div class="pageDiv">
              <div class="block">
                <el-pagination
                  :current-page.sync="page4Update"
                  @current-change="blogUpdateChange"
                  :page-size="5"
                  layout="prev, pager, next"
                  :total="total4Update">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
        <div class="animated fadeInRight" v-if="index===3">
          <div v-if="total4Service===0" style="text-align: center;width: 300px;margin-left: auto;margin-right: auto">暂无信息~</div>
          <div class="rightSortTab" v-if="index===3">
            <!--公告-->
            <el-card style="width: 100%;margin-top: 30px;" v-for="(item,index) in blogService" :key="index">
              <div style="background-color: bisque">
                <span style="font-size:24px;font-weight: bold;float: left" class="name"><i class="el-icon-bell" style="color: cornflowerblue;"/> {{item.logtitle}}</span>
                <span style="float:right;font-size:12px;"><a style="color: darkgray;text-align: center;float: right;font-size: 15px;"><i class="el-icon-tickets"/>{{item.logtype}}</a></span>
              </div>
              <div style="height: 46px;"></div>
              <div class="texts4blogUpdate" style="padding: 0.1rem" v-show="!item.ashow">
                <span style="margin-left:22px;font-size: 16px">发布于{{item.time}}</span><br/><br/>
                <span style="margin-left: 22px;font-size: 16px;color: darkgray;">{{item.brief}}</span>

              </div>
              <el-collapse-transition>
                <div style="padding: 10px;" v-show="item.ashow">
                  <p style="font-size: 20px">具体内容</p>
                  <div style="height: 15px"></div>
                  <p style="font-size: 16px">-{{item.logcontent}}</p>
                </div>
              </el-collapse-transition>
              <div style="position: relative;margin-bottom:5%;margin-top: 2%;" >
                <div style="height: 20px"></div>
                <el-button type="text"   @click="modifyBlog(item)" style="font-size: 15px;float: right;margin-left: 6px;color:gray;"><img src="../assets/edit.png"/>编辑</el-button>
                <el-button type="text"   @click="deleteBlog(item)" style="font-size: 15px;float: right;color: gray"><img src="../assets/delete.png"/>修改</el-button>
                <el-button type="text"   @click="item.ashow=!item.ashow" style="font-size: 15px;float: left">{{item.ashow?'收起详情':'查看详情'}}</el-button>
              </div>
            </el-card>
            <div class="pageDiv">
              <div class="block">
                <el-pagination
                  :current-page.sync="page4Service"
                  @current-change="blogServiceChange"
                  :page-size="5"
                  layout="prev, pager, next"
                  :total="total4Service">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
        <div class="animated fadeInRight" v-if="index===4">
          <div v-if="total4Discount===0" style="text-align: center;width: 300px;margin-left: auto;margin-right: auto">暂无信息~</div>
          <div class="rightSortTab" v-if="index===4">
            <!--公告-->
            <el-card style="width: 100%;margin-top: 30px;" v-for="(item,index) in blogDiscount" :key="index">
              <div style="background-color: bisque">
                <span style="font-size:24px;font-weight: bold;float: left" class="name"><i class="el-icon-bell" style="color: cornflowerblue;"/> {{item.logtitle}}</span>
                <span style="float:right;font-size:12px;"><a style="color: darkgray;text-align: center;float: right;font-size: 15px;"><i class="el-icon-tickets"/>{{item.logtype}}</a></span>
              </div>
              <div style="height: 46px;"></div>
              <div class="texts4blogUpdate" style="padding: 0.1rem" v-show="!item.ashow">
                <span style="margin-left:22px;font-size: 16px">发布于{{item.time}}</span><br/><br/>
                <span style="margin-left: 22px;font-size: 16px;color: darkgray;">{{item.brief}}</span>

              </div>
              <el-collapse-transition>
                <div style="padding: 10px;" v-show="item.ashow">
                  <p style="font-size: 20px">具体内容</p>
                  <div style="height: 15px"></div>
                  <p style="font-size: 16px">-{{item.logcontent}}</p>
                </div>
              </el-collapse-transition>
              <div style="position: relative;margin-bottom:5%;margin-top: 2%;" >
                <div style="height: 20px"></div>
                <el-button type="text"   @click="modifyBlog(item)" style="font-size: 15px;float: right;margin-left: 6px;color: gray"><img src="../assets/edit.png"/>编辑</el-button>
                <el-button type="text"   @click="deleteBlog(item)" style="font-size: 15px;float: right;color: gray"><img src="../assets/delete.png"/>删除</el-button>
                <el-button type="text"   @click="item.ashow=!item.ashow" style="font-size: 15px;float: left">{{item.ashow?'收起详情':'查看详情'}}</el-button>
              </div>
            </el-card>
            <div class="pageDiv">
              <div class="block">
                <el-pagination
                  :current-page.sync="page4Discount"
                  @current-change="blogDiscountChange"
                  :page-size="5"
                  layout="prev, pager, next"
                  :total="total4Discount">
                </el-pagination>
              </div>
            </div>
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
        dialogVisible1:false,
        index:1,     //菜单栏索引

        rulesNewNotice:{

        },
        rulesModify:{

        },
        formModify:{
          logid:null,
          logtitle:'',
          logtype:'',
          brief:'',
          logcontent:'',
          ashow:false,
          time:''
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
        total4All:0,
        page4All:1,
        blogAll:[{
          logid:null,
          logtitle:'语音视频的API更新',
          logtype:'服务公告',
          brief:'授权时长可灵活延长',
          logcontent:'具体内容内容内容',
          ashow:false,
          time:'2015-01-15'
        }
        ],
        total4Update:0,
        page4Update:1,
        blogUpdate:[{
          logid:null,
          logtitle:'语音视频的API更新',
          logtype:'产品更新',
          brief:'授权时长可灵活延长',
          logcontent:'具体内容内容内容',
          ashow:false,
          time:'2015-01-15'
        }],
        total4Service:0,
        page4Service:1,
        blogService:[
          {
            logid:null,
            logtitle:'语音视频的API更新',
            logtype:'服务公告',
            brief:'授权时长可灵活延长',
            logcontent:'具体内容内容内容',
            ashow:false,
            time:'2015-01-15'
          },
        ],
        total4Discount:0,
        page4Discount:1,
        blogDiscount:[
          {
            logid:null,
            logtitle:'语音视频的API更新',
            logtype:'优惠服务',
            brief:'授权时长可灵活延长',
            logcontent:'具体内容内容内容',
            ashow:false,
            time:'2015-01-15'
          },

        ],

        noticeNumbers:0,
        visibleNewNotice:false,
        visibleModifyNotice:false,
        formLabelWidth:'100px',
      }
    },
    methods:{
      /**
       * 修改博客内容
       */
      modifyBlog(item){
        let _this=this;
        this.$data.formModify.logtype=item.logtype;
        this.$data.formModify.brief=item.brief;
        this.$data.formModify.logcontent=item.logcontent;
        this.$data.formModify.logid=item.logid;
        this.$data.formModify.logtitle=item.logtitle;
        this.$data.formModify.time=item.time
        this.$data.formModify.ashow=false;
        console.log(item);
        if(item.logtype==='优惠信息'){
          this.$data.formModify.logtype='3';
        }else if(item.logtype==='产品更新'){
          this.$data.formModify.logtype='1';
        }else{
          this.$data.formModify.logtype='2';
        }
        this.$data.dialogVisible1=true;
      },

      ReleaseModify(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/blog/change',
          params:{
            newLogContent:this.$data.formModify.logcontent,
            LogID:this.$data.formModify.logid
          }
        }).then(function (response) {
          if(response.data===true){
            alert('修改成功！')
            _this.$data.dialogVisible1=false;
            _this.$router.push('/Redirect');
          }else{
            alert('修改失败')
          }
        }).catch(function (err) {
          alert('修改失败');
        })
      },

      deleteBlog(item){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/blog/delete',
          params:{
            Logid:item.logid
          }
        }).then(function (response) {
          if(response.data===true){
            alert('删除成功！');
            _this.$router.push('/Redirect');
            _this.$data.total4All--;
            _this.$data.total4Update--;
            _this.$data.total4Service--;
            _this.$data.total4Discount--;
            _this.$data.page4All=1;
            _this.$data.page4Update=1;
            _this.$data.page4Service=1
            _this.$data.page4Discount=1;
          }else{
            alert('删除失败！');
          }
        })
      },

      /**
       * 取消发布新博客
       */
      CancelNewNotice(){
        this.$data.formNewNotice.date='';
        this.$data.formNewNotice.logTitle='';
        this.$data.formNewNotice.logType='1';
        this.$data.formNewNotice.logContent='';
        this.$data.dialogVisible=false;
      },

      /**
       * 发布新博客
       * @constructor
       */
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
                _this.$router.push('/Redirect');
                alert('发布成功！');
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
      blogAllChange(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/blog/get',
          params:{
            type:'4',
            page:this.$data.page4All
          }
        }).then(function (response) {
          for(let index=0;index<response.data.logcontents.length;index++){
            response.data.logcontents[index].ashow=false;
            if(response.data.logcontents[index].logtype===1){
              response.data.logcontents[index].logtype='产品更新'
            }else if(response.data.logcontents[index].logtype===2){
              response.data.logcontents[index].logtype='服务公告'
            }else{
              response.data.logcontents[index].logtype='优惠信息'
            }
          }
          _this.$data.blogAll=response.data.logcontents;
          // _this.$data.page4All=response.data.part;
          _this.$data.total4All=response.data.all;
        })
      },
      blogUpdateChange(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/blog/get',
          params:{
            type:'1',
            page:this.$data.page4Update
          }
        }).then(function (response) {
          for(let index=0;index<response.data.logcontents.length;index++){
            response.data.logcontents[index].ashow=false;
            response.data.logcontents[index].logtype='产品更新'
          }
          _this.$data.blogUpdate=response.data.logcontents
          _this.$data.total4Update=response.data.all;
          // _this.$data.page4Update=response.data.part;
        })
      },
      blogServiceChange(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/blog/get',
          params:{
            type:'2',
            page:this.$data.page4Service
          }
        }).then(function (response) {
          for(let index=0;index<response.data.logcontents.length;index++){
            response.data.logcontents[index].ashow=false;
            response.data.logcontents[index].logtype='服务公告'
          }
          _this.$data.blogService=response.data.logcontents
          _this.$data.total4Service=response.data.all;
          // _this.$data.page4Service=response.data.part;
        })
      },
      blogDiscountChange(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/blog/get',
          params:{
            type:'3',
            page:this.$data.page4Discount
          }
        }).then(function (response) {
          for(let index=0;index<response.data.logcontents.length;index++){
            response.data.logcontents[index].ashow=false;
            response.data.logcontents[index].logtype='优惠信息'
          }
          _this.$data.blogDiscount=response.data.logcontents
          _this.$data.total4Discount=response.data.all;
          //_this.$data.page4Discount=response.data.part;
        })
      }
    },
    created(){
      let _this=this;

      /**
       * get请求获取全部类型的产品博客
       */
      this.$axios({
        method:'get',
        url:'/blog/get',
        params:{
          page:1,
          type:4
        }
      }).then(function (response) {
        for(let index=0;index<response.data.logcontents.length;index++){
          response.data.logcontents[index].ashow=false;
          if(response.data.logcontents[index].logtype===1){
            response.data.logcontents[index].logtype='产品更新'
          }else if(response.data.logcontents[index].logtype===2){
            response.data.logcontents[index].logtype='服务公告'
          }else{
            response.data.logcontents[index].logtype='优惠信息'
          }
        }
        _this.$data.blogAll=response.data.logcontents;
        _this.$data.page4All=1;
        _this.$data.total4All=response.data.all;
        // alert(_this.$data.total4All);
      })


      /**
       * get请求获取全部产品更新的信息
       */
      this.$axios({
        method:'get',
        url:'/blog/get',
        params:{
          type:'1',
          page:1
        }
      }).then(function (response) {
        for(let index=0;index<response.data.logcontents.length;index++){
          response.data.logcontents[index].ashow=false;
          response.data.logcontents[index].logtype='产品更新'
        }
        _this.$data.blogUpdate=response.data.logcontents
        _this.$data.total4Update=response.data.all;
        _this.$data.page4Update=1;
      })


      /**
       * get请求获取全部服务公告
       */
      this.$axios({
        method:'get',
        url:'/blog/get',
        params:{
          type:'2',
          page:1
        }
      }).then(function (response) {
        for(let index=0;index<response.data.logcontents.length;index++){
          response.data.logcontents[index].ashow=false;
          response.data.logcontents[index].logtype='服务公告'
        }
        _this.$data.blogService=response.data.logcontents
        _this.$data.total4Service=response.data.all;
        _this.$data.page4Service=1;
      })


      /**
       * get请求获取所有优惠信息
       */
      this.$axios({
        method:'get',
        url:'/blog/get',
        params:{
          type:'3',
          page:1
        }
      }).then(function (response) {
        for(let index=0;index<response.data.logcontents.length;index++){
          response.data.logcontents[index].ashow=false;
          response.data.logcontents[index].logtype='优惠信息'
        }
        _this.$data.blogDiscount=response.data.logcontents
        _this.$data.total4Discount=response.data.all;
        _this.$data.page4Discount=1;
      })

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
    border: none;
    font-size: 17px;
    margin-top: 45px;
    transition: all 0.8s;
  }
  .leftItem:focus{
    border:none;
    transform: scale(1.05);
  }
  .leftItem:hover{
    border:none;
    transform: scale(1.05);
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
  .rightSortTab{
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
