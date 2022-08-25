const User = require('../model/User');

const handleLogout = async (req, res) => {
    // on client, also delete the access token
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt; // No content
    
    // if refresh token in db?
    const foundUser = await User.findOne({refreshToken: refreshToken}).exec();
    if(!foundUser) {
        res.clearCokie('jwt', {httpOnly: true, sameSite: 'None', secure: true} );
        return res.sendStatus(204)
    } //unauthorized

   // delete the refresh token in db
   foundUser.refreshToken = '';
   const result = await foundUser.save();

   console.log(result);
   res.clearCokie('jwt', {httpOnly: true, sameSite: 'None', secure: true}); // secure: true - only serves on https
   res.sendStatus(204);
}

module.exports = { handleLogout }