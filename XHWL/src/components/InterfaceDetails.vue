<template>
  <!--接口审核详情-->
    <div class="interDeBack">
      <el-form ref="interDetailsForm" :model="interDetailsForm" label-width="80px" class="interForm">
       <!--应用名称和类型-->
        <el-form-item label="应用名称" class="item">
          <el-col :span="6">
            <el-input type="text"  v-model="interDetailsForm.appName" style="width: 100%;" disabled></el-input>
          </el-col>
          <el-col class="line" :span="3"align="right"> &emsp;应用类型&emsp;</el-col>
          <el-col :span="6">
            <el-select v-model="interDetailsForm.appType" style="width: 100%;" disabled></el-select>
          </el-col>
        </el-form-item>
        <!--付费选择-->
        <el-form-item label="付费选择" class="item">
          <el-col :span="6">
            <el-input v-model="interDetailsForm.payType" disabled></el-input>
          </el-col>
        </el-form-item>
        <!--接口选择-->
        <el-form-item label="接口选择" class="item">
          <br/>
          <div class="interfaceSelect">
            <el-form-item label="自然语言处理" label-width="200px;" class="selectItem"><br/>
              <el-checkbox-group v-model="checkList1" class="checkList" disabled>
                <el-checkbox label="语义相似度"></el-checkbox>
                <el-checkbox label="短文本相似度"></el-checkbox>
                <el-checkbox label="评论观点抽取"></el-checkbox>
                <el-checkbox label="情感倾向分析"></el-checkbox>
                <el-checkbox label="AI客服" ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="语音处理" label-width="200px;" class="selectItem"><br/>
              <el-checkbox-group v-model="checkList2"  class="checkList" disabled>
                <el-checkbox label="语音识别"></el-checkbox>
                <el-checkbox label="语音合成"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="人脸识别" label-width="200px;" class="selectItem"><br/>
              <el-checkbox-group v-model="checkList3"  class="checkList" disabled>
                <el-checkbox label="人脸识别"></el-checkbox>
                <el-checkbox label="人脸对比"></el-checkbox>
                <el-checkbox label="人脸查找"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="文字识别" label-width="200px;" class="selectItem"><br/>
              <el-checkbox-group v-model="checkList4"  class="checkList" disabled>
                <el-checkbox label="通用文字识别"></el-checkbox>
                <el-checkbox label="手写识别"></el-checkbox>
                <el-checkbox label="身份证识别"></el-checkbox>
                <el-checkbox label="银行卡识别"></el-checkbox>
                <el-checkbox label="车牌识别" ></el-checkbox>
                <el-checkbox label="驾驶证识别"></el-checkbox>
                <el-checkbox label="行驶证识别"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="图像识别" label-width="200px;" class="selectItem"><br/>
              <el-checkbox-group v-model="checkList5"  class="checkList" disabled>
                <el-checkbox label="通用图像分析"></el-checkbox>
                <el-checkbox label="去模糊化"></el-checkbox>
                <el-checkbox label="人重识别"></el-checkbox>
                <el-checkbox label="车型识别"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
        </el-form-item>
        <!--应用平台*********************************************-->
        <el-form-item label="应用平台" label-width="200px;" class="item">
          <el-checkbox-group v-model="interDetailsForm.appPlatform" disabled>
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
            <el-input type="textarea" v-model="interDetailsForm.description" style="outline: 0;background-color: transparent;width:700px;" disabled></el-input>
          </el-col>
        </el-form-item>
        <!--接口类型-->
        <el-form-item label="接口类型" label-width="200px;" class="item">
          <el-col :span="6">
            <el-input  style="outline: 0;background-color: transparent;width:250px;" disabled></el-input>
          </el-col>
          <el-col :span="2">&emsp;</el-col>
          <el-col :span="2">
            <el-button  type="primary" size="medium">复制</el-button>
          </el-col>
        </el-form-item>
        <!--处理按钮-->
        <el-form-item>
          <el-col :span="4">&emsp;
          </el-col>
          <el-col :span="6">
            <el-button type="primary" size="small" plain>审核通过</el-button>
          </el-col>
          <el-col :span="2">&emsp;
          </el-col>
          <el-col :span="1">
            <el-button type="danger" size="small" plain>审核不通过</el-button>
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
            id:'',
            interDetailsForm:{
              appName:'',
              appType:'',
              payType:'',
              appPlatform:[],
              description:'',
              interType:'',
            },
            checkList1:[],
            checkList2:[],
            checkList3:[],
            checkList4:[],
            checkList5:[],
          }
      },
      created(){
        this.$data.id=this.$route.query.id;
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
