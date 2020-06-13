const Hexaland = require('../models/Hexaland')

// to iterate and update the cluster name of all the hexagon grids in arr
async function yo(name, arr) {
    for (const [val, key] of arr) {
        const ob = await Hexaland.findOne({ name: val })
        ob.friends.delete(key)
        ob.friendsConnectionPt.delete(name)
        await ob.save()
    }
    await Hexaland.deleteOne({ name })
}

module.exports = yo