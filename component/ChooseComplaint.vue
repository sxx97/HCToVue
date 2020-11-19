
        <template>
            <div id = "chooseComplaintModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseComplaintModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseComplaintModelLabel">选择投诉建议</h3>
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
                                        <input placeholder="输入投诉建议名称" type="text" v-model="chooseComplaintInfo._currentComplaintName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryComplaints()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                                                        <!--<th class="text-center">投诉ID</th>-->
                            <th class="text-center">商户ID</th>
                            <th class="text-center">投诉类型</th>
                            <th class="text-center">房间编号</th>
                            <th class="text-center">投诉人</th>
                            <th class="text-center">投诉电话</th>
                            <th class="text-center">投诉状态</th>
                            <th class="text-center">投诉内容</th>
                            <th class="text-center">操作</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="complaint in chooseComplaintInfo.complaints">
                                                                        <!--<td class="text-center">{{complaint.complaintId}}</td>-->
                            <td class="text-center">{{complaint.storeId}}</td>
                            <td class="text-center">{{complaint.typeCd}}</td>
                            <td class="text-center">{{complaint.roomId}}</td>
                            <td class="text-center">{{complaint.complaintName}}</td>
                            <td class="text-center">{{complaint.tel}}</td>
                            <td class="text-center">{{complaint.state}}</td>
                            <td class="text-center">{{complaint.context}}</td>

                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseComplaint(complaint)">选择</button>
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
                props: {"emitChooseComplaint":"true","emitLoadData":"true"},
                components: {
                    
                },
                data () {
                    return {"chooseComplaintInfo":{"complaints":[],"_currentComplaintName":""}}    
                },
                mounted() {
                (() =>{
        })()
(() =>{
            this.$vc.on('chooseComplaint','openChooseComplaintModel',(_param) =>{
                $('#chooseComplaintModel').modal('show');
                this._refreshChooseComplaintInfo();
                this._loadAllComplaintInfo(1,10,'');
            });
        })()   
                },
                methods: {
                    _loadAllComplaintInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseComplaint',
                            'list',
                             param,
                             (json) =>{
                                var _complaintInfo = JSON.parse(json);
                                this.chooseComplaintInfo.complaints = _complaintInfo.complaints;
                             },() =>{
                                console.log('请求失败处理');
                             }
                           );
            },chooseComplaint:function(_complaint){
                if(_complaint.hasOwnProperty('name')){
                     _complaint.complaintName = _complaint.name;
                }
                this.$vc.emit(this.$vc._thisemitChooseComplaint,'chooseComplaint',_complaint);
                this.$vc.emit(this.$vc._thisemitLoadData,'listComplaintData',{
                    complaintId:_complaint.complaintId
                });
                $('#chooseComplaintModel').modal('hide');
            },queryComplaints:function(){
                this._loadAllComplaintInfo(1,10,this.chooseComplaintInfo._currentComplaintName);
            },_refreshChooseComplaintInfo:function(){
                this.chooseComplaintInfo._currentComplaintName = "";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    