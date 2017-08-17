var port = process.env.PORT || 3000
var base_url = `http://localhost:${port}`
module.exports = {
	port,
	base_url,
	facebook : {
		clientID: '1237889892938057',
    //clientID: '1759592940975382',
    clientSecret: '1c6b8c6b32c1cfda1c9969179e370e5f',
    //clientSecret: '8e5d51d7ae1de27ed55b732826526b1b',
    callbackURL: `${base_url}/login/facebook/return`
    //callbackURL: 'https://jhonattan-facebook-login-2.herokuapp.com/login/facebook/return'
	}
}