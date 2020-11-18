
        <template>
            <div id="viewImageModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <div class="row">
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
                                     style="min-width:300px;max-height:400px;">
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
                return {"photos":""}    
            },
            mounted() {
             (_initMethod() {

        })()(_initEvent() {
            this.$vc.on('viewImageModal', 'view', this.listenerModal)
        })()   
            },
            methods: {
                splitPhotosString(photosStr) {
                console.log(photosStr, '图片的集合字符串分割');
                if (typeof photosStr == 'string') {
                    return  photosStr.split(',');
                }
                return photosStr;
            },listenerModal(photosStr) {
                this.photos = photosStr.split(',');
                $('#viewImageModal').modal('show');
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    