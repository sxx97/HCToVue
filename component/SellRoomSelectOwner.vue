
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>业主信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" class="btn btn-primary btn-sm" v-on:click="openSearchOwnerModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择业主</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <!--<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >业主ID：</label>
                            <label class="">{{ownerInfo.ownerId}}</label>
                        </div>
                    </div>-->
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">名称：</label>
                            <label class="">{{ownerInfo.name}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >性别：</label>
                            <label class="">{{ownerInfo.sex == 0 ? '男' : '女'}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >联系方式：</label>
                            <label class="">{{ownerInfo.link}}</label>
                        </div>
                    </div>

                </div>

                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >年龄：</label>
                            <label class="">{{ownerInfo.age}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">创建员工：</label>
                            <label class="">{{ownerInfo.userName}}</label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <vc:create name="searchOwner"
               emitChooseOwner="sellRoomSelectOwner"
               emitLoadData="sellRoomOther"
    ></vc:create>
</div>
        </template>
        <script>
            
        export default {
            props: {"callBackComponent":"true"},
            components: {
                
            },
            data () {
                return {"ownerInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            //根据请求参数查询 查询 业主信息
            this.loadOwnerData();
        })()(function(){
            this.$vc.on('sellRoomSelectOwner','chooseOwner',function(_owner){
                this.ownerInfo = _owner;
                this.$vc.emit(this.$vc._thiscallBackComponent,'notify',_owner);
            });

        })()   
            },
            methods: {
                openSearchOwnerModel(){
                this.$vc.emit('searchOwner','openSearchOwnerModel',{});
            },loadOwnerData:function(){
               this.ownerInfo.ownerId = this.$vc.getParam("ownerId");
               this.ownerInfo.name = this.$vc.getParam("name");
               this.ownerInfo.age = this.$vc.getParam("age");
               this.ownerInfo.sex = this.$vc.getParam("sex");
               this.ownerInfo.userName = this.$vc.getParam("userName");
               this.ownerInfo.link = this.$vc.getParam("link");

               if(this.ownerInfo.ownerId != ''){
                  this.$vc.emit(this.$vc._thiscallBackComponent,'notify',this.ownerInfo);
               }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    