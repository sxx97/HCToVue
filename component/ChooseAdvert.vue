
        <template>
            <div id = "chooseAdvertModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseAdvertModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseAdvertModelLabel">选择发布广告</h3>
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
                                        <input placeholder="输入发布广告名称" type="text" v-model="chooseAdvertInfo._currentAdvertName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryAdverts()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                                                        <th class="text-center">广告ID</th>
                            <th class="text-center">广告名称</th>
                            <th class="text-center">广告类型</th>
                            <th class="text-center">广告分类</th>
                            <th class="text-center">投放位置</th>
                            <th class="text-center">具体位置</th>
                            <th class="text-center">广告状态</th>
                            <th class="text-center">播放顺序</th>
                            <th class="text-center">投放时间</th>
                            <th class="text-center">结束时间</th>
                            <th class="text-center">操作</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="advert in chooseAdvertInfo.adverts">
                                                                        <td class="text-center">{{advert.advertId}}</td>
                            <td class="text-center">{{advert.adName}}</td>
                            <td class="text-center">{{advert.adTypeCd}}</td>
                            <td class="text-center">{{advert.classify}}</td>
                            <td class="text-center">{{advert.locationTypeCd}}</td>
                            <td class="text-center">{{advert.locationObjId}}</td>
                            <td class="text-center">{{advert.state}}</td>
                            <td class="text-center">{{advert.seq}}</td>
                            <td class="text-center">{{advert.startTime}}</td>
                            <td class="text-center">{{advert.endTime}}</td>

                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseAdvert(advert)">选择</button>
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
                props: {"emitChooseAdvert":"string","emitLoadData":"string"},
                components: {
                    
                },
                data () {
                    return {"chooseAdvertInfo":{"adverts":[],"_currentAdvertName":""}}    
                },
                mounted() {
                (() =>{
        })()
(() =>{
            this.$vc.on('chooseAdvert','openChooseAdvertModel',(_param) =>{
                $('#chooseAdvertModel').modal('show');
                this._refreshChooseAdvertInfo();
                this._loadAllAdvertInfo(1,10,'');
            });
        })()   
                },
                methods: {
                    _loadAllAdvertInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseAdvert',
                            'list',
                             param,
                             (json) =>{
                                var _advertInfo = JSON.parse(json);
                                this.chooseAdvertInfo.adverts = _advertInfo.adverts;
                             },() =>{
                                console.log('请求失败处理');
                             }
                           );
            },chooseAdvert:function(_advert){
                if(_advert.hasOwnProperty('name')){
                     _advert.advertName = _advert.name;
                }
                this.$vc.emit(this.$vc._thisemitChooseAdvert,'chooseAdvert',_advert);
                this.$vc.emit(this.$vc._thisemitLoadData,'listAdvertData',{
                    advertId:_advert.advertId
                });
                $('#chooseAdvertModel').modal('hide');
            },queryAdverts:function(){
                this._loadAllAdvertInfo(1,10,this.chooseAdvertInfo._currentAdvertName);
            },_refreshChooseAdvertInfo:function(){
                this.chooseAdvertInfo._currentAdvertName = "";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    