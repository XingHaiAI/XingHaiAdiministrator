<template>
  <div class="animated fadeIn">
    <div id="mainBack" style="width:100%;min-width: 1000px;" >
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
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Dedirect",
        methods:{

        },
      created(){
        this.$router.push('/');
      }
    }
</script>

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
