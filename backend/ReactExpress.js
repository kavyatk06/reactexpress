
var mssql=require('mysql');
var exp=require('express');
var app=exp();
var bparser=require('body-parser');
var statusMessage;
bparserinit=bparser.urlencoded({extended:false});//to read the contents of the server       
var queryResult;
var cors=require('cors');
//initializing the express js
app.use(cors());
app.use(exp.json());
const mssqlconnection=mssql.createConnection({
    localhost:'localhost',
    user:'root',
    password:'root',
    database:'world',
    port:3306
});
 
 
 
 
function feedback(error){
    if(error != undefined){
        console.log(error);
 
    }
    else{
            console.log("open the browser");
    }
}
    function checkConnection(error){
        if(error!=undefined){
            console.log(error);
        }
        else{
            console.log("Connection established successfully");
        }
    }
    mssqlconnection.connect(checkConnection);
 
    function provideAllUser(error,result){
        queryResult=result;
        console.log(result);
 
    }
    function getAllUser(req,res){
             mssqlconnection.connect(checkConnection);
             mssqlconnection.query("Select * from  users",provideAllUser);
             res.send(queryResult);
    }
   function provideUser(error,result){
        queryResult = result;
        console.log(result);
    }
    function getUserById(req,res){
         var userId=req.query.id;
        mssqlconnection.query("SELECT * FROM Users WHERE userid=?",userId,provideUser);
        res.send(queryResult);
    }
 
    function provideInsertUser(error,result){
        statusMessage=(error == undefined) ? "inserted successfully</h1>" : "insertion failed";
        console.log(result);
    }
    function insertUser(req,res){
        var username=req.body.user;
        var password=req.body.password;
        var email=req.body.emailid;
        console.log(username+"\t\t"+password+"\t\t"+email);
        mssqlconnection.query("INSERT INTO Users (userid,password,emailid) VALUES (?,?,?)",[username,password,email],provideInsertUser);
        mssqlconnection.commit();
        res.send(JSON.stringify(statusMessage));
    }
 
    function provideUpdateUser(error,result){
        queryResult = result;
        console.log(result);
    }
 
    function updateUser(req,res){
        var username=req.body.username;
        var password=req.body.password;
        var email=req.body.email;
        //var id=req.body.id;
        mssqlconnection.query("UPDATE Users SET userid=?,password=?,emailid=? WHERE userid=?",[username,password,email,username],provideUpdateUser);
        mssqlconnection.commit();
        res.send(queryResult);
    }
 
    function deleteUser(req,res){
        var username=req.query.id;
        mssqlconnection.query("DELETE FROM Users WHERE userid=?",username);
        mssqlconnection.commit();
        res.send(queryResult);
    }
       
    app.get("/getAllUser",getAllUser);
    app.get("/getUserById",getUserById);
    app.post("/insertUser",bparserinit,insertUser);
    app.put("/updateUser",bparserinit,updateUser);
    app.delete("/deleteUser",deleteUser);
 
 
    app.listen(4000,feedback);
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 