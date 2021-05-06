import { getSession } from 'next-auth/client'
import UserProfile from '../components/profile/user-profile'

const ProfilePage = () => {
	return <UserProfile />
}
//server side protection to check if the user is authenticated or not 

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req })
	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		}
	}
	return {
		props: { session },
	}
}

export default ProfilePage
