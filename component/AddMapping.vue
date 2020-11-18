
        <template>
            <div id = "addMappingModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加编码映射</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <!--<div class="form-group row">
                                <label class="col-sm-2 col-form-label">楼名称</label>
                                <div class="col-sm-10"><input v-model="addFloorInfo.name" type="text" placeholder="必填，请填写名称" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">楼编号</label>
                                <div class="col-sm-10"><input v-model="addFloorInfo.floorNum" type="email" placeholder="必填，请填写编号" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10"><input v-model="addFloorInfo.remark" type="tel" placeholder="可填，请填写备注" class="form-control"></div>
                            </div>-->

                            <div class="form-group row">
         <label class="col-sm-2 col-form-label">域</label>
         <div class="col-sm-10">
           <input v-model="addMappingInfo.domain"                   type="text" placeholder="必填，请填写域" class="form-control">
         </div>
</div>
<div class="form-group row">
         <label class="col-sm-2 col-form-label">名称</label>
         <div class="col-sm-10">
           <input v-model="addMappingInfo.name"                   type="text" placeholder="必填，请填写名称" class="form-control">
         </div>
</div>
<div class="form-group row">
         <label class="col-sm-2 col-form-label">键</label>
         <div class="col-sm-10">
           <input v-model="addMappingInfo.key"                   type="text" placeholder="必填，请填写键" class="form-control">
         </div>
</div>
<div class="form-group row">
         <label class="col-sm-2 col-form-label">值</label>
         <div class="col-sm-10">
           <input v-model="addMappingInfo.value"                   type="text" placeholder="必填，请填写值" class="form-control">
         </div>
</div>
<div class="form-group row">
         <label class="col-sm-2 col-form-label">备注</label>
         <div class="col-sm-10">
<textarea  placeholder="选填，请填写备注" class="form-control" v-model="addMappingInfo.remark"></textarea>         </div>
</div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="saveMappingInfo()" ><i class="fa fa-check"></i>&nbsp;保存</button>
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
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"addMappingInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
            this.$vc.on('addMapping','openAddMappingModal',function(){
                $('#addMappingModel').modal('show');
            });
        })()   
            },
            methods: {
                addMappingValidate(){
                return this.$vc.validate.validate({
                    addMappingInfo:this.addMappingInfo
                },{
                    'addMappingInfo.domain':[
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
'addMappingInfo.name':[
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
'addMappingInfo.key':[
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
'addMappingInfo.value':[
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
'addMappingInfo.remark':[
 {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"备注内容不能超过200"
                        },
                    ],




                });
            },saveMappingInfo:function(){
                if(!this.addMappingValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return ;
                }

                //this.addMappingInfo.communityId = this.$vc.getCurrentCommunity().communityId;

                this.$vc.http.post(
                    'addMapping',
                    'save',
                    JSON.stringify(this.addMappingInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#addMappingModel').modal('hide');
                            this.clearAddMappingInfo();
                            this.$vc.emit('mappingManage','listMapping',{});

                            return ;
                        }
                        this.$vc.message(json);

                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                     });
            },clearAddMappingInfo:function(){
                this.addMappingInfo = {
                                            domain:'DOMAIN.COMMON',
name:'',
key:'',
value:'',
remark:'',

                                        };
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    