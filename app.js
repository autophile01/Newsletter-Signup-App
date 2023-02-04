const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){

    res.sendFile(__dirname+"/Signup.html");
});

app.post("/",function(req,res){
      var first=req.body.FirstName;
      var last=req.body.LastName;
      var email=req.body.Email;
      console.log(first,last,email);



var data={
    members:[
        {
    email_address:email,
    status:"subscribed",
    merge_fields:{
        FNAME:first,
        LNAME:last
    }
}
    ]
};

var jsonData=JSON.stringify(data);
var url="https://us21.api.mailchimp.com/3.0/lists/c576505cb0";

var options={
    method:"POST",
    auth:"angela1:01f1eb6d23322fd7244883959d715771"
}


// console.log(dataStringify);
var request=https.request(url,options,function(response){
        response.on("data",function(data){
            var dataParse=(JSON.parse(data));
            // console.log(dataParse);
            // console.log(response.statusCode);
            if(response.statusCode===200){
                res.sendFile(__dirname+"/success.html");
            }
            else{
                res.sendFile(__dirname+"/failure.html");
            }
        })
})
   request.write(jsonData);
   request.end();
});

app.post("/failure",function(req,res){
        // res.sendFile(__dirname+"/Signup.html");
        res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running smoothly on port 3000!");
});