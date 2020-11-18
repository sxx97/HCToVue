
        <template>
            <div id="wangEditor">

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
    