import { hash, compare } from 'bcryptjs'

export const hashPassword = async (password) => {
	const saltRound = 12
	const hashedPassword = await hash(password, saltRound)
	return hashedPassword
}

export const verifyPassword = async (password, hashedPassword) => {
	const isValid = await compare(password, hashedPassword)
	return isValid
}
