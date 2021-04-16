function errorHandler(err,req,res,next){
  console.log(err)
  if(err.name == "SequelizeValidationError"){
    const errors = err.errors.map(e => e.message)
    return res.status(400).json({error: errors}) 
  }else if(err.name == 'Custom_Error'){
    return res.status(err.status).json({error: err.message})
  }else{
    return res.status(500).json({error: 'Internal Server Error'})
  }
}

module.exports = errorHandler