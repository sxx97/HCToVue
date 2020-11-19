
        <template>
            <select class="form-control" id = "staffSelector">
    <option value="">选择员工</option>


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
                props: {"parentModal":"chooseStaff","callBackListener":"chooseStaff","callBackFunction":"chooseStaff"},
                components: {
                    
                },
                data () {
                    return {"staffSelect2Info":{"staffs":[],"staffId":"-1","staffName":"","name":"","orgId":"","companyId":"","departmentId":"","staffSelector":{}}}    
                },
                mounted() {
                ( () => {
            this._initstaffSelect2();
        })()
( () => {

            this.$vc.on('staffSelect2', 'setStaff',  (_param) => {
                this.$vc.copyObject(_param, this.staffSelect2Info);
                var option = new Option(_param.staffName, _param.staffId, true, true);
                this.staffSelect2Info.staffSelector.append(option);
            });

            this.$vc.on('staffSelect2', 'clearStaff',  (_param) => {
                this.staffSelect2Info = {
                    staffs: [],
                    staffId: '-1',
                    staffName:'',
                    name: '',
                    orgId,
                    companyId:'',
                    departmentId:'',
                    staffSelector: {}
                };
            });
        })()   
                },
                methods: {
                    _initstaffSelect2:function () {
                $.fn.modal.Constructor.prototype.enforceFocus = function () {};
                $.fn.select2.defaults.set('width', '100%');
                this.staffSelect2Info.staffSelector = $('#staffSelector').select2({
                    placeholder: '必填，请选择员工',
                    allowClear: true,//允许清空
                    escapeMarkup: function (markup) {
                        return markup;
                    }, // 自定义格式化防止xss注入
                    ajax: {
                        url: "/callComponent/searchStaff/listStaff",
                        dataType: 'json',
                        delay: 250,
                        data: function (params) {
                            console.log("param", params);
                            var _term = "";
                            if (params.hasOwnProperty("term")) {
                                _term = params.term;
                            }
                            return {
                                name: _term,
                                page: 1,
                                row: 10,
                                parentOrgId:this.staffSelect2Info.companyId,
                                departmentOrgId:this.staffSelect2Info.departmentId,
                                communityId: this.$vc.getCurrentCommunity().communityId
                            };
                        },
                        processResults: function (data) {
                            console.log(data, this._filterstaffData(data.staffs));
                            return {
                                results: this._filterstaffData(data.staffs)
                            };
                        },
                        cache: true
                    }
                });
                $('#staffSelector').on("select2:select",  (evt) => {
                    //这里是选中触发的事件
                    //evt.params.data 是选中项的信息
                    console.log('select', evt);
                    this.staffSelect2Info.staffId = evt.params.data.id;
                    this.staffSelect2Info.staffName = evt.params.data.text;
                });

                $('#staffSelector').on("select2:unselect",  (evt) => {
                    //这里是取消选中触发的事件
                    //如配置allowClear: true后，触发
                    console.log('unselect', evt);
                    this.staffSelect2Info.staffId = '-1';
                    this.staffSelect2Info.staffName = '';

                });
            },_filterstaffData:function (_staffs) {
                var _tmpstaffs = [];
                for (var i = 0; i < _staffs.length; i++) {
                    var _tmpstaff = {
                        id: _staffs[i].userId,
                        text: _staffs[i].userName
                    };
                    _tmpstaffs.push(_tmpstaff);
                }
                return _tmpstaffs;
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    