import { getSession } from 'next-auth/client'

import { connectToDatabase } from '../../../helpers/db'
import { hashPassword, verifyPassword } from '../../../helpers/auth'

const changePasswordHandler = async (req, res) => {
	if (req.method !== 'PATCH') {
		return
	}
	const session = await getSession({ req: req })
	if (!session) {
		res.status(401).json({ message: 'Not Authenticated' })
		return
	}
	const userEmail = session.user.email
	const oldPassword = req.body.oldPassword
	const newPassword = req.body.newPassword

	const client = await connectToDatabase()

	const userCollections = client.db().collection('next-auth-users')
	const userResult = await userCollections.findOne({ email: userEmail })
	if (!userResult) {
		res.status(404).json({ message: 'User Not Found' })
		client.close()
		return
	}
	const currentPassword = userResult.password

	const equalPassword = await verifyPassword(oldPassword, currentPassword)
	if (!equalPassword) {
		res.status(403).json({ message: 'Invalid Current Password' })
		client.close()
		return
	}
	const hashedPassword = await hashPassword(newPassword)
	const result = await userCollections.updateOne(
		{ email: userEmail },
		{ $set: { password: hashedPassword } }
	)
	client.close()
	res.status(200).json({ message: 'Password Updated' })
}

export default changePasswordHandler
