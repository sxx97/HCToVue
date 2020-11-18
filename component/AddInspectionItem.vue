
        <template>
            <div id="addInspectionItemModel" class="modal fade" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加检查项</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">巡检点</label>
                                <div class="col-sm-10">
                                    <span>{{pointInfo.name}}</span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">签到</label>
                                <div class="col-sm-10">
                                    <label><input type="radio" name="sign" :value="1" v-model="needCheckIn">需要</label>
                                    <label><input type="radio" name="sign" :value="0" v-model="needCheckIn">不需要</label>
                                </div>
                            </div>
                            <template v-if="needCheckIn == 1">
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">签到方式</label>
                                    <div class="col-sm-10">
                                        <label><input type="radio" name="signWay" :value="1" v-model="pointInfo.checkInMethod">定位自动签到</label>
                                        <label><input type="radio" name="signWay" :value="2" v-model="pointInfo.checkInMethod">拍照签到</label>
                                    </div>
                                </div>
                            </template>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">检查项</label>
                                <div class="col-sm-10">
                                    <label><input type="radio" name="inspection" :value="1" v-model="needInspection">有</label>
                                    <label><input type="radio" name="inspection" :value="0" v-model="needInspection">无</label>
                                </div>
                            </div>
                            <template v-if="needInspection == 1">
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">&nbsp;</label>
                                    <div class="col-sm-10 ">
                                        <div class="inspection-group">
                                            <div class="inspection-item" v-for="(item, key) in inspectItems"
                                                :key="key">
                                                <div>
                                                    <input type="text"  v-model="item.name">
                                                    <span class="glyphicon glyphicon-minus-sign" @click="removeInspectItems(key)"></span>
                                                </div>
                                                <div>
                                                    <label><input type="radio" :value="1" v-model="item.inspectMethod">完成</label>
                                                    <label><input type="radio" :value="2" v-model="item.inspectMethod">拍照完成</label>
                                                </div>
                                            </div>
                                            <button class="btn btn-primary" @click="addInspectItems">添加</button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        @click="saveInspectionItem"><i class="fa fa-check"></i>&nbsp;保存
                                </button>
                                <button type="button" class="btn btn-warning float-right" style="margin-right:20px;"
                                        data-dismiss="modal">取消
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
                return {"needCheckIn":"","needInspection":"","pointInfo":"[object Object]","inspectItems":""}    
            },
            mounted() {
             (function () {

        })()(function () {
            this.$vc.on('addInspectionItem', 'changeModalStatus', function () {
                $('#addInspectionItemModel').modal('show');
            });
            this.$vc.on("addInspectionItem", "notify", function (_param) {
                $('#addInspectionItemModel').modal('show');
                this.pointInfo = {
                    pointId: _param.id,
                    checkInMethod: _param.checkinMethod,
                    name: _param.name,
                    beaconId: _param.beaconId,
                };
                this.inspectItems= [{
                    pointId: this.pointInfo.pointId,
                    name: '',
                    inspectMethod: '',
                }]
            });
        })()   
            },
            methods: {
                addInspectItems() {
                this.inspectItems.push({
                    pointId: this.pointInfo.pointId,
                    name: '',
                    inspectMethod: '',
                })
            },removeInspectItems(index) {
                this.inspectItems.splice(index, 1);
            },saveInspectionItem() {
                if (this.needCheckIn == 0) {
                    this.pointInfo.checkInMethod = 0;
                }
                if (this.needInspection == 0) {
                    this.inspectItems = [];
                }
                let params = {inspectItems: this.inspectItems, ...this.pointInfo};
                if (this.$vc.notNull(this.$vc._thiscallBackListener)) {
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, params);
                    $('#addInspectionItemModel').modal('hide');
                    return;
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    