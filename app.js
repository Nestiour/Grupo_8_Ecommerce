const express= require('express');
const app= express();
const PORT=3001;
app.use(express.static('public'));
app.use('static', express.static(__dirname + '/public'));

app.listen(PORT,()=> 
{console.log("servidor iniciado en el port ",PORT)});

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/views/home.html')
});

