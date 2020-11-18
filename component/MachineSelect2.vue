
        <template>
            <select class="form-control" id = "machineSelector">
    <option value="">请选择设备</option>


</select>
        </template>
        <script>
            
        export default {
            props: {"parentModal":"true","callBackListener":"true","callBackFunction":"true"},
            components: {
                
            },
            data () {
                return {"machineSelect2Info":"[object Object]"}    
            },
            mounted() {
             (function () {
            this._initMachineSelect2();
        })()(function () {
            //监听 modal 打开
            /* $('#'+this.$vc._thisparentModal).on('show.bs.modal', function () {
                  this._initFloorSelect2();
             })*/
            this.$vc.on('machineSelect2', 'setMachine', function (_param) {
                console.log("执行：edit machineSelect2"+_param);
                this.$vc.copyObject(_param, this.machineSelect2Info);
                /* $("#floorSelector").val({
                     id:param.floorId,
                     text:_param.floorNum
                 }).select2();*/

                var option = new Option(_param.machineName, _param.machineId, true, true);
                this.machineSelect2Info.machineSelector.append(option);
            });

            this.$vc.on('machineSelect2', 'clearMachine', function (_param) {
                this.machineSelect2Info = {
                    machines: [],
                    machineId: '-1',
                    machineCode: '',
                    machineName: '',
                    machineSelector: {},
                };
            });
        })()   
            },
            methods: {
                _initMachineSelect2:function () {
                console.log("调用_initMachineSelect2 方法");
                $.fn.modal.Constructor.prototype.enforceFocus = function () {
                };
                $.fn.select2.defaults.set('width', '100%');
                this.machineSelect2Info.machineSelector = $('#machineSelector').select2({
                    placeholder: '必填，请选择楼栋',
                    allowClear: true,//允许清空
                    escapeMarkup: function (markup) {
                        return markup;
                    }, // 自定义格式化防止xss注入
                    ajax: {
                        url: "/callComponent/machineSelect2/list",
                        dataType: 'json',
                        delay: 250,
                        data: function (params) {
                            console.log("param", params);
                            var _term = "";
                            if (params.hasOwnProperty("term")) {
                                _term = params.term;
                            }
                            return {
                                machineName: _term,
                                page: 1,
                                row: 10,
                                communityId: this.$vc.getCurrentCommunity().communityId
                            };
                        },
                        processResults: function (data) {
                            console.log(data, this._filterMachineData(data.machines));
                            return {
                                results: this._filterMachineData(data.machines)
                            };
                        },
                        cache: true
                    }
                });
                $('#machineSelector').on("select2:select", function (evt) {
                    //这里是选中触发的事件
                    //evt.params.data 是选中项的信息
                    console.log('select', evt);
                    this.machineSelect2Info.machineId = evt.params.data.id;
                    this.machineSelect2Info.machineName = evt.params.data.text;
                });

                $('#machineSelector').on("select2:unselect", function (evt) {
                    //这里是取消选中触发的事件
                    //如配置allowClear: true后，触发
                    console.log('unselect', evt);
                    this.machineSelect2Info.machineId = '-1';
                    this.machineSelect2Info.machineName = '';

                });
            },_filterMachineData:function (_machines) {
                var _tmpMachines = [];
                for (var i = 0; i < _machines.length; i++) {
                    var _tmpMachine = {
                        id: _machines[i].machineId,
                        text: _machines[i].machineName
                    };
                    _tmpMachines.push(_tmpMachine);
                }
                return _tmpMachines;
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    