const express=require("express");
const request=require("request");
const bodyParser=require("body-parser");
const https=require("https");

const port=3000;
const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){

    const firstName=req.body.fName;
    const secondName=req.body.lName;
    const email=req.body.email;

    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: secondName
                }

            }
        ]

    };
    const jsonData=JSON.stringify(data);

    const url="https://us14.api.mailchimp.com/3.0/lists/fa5f02f6d5";

    const options={
        method:"POST",
        auth:"abhi1:a3031102b1db3d8d0e5a22501abdbe8d-us14"
    }

    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();


    // console.log(firstName,secondName,email)
});

app.post("/failure",function(req,res){
    res.redirect("/");
});



app.listen(port,function(){
    console.log(`Server is running on port ${port}`);
});




//List id-> fa5f02f6d5
//API Key -> a3031102b1db3d8d0e5a22501abdbe8d-us14