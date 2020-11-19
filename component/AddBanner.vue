
        <template>
            <div id="addBannerModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">
                    添加Banner
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </h3>
                <div class="ibox-content">
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">banner标题</label>
                        <div class="col-sm-10">
                            <input type="text" placeholder="请输入" class="form-control">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">banner位置</label>
                        <div class="col-sm-10">
                            <select class="custom-select">
                                <option value="">首页</option>
                                <option value="">福利商城</option>
                                <!--<option value="">企业服务</option>
                                <option value="">预约服务</option>-->
                                <option value="">开门</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">落地页类型</label>
                        <div class="col-sm-10">
                            <select class="custom-select">
                                <option value="">首页</option>
                                <option value="">福利商城</option>
                                <!--<option value="">企业服务</option>
                                <option value="">预约服务</option>-->
                                <option value="">开门</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">banner图片</label>
                        <div class="col-sm-10">
                            <button class="btn btn-primary">上传图片</button>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">显示日期</label>
                        <div class="col-sm-10">
                            <input  type="text" readonly
                                   placeholder="必填，请填写投放时间"
                                   class="form-control addAdvertStartTime">

                            <input type="text" readonly placeholder="必填，请填写结束时间"
                                   class="form-control addAdvertEndTime">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">权重</label>
                        <div class="col-sm-10">
                            <input type="number" placeholder="请输入" class="form-control">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
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
                props: {},
                components: {
                    
                },
                data () {
                    return {}    
                },
                mounted() {
                (() => {

        })()
(() => {

        })()   
                },
                methods: {
                    
                },
            }
    
        </script>
        <style>
            
        </style>
    