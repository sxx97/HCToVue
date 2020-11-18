
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>停车位信息</h5>
                <div class="ibox-tools" style="top:10px;" v-if="parkingSpaceInfo.parkingSpaceFlag == ''">
                    <button type="button" class="btn btn-primary btn-sm" v-on:click="openSearchParkingSpaceModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择车位</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >车位ID：</label>
                            <label class="">{{parkingSpaceInfo.psId}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">编号：</label>
                            <label class="">{{parkingSpaceInfo.num}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >停车场：</label>
                            <label class="">{{parkingSpaceInfo.areaNum}}</label>
                        </div>
                    </div>


                </div>

                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >车位状态：</label>
                            <label class="">{{parkingSpaceInfo.stateName}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >面积：</label>
                            <label class="">{{parkingSpaceInfo.area}}平方米</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">备注：</label>
                            <label class="">{{parkingSpaceInfo.remark}}</label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <vc:create name="searchParkingSpace"
               emitChooseParkingSpace="viewSelectParkingSpace"
               emitLoadData="sellRoomOther"
               parkingSpaceFlag="F"
    ></vc:create>
</div>
        </template>
        <script>
            
        export default {
            props: {"callBackComponent":"false","callBackFunction":"false"},
            components: {
                
            },
            data () {
                return {"parkingSpaceInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            //根据请求参数查询 查询 业主信息
            this.loadParkingSpaceData();
        })()(function(){
            this.$vc.on('viewSelectParkingSpace','chooseParkingSpace',function(_parkingSpace){
                this.$vc.copyObject(_parkingSpace, this.parkingSpaceInfo);
                this.$vc.emit(this.$vc._thiscallBackComponent,this.$vc._thiscallBackFunction,this.parkingSpaceInfo);
                this.$vc.emit('hireParkingSpaceFee', 'parkingSpaceInfo',this.parkingSpaceInfo);
                this.$vc.emit('sellParkingSpaceFee', 'parkingSpaceInfo',this.parkingSpaceInfo);
            });

        })()   
            },
            methods: {
                openSearchParkingSpaceModel(){
                this.$vc.emit('searchParkingSpace','openSearchParkingSpaceModel',{});
            },loadParkingSpaceData:function(){

               this.parkingSpaceInfo.psId = this.$vc.getParam("psId");
               this.parkingSpaceInfo.num = this.$vc.getParam("num");
               this.parkingSpaceInfo.area = this.$vc.getParam("area");
               this.parkingSpaceInfo.state = this.$vc.getParam("state");
               this.parkingSpaceInfo.areaNum = this.$vc.getParam("areaNum");
               this.parkingSpaceInfo.typeCd = this.$vc.getParam("typeCd");
               if(this.$vc.notNull(this.$vc.getParam("psId"))){
                   this.parkingSpaceInfo.parkingSpaceFlag='ParkingSpace';
                   this.$vc.emit('hireParkingSpaceFee', 'parkingSpaceInfo',this.parkingSpaceInfo);
                   this.$vc.emit('sellParkingSpaceFee', 'parkingSpaceInfo',this.parkingSpaceInfo);
               }
               if(this.parkingSpaceInfo.psId != ''){
                  this.$vc.emit(this.$vc._thiscallBackComponent,'notify',this.parkingSpaceInfo);
               }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    