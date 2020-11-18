
        <template>
            <div class="modal fade" id="deleteFloorModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>确认是否删除!</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" >点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="deleteFloor()">确认删除</button>
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
    