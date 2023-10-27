import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = ({ setIsVerified }) => {
	function captchaHandler(value) {
		if (value)
			setIsVerified(true);
	}

	return (
		<ReCAPTCHA
			sitekey={process.env.REACT_APP_CAPTCHA_KEY}
			onChange={captchaHandler}
		/>
	)
}
export default ReCaptcha