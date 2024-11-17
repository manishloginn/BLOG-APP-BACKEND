const blogValidator = ({textBody, userId }) => {
    return new Promise ((res, rej) => {
        if(!textBody || !userId ) rej ('please fill required Details')
            res ('all filled')
    })
}


module.exports = {blogValidator}