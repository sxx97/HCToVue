
        <template>
            <select class="form-control" id = "orgSelector">
    <option value="">请选择公司</option>


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
                props: {"parentModal":"true"},
                components: {
                    
                },
                data () {
                    return {"orgSelect2Info":{"orgs":[],"orgId":"-1","orgName":"","companyId":"","orgSelector":{}}}    
                },
                mounted() {
                ( () => {
            this._initOrgSelect2();
        })()
( () => {
            this.$vc.on('orgSelect2', 'setOrg',  (_param) => {
                this.$vc.copyObject(_param, this.orgSelect2Info);
                var option = new Option(_param.orgName, _param.orgId, true, true);
                this.orgSelect2Info.orgSelector.append(option);
            });

            this.$vc.on('orgSelect2', 'clearOrg',  (_param) => {
                this.orgSelect2Info = {
                    orgs: [],
                    orgId: '-1',
                    orgName: '',
                    orgSelector: {}
                };
            });
        })()   
                },
                methods: {
                    _initOrgSelect2:function () {
                console.log("调用_initOrgSelect2方法");
                $.fn.modal.Constructor.prototype.enforceFocus = function () {};
                $.fn.select2.defaults.set('width', '100%');
                this.orgSelect2Info.orgSelector = $('#orgSelector').select2({
                    placeholder: '必填，请选择公司',
                    allowClear: true,//允许清空
                    escapeMarkup: function (markup) {
                        return markup;
                    }, // 自定义格式化防止xss注入
                    ajax: {
                        url: "/callComponent/orgManage/list",
                        dataType: 'json',
                        delay: 250,
                        data: function (params) {
                            console.log("param", params);
                            var _term = "";
                            if (params.hasOwnProperty("term")) {
                                _term = params.term;
                            }
                            return {
                                orgName: _term,
                                orgLevel:'2',
                                page: 1,
                                row: 10,
                                communityId: this.$vc.getCurrentCommunity().communityId
                            };
                        },
                        processResults: function (data) {
                            console.log(data, this._filterOrgData(data.orgs));
                            return {
                                results: this._filterOrgData(data.orgs)
                            };
                        },
                        cache: true
                    }
                });
                $('#orgSelector').on("select2:select",  (evt) => {
                    //这里是选中触发的事件
                    //evt.params.data 是选中项的信息
                    console.log('select', evt);
                    this.orgSelect2Info.orgId = evt.params.data.id;
                    this.orgSelect2Info.orgName = evt.params.data.text;
                    this.orgSelect2Info.companyId = evt.params.data.id;
                });

                $('#orgSelector').on("select2:unselect",  (evt) => {
                    //这里是取消选中触发的事件
                    //如配置allowClear: true后，触发
                    console.log('unselect', evt);
                    this.orgSelect2Info.orgId = '-1';
                    this.orgSelect2Info.orgName = '';

                });
            },_filterOrgData:function (_Orgs) {
                var _tmpOrgs = [];
                for (var i = 0; i < _Orgs.length; i++) {
                    var _tmpOrg = {
                        id: _Orgs[i].orgId,
                        text: _Orgs[i].orgName
                    };
                    _tmpOrgs.push(_tmpOrg);
                }
                return _tmpOrgs;
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    