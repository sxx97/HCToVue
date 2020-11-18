
        <template>
            <div id="component" class="wrapper wrapper-content">
    <div class="row">
        <img style="width: 100%;" src="/img/indexBg.jpg" alt="">
    </div>
    <!--<div class="row">
        <div class="col-lg-3">
            <div class="ibox ">
                <div class="ibox-title">
                    <span class="label label-success float-right">总数</span>
                    <h5>业主</h5>
                </div>
                <div class="ibox-content">
                    <h1 class="no-margins">{{indexContextInfo.ownerCount}}</h1>
                    <div class="stat-percent font-bold text-success">{{indexContextInfo.noEnterRoomCount}} <i class="fa fa-bolt"></i></div>
                    <small>未迁入</small>
                </div>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="ibox ">
                <div class="ibox-title">
                    <span class="label label-info float-right">总数</span>
                    <h5>房间</h5>
                </div>
                <div class="ibox-content">
                    <h1 class="no-margins">{{indexContextInfo.roomCount}}</h1>
                    <div class="stat-percent font-bold text-info">{{indexContextInfo.freeRoomCount}} <i class="fa fa-level-up"></i></div>
                    <small>空闲</small>
                </div>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="ibox ">
                <div class="ibox-title">
                    <span class="label label-primary float-right">总数</span>
                    <h5>停车位</h5>
                </div>
                <div class="ibox-content">
                    <h1 class="no-margins">{{indexContextInfo.parkingSpaceCount}}</h1>
                    <div class="stat-percent font-bold text-navy">{{indexContextInfo.freeParkingSpaceCount}} <i class="fa fa-level-up"></i></div>
                    <small>空闲</small>
                </div>
            </div>
        </div>
        &lt;!&ndash;<div class="col-lg-3">
            <div class="ibox ">
                <div class="ibox-title">
                    <span class="label label-danger float-right">总数</span>
                    <h5>商铺</h5>
                </div>
                <div class="ibox-content">
                    <h1 class="no-margins">{{indexContextInfo.shopCount}}</h1>
                    <div class="stat-percent font-bold text-danger">{{indexContextInfo.freeShopCount}} <i class="fa fa-level-down"></i></div>
                    <small>空闲</small>
                </div>
            </div>
        </div>&ndash;&gt;
    </div>-->

    <!--<IndexArrears name="indexArrears"></IndexArrears>-->

</div>
        </template>
        <script>
            import IndexArrears from './IndexArrears.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"indexContextInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._queryIndexContextData();
        })()(function(){
            this.$vc.on("indexContext","_queryIndexContextData",function(){
                this._queryIndexContextData();
            });
        })()   
            },
            methods: {
                _queryIndexContextData:function(){

                if(this.$vc.getCurrentCommunity() == null || this.$vc.getCurrentCommunity() == undefined){
                    return ;
                }

                var param = {
                    params:{
                        communityId:this.$vc.getCurrentCommunity().communityId
                    }
                }

               //发送get请求
               this.$vc.http.get('indexContext',
                            'getData',
                             param,
                             function(json,res){
                                var indexData =JSON.parse(json);

                                this.$vc.copyObject(indexData, this.indexContextInfo);

                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );

            },
            },
        }
    
        </script>
        <style>
            
        </style>
    