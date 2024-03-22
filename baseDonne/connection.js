import mysql from "mysql"

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pfe'
});
connection.connect((err)=>{
    if(err){
        console.error("error"+err.stack);
        return;
    }
    console.log("conect bien");
})

export default  connection;