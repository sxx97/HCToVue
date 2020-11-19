
        <template>
            <div id = "editMappingModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改编码映射</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
         <label class="col-sm-2 col-form-label">域</label>
         <div class="col-sm-10">
           <input v-model="editMappingInfo.domain"                   type="text" placeholder="必填，请填写域" class="form-control">
         </div>
</div>
<div class="form-group row">
         <label class="col-sm-2 col-form-label">名称</label>
         <div class="col-sm-10">
           <input v-model="editMappingInfo.name"                   type="text" placeholder="必填，请填写名称" class="form-control">
         </div>
</div>
<div class="form-group row">
         <label class="col-sm-2 col-form-label">键</label>
         <div class="col-sm-10">
           <input v-model="editMappingInfo.key"                   type="text" placeholder="必填，请填写键" class="form-control">
         </div>
</div>
<div class="form-group row">
         <label class="col-sm-2 col-form-label">值</label>
         <div class="col-sm-10">
           <input v-model="editMappingInfo.value"                   type="text" placeholder="必填，请填写值" class="form-control">
         </div>
</div>
<div class="form-group row">
         <label class="col-sm-2 col-form-label">备注</label>
         <div class="col-sm-10">
<textarea  placeholder="选填，请填写备注" class="form-control" v-model="editMappingInfo.remark"></textarea>         </div>
</div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="editMapping()" ><i class="fa fa-check"></i>&nbsp;保存</button>
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
                    return {"editMappingInfo":{"id":"","domain":"DOMAIN.COMMON","name":"","key":"","value":"","remark":""}}    
                },
                mounted() {
                (() =>{

         })()
(() =>{
             this.$vc.on('editMapping','openEditMappingModal',(_params) =>{
                this.refreshEditMappingInfo();
                $('#editMappingModel').modal('show');
                this.$vc.copyObject(_params, this.editMappingInfo );
               // this.editMappingInfo.communityId = this.$vc.getCurrentCommunity().communityId;
            });
        })()   
                },
                methods: {
                    editMappingValidate:function(){
                        return this.$vc.validate.validate({
                            editMappingInfo:this.editMappingInfo
                        },{
                            'editMappingInfo.domain':[
{
                            limit:"required",
                            param:"",
                            errInfo:"域不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"50",
                            errInfo:"域长度不能超过50"
                        },
                    ],
'editMappingInfo.name':[
{
                            limit:"required",
                            param:"",
                            errInfo:"名称不能为空"
                        },
 {
                            limit:"maxin",
                            param:"2,50",
                            errInfo:"名称必须在2至50字符之间"
                        },
                    ],
'editMappingInfo.key':[
{
                            limit:"required",
                            param:"",
                            errInfo:"键不能为空"
                        },
 {
                            limit:"maxin",
                            param:"1,100",
                            errInfo:"键必须在1至100之间"
                        },
                    ],
'editMappingInfo.value':[
{
                            limit:"required",
                            param:"",
                            errInfo:"值不能为空"
                        },
 {
                            limit:"maxin",
                            param:"1,100",
                            errInfo:"值必须在1至100之间"
                        },
                    ],
'editMappingInfo.remark':[
 {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"备注内容不能超过200"
                        },
                    ],
'editMappingInfo.id':[
{
                            limit:"required",
                            param:"",
                            errInfo:"编码ID不能为空"
                        }]

                        });
             },editMapping:function(){
                if(!this.editMappingValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return ;
                }

                this.$vc.http.post(
                    'editMapping',
                    'update',
                    JSON.stringify(this.editMappingInfo),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#editMappingModel').modal('hide');
                             this.$vc.emit('mappingManage','listMapping',{});
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });
            },refreshEditMappingInfo:function(){
                this.editMappingInfo= {
                  id:'',
domain:'DOMAIN.COMMON',
name:'',
key:'',
value:'',
remark:'',

                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    