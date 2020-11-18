
        <template>
            <div id="component">
    <!--<UnitSelectFloor name="unitSelectFloor"></UnitSelectFloor>-->

    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{unitInfo.moreCondition == true?'隐藏':'更多'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">

                        <div class="col-sm-4">
                            <div class="form-group input-group">
                                <input type="text" placeholder="请选择楼栋"
                                       v-model="unitInfo.conditions.floorName" class=" form-control">
                                <div class="input-group-prepend">
                                    <button type="button" class="btn btn-primary btn-sm"
                                            v-on:click="_openChooseFloorMethod()"><i
                                            class="glyphicon glyphicon-search"></i> 选择
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入单元编号"
                                       v-model="unitInfo.conditions.unitNum" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入总层数"
                                       v-model="unitInfo.conditions.layerCount" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryUnitMethod()"><i
                                    class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-sm-4" v-if="unitInfo.moreCondition == true">
                            <select class="custom-select" v-model="unitInfo.conditions.lift">
                                <option selected disabled value="">必填，请选择是否有电梯</option>
                                <option value="1010">有</option>
                                <option value="2020">无</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>


    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>单元信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm"
                                v-if="unitInfo.conditions.floorId != null && unitInfo.conditions.floorId != ''"
                                style="margin-left:10px" v-on:click="openAddUnitModel()">
                            <i class="glyphicon glyphicon-plus"></i> 添加单元
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                        <tr>
                            <th>单元ID</th>
                            <th data-hide="phone">单元编号</th>
                            <th data-hide="phone">总层数</th>
                            <th data-hide="phone">是否有电梯</th>
                            <th data-hide="phone,tablet">创建人</th>
                            <th class="text-right">操作</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="unit in unitInfo.units">
                            <td>
                                {{unit.unitId}}
                            </td>
                            <td>
                                {{unit.unitNum}}
                            </td>
                            <td>
                                {{unit.layerCount}}
                            </td>
                            <td>
                                {{unit.lift == '1010'?'有':'无'}}
                            </td>
                            <td>
                                {{unit.userName}}
                            </td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openEditUnitModel(unit)">修改
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openDeleteUnitModel(unit)">删除
                                    </button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="7">
                                <ul class="pagination float-right"></ul>
                            </td>
                        </tr>
                        </tfoot>
                    </table>

                </div>
            </div>
        </div>
    </div>

    <vc:create name="searchFloor"
               emitChooseFloor="unit"
               emitLoadData="unit"
    ></vc:create>
    <vc:create name="addUnit"
               callBackListener=""
               callBackFunction=""
    ></vc:create>
    <!-- 删除员工权限 -->
    <EditUnit name="editUnit"></EditUnit>
    <DeleteUnit name="deleteUnit"></DeleteUnit>
</div>
        </template>
        <script>
            import UnitSelectFloor from './UnitSelectFloor.vue';import EditUnit from './EditUnit.vue';import DeleteUnit from './DeleteUnit.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"unitInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            var _paramFloorId = this.$vc.getParam("floorId");
            var _paramFloorName = this.$vc.getParam("floorName");
            if(this.$vc.notNull(_paramFloorId)){
                this.unitInfo.conditions.floorId = _paramFloorId;
                this.unitInfo.conditions.floorName = _paramFloorName;
            }
            this._loadUnits({'floorId':_paramFloorId});
        })()(function(){
            this.$vc.on('unit','chooseFloor',function(_param){
                this.unitInfo.conditions.floorId = _param.floorId;
                this.unitInfo.conditions.floorName = _param.floorName;
            });

            this.$vc.on('unit','loadUnit',function(_param){
                this.unitInfo.conditions.floorId = _param.floorId;
                this._loadUnits(_param);
            });
            this.$vc.on('unit','loadData',function(_param){
                this._loadUnits(_param);
            });
        })()   
            },
            methods: {
                _loadUnits:function(_param){
                this.unitInfo._currentFloorId=_param.floorId;
                this.unitInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params:this.unitInfo.conditions
               };
             //发送get请求
                this.$vc.http.get('unit',
                     'loadUnits',
                      param,
                      function(json){
                         var _unitInfo = JSON.parse(json);
                         this.unitInfo.units = _unitInfo;
                      },
                      function(){
                         console.log('请求失败处理');
                      });
            },_openDeleteUnitModel:function(_unit){
                _unit.floorId = this.unitInfo._currentFloorId;
                this.$vc.emit('deleteUnit','openUnitModel',_unit);
            },_openEditUnitModel:function(_unit){
                _unit.floorId = this.unitInfo._currentFloorId;
                this.$vc.emit('editUnit','openUnitModel',_unit);
            },_openChooseFloorMethod:function(){
                this.$vc.emit('searchFloor','openSearchFloorModel',{});
            },openAddUnitModel:function(){
                this.$vc.emit('addUnit','addUnitModel',{
                    floorId:this.unitInfo.conditions.floorId
                });
            },_queryUnitMethod:function(){
                this._loadUnits({'floorId':this.unitInfo.conditions.floorId});
            },_moreCondition:function(){
                if(this.unitInfo.moreCondition){
                    this.unitInfo.moreCondition = false;
                }else{
                    this.unitInfo.moreCondition = true;
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    