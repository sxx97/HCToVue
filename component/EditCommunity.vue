
        <template>
            <div id = "editCommunityModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改写字楼</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
         <label class="col-sm-2 col-form-label">写字楼名称</label>
         <div class="col-sm-10">
           <input v-model="editCommunityInfo.name"                   type="text" placeholder="必填，请填写写字楼名称" class="form-control">
         </div>
</div>
<div class="form-group row">
         <label class="col-sm-2 col-form-label">写字楼地址</label>
         <div class="col-sm-10">
           <input v-model="editCommunityInfo.address"                   type="text" placeholder="必填，请填写写字楼地址" class="form-control">
         </div>
</div>
<div class="form-group row">
         <label class="col-sm-2 col-form-label">附近地标</label>
         <div class="col-sm-10">
           <input v-model="editCommunityInfo.nearbyLandmarks"                   type="text" placeholder="必填，请填写附近地标" class="form-control">
         </div>
</div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="editCommunity()" ><i class="fa fa-check"></i>&nbsp;保存</button>
                                <button type="button" class="btn btn-warning float-right" style="margin-right:20px;" data-dismiss="modal">取消</button>
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
                props: {},
                components: {
                    
                },
                data () {
                    return {"editCommunityInfo":{"communityId":"","name":"","address":"","nearbyLandmarks":"","cityCode":"","mapX":"101.33","mapY":"101.33"}}    
                },
                mounted() {
                (() => {

})()
(() => {
            this.$vc.on('editCommunity', 'openEditCommunityModal',
            (_params) => {
                this.refreshEditCommunityInfo();
                $('#editCommunityModel').modal('show');
                this.editCommunityInfo = _params;
                //this.editCommunityInfo.communityId = this.$vc.getCurrentCommunity().communityId;
            });
        })()   
                },
                methods: {
                    editCommunityValidate:function() {
                return this.$vc.validate.validate({
                    editCommunityInfo: this.editCommunityInfo
                },
                {
                    'editCommunityInfo.name': [{
                        limit: "required",
                        param: "",
                        errInfo: "写字楼名称不能为空"
                    },
                    {
                        limit: "maxin",
                        param: "4,20",
                        errInfo: "写字楼名称必须在4至20字符之间"
                    },
                    ],
                    'editCommunityInfo.address': [{
                        limit: "required",
                        param: "",
                        errInfo: "写字楼地址不能为空"
                    },
                    {
                        limit: "maxLength",
                        param: "200",
                        errInfo: "写字楼地址不能大于200个字符"
                    },
                    ],
                    'editCommunityInfo.nearbyLandmarks': [{
                        limit: "required",
                        param: "",
                        errInfo: "附近地标不能为空"
                    },
                    {
                        limit: "maxLength",
                        param: "50",
                        errInfo: "写字楼附近地标不能大于50个字符"
                    },
                    ],
                    'editCommunityInfo.cityCode': [{
                        limit: "maxLength",
                        param: "12",
                        errInfo: "写字楼城市编码不能大于4个字符"
                    },
                    ],
                    'editCommunityInfo.mapX': [{
                        limit: "maxLength",
                        param: "20",
                        errInfo: "写字楼城市编码不能大于4个字符"
                    },
                    ],
                    'editCommunityInfo.mapY': [{
                        limit: "maxLength",
                        param: "20",
                        errInfo: "写字楼城市编码不能大于4个字符"
                    },
                    ],
                    'editCommunityInfo.communityId': [{
                        limit: "required",
                        param: "",
                        errInfo: "写字楼ID不能为空"
                    }]

                });
            },editCommunity:function() {
                if (!this.editCommunityValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }

                this.$vc.http.post('editCommunity', 'update', JSON.stringify(this.editCommunityInfo), {
                    emulateJSON: true
                },
                (json, res) => {
                    //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                    if (res.status == 200) {
                        //关闭model
                        $('#editCommunityModel').modal('hide');
                        this.$vc.emit('communityManage', 'listCommunity', {});
                        return;
                    }
                    this.$vc.message(json);
                },
                (errInfo, error) => {
                    console.log('请求失败处理');

                    this.$vc.message(errInfo);
                });
            },refreshEditCommunityInfo:function() {
                this.editCommunityInfo = {
                    communityId: '',
                    name: '',
                    address: '',
                    nearbyLandmarks: '',
                    cityCode: '',
                    mapX: '101.33',
                    mapY: '101.33',

                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    