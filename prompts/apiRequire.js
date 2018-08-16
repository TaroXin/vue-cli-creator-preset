const request = require('superagent')
const cookies = require('../cookies.json')

const neiUrls = {
    recentApi: 'https://nei.netease.com/api/projects/?recent',
    progroupsApi: 'https://nei.netease.com/api/progroups/',
}

function generateCookie (cookies) {
    return Object.keys(cookies).map(key => {
        return key + '=' + cookies[key]
    }).join('; ')
}

module.exports = {
    getApiGroup (done, answer) {
        request
            .get(neiUrls.progroupsApi)
            .query('recent', '')
            .set(cookies.base_headers)
            .set('Cookie', generateCookie(cookies.cookies))
            .end((err, res) => {
                if (res.body.code === 200) {
                    done(null, res.body.result.map(progroup => {
                        return {
                            name: progroup.name,
                            value: progroup.id,
                            short: progroup.name
                        }
                    }))
                } else {
                    done(res.body.message)
                }
            })
    },

    getApiGroupDetail (done, answer) {
        let apiGroup = answer.apiGroup

        request
            .get(neiUrls.progroupsApi + apiGroup)
            .set(cookies.base_headers)
            .set('Cookie', generateCookie(cookies.cookies))
            .end((err, res) => {
                if (res.body.code === 200) {
                    done(null, res.body.result.projects.map(project => {
                        return {
                            name: project.name,
                            value: project.id,
                            short: project.name
                        }
                    }))
                } else {
                    done(res.body.message)
                }
            })
    }
}