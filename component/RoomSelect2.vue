
        <template>
            <select class="form-control " id="roomSelector">
    <option value="">请选择房间</option>


</select>
        </template>
        <script>
            
        export default {
            props: {"parentModal":"false","callBackListener":"false","callBackFunction":"false"},
            components: {
                
            },
            data () {
                return {"roomSelect2Info":"[object Object]"}    
            },
            mounted() {
             (function () {
            this._initRoomSelect2();
        })()(function () {
            //监听 modal 打开
            /* $('#'+this.$vc._thisparentModal).on('show.bs.modal', function () {
                  this._initUnitSelect2();
             })*/
            this.$vc.on('roomSelect2', "transferRoom", function (_param) {
                this.$vc.copyObject(_param, this.roomSelect2Info);
            });
            this.$vc.on('roomSelect2', 'setRoom', function (_param) {
                this.$vc.copyObject(_param, this.roomSelect2Info);
                /*$("#roomSelector").val(_param.roomId).select2();*/

                var option = new Option(_param.roomNum, _param.roomId, true, true);
                this.roomSelect2Info.roomSelector.append(option);
            });
            this.$vc.on('roomSelect2', 'clearRoom', function (_param) {
                this.roomSelect2Info = {
                    units: [],
                    floorId: '-1',
                    unitId: '-1',
                    roomId: '',
                    unitName: '',
                    roomSelector: {}
                };
            });
        })()   
            },
            methods: {
                _initRoomSelect2:function () {
                console.log("调用_initRoomSelect2 方法");
                $.fn.modal.Constructor.prototype.enforceFocus = function () {
                };
                $.fn.select2.defaults.set('width', '100%');
                this.roomSelect2Info.roomSelector = $('#roomSelector').select2({
                    placeholder: '必填，请选择房间',
                    allowClear: true,//允许清空
                    escapeMarkup: function (markup) {
                        return markup;
                    }, // 自定义格式化防止xss注入
                    ajax: {
                        url: "/callComponent/roomSelect2/listRoom",
                        dataType: 'json',
                        delay: 250,
                        data: function (params) {
                            console.log("param", params);
                            var _term = "";
                            if (params.hasOwnProperty("term")) {
                                _term = params.term;
                            }
                            return {
                                roomNum: _term,
                                page: 1,
                                row: 10,
                                unitId: this.roomSelect2Info.unitId,
                                communityId: this.$vc.getCurrentCommunity().communityId
                            };
                        },
                        processResults: function (data) {
                            console.log(data, this._filterRoomData(data.rooms));
                            return {
                                results: this._filterRoomData(data.rooms)
                            };
                        },
                        cache: true
                    }
                });
                $('#roomSelector').on("select2:select", function (evt) {
                    //这里是选中触发的事件
                    //evt.params.data 是选中项的信息
                    console.log('select', evt);
                    this.roomSelect2Info.roomId = evt.params.data.id;
                    this.roomSelect2Info.roomNum = evt.params.data.text;
                });

                $('#roomSelector').on("select2:unselect", function (evt) {
                    //这里是取消选中触发的事件
                    //如配置allowClear: true后，触发
                    console.log('unselect', evt);
                    this.roomSelect2Info.roomId = '';
                    this.roomSelect2Info.roomNum = '';


                });
            },_filterRoomData:function (_rooms) {
                var _tmpRooms = [];
                for (var i = 0; i < _rooms.length; i++) {
                    var _tmpRoom = {
                        id: _rooms[i].roomId,
                        text: _rooms[i].roomNum
                    };
                    _tmpRooms.push(_tmpRoom);
                }
                return _tmpRooms;
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    