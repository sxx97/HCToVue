
                <template>
                    
            <div class="room-select" @click.stop="() => {}">
                <div type="text" class="custom-input" style="width: 256px;color: #999;"
                    @click="isShowPanel = true">
                    请选择
                </div>
                <div class="room-select-panel" v-show="isShowPanel">
                    <div class="room-select-panel-header">
                        <span class="active">空置</span>
                        <span>在租</span>
                    </div>
                    <div class="room-select-panel-content">
                        <div class="floor-info">
                            <template v-for="n in 2">
                                <div class="floor-checkbox-panel">
                                    <div @click="changeUnfold(n)">
                                        <div class="glyphicon glyphicon-triangle-bottom"></div>
                                        <input type="checkbox" v-model="checkedFloors" disabled :value="n">
                                        xxxxx
                                    </div>
                                    <div class="room-checkbox-panel" v-if="unfoldFloor.includes(n)">
                                        <template v-for="r in 3">
                                            <div class="room-name">
                                                <input type="checkbox" :checked="checkedRooms.includes(r)" :value="r"
                                                    @change="changeCheckedRooms(r, n)">
                                                101{{r}}
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </template>        
                        </div>
                    </div>
                </div>
            </div>
        
                </template>
                <script>
                    export default {
                        name: RoomSelect,
                        undefined,
                        data() {
            return {
                isShowPanel: false,
                checkedRooms: [],
                checkedFloors: [],
                unfoldFloor: [],
            }
        },
                        mounted() {
            document.querySelector('.contract-modal').addEventListener('click', () => {
                this.isShowPanel = false;
            })
        },
                        [object Object],
                    }
                </script>
            