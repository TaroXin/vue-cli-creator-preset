const apiRequire = require('./prompt-utils/apiRequire')

module.exports = [
    {
        name: 'target',
        when: true,
        message: '请选择所要创建的项目目标',
        type: 'list',
        choices: ['模块', '宿主'],
    },  
    {
        name: 'projectName',
        when: true,
        message: `请输入项目名称`,
        type: 'input',
    },
    {
        name: 'apiRequire',
        when: true,
        message: '是否需要引入API',
        type: 'confirm',
        default: false
    },
    {
        name: 'apiGroup',
        when: answer => answer.apiRequire,
        message: '请选择API分组',
        type: 'list',
        choices: function (answer) {
            const done = this.async()
            apiRequire.getApiGroup(done)
        }
    }
]