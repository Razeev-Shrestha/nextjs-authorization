import classes from './starting-page.module.css'

// Show Link to Login page if NOT auth
const StartingPageContent = () => {
	return (
		<section className={classes.starting}>
			<h1>Welcome To Home Page of Next-Auth</h1>
		</section>
	)
}

export default StartingPageContent
