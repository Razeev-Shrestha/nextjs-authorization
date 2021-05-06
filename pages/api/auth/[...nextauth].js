import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { verifyPassword } from '../../../helpers/auth'
import { connectToDatabase } from '../../../helpers/db'

export default NextAuth({
	session: { jwt: true },
	providers: [
		Providers.Credentials({
			async authorize(credentials) {
                const client = await connectToDatabase()
                
				const usersCollection = client.db().collection('next-auth-users')
				const userResult = await usersCollection.findOne({
					email: credentials.email,
				})
				if (!userResult) {
                    client.close()
                    throw new Error('No User Found')
				}
				const isValid = await verifyPassword(
					credentials.password,
					userResult.password
				)
				if (!isValid) {
					throw new Error('Could Not Log You in!!')
				}
				client.close()
				return { email: userResult.email }

			},
		}),
	],
})
