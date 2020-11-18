
        <template>
            <div id="viewModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <div class="row">
                    <template v-if="photos && photos.length > 0">
                        <div :class="[content && content != '' ? 'col-sm-7' : 'col-sm-12']">
                            <div id="demo" class="carousel slide" data-ride="carousel" style="margin: 0 auto;">
                                <!-- 指示符 -->
                                <ul class="carousel-indicators">
                                    <li data-target="#demo"
                                        v-for="(item, n) in photos"
                                        :key="n"
                                        :data-slide-to="n" class="active"></li>
                                </ul>

                                <!-- 轮播图片 -->
                                <div class="carousel-inner">
                                    <div :class="['carousel-item', {'active': n == 0}, 'center']"
                                         v-for="(item, n) in photos"
                                         :key="n">
                                        <img :src="item"
                                             style="min-width:300px;max-height:400px;display:block;margin:0 auto;">
                                    </div>
                                </div>
                                <!-- 左右切换按钮 -->
                                <a class="carousel-control-prev" href="#demo" data-slide="prev">
                                    <span class="carousel-control-prev-icon"></span>
                                </a>
                                <a class="carousel-control-next" href="#demo" data-slide="next">
                                    <span class="carousel-control-next-icon"></span>
                                </a>
                            </div>
                        </div>
                    </template>
                    <template v-if="content && content != ''">
                        <div :class="[photos && photos.length > 0 ? 'col-sm-5' : 'col-sm-12']">
                            <div :style="{padding: '15px', 'text-align': photos && photos.length > 0 ? 'left' : 'center', 'min-height': '120px'}" v-html="content">

                            </div>
                        </div>
                    </template>
                </div>
                <div class="ibox-content" style="text-align: center;border:none;padding: 30px 0;">
                    <button type="button" class="btn cs-btn-close"
                            data-dismiss="modal">关闭
                    </button>
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
                return {"photos":"","content":""}    
            },
            mounted() {
             (_initMethod() {

        })()(_initEvent() {
            this.$vc.on('viewModal', 'openViewModal', this.initViewModal)
        })()   
            },
            methods: {
                initViewModal(params) {
                this.photos = typeof params.photos === 'string' ? params.photos.split(',') : params.photos;
                this.content = params.content;
                $('#viewModal').modal('show');
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    