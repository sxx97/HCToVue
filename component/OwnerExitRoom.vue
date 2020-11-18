
        <template>
            <div class="modal fade" id="exitRoomModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>确认是否解绑房间，解绑后可再次绑定</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" >点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="doOwnerExitRoom()">确认解绑</button>
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
                return {"memberInfo":"[object Object]"}    
            },
            mounted() {
             (_initMethod() {

        })()(_initEvent() {
            this.$vc.on('listOwnerMember','loadOwner',function(_param){
                this._loadOwners(_param);
            });
            this.$vc.on('listOwnerMember','listOwnerData',function(_param){
                this._loadOwners(_param);
            });
        })()   
            },
            methods: {
                saveRFID(owner) {
                this.$vc.http.post('editOwner', 'changeOwner',
                    JSON.stringify({
                        communityId: this.$vc.getCurrentCommunity().communityId,
                        ...owner,
                        passageWayRfidCardMeterial: document.getElementsByClassName('rfid'+owner.memberId)[0].value,
                        passageWayHumanFaceEnable: 1,
                        passageWayRfidCardEnable: 1,
                    }),
                    {
                        emulateJSON: true
                    },
                    function(resText, res){
                        if (res.body instanceof Array) {
                            return ;
                        }
                        this.$vc.toast(resText);
                    },
                    function(errText, err) {
                        this.$vc.toast(errText);
                    }
                )
            },_loadOwners:function(_param){
                let ownerIds = _param.ownerId;
                /*if(_param.hasOwnProperty('ownerId')){
                    this.memberInfo._currentOwnerId= _param.ownerId;
                }*/
                this.memberInfo._currentOwnerId = _param.ownerId;
                this.memberInfo._currentMemberId = _param.memberId;
                if (_param.memberId !==  _param.ownerId) {
                    ownerIds = _param.ownerId + ',' + _param.memberId;
                }
                var param = {
                    params:{
                        ownerIds: ownerIds,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                    }
                };
                //发送get请求
                this.$vc.http.get('listOwnerMember',
                    'list',
                    param,
                    function(json){
                        var _memberInfo = JSON.parse(json);
                        this.memberInfo.members = _memberInfo.owners;

                    },function(){
                        console.log('请求失败处理');
                    });
            },_openDeleteOwnerModel:function(_member){
                _member.ownerId = this.memberInfo._currentOwnerId;
                this.$vc.emit('deleteOwner','openOwnerModel',_member);
            },_openEditOwnerModel:function(_member){
                _member.ownerId = this.memberInfo._currentOwnerId;
                this.$vc.emit('editOwner','openEditOwnerModal',_member);
            },changeLongVisitorsState(owner) {
                if (owner.passageWayLongTermEffective == 1) {
                    owner.passageWayLongTermEffective = 0;
                } else {
                    owner.passageWayLongTermEffective = 1;
                }
                owner.communityId = this.$vc.getCurrentCommunity().communityId;
                this.$vc.http.post('editOwner', 'changeOwner',
                    JSON.stringify(owner),
                    {
                        emulateJSON:true
                    },
                    (resText, res) => {
                        // this.$vc.toast(resText);
                        this._loadOwners({
                            'ownerId': this._currentOwnerId,
                            'memberId': this._currentMemberId,
                        });
                    },
                    (errText, err) => {
                        // this.$vc.toast(errText);
                })
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    