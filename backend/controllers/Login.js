import User from "../models/User.js"

export const login = async(req,res) => {
    console.log("Login in Request -- recived")
    try{
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(404).json({
                status: 'fail',
                message: 'Incorrect call to backend.'
            })
        }

        const thisUser = await User.findOne({username:username});
        if(!thisUser){
            return res.status(404).json({
                status: 'fail',
                message: 'No-user-found'
            })
        }

        if(thisUser.password != password){
            return res.status(403).json({
                status: 'fail',
                message: 'Mismatch'
            })
        }

        return res.status(200).json({
            status: 'success',
            message: username
        })
    }   
    catch(error){
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    } 
}