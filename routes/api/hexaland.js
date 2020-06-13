const express = require('express')
const randstr = require('randomstring')
const Hexaland = require('../../models/Hexaland')
const Cluster = require('../../models/Cluster')
const dfs = require('../../functions/dfs')
const removeGridNeighbours = require('../../RemoveGrid/removegrid')
const checkLeftside = require('../../HotspotCheck/leftside')
const checkRightside = require('../../HotspotCheck/rightside')

const router = express.Router()

//user giving input about connection between 2 hexagon grids
router.post('/input', async (req, res) => {
	const nameOne = req.body.nameOne
	const cPtOne = req.body.cPtOne
	const nameTwo = req.body.nameTwo
	const cPtTwo = req.body.cPtTwo
	try {
		//function for checking validity of request
		await Hexaland.checkValidity(req.body)

		const userOne = await Hexaland.findOne({ name: nameOne })
		const userTwo = await Hexaland.findOne({ name: nameTwo })
		const firstCPt = cPtOne.toString()
		const secondCPt = cPtTwo.toString()

		//setting cluster name before joining 2 Grids
		let cluster = ''
		if (userOne === null && userTwo === null) {
			const newCluster = new Cluster({
				name: randstr.generate()
			})
			await newCluster.save()
			cluster = newCluster._id

			// creating new first grid
			const doc = new Hexaland({
				name: nameOne,
				friends: {},
				friendsConnectionPt: {},
				clusterID: cluster
			})
			doc.friends.set(firstCPt, nameTwo)
			doc.friendsConnectionPt.set(nameTwo, secondCPt)
			await doc.save()
		} else {
			// first grid is already present
			cluster = userOne.clusterID
		}

		//creating new hexagon second grid
		if (userTwo == null) {
			const doc = new Hexaland({
				name: nameTwo,
				friends: {},
				friendsConnectionPt: {},
				clusterID: cluster
			})
			doc.friends.set(secondCPt, nameOne)
			doc.friendsConnectionPt.set(nameOne, firstCPt)
			await doc.save()
			console.log('grid 2 created!')
		}
		checkLeftside(nameOne, cPtOne, nameTwo, cPtTwo, [1, 2, 3, 4, 5, 6])
		checkRightside(nameOne, cPtOne, nameTwo, cPtTwo, [1, 2, 3, 4, 5, 6])
		res.send({ message: 'Info send to the server!' })
	} catch (err) {
		res.send({ error: err })
	}
})

//removing grid from the cluster
router.post('/remove', async (req, res) => {
	const name = req.body.name
	const ob = await Hexaland.findOne({ name })
	const firstFriend = ob.friendsConnectionPt.keys().next().value
	dfs(firstFriend, name).then((res) => {
		ob.friendsConnectionPt.forEach((val, key) => {
			if (!res.has(key)) {
				throw 'cannot remove grid'
			}
		})
		removeGridNeighbours(name, ob.friendsConnectionPt)
		// res.send({ message: 'Removed!' })
	}).catch((err) => {
		res.send({ error: err })
	})
})

// get information about a particular hexagon grid
router.get('/info', async (req, res) => {
	try {
		const ob = await Hexaland.find({ name: req.body.name })
		res.send(ob)
	} catch (e) {
		res.send({ error: err })
	}
})

module.exports = router
