import { useState } from 'react'
import classes from './profile-form.module.css'

const ProfileForm = (props) => {
	const [oldPassword, setOldPassword] = useState()
	const [newPassword, setNewPassword] = useState()

	const submitHandler = async (e) => {
		e.preventDefault()
		props.onChangePassword({
			newPassword: newPassword,
			oldPassword: oldPassword,
		})
		setNewPassword()
		setOldPassword()
	}
	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor='new-password'>New Password</label>
				<input
					type='password'
					id='new-password'
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
			</div>
			<div className={classes.control}>
				<label htmlFor='old-password'>Old Password</label>
				<input
					type='password'
					id='old-password'
					value={oldPassword}
					onChange={(e) => setOldPassword(e.target.value)}
				/>
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	)
}

export default ProfileForm
