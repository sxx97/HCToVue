
        <template>
            <select class="form-control " id="unitSelector">
    <option value="">请选择单元</option>


</select>listMachines
        </template>
        <script>
            
            



            const OWNER_TYPE = {
                OWNER: '1001',
                TENANT: '1003'
            };
            // 考核类型
            const ASSESSMENT_TYPE = {
                BUSINESS: 2,
                COMMON: 1,
                SYSTEM: 3,
            };
            
            // 删除时的类型
            const DELETE_TYPE = {
                TABLE: 1, // 删除通用考核表
                BUSINESS_ITEM: 2,  // 删除业务考核项
                COMMON_ITEM: 3, // 删除通用考核项
            }
            // 考核人员
            const ASSESSMENT_OBJECT_TYPE = {
                STAFF: 1,
                SUPERVISOR: 2,
                MANAGER: 3,
            }
            
            const AUTO_ASSESSMENT_TYPE = {
                INSPECTION: 1,
                WORK_ORDER: 2,
                ATTENDANCE: 3,
            }
            
            // 考核项目
            const ASSESSMENT_ITEM_TYPE = {
                COMMON_ITEM: 1,
                BUSINESS_ITEM: 2,
            }
            
            const DEFAULT_PAGE = 1;
            const DEFAULT_ROWS = 10;

            
            export default {
                props: {"parentModal":"chooseStaff","callBackListener":"chooseStaff","callBackFunction":"chooseStaff"},
                components: {
                    
                },
                data () {
                    return {"unitSelect2Info":{"units":[],"floorId":"-1","unitId":"-1","unitNum":"","unitName":"","unitSelector":{}}}    
                },
                mounted() {
                ( () => {
            this._initUnitSelect2();
        })()
( () => {
            //监听 modal 打开
            /* $('#'+this.$vc._thisparentModal).on('show.bs.modal',  () => {
                  this._initUnitSelect2();
             })*/
            this.$vc.on('unitSelect2', "transferFloor",  (_param) => {
                this.$vc.copyObject(_param, this.unitSelect2Info);
            });
            this.$vc.on('unitSelect2', 'setUnit',  (_param) => {
                this.$vc.copyObject(_param, this.unitSelect2Info);
                /* $(".unitSelector").val(_param.unitId).select2();*/
                var option = new Option(_param.unitNum, _param.unitId, true, true);
                this.unitSelect2Info.unitSelector.append(option);
            });
            this.$vc.on('unitSelect2', 'clearUnit',  (_param) => {
                this.unitSelect2Info = {
                    units: [],
                    floorId: '-1',
                    unitId: '-1',
                    unitNum: '',
                    unitName: '',
                    unitSelector: {}
                };
            });
        })()   
                },
                methods: {
                    _initUnitSelect2:function () {
                console.log("调用_initUnitSelect2 方法");
                $.fn.modal.Constructor.prototype.enforceFocus = function () {
                };
                $.fn.select2.defaults.set('width', '100%');
                this.unitSelect2Info.unitSelector = $('#unitSelector').select2({
                    placeholder: '必填，请选择单元',
                    allowClear: true,//允许清空
                    escapeMarkup: function (markup) {
                        return markup;
                    }, // 自定义格式化防止xss注入
                    ajax: {
                        url: "/callComponent/unitSelect2/loadUnits",
                        dataType: 'json',
                        delay: 250,
                        data: function (params) {
                            console.log("param", params);
                            var _term = "";
                            if (params.hasOwnProperty("term")) {
                                _term = params.term;
                            }
                            return {
                                unitNum: _term,
                                page: 1,
                                row: 10,
                                floorId: this.unitSelect2Info.floorId,
                                communityId: this.$vc.getCurrentCommunity().communityId
                            };
                        },
                        processResults: function (data) {
                            console.log(data, this._filterUnitData(data));
                            return {
                                results: this._filterUnitData(data)
                            };
                        },
                        cache: true
                    }
                });
                $('#unitSelector').on("select2:select",  (evt) => {
                    //这里是选中触发的事件
                    //evt.params.data 是选中项的信息
                    console.log('select', evt);
                    this.unitSelect2Info.unitId = evt.params.data.id;
                    this.unitSelect2Info.unitName = evt.params.data.text;
                });

                $('#unitSelector').on("select2:unselect",  (evt) => {
                    //这里是取消选中触发的事件
                    //如配置allowClear: true后，触发
                    console.log('unselect', evt);
                    this.unitSelect2Info.unitId = '-1';
                    this.unitSelect2Info.unitName = '';

                });
            },_filterUnitData:function (_units) {
                var _tmpUnits = [];
                for (var i = 0; i < _units.length; i++) {
                    var _tmpUnit = {
                        id: _units[i].unitId,
                        text: _units[i].unitNum
                    };
                    _tmpUnits.push(_tmpUnit);
                }
                return _tmpUnits;
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    