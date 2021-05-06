import { MongoClient } from 'mongodb'

const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.4clyz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

export const connectToDatabase = async () => {
	const client = await MongoClient.connect(connectionString, {
		useUnifiedTopology: true,
	})

	return client
}
