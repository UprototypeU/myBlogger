import Cookie from '@/utils/cookie'
import UserApi from '@/api/user'
import store from '../index'
import Vue from 'vue'

const TOKEN_KEY = "TOKEN_KEY"
const token = {
    state: {
        token: Cookie.getAttribute(TOKEN_KEY)
    },

    mutations: {
        SET_TOKEN: (state, value) => {
            state.token = value
            Cookie.setAttribute(TOKEN_KEY, value, 30)
        },
        REMOVE_TOKEN: (state) => {
            state.token = null
            Cookie.remove(TOKEN_KEY)
        }
    },

    actions: {
        Authentication({ commit }, accessToken) {
            // accessToken = '95c1144d3c36d2228862e35c06bcfeeee6e1f803'
            UserApi.verifyToken(accessToken).then((response) => {
                let result = response.data
                console.log(result)
                let githubUsername = store.state.configuration.githubUsername
                console.log(githubUsername)
                if (githubUsername == result['login']) {
                    commit('SET_TOKEN', accessToken)
                    // Vue.prototype.$message({
                    //     message: 'Token绑定成功',
                    //     type: 'success'
                    // })
                }
            }).catch(() => {

            })
        },
        Cancellation({ commit }) {
            commit('REMOVE_TOKEN')
            Vue.prototype.$message({
                message: 'Token取消绑定',
                type: 'info'
            })
        },
    }
}

export default token