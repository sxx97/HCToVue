
        <template>
            <div class="modal fade" id="deleteRoomModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                <button type="button" class="btn btn-primary" v-on:click="deleteRoom()">确认删除</button>
            </div>
        </div>
    </div>
</div>
        </template>
        <script>
            
        export default {
            props: {"callBackListener":"false","callBackFunction":"false"},
            components: {
                
            },
            data () {
                return {"addRoomViewInfo":"[object Object]"}    
            },
            mounted() {
             (function() {

})()(function() {

            this.$vc.on('addRoomViewInfo', 'onIndex',
            function(_index) {
                this.addRoomViewInfo.index = _index;
            });
        })()   
            },
            methods: {
                addRoomValidate() {
                this.addRoomViewInfo.apartment = this.addRoomViewInfo.apartment1 + this.addRoomViewInfo.apartment2;
                return this.$vc.validate.validate({
                    addRoomViewInfo: this.addRoomViewInfo
                },
                {
                    'addRoomViewInfo.roomNum': [{
                        limit: "required",
                        param: "",
                        errInfo: "房间编号不能为空"
                    },
                    {
                        limit: "maxLength",
                        param: "12",
                        errInfo: "房间编号长度不能超过12位"
                    },
                    ],
                    'addRoomViewInfo.layer': [{
                        limit: "required",
                        param: "",
                        errInfo: "房间楼层不能为空"
                    },
                    {
                        limit: "num",
                        param: "",
                        errInfo: "房间楼层高度必须为数字"
                    },
                    ],
                    /*
                    TODO: 暂时隐藏功能
                    'addRoomViewInfo.apartment': [{
                        limit: "required",
                        param: "",
                        errInfo: "房间户型不能为空"
                    },
                    {
                        limit: "maxLength",
                        param: "50",
                        errInfo: "房间户型不能大于50"
                    },
                    ],*/
                    'addRoomViewInfo.builtUpArea': [{
                        limit: "required",
                        param: "",
                        errInfo: "建筑面积不能为空"
                    },
                    {
                        limit: "money",
                        param: "",
                        errInfo: "建筑面积错误，如 300.00"
                    },
                    ],
                    'addRoomViewInfo.state': [{
                        limit: "required",
                        param: "",
                        errInfo: "房间状态不能为空"
                    },
                    {
                        limit: "maxLength",
                        param: "12",
                        errInfo: "房间状态 不能超过12位"
                    },
                    ],
                    'addRoomViewInfo.remark': [{
                        limit: "maxLength",
                        param: "200",
                        errInfo: "备注内容不能超过200"
                    },
                    ],

                });
            },saveAddRoomInfo:function() {
                if (this.addRoomValidate()) {
                    //侦听回传
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.addRoomViewInfo);
                    return;
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    