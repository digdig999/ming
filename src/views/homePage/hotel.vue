<template>
  <div class="homePage-hotel">
    <mt-header class="title" title="酒店"></mt-header>
    <div class="content">
      <div class="hotel-search">
        <mt-search
          class="search-item"
          v-model="value"
          cancel-text="取消"
          placeholder="搜索">
        </mt-search>
      </div>
      <div class="hotel-select-box">
        <div class="hotel-select">
          <select v-model="areaSelect" @change="changeArea">
            <option :value="area.id" :key="area.id" v-for="area in areaList">{{area.name}}</option>
          </select>
          <icon style="color: #FF2C2C;" name="angle-down"></icon>
        </div>
      </div>
      <div class="hotel-cell">
        <div class="hotel-item" v-for="(item,index) in hotelList" :key="index">
          <div class="hotel-item-flex">
            <div class="con">
              <h3>天天假日酒店</h3>
              <p>联系电话：13492312301</p>
              <p>地址：南湖区花园路416号</p>
              <p>联系单位：集团总部</p>
            </div>
            <div class="img">
              <img src="../../assets/888.jpg" />
            </div>
          </div>
          <div class="hotel-item-remark">
            备注：报中国电科预定，出示工作证入住
          </div>
          <div class="hotel-item-room">
            <div class="room-name">大床房</div>
            <div class="room-price">
              <span class="price">门市价：<span class="tip">￥191</span></span>
              <span class="price">协议价：<span class="tip">￥159</span></span>
            </div>
          </div>
          <div class="hotel-item-icon">
            <icon class="icon" name="angle-double-down"></icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "hotel",
    data(){
      return{
        value:'',
        areaSelect:'',
        areaList:[
          {id:1,name:'南湖区'},
          {id:2,name:'雨花区'},
          {id:3,name:'高新区'},
        ],
        hotelList:[
          {},{},{}
        ]
      }
    },
    created(){
      this.areaSelect = this.areaList[0].id
    },
    methods:{
      changeArea(){

      }
    }
  }
</script>

<style lang="less">
 .homePage-hotel{
   min-height: 100vh;
   overflow: hidden;
   background-color: #eee;
   .title{
     position: fixed;
     top:0;
     z-index: 999;
     width: 100%;
     height: 50px;
     padding: 10px;
     background-color: #FF2C2C;
     font-size:16px;
     color: #fff;
     display: flex;
     justify-content: center;
     align-items: flex-end;
   }
   .content{
     margin: 70px 0 0 0;
     .hotel-search{
       background-color: #FF2C2C;
       padding: 0 10px 5px 10px;
     }
     .search-item{
       .mint-searchbar{
         display: flex;
       }
       .mint-searchbar-inner,.mint-searchbar-core{
         width: 100%;
         font-size: 14px;
       }
       .mint-searchbar-core{
         padding: 0 10px;
         height: 30px;
         line-height: 30px;
         border-radius: 10px;
       }
       .mint-searchbar-cancel{
         color: #fff;
         flex-shrink: 0;
         line-height: 30px;
         font-size: 14px;
       }
     }
     .hotel-select-box{
       background-color: #fff;
       padding-bottom: 10px;
     }
     .hotel-select{
       height: 40px;
       background-color: #fff;
       display: flex;
       justify-content: center;
       align-items: center;
       -moz-box-shadow: 0px 5px 5px #BEBEBE;
       box-shadow: 0px 5px 5px #BEBEBE;
       select{
         height: 100%;
         text-align: center;
         text-align-last:center;
         color: #FF2C2C;
         background:none;
         border: none;
         outline:none;
       }
     }
     .hotel-cell{
       .hotel-item{
         background-color: #fff;
         padding: 10px 15px;
         margin-bottom: 5px;
         .hotel-item-flex{
           display: flex;
           justify-content: space-between;
           .con{
             h3{
               font-size: 14px;
             }
             p{
               margin-top: 10px;
               font-size: 12px;
               color: #999;
             }
           }
           .img{
             width: 50%;
             box-sizing: border-box;
             padding: 0 30px;
             display: flex;
             img{
               width: 100%;
               height: 100px;
               object-fit: cover;
               border-radius: 3px;
             }
           }
         }
         .hotel-item-remark{
           font-size: 12px;
           color: #999;
           margin-top: 10px;
         }
         .hotel-item-room{
           display: flex;
           justify-content: space-between;
           margin-top: 10px;
           .room-name{
             font-size: 14px;
             font-weight: 500;
           }
           .room-price{
             .price{
               font-size: 12px;
               margin-left: 15px;
             }
             .tip{
               font-size: 14px;
               font-weight: 500;
               color: #FF2C2C;
             }
           }
         }
         .hotel-item-icon{
           display: flex;
           justify-content: center;
           margin-top: 10px;
           .icon{
             font-weight: 400;
             color: #BEBEBE;
           }
         }
       }
     }
   }
 }
</style>
