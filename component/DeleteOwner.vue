
        <template>
            <div class="modal fade" id="deleteOwnerModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                <button type="button" class="btn btn-primary" v-on:click="deleteOwner()">确认删除</button>
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
                return {"auditAppUserBindingOwnerManageInfo":"[object Object]","ownerTypeText":"[object Object]","auditStateName":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._listAuditAppUserBindingOwners(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function(){
            
            this.$vc.on('auditAppUserBindingOwnerManage','listAuditAppUserBindingOwner',function(_param){
                  this._listAuditAppUserBindingOwners(DEFAULT_PAGE, DEFAULT_ROWS);
            });

             this.$vc.on('auditAppUserBindingOwnerManage', 'auditMessage', function (_auditInfo) {
                this._auditAppUserBindingOwner(_auditInfo);
            });
             this.$vc.on('pagination','page_event',function(_currentPage){
                this._listAuditAppUserBindingOwners(_currentPage,DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listAuditAppUserBindingOwners:function(_page, _rows){

                this.auditAppUserBindingOwnerManageInfo.conditions.page = _page;
                this.auditAppUserBindingOwnerManageInfo.conditions.row = _rows;
                this.auditAppUserBindingOwnerManageInfo.conditions.states = "10000,12000,13000";
                this.auditAppUserBindingOwnerManageInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params:this.auditAppUserBindingOwnerManageInfo.conditions
               };

               //发送get请求
               this.$vc.http.get('auditAppUserBindingOwnerManage',
                            'list',
                             param,
                             function(json,res){
                                var _auditAppUserBindingOwnerManageInfo=JSON.parse(json);
                                this.auditAppUserBindingOwnerManageInfo.total = _auditAppUserBindingOwnerManageInfo.total;
                                this.auditAppUserBindingOwnerManageInfo.records = _auditAppUserBindingOwnerManageInfo.records;
                                this.auditAppUserBindingOwnerManageInfo.auditAppUserBindingOwners = _auditAppUserBindingOwnerManageInfo.auditAppUserBindingOwners;
                                this.$vc.emit('pagination','init',{
                                     total:this.auditAppUserBindingOwnerManageInfo.records,
                                     currentPage:_page
                                 });
                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );
            },_openAuditAppUserBindingOwnerModel:function(_auditAppUserBindingOwner){
                this.auditAppUserBindingOwnerManageInfo.currentAppUserId = _auditAppUserBindingOwner.appUserId;
                this.$vc.emit('audit', 'openAuditModal', {});
            },_auditAppUserBindingOwner:function (_auditInfo) {
                _auditInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                _auditInfo.appUserId = this.auditAppUserBindingOwnerManageInfo.currentAppUserId;
                //发送get请求
                this.$vc.http.post('auditAppUserBindingOwnerManage',
                    'audit',
                    JSON.stringify(_auditInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        this.$vc.message("处理成功", true);
                        this._listAuditAppUserBindingOwners(DEFAULT_PAGE, DEFAULT_ROWS);
                    }, function (errInfo, error) {
                        console.log('请求失败处理');
                        this.$vc.message("处理失败：" + errInfo);
                    }
                );
            },_moreCondition:function(){
                if(this.auditAppUserBindingOwnerManageInfo.moreCondition){
                    this.auditAppUserBindingOwnerManageInfo.moreCondition = false;
                }else{
                    this.auditAppUserBindingOwnerManageInfo.moreCondition = true;
                }
            },_queryAuditAppUserBindingOwnerMethod:function () {
                this._listAuditAppUserBindingOwners(DEFAULT_PAGE, DEFAULT_ROWS);
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    