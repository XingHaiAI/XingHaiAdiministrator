<template>
  <!--接口审核详情-->
    <div class="interDeBack" >
      <div style="width: 200px;height:60px;float: right"></div>
      <div style="float: right;">
      <div style="font-size: 30px;color: cornflowerblue;font-weight: bold" v-if="status===3" key="1">已通过<i class="el-icon-circle-check-outline" style="font-weight: bold"></i></div>
      <div style="font-size: 30px;color: darksalmon;font-weight: bold" v-if="status===2" key="2">已拒绝<i class="el-icon-circle-close-outline" style="font-weight: bold"></i></div>
      <div style="font-size: 30px;color: #666666;font-weight: bold" v-if="status===1" key="3">未审核<i class="el-icon-remove-outline" style="font-weight: bold"></i></div>
      </div>
      <el-form ref="interDetailsForm" :model="interDetailsForm" label-width="80px" class="interForm" style="margin-top: 30px;margin-left: auto;margin-right: auto;">
       <!--应用名称和类型-->
        <el-form-item label="应用名称" class="item">
          <el-col :span="6">
            <el-input type="text"  v-model="name" style="width: 100%;" disabled></el-input>
          </el-col>
        </el-form-item>
        <!--付费选择-->
        <el-form-item label="付费选择" class="item">
          <el-col :span="6">
            <el-input v-model="staticChoose" disabled></el-input>
          </el-col>
        </el-form-item>
        <!--接口选择-->
        <el-form-item label="接口选择" class="item">
          <br/>
          <div class="interfaceSelect">
            <el-form-item label="自然语言处理" label-width="200px;" class="selectItem"><br/>
              <el-checkbox-group v-model="check" class="checkList" disabled>
                <el-checkbox label="语义相似度" ></el-checkbox>
                <el-checkbox label="短文本相似度" :value="2" ></el-checkbox>
                <el-checkbox label="评论观点抽取" :value="3"></el-checkbox>
                <el-checkbox label="情感倾向分析" :value="4"></el-checkbox>
                <el-checkbox label="AI客服" :value="5"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="语音处理" label-width="200px;" class="selectItem"><br/>
              <el-checkbox-group v-model="check"  class="checkList" disabled>
                <el-checkbox label="语音识别" :value="6"></el-checkbox>
                <el-checkbox label="语音合成" :value="7"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="人脸识别" label-width="200px;" class="selectItem"><br/>
              <el-checkbox-group v-model="check"  class="checkList" disabled>
                <el-checkbox label="人脸识别" :value="8"></el-checkbox>
                <el-checkbox label="人脸对比" :value="9"></el-checkbox>
                <el-checkbox label="人脸查找" :value="10"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="文字识别" label-width="200px;" class="selectItem"><br/>
              <el-checkbox-group v-model="check"  class="checkList" disabled>
                <el-checkbox label="通用文字识别" :value="11"></el-checkbox>
                <el-checkbox label="手写识别" :value="12"></el-checkbox>
                <el-checkbox label="身份证识别" :value="13"></el-checkbox>
                <el-checkbox label="银行卡识别" :value="14"></el-checkbox>
                <el-checkbox label="车牌识别" :value="15"></el-checkbox>
                <el-checkbox label="驾驶证识别" :value="16"></el-checkbox>
                <el-checkbox label="行驶证识别" :value="17"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="图像识别" label-width="200px;" class="selectItem"><br/>
              <el-checkbox-group v-model="check"  class="checkList" disabled>
                <el-checkbox label="通用图像分析" :value="18"></el-checkbox>
                <el-checkbox label="去模糊化" :value="19"></el-checkbox>
                <el-checkbox label="人重识别" :value="20"></el-checkbox>
                <el-checkbox label="车型识别" :value="21"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
        </el-form-item>
        <!--应用平台*********************************************-->
        <el-form-item label="应用平台" label-width="200px;" class="item">
          <el-checkbox-group v-model="platform" disabled>
            <el-checkbox label="ANDROID"></el-checkbox>
            <el-checkbox label="IOS"></el-checkbox>
            <el-checkbox label="WINDOWS"></el-checkbox>
            <el-checkbox label="HTML5"></el-checkbox>
            <el-checkbox label="JAVA" ></el-checkbox>
            <el-checkbox label="FLASH"></el-checkbox>
            <el-checkbox label="LINUX"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!--应用描述*********************************************-->
        <el-form-item label="应用描述" label-width="200px;" class="item">
          <el-col :span="6">
            <el-input type="textarea" v-model="desc" style="outline: 0;background-color: transparent;width:700px;" disabled></el-input>
          </el-col>
        </el-form-item>
      </el-form>

    </div>
</template>

<script>
    export default {
        name: "InterfaceDetails",
      data(){
          return{
            staticChoose:'免费',
            id:'',
            name:'',
            status:1,
            desc:'',
            platform:[

            ],
            interDetailsForm:{
              appName:'',
              appType:'',
              payType:'',
              appPlatform:[],
              description:'',
              interType:'',
            },
            check:[],
            checkList1:[],
            checkList2:[],
            checkList3:[],
            checkList4:[],
            checkList5:[],
          }
      },
      created(){
        this.$data.id=this.$route.query.id;

        let _this=this;

        this.$axios({
          method:'get',
          url:'/api/getApiMore',
          params:{
            apikey:this.$data.id
          }
        }).then(function (response) {
          _this.$data.check=response.data.apitype;
          _this.$data.name=response.data.name;
          _this.$data.status=response.data.status;
          _this.$data.platform=response.data.platform;
          _this.$data.desc=response.data.descirbe;
          for(let index=0;index<_this.$data.check;index++){
            switch (_this.$data.check[index]){
              case 1:
                _this.$data.check[index]='语义相似度';
                break;
              case 2:
                _this.$data.check[index]='短文本相似度';
                break;
              case 3:
                _this.$data.check[index]='评论观点抽取';
                break;
              case 4:
                _this.$data.check[index]='情感倾向分析';
                break;
              case 5:
                _this.$data.check[index]='AI客服';
                break;
              case 6:
                _this.$data.check[index]='语音识别';
                break;
              case 7:
                _this.$data.check[index]='语音合成';
                break;
              case 8:
                _this.$data.check[index]='人脸识别';
                break;
              case 9:
                _this.$data.check[index]='人脸对比';
                break;
              case 10:
                _this.$data.check[index]='人脸查找';
                break;
              case 11:
                _this.$data.check[index]='通用文字识别';
                break;
              case 12:
                _this.$data.check[index]='手写识别';
                break;
              case 13:
                _this.$data.check[index]='身份证识别';
                break;
              case 14:
                _this.$data.check[index]='银行卡识别';
                break;
              case 15:
                _this.$data.check[index]='车牌识别';
                break;
              case 16:
                _this.$data.check[index]='驾驶证识别';
                break;
              case 17:
                _this.$data.check[index]='行驶证识别';
                break;
              case 18:
                _this.$data.check[index]='通用图像分析';
                break;
              case 19:
                _this.$data.check[index]='去模糊化';
                break;
              case 20:
                _this.$data.check[index]='人重识别';
                break;
              case 21:
                _this.$data.check[index]='车型识别';
                break;

            }
          }
          for(let index=0;index<_this.$data.platform.length;index++){
            switch(_this.$data.platform[index]){
              case 1:
                _this.$data.platform[index]='ANDROID';
                break;
              case 2:
                _this.$data.platform[index]='IOS';
                break;
              case 3:
                _this.$data.platform[index]='WINDOWS';
                break;
              case 4:
                _this.$data.platform[index]='HTML5';
                break;
              case 5:
                _this.$data.platform[index]='JAVA';
                break;
              case 6:
                _this.$data.platform[index]='FLASH';
                break;
              case 7:
                _this.$data.platform[index]='LINUX';
                break;
            }
          }



        })


      },
      methods: {
      }
    }
</script>

<style scoped>
 .interDeBack{
  width:70%;
  height:1000px;
 }
  .interfaceSelect{
    width:80%;
    box-shadow:3px 0 4px lightgray,
    -1px 0 1px lightgray,
    0px 3px 4px lightgray,
    0px -1px 1px lightgray;
  }
  .checkList{
    margin-left: 50px;
  }
  .selectItem{
    margin-left: 10px;
  }
  .item{
    margin-left: 30px;
  }
</style>
