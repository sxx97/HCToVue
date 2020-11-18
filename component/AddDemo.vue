
        <template>
            <div id = "addDemoModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加用例</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">用例名称</label>
                                <div class="col-sm-10"><input v-model="addDemoInfo.demoName" type="text" placeholder="必填，请填写用例名称" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">用例值</label>
                                <div class="col-sm-10"><input v-model="addDemoInfo.demoValue" type="text" placeholder="必填，请填写用例值" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10"><input v-model="addDemoInfo.demoRemark" type="text" placeholder="可填，请填写用例备注" class="form-control"></div>
                            </div>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="saveDemoInfo()" ><i class="fa fa-check"></i>&nbsp;保存</button>
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
                return {"addDemoInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
            this.$vc.on('addDemo','openAddDemoModal',function(){
                $('#addDemoModel').modal('show');
            });
        })()   
            },
            methods: {
                addDemoValidate(){
                return this.$vc.validate.validate({
                    addDemoInfo:this.addDemoInfo
                },{
                    'addDemoInfo.demoName':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"名称不能为空"
                        },
                        {
                            limit:"maxin",
                            param:"2,20",
                            errInfo:"名称长度必须在2位至10位"
                        },
                    ],
                    'addDemoInfo.demoValue':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"值不能为空"
                        },
                        {
                            limit:"maxin",
                            param:"2,20",
                            errInfo:"描述不能为空"
                        },
                    ],
                    'addDemoInfo.demoRemark':[

                        {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"备注长度不能超过200位"
                        }
                    ]

                });
            },saveDemoInfo:function(){
                if(!this.addDemoValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return ;
                }
                this.$vc.http.post(
                    'addDemo',
                    'saveDemo',
                    JSON.stringify(this.addDemoInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#addDemoModel').modal('hide');
                            this.clearAddFloorInfo();
                            this.$vc.emit('listDemo','listDemoData',{});

                            return ;
                        }
                        this.addFloorInfo.errorInfo = json;

                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.addFloorInfo.errorInfo = errInfo;

                     });
            },clearAddFloorInfo:function(){
                this.addFloorInfo = {
                                            name:'',
                                            floorNum:'',
                                            remark:'',
                                            errorInfo:''
                                        };
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    