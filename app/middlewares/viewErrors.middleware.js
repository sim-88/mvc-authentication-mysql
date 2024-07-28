module.exports = function(err,req,res,next)
{

    //Log Error Here
    
    // res.send('Something Went Wrong');
    res.send(err);
}