// import { useEffect, useState } from 'react'
// import { getSession } from 'next-auth/client'

import { useState } from 'react'
import ProfileForm from './profile-form'
import classes from './user-profile.module.css'

// Redirect away if NOT auth

const UserProfile = (props) => {
	const [message, setMessage] = useState()
	// const [isLoading, setIsLoading] = useState(true)

	// useEffect(() => {
	// 	getSession().then((session) => {
	// 		if (!session) {
	// 			window.location.href = '/auth'
	// 		} else {
	// 			setIsLoading(false)
	// 		}
	// 	})
	// }, [])

	// if (isLoading) {
	// 	return <p className={classes.profile}>Loading...</p>
	// }
	const changePasswordHandler = async (passwordData) => {
		const response = await fetch('/api/user/change-password', {
			method: 'PATCH',
			body: JSON.stringify(passwordData),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const data = await response.json()
		setMessage(data.message)
		
	}
	return (
		<section className={classes.profile}>
			<h1>Your User Profile</h1>
			<section className={classes.message}>
				<h3>{message}</h3>
			</section>
			<ProfileForm onChangePassword={changePasswordHandler} />
		</section>
	)
}

export default UserProfile
