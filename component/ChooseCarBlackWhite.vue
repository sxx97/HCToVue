
        <template>
            <div id = "chooseCarBlackWhiteModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseCarBlackWhiteModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseCarBlackWhiteModelLabel">选择黑白名单</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class=" row">
                    <div class="col-lg-12">
                        <div class="ibox ">
                            <div class="row">

                                <div class="col-sm-7 m-b-xs">
                                </div>
                                <div class="col-sm-5">
                                    <div class="input-group">
                                        <input placeholder="输入黑白名单名称" type="text" v-model="chooseCarBlackWhiteInfo._currentCarBlackWhiteName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryCarBlackWhites()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                                                        <!--<th class="text-center">黑白名单ID</th>-->
                            <th class="text-center">名单类型</th>
                            <th class="text-center">车牌号</th>
                            <th class="text-center">开始时间</th>
                            <th class="text-center">结束时间</th>
                            <th class="text-center">操作</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="carBlackWhite in chooseCarBlackWhiteInfo.carBlackWhites">
                                                                        <!--<td class="text-center">{{carBlackWhite.bwId}}</td>-->
                            <td class="text-center">{{carBlackWhite.blackWhite}}</td>
                            <td class="text-center">{{carBlackWhite.carNum}}</td>
                            <td class="text-center">{{carBlackWhite.startTime}}</td>
                            <td class="text-center">{{carBlackWhite.endTime}}</td>

                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseCarBlackWhite(carBlackWhite)">选择</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
                props: {"emitChooseCarBlackWhite":"true","emitLoadData":"true"},
                components: {
                    
                },
                data () {
                    return {"chooseCarBlackWhiteInfo":{"carBlackWhites":[],"_currentCarBlackWhiteName":""}}    
                },
                mounted() {
                (() =>{
        })()
(() =>{
            this.$vc.on('chooseCarBlackWhite','openChooseCarBlackWhiteModel',(_param) =>{
                $('#chooseCarBlackWhiteModel').modal('show');
                this._refreshChooseCarBlackWhiteInfo();
                this._loadAllCarBlackWhiteInfo(1,10,'');
            });
        })()   
                },
                methods: {
                    _loadAllCarBlackWhiteInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseCarBlackWhite',
                            'list',
                             param,
                             (json) =>{
                                var _carBlackWhiteInfo = JSON.parse(json);
                                this.chooseCarBlackWhiteInfo.carBlackWhites = _carBlackWhiteInfo.carBlackWhites;
                             },() =>{
                                console.log('请求失败处理');
                             }
                           );
            },chooseCarBlackWhite:function(_carBlackWhite){
                if(_carBlackWhite.hasOwnProperty('name')){
                     _carBlackWhite.carBlackWhiteName = _carBlackWhite.name;
                }
                this.$vc.emit(this.$vc._thisemitChooseCarBlackWhite,'chooseCarBlackWhite',_carBlackWhite);
                this.$vc.emit(this.$vc._thisemitLoadData,'listCarBlackWhiteData',{
                    carBlackWhiteId:_carBlackWhite.carBlackWhiteId
                });
                $('#chooseCarBlackWhiteModel').modal('hide');
            },queryCarBlackWhites:function(){
                this._loadAllCarBlackWhiteInfo(1,10,this.chooseCarBlackWhiteInfo._currentCarBlackWhiteName);
            },_refreshChooseCarBlackWhiteInfo:function(){
                this.chooseCarBlackWhiteInfo._currentCarBlackWhiteName = "";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    