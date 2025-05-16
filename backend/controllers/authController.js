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



export const signup = async(req,res) => {
    console.log("Sign up Request -- recived")
    try{
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(404).json({
                status: 'fail',
                message: 'Incorrect call to backend.'
            })
        }

        let thisUser = await User.findOne({username:username});
        if(thisUser){
            return res.status(404).json({
                status: 'fail',
                message: 'User-already-exists'
            })
        }

        thisUser = new User({
            username,password
        })

        await thisUser.save()

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