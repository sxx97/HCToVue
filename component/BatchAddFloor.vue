
        <template>
            <div id="batchAddFloor" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">批量添加楼栋</h3>
                <div class="ibox-content">
                    <div>
                        <p style="color:red;">{{batchAddFloorInfo.errorInfo}}</p>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">楼栋开始编号</label>
                                <div class="col-sm-10"><input v-model="batchAddFloorInfo.startFloorNum" type="number"
                                                              placeholder="必填，请填写楼栋开始编号" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">楼栋结束编号</label>
                                <div class="col-sm-10"><input v-model="batchAddFloorInfo.endFloorNum" type="number"
                                                              placeholder="必填，请填写楼栋结束编号" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10"><textarea cols="5" v-model="batchAddFloorInfo.remark" type="tel"
                                                              placeholder="可填，请填写备注" class="form-control"></textarea></div>
                            </div>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="batchSaveFloorInfo()">
                                    <i class="fa fa-check"></i>&nbsp;批量生成
                                </button>
                                <button type="button" class="btn btn-warning float-right" style="margin-right:20px;"
                                        data-dismiss="modal">取消
                                </button>
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
            props: {"callBackListener":"true","callBackFunction":"true"},
            components: {
                
            },
            data () {
                return {"batchAddFloorInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
            this.$vc.on('batchAddFloor','openBatchAddFloorModal',function(){
                $('#batchAddFloor').modal('show');
            });
        })()   
            },
            methods: {
                batchAddFloorValidate(){
                return this.$vc.validate.validate({
                    batchAddFloorInfo:this.batchAddFloorInfo
                },{
                    'batchAddFloorInfo.startFloorNum':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"楼开始编号不能为空"
                        },
                         {
                            limit:"num",
                            param:"",
                            errInfo:"楼开始编号不是有效的数字"
                        },
                    ],
                    'batchAddFloorInfo.endFloorNum':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"楼结束编号不能为空"
                        },
                        {
                            limit:"num",
                            param:"",
                            errInfo:"楼结束编号不是有效的数字"
                        },
                    ],
                    'batchAddFloorInfo.remark':[

                        {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"备注长度不能超过200位"
                        }
                    ]

                });
            },batchSaveFloorInfo:function(){
                if(!this.batchAddFloorValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return ;
                }

                if(parseInt(this.batchAddFloorInfo.endFloorNum) <= parseInt(this.batchAddFloorInfo.startFloorNum)){
                    this.$vc.message('结束楼栋编号不能小于等于开始楼栋编号');
                    return;
                }


                if(this.batchAddFloorInfo.endFloorNum - this.batchAddFloorInfo.startFloorNum > 50){
                    this.$vc.message('一次批量生成不能超过50栋楼');
                    return;
                }


                this.batchAddFloorInfo.communityId = this.$vc.getCurrentCommunity().communityId;

                //不提交数据将数据 回调给侦听处理
                if(this.$vc.notNull(this.$vc._thiscallBackListener)){
                    this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.batchAddFloorInfo);
                    $('#batchAddFloorModel').modal('hide');
                    return ;
                }

                this.$vc.http.post(
                    'batchAddFloor',
                    'saveFloor',
                    JSON.stringify(this.batchAddFloorInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#batchAddFloor').modal('hide');
                            this.clearBatchAddFloorInfo();
                            this.$vc.emit('listFloor','listFloorData',{});
                            var resultInfo = JSON.parse(json);
                            this.$vc.message("楼栋成功生成"+resultInfo.successFloorCount+"，失败"+resultInfo.failFloorCount)
                            return ;
                        }
                        this.batchAddFloorInfo.errorInfo = json;

                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.batchAddFloorInfo.errorInfo = errInfo;

                     });
            },clearBatchAddFloorInfo:function(){
                this.batchAddFloorInfo = {
                                           startFloorNum:'',
                                           endFloorNum:'',
                                           remark:'',
                                           errorInfo:''
                                        };
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    