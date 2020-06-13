const Hexaland = require('../models/Hexaland')
const iterate = require('../functions/iterate')

async function yo(nameOne, cPtOne, nameTwo, cPtTwo, arr) {
    let connectionsTobeAdded = []
    let presentGridName = nameOne
    let presentGridPt = cPtOne
    let newGridName = nameTwo
    let newGridPt = cPtTwo

    for (const ele of arr) {
        connectionsTobeAdded.push({
            name: presentGridName,
            pt: presentGridPt,
            ptNew: newGridPt
        })
        let newGridNextPt = (newGridPt - 1 + 6) % 6
        newGridNextPt = newGridNextPt.toString()
        let presentGrid = await Hexaland.findOne({ name: presentGridName })
        let presentGridNextPt = (presentGridPt + 1 + 6) % 6
        presentGridNextPt = presentGridNextPt.toString()
        let nextGridName = presentGrid.friends.get(presentGridNextPt)
        if (nextGridName) {
            let nextGridPt = presentGrid.friendsConnectionPt.get(nextGridName)
            nextGridPt = parseInt(nextGridPt)
            let nextGridNextPt = (nextGridPt + 1 + 6) % 6
            newGridPt = parseInt(newGridNextPt)
            presentGridName = nextGridName
            presentGridPt = nextGridNextPt
        } else {
            break
        }
    }

    iterate(connectionsTobeAdded, newGridName)
}

module.exports = yo