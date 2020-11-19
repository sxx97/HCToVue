
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

    <!--<vc:create name="indexArrears"></vc:create>-->

</div>
        </template>
        <script>
            
            



            const OWNER_TYPE = {
                OWNER: '1001',
                TENANT: '1003'
            };
            // 考核类型
            const ASSESSMENT_TYPE = {
                BUSINESS: 2,
                COMMON: 1,
                SYSTEM: 3,
            };
            
            // 删除时的类型
            const DELETE_TYPE = {
                TABLE: 1, // 删除通用考核表
                BUSINESS_ITEM: 2,  // 删除业务考核项
                COMMON_ITEM: 3, // 删除通用考核项
            }
            // 考核人员
            const ASSESSMENT_OBJECT_TYPE = {
                STAFF: 1,
                SUPERVISOR: 2,
                MANAGER: 3,
            }
            
            const AUTO_ASSESSMENT_TYPE = {
                INSPECTION: 1,
                WORK_ORDER: 2,
                ATTENDANCE: 3,
            }
            
            // 考核项目
            const ASSESSMENT_ITEM_TYPE = {
                COMMON_ITEM: 1,
                BUSINESS_ITEM: 2,
            }
            
            const DEFAULT_PAGE = 1;
            const DEFAULT_ROWS = 10;

            
            export default {
                props: {},
                components: {
                    
                },
                data () {
                    return {"indexContextInfo":{"ownerCount":"0","noEnterRoomCount":"0","roomCount":"0","freeRoomCount":"0","parkingSpaceCount":"0","freeParkingSpaceCount":"0"}}    
                },
                mounted() {
                (() =>{
            this._queryIndexContextData();
        })()
(() =>{
            this.$vc.on("indexContext","_queryIndexContextData",() =>{
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
                             (json,res) =>{
                                var indexData =JSON.parse(json);

                                this.$vc.copyObject(indexData, this.indexContextInfo);

                             },(errInfo,error) =>{
                                console.log('请求失败处理');
                             }
                           );

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    