
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
            props: {},
            components: {
                
            },
            data () {
                return {"editFloorInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
            this.$vc.on('editFloor','openEditFloorModal',function(_floor){
                this.editFloorInfo.errorInfo="";
                this.$vc.copyObject(_floor,this.editFloorInfo);
                $('#editFloorModel').modal('show');
            });
        })()   
            },
            methods: {
                editFloorValidate(){
                return this.$vc.validate.validate({
                    editFloorInfo:this.editFloorInfo
                },{
                    'editFloorInfo.floorName':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"楼名称不能为空"
                        },
                        {
                            limit:"maxin",
                            param:"2,10",
                            errInfo:"楼名称长度必须在2位至10位"
                        },
                    ],

                    'editFloorInfo.remark':[

                        {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"备注长度不能超过200位"
                        }
                    ]

                });
            },editFloorMethod:function(){

                if(!this.editFloorValidate()){
                    this.editFloorInfo.errorInfo = this.$vc.validate.errInfo;
                    return ;
                }

                this.editFloorInfo.errorInfo = "";
                this.addFloorInfo.cityAddress = this.$vc.getCurrentCommunity().address.split('区')[0]+'区';
                this.addFloorInfo.cityCode = this.$vc.getCurrentCommunity().cityCode;
                this.editFloorInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                this.$vc.http.post(
                    'editFloor',
                    'changeFloor',
                    JSON.stringify(this.editFloorInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#editFloorModel').modal('hide');
                            this.clearEditFloorInfo();
                            this.$vc.emit('listFloor','listFloorData',{});

                            return ;
                        }
                        this.editFloorInfo.errorInfo = json;

                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.editFloorInfo.errorInfo = errInfo;

                     });
            },clearEditFloorInfo:function(){
                this.editFloorInfo = {
                                            floorId:'',
                                            floorName:'',
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
    