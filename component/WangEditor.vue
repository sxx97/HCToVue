
        <template>
            <div id="wangEditor">

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
                props: {"parentComponent":"string"},
                components: {
                    
                },
                data () {
                    return {"editor":"null"}    
                },
                mounted() {
                (() => {
            this.initWangEditor();
        })()
(() => {
            this.$vc.on('wangEditor', 'setWangEditorContent', this.setWangEditorContent)
        })()   
                },
                methods: {
                    initWangEditor() {
                var E = window.wangEditor;
                this.editor = new E('#wangEditor');
                this.editor.customConfig.uploadImgShowBase64 = true;
                this.editor.customConfig.menus = [
                    'head',  // 标题
                    'bold',  // 粗体
                    'fontSize',  // 字号
                    'italic',  // 斜体
                    'underline',  // 下划线
                    'strikeThrough',  // 删除线
                    'foreColor',  // 文字颜色
                    'backColor',  // 背景颜色
                    'link',  // 插入链接
                    'list',  // 列表
                    'justify',  // 对齐方式
                    'quote',  // 引用
                    'emoticon',  // 表情
                    'image',  // 插入图片
                    'table',  // 表格
                ];

                this.editor.customConfig.onchange = (html) => {
                    /*this.editorContent = html;*/
                    const wpsTags = ['w:LsdException', 'w:Compatibility',
                      'w:SpaceForUL', 'o:OfficeDocumentSettings', 'w:WordDocument',
                        'w:LatentStyles'];
                    const options = {
                        whiteList: {
                            img: ['src', 'style', 'class']
                        },
                        onTag(tag, html, options) {
                            return tag === 'img' ? `<div style="max-width:100%;">${html}</div>` : html
                        },
                        onIgnoreTag(tag, html, options) {
                            // 过滤从wps复制过来的标签信息
                            return wpsTags.includes(tag) ? '' : html;
                        }
                    };
                    html = filterXSS(html, options);
                    this.$vc.emit(this.$vc._thisparentComponent, 'changeEditor', html);
                }
                this.editor.customConfig.customUploadImg = (files, insert) => {
                    let photoFiles = files;
                    if (photoFiles && photoFiles.length > 0) {
                        // 获取目前上传的文件
                        photoFiles.forEach(file => {
                            if (file.size > 1024 * 1024 * 2) {
                                this.$vc.toast("图片大小不能超过 2M!")
                                return false;
                            }
                            var reader = new FileReader(); //新建FileReader对象
                            reader.readAsDataURL(file); //读取为base64
                            reader.onloadend = async function (e) {
                                let imgSrc = await this.uploadPhoto(reader.result).catch(err => {
                                    this.$vc.toast('上传图片错误,请重新上传');
                                });

                                if (imgSrc && imgSrc != '') {
                                    let width = 400;
                                    let img = await this.getImgInfo(imgSrc);
                                    if (img.width < 400) {
                                        width = img.width;
                                    }
                                    imgSrc += '?x-oss-process=image/resize,w_' + width + '/quality,Q_90';
                                    insert(imgSrc);
                                }
                            }
                        })
                    }
                }
                this.editor.create();
                console.log('富文本初始化', this.editor);
            },changeEditorStatus(status) {
                this.editor.$textElem.attr('contenteditable', status);
            },getWangEditorContent() {
                this.editor.txt.html();
            },getImgInfo(src) {
                return new Promise((resolve, reject) => {
                    let img = new Image();
                    img.src = src;
                    img.onload = () => {
                        resolve(img);
                    }
                })
            },setWangEditorContent(content) {
                /*this.editorContent = content;*/
                this.editor.txt.html(content);
            },clearWangEditorContent() {
                this.editor.txt.clear();
            },async uploadPhoto(base64) {
                return new Promise((reslove, reject) => {
                    this.$vc.http.post('uploadImg', 'upload', {
                            img: base64,
                        },
                        {
                            headres: {
                                "Content-Type": "application/json"
                            }
                        },
                        (resStr, res) => {
                            reslove(res.body.fileSaveName);
                        },
                        (errText, err) => {
                            reject(errText);
                        })
                })
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    