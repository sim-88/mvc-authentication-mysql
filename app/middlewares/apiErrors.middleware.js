module.exports = function(err,req,res,next)
{

    //Log Error Here
    // res.status(500).send(err);
    res.status(500).send(err.stack);
}