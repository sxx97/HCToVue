
        <template>
            <div class="modal fade" id="machineStateModel" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>确定{{machineStateInfo.stateName}}设备</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="_closeMachineStateModel()">点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="_changeMachineState()">确认</button>
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
                return {"machineStateInfo":"[object Object]"}    
            },
            mounted() {
             (function () {

        })()(function () {
            this.$vc.on('machineState', 'openMachineStateModal', function (_params) {
                this.$vc.copyObject(_params, this.machineStateInfo);
                $('#machineStateModel').modal('show');

            });
        })()   
            },
            methods: {
                _changeMachineState:function () {
                this.machineStateInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                this.$vc.http.post(
                    'machineState',
                    'update',
                    JSON.stringify(this.machineStateInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#machineStateModel').modal('hide');
                            this.$vc.emit('machineManage', 'listMachine', {});
                            return;
                        }
                        this.$vc.message(json);
                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');
                        this.$vc.message(json);

                    });
            },_closeMachineStateModel:function () {
                $('#machineStateModel').modal('hide');
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    