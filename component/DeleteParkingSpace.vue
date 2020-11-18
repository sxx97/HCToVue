
        <template>
            <div class="modal fade" id="deleteParkingSpaceModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                <button type="button" class="btn btn-primary" v-on:click="deleteParkingSpace()">确认删除</button>
            </div>
        </div>
    </div>
</div>
        </template>
        <script>
            
        export default {
            props: {"notifyLoadDataComponentName":"false"},
            components: {
                
            },
            data () {
                return {"addParkingSpaceInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
         })()(function(){
            this.$vc.on('addParkingSpace','openAddParkingSpaceModal',function(_parkingSpaceId){
                if(_parkingSpaceId != null || _parkingSpaceId != -1){
                    this.addParkingSpaceInfo.parkingSpaceId = _parkingSpaceId;
                }
                $('#addParkingSpaceModel').modal('show');
            });

            this.$vc.on("addParkingSpace", "notify", function (_param) {
                    this.addParkingSpaceInfo.paId = _param.paId;
            });
        })()   
            },
            methods: {
                addParkingSpaceValidate(){
                return this.$vc.validate.validate({
                    addParkingSpaceInfo:this.addParkingSpaceInfo
                },{
                    'addParkingSpaceInfo.num':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"车位编号不能为空"
                        },
                        {
                            limit:"maxLength",
                            param:"12",
                            errInfo:"车位编号长度不能超过12位"
                        },
                    ],
                    'addParkingSpaceInfo.paId':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"停车场不能为空"
                        }
                    ],
                    'addParkingSpaceInfo.area':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"车位面积不能为空"
                        },
                        {
                            limit:"money",
                            param:"",
                            errInfo:"车位面积格式错误，如3.09"
                        }
                    ],
                    'addParkingSpaceInfo.remark':[

                        {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"备注长度不能超过200位"
                        }
                    ]

                });
            },saveParkingSpaceInfo:function(){
                if(!this.addParkingSpaceValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return ;
                }

                this.addParkingSpaceInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                this.$vc.http.post(
                    'addParkingSpace',
                    'saveParkingSpace',
                    JSON.stringify(this.addParkingSpaceInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#addParkingSpaceModel').modal('hide');
                            this.clearAddParkingSpaceInfo();
                            this.$vc.emit(this.$vc._thisnotifyLoadDataComponentName,'listParkingSpaceData',{});

                            return ;
                        }
                        this.$vc.message(json);

                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                     });
            },clearAddParkingSpaceInfo:function(){
                this.addParkingSpaceInfo = {
                    num:'',
                    paId:'',
                    area:'',
                    remark:''
                };

                this.$vc.emit('addParkingSpace', 'parkingAreaSelect2', 'setParkingArea', {
                    paId: '',
                    num: ''
                });
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    