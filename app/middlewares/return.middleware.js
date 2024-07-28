module.exports = function returner(code, res, isApiOrNot) {
    if (isApiOrNot) {
        // Handle API responses
        switch (code) {
            case 1:
                res.status(401).json({ message: "Authentication Failed. Token Not Found." });
                break;
            case 2:
                res.status(401).json({ message: "Authentication Failed. Can't Find Session." });
                break;
            case 3:
                res.status(401).json({ message: "Authentication Failed. Invalid User Agent." });
                break;
            case 4:
                res.status(401).json({ message: "Authentication Failed. Token Has Expired. Please Login Again." });
                break;
            case 5:
                res.status(403).json({ message: "User Is Currently Banned. Please Try Again After Some Time." });
                break;
            default:
                res.status(403).json({ message: "Unknown error occurred. Kindly try again." });
                break;
        }
    } else {
        // Handle non-API responses (e.g., redirect to login page)
        res.redirect("/");
    }
};
