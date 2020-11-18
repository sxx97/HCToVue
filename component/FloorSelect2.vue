
        <template>
            <select class="form-control" id = "floorSelector">
    <option value="">请选择楼栋</option>


</select>
        </template>
        <script>
            
        export default {
            props: {"parentModal":"true"},
            components: {
                
            },
            data () {
                return {"floorSelect2Info":"[object Object]"}    
            },
            mounted() {
             (function () {
            this._initFloorSelect2();
        })()(function () {
            //监听 modal 打开
            /* $('#'+this.$vc._thisparentModal).on('show.bs.modal', function () {
                  this._initFloorSelect2();
             })*/
            this.$vc.on('floorSelect2', 'setFloor', function (_param) {
                this.$vc.copyObject(_param, this.floorSelect2Info);
                /* $("#floorSelector").val({
                     id:param.floorId,
                     text:_param.floorNum
                 }).select2();*/

                var option = new Option(_param.floorNum + '号楼', _param.floorId, true, true);
                this.floorSelect2Info.floorSelector.append(option);
            });

            this.$vc.on('floorSelect2', 'clearFloor', function (_param) {
                this.floorSelect2Info = {
                    floors: [],
                    floorId: '-1',
                    floorNum: '',
                    floorName: '',
                    floorSelector: {},
                };
            });
        })()   
            },
            methods: {
                _initFloorSelect2:function () {
                console.log("调用_initFloorSelect2 方法");
                $.fn.modal.Constructor.prototype.enforceFocus = function () {
                };
                $.fn.select2.defaults.set('width', '100%');
                this.floorSelect2Info.floorSelector = $('#floorSelector').select2({
                    placeholder: '必填，请选择楼栋',
                    allowClear: true,//允许清空
                    escapeMarkup: function (markup) {
                        return markup;
                    }, // 自定义格式化防止xss注入
                    ajax: {
                        url: "/callComponent/floorSelect2/list",
                        dataType: 'json',
                        delay: 250,
                        data: function (params) {
                            console.log("param", params);
                            var _term = "";
                            if (params.hasOwnProperty("term")) {
                                _term = params.term;
                            }
                            return {
                                floorNum: _term,
                                page: 1,
                                row: 10,
                                communityId: this.$vc.getCurrentCommunity().communityId
                            };
                        },
                        processResults: function (data) {
                            console.log(data, this._filterFloorData(data.apiFloorDataVoList));
                            return {
                                results: this._filterFloorData(data.apiFloorDataVoList)
                            };
                        },
                        cache: true
                    }
                });
                $('#floorSelector').on("select2:select", function (evt) {
                    //这里是选中触发的事件
                    //evt.params.data 是选中项的信息
                    console.log('select', evt);
                    this.floorSelect2Info.floorId = evt.params.data.id;
                    this.floorSelect2Info.floorNum = evt.params.data.text;
                });

                $('#floorSelector').on("select2:unselect", function (evt) {
                    //这里是取消选中触发的事件
                    //如配置allowClear: true后，触发
                    console.log('unselect', evt);
                    this.floorSelect2Info.floorId = '-1';
                    this.floorSelect2Info.floorNum = '';

                });
            },_filterFloorData:function (_floors) {
                var _tmpFloors = [];
                for (var i = 0; i < _floors.length; i++) {
                    var _tmpFloor = {
                        id: _floors[i].floorId,
                        text: _floors[i].floorNum
                    };
                    _tmpFloors.push(_tmpFloor);
                }
                return _tmpFloors;
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    