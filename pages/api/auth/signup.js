import { hashPassword } from '../../../helpers/auth'
import { connectToDatabase } from '../../../helpers/db'

const signupHandler = async (req, res) => {
	if (req.method === 'POST') {
		const { email, password } = req.body

		if (
			!email ||
			!email.includes('@') ||
			!password ||
			password.trim().length < 8
		) {
			return res.status(422).json({ message: 'Invalid Email or Password' })
		}

		const hashedPassword = await hashPassword(password)

		const client = await connectToDatabase()

		const db = client.db()

		const existingUser = await db
			.collection('next-auth-users')
			.findOne({ email: email })

		if (existingUser) {
			res.status(422).json({ message: 'User Exist Already !' })
			client.close()
			return
		}

		await db
			.collection('next-auth-users')
			.insertOne({ email: email, password: hashedPassword })

		res.status(201).json({ message: 'User Created' })
		client.close()
	}
}
export default signupHandler
