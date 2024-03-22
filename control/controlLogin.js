const login= require("../module/login");
class loginController{
    static async verficontrol(req,res){
      const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
        
        
        var [data] = await login.verfie(id,password);
        if (data) {
            res.status(200).json({
             message : "good"
            } )
            console.log(data);
            return 
           } else {
             res.status(401).json({ error: 'Invalid username or password' });
             return
           }
       
     
       
       };


    }
    module.exports=loginController;