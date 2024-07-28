// module.exports = function deviceIdVerification(req,res) {
//     if(!req.cookies.deviceid){
//         res.redirect("/")
//     }
// }
module.exports = function deviceIdVerification(req, res, next) {
    if (!req.cookies.deviceid) {
        return res.redirect('/'); // Redirect to the registration or login page if device ID is not found
    }
    next(); // Proceed to the next middleware or route handler if device ID is present
};
