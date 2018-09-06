<template>
    <div>
        <el-card shadow="never">
            <el-menu :default-active="active" @select="onSelect">
                <el-menu-item v-for="item in constantRouterMap" v-if="item.meta&&item.meta.type=='user'&&(token||!item.meta.LoginRequired)&&(!mini||!item.meta.mini) && item.path !== '/user/configure'&& item.path !== '/user/helper'"
                    :key="item.path" :index="item.path">
                    <i :class="item.meta.icon"></i>
                    <span slot="title">{{item.meta.title}}</span>
                </el-menu-item>
            </el-menu>
        </el-card>

        <el-card shadow="never" style="margin-top: 20px;text-align: center">
            <div v-if="!token" style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                <!-- <el-tag type="danger" size="small">&nbsp;</el-tag>&nbsp;&nbsp; Token未绑定&nbsp;&nbsp;
                <el-button type="text" @click="openTokenDialog">绑定</el-button> -->
            </div>
            <div v-if="token" style="font-size: 0.9rem;line-height: 1.5;color: #303133;">
                <!-- <el-tag type="success" size="small">&nbsp;</el-tag>&nbsp;&nbsp; Token已绑定&nbsp;&nbsp; -->
                <!-- <el-button type="text" @click="cancellation">注销</el-button> -->
            </div>
            <div style="margin-top: 10px;text-align: left">
                <!-- <el-alert title="" type="info" description=""
                    :closable="false">
                </el-alert>
                <el-alert title="" type="info" description="
                    :closable="false">
                </el-alert> -->
                <el-collapse v-model="activeNames" accordion>
                    <el-collapse-item title="记录" name="1">
                        <div>记录一下技术日志</div>
                    </el-collapse-item>
                    <el-collapse-item title="推荐" name="2">
                        <div>非常好的一个前端面试知识点的复习网站： https://yuchengkai.cn; </div>
                        <div>非常好的一个前端面试知识点的复习网站： https://yuchengkai.cn/docs/zh/frontend/; </div>
                    </el-collapse-item>
                </el-collapse>
            </div> 
        </el-card>
        <el-card shadow="never" style="margin-top: 20px;text-align: center">
            <el-input type="password" placeholder="暗号权限验证" v-model="approveData"></el-input>
            <el-button plain @click="approve()">认证</el-button>
        </el-card>
        <token-dialog ref="tokenDialog"></token-dialog>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { constantRouterMap } from '@/router'
    import TokenDialog from '@/views/common/TokenDialog'
    export default {
        components: {
            TokenDialog
        },
        data() {
            return {
                constantRouterMap,
                active: "",
                parentUrl: "",
                menuList: [],
                activeNames: '1',
                approveData:''
            }
        },
        computed: {
            ...mapGetters([
                'token',
                'githubUsername',
                'mini'
            ])
        },
        created() {
        },
        mounted() {
            let arr = this.$route.path.split("/")
            this.active = "/" + arr[1] + "/" + arr[2]
        },
        methods: {
            onSelect(index) {
                this.$router.push(index)
            },
            openTokenDialog() {
                this.$refs.tokenDialog.open(() => {
           
                })
            },
            cancellation() {
                this.$store.dispatch("Cancellation")
            },
            approve(){
                if(this.approveData === 'q554961485'){
                    this.$store.dispatch("Authentication",'8db9f2f08bc3a23a0a7c2cca99e3950a7f6628e7')
                    this.approveData = ''
                }else{
                    this.$message({
                        message: '暗号错误，认证失败！',
                        type: 'error'
                    })
                }
            }
        }
    }
</script>