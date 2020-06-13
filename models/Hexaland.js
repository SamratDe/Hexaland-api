const mongoose = require('mongoose')

//schema of hexaland grid
const hexalandSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	friends: {
		type: Map,
		of: String
	},
	friendsConnectionPt: {
		type: Map,
		of: String
	},
	clusterID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Hexaland'
	}
})

//function to check validity
hexalandSchema.statics.checkValidity = async ({ nameOne, cPtOne, nameTwo, cPtTwo }) => {
	const userOne = await Hexaland.findOne({ name: nameOne })
	const userTwo = await Hexaland.findOne({ name: nameTwo })
	const yo = cPtOne.toString()
	const yo1 = cPtTwo.toString()

	//checking the range
	if (cPtOne < 0 || cPtOne > 5 || cPtTwo < 0 || cPtTwo > 5) {
		throw 'enter in range [0-5]'
	}
	// checking already in same cluster or not
	if (userOne !== null && userTwo !== null) {
		const id1 = mongoose.Types.ObjectId(userOne.clusterID)
		const id2 = mongoose.Types.ObjectId(userTwo.clusterID)
		if (id1.equals(id2)) {
			throw `both ${nameOne} and ${nameTwo} are in same cluster`
		}
	}
	// checking availability of that side of nameOne
	if (userOne !== null) {
		if (userOne.friends.get(yo)) {
			throw `${nameOne} already connected at ${cPtOne}`
		}
	}
	// checking availability of side of nameTwo 
	if (userTwo !== null) {
		if (userTwo.friends.get(yo1)) {
			throw `${nameTwo} already connected at ${cPtTwo}`
		}
	}
}

const Hexaland = mongoose.model('Hexaland', hexalandSchema)

module.exports = Hexaland
