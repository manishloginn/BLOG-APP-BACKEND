

const uservalidator = ({ name, username, email, password }) => {

    return new Promise((res, rej) => {
        if (!name || !username || !email || !password) rej ('please fill all details')
        res('ok')
    })
}


module.exports = { uservalidator }