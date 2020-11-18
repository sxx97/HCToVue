
        <template>
            <div class="modal fade" id="deleteBusinessTypeModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>您确定要删除吗?请再三考虑下呢!</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" >点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="deleteBusinessType()">确认删除</button>
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
                return {"viewBasePrivilegeInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            //根据请求参数查询 查询 业主信息
            this._loadBasePrivilegeInfoData();
        })()(function(){
            this.$vc.on('viewBasePrivilegeInfo','chooseBasePrivilege',function(_app){
                this.$vc.copyObject(_app, this.viewBasePrivilegeInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewBasePrivilegeInfo);
            });

            this.$vc.on('viewBasePrivilegeInfo', 'onIndex', function(_index){
                this.viewBasePrivilegeInfo.index = _index;
            });

        })()   
            },
            methods: {
                _openSelectBasePrivilegeInfoModel(){
                this.$vc.emit('chooseBasePrivilege','openChooseBasePrivilegeModel',{});
            },_openAddBasePrivilegeInfoModel(){
                this.$vc.emit('addBasePrivilege','openAddBasePrivilegeModal',{});
            },_loadBasePrivilegeInfoData:function(){

            },
            },
        }
    
        </script>
        <style>
            
        </style>
    