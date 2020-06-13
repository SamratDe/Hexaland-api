const Hexaland = require('../models/Hexaland')

//applying dfs technique to find all the grids which are in that cluster
const outcome = async (name, notVisit, callback) => {
    try {
        let s = []
        let visited = new Set()
        s.push(name)
        visited.add(name)
        while (s.length > 0) {
            const t = s.pop()
            const user = await Hexaland.findOne({ name: t })
            user.friends.forEach((val, key) => {
                if (val != notVisit && !visited.has(val)) {
                    visited.add(val)
                    s.push(val)
                }
            })
        }
        return new Promise((resolve, reject) => {
            resolve(visited)
        })
    } catch (e) {
        throw 'error in dfs'
    }
}

module.exports = outcome
