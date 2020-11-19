
        <template>
            <select class="form-control " id="roomSelector">
    <option value="">请选择房间</option>


</select>
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
                props: {"parentModal":"true","callBackListener":"true","callBackFunction":"true"},
                components: {
                    
                },
                data () {
                    return {"roomSelect2Info":{"units":[],"floorId":"-1","unitId":"-1","roomId":"","unitName":"","roomSelector":{}}}    
                },
                mounted() {
                ( () => {
            this._initRoomSelect2();
        })()
( () => {
            //监听 modal 打开
            /* $('#'+this.$vc._thisparentModal).on('show.bs.modal',  () => {
                  this._initUnitSelect2();
             })*/
            this.$vc.on('roomSelect2', "transferRoom",  (_param) => {
                this.$vc.copyObject(_param, this.roomSelect2Info);
            });
            this.$vc.on('roomSelect2', 'setRoom',  (_param) => {
                this.$vc.copyObject(_param, this.roomSelect2Info);
                /*$("#roomSelector").val(_param.roomId).select2();*/

                var option = new Option(_param.roomNum, _param.roomId, true, true);
                this.roomSelect2Info.roomSelector.append(option);
            });
            this.$vc.on('roomSelect2', 'clearRoom',  (_param) => {
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
                $('#roomSelector').on("select2:select",  (evt) => {
                    //这里是选中触发的事件
                    //evt.params.data 是选中项的信息
                    console.log('select', evt);
                    this.roomSelect2Info.roomId = evt.params.data.id;
                    this.roomSelect2Info.roomNum = evt.params.data.text;
                });

                $('#roomSelector').on("select2:unselect",  (evt) => {
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
    