
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
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {}    
            },
            mounted() {
             (_initMethod() {

        })()(_initEvent() {

        })()   
            },
            methods: {
                
            },
        }
    
        </script>
        <style>
            
        </style>
    