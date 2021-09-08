exports.successful_returns = async (req, res, data) => {
    try {
        return res.status(200).json({
            status: "success",
            data
        });
        
    } catch(err) {
        console.log(err)
    }
}

//this function will return all validation errors responses
exports.validationErrors = async function(req, res, message) {
    try{
        return res.status(400).json({
            status: "failed",
            data: {
                message
            }
        })
    }catch(err){
        console.log(err)
    }
}

//this function will return all server errors responses
exports.serverError = async function (req, res, err) {
    try {
       
        return res.status(500).json({
            status: "failed",
            data: {
                message: "Internal Server Error!",
            },
            serverMessage: err.message
        })
    } catch (err) {
        console.log(err)
    }
}

//this function will return am array of errors
exports.arrayValidationErrors = async function(req, res, errors) {
    try{
    
            return res.status(400).json({
                status:  "failed",
                data: {
                    message: errors
                }
            })
    } catch(err) {
        console.log(err)
    }
}