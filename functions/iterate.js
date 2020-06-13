const Hexaland = require('../models/Hexaland')

//to iterate and update the grids stored in arr
async function yo(arr, name) {
    for (const ele of arr) {
        let pt = ele.pt.toString()
        let ptNew = ele.ptNew.toString()
        const ob = await Hexaland.findOne({ name: ele.name })
        ob.friends.set(pt, name)
        ob.friendsConnectionPt.set(name, ptNew)
        await ob.save()
        const ob1 = await Hexaland.findOne({ name })
        ob1.friends.set(ptNew, ele.name)
        ob1.friendsConnectionPt.set(ele.name, pt)
        await ob1.save()
    }
}

module.exports = yo
