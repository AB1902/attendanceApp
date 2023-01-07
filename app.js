const express=require('express')
const app=express()
const connectDB=require('./config/db')
const Student=require("./models/studentAttendance")
const cors=require('cors')
connectDB()

app.use(cors())
app.use(express.json())

app.get("/",async(req,res) => {
    let student=await Student.find()
    res.json({student})
})

app.post("/",async(req,res) => {
    try {
        const {studentName,rollNo,date,checkInTime,checkOutTime,inSchool} =req.body
        let student=await Student.findOne({rollNo})
        if(student){
            res.status(400).json({message:'student already in database'})
            return
        }
        student=new Student({
            studentName,rollNo,date,checkInTime,checkOutTime,inSchool
        })
        await student.save()
        res.json({message:'student successfully added to database'})
    } catch (error) {
        res.json({error:error.message})
    }
})


app.put("/checkIn",async(req,res) => {
    try {
        const {rollNo,checkInTime} =req.body
        const student= await Student.findOne({rollNo})
        if(!student)
            res.json({message:'wrong roll number'})
        Student.findOneAndUpdate({rollNo},{$set:{inSchool:true,checkInTime}},(err,res) => {
            if(err)
                res.json({error:err.message})
            console.log(res)
        })
        res.json({message:'updated'})
    } catch (error) {
        res.json({error:error.message})
    }
})

app.put("/checkOut",async(req,res) => {
    try {
        const {rollNo,checkOutTime} =req.body
        const student= await Student.findOne({rollNo})
        if(!student)
            res.json({message:'wrong roll number'})
        Student.findOneAndUpdate({rollNo},{$set:{inSchool:false,checkOutTime}},(err,res) => {
            if(err)
                res.json({error:err.message})
            console.log(res)
        })
        res.json({message:'updated'})
    } catch (error) {
        res.json({error:error.message})
    }
})

app.get("/inSchool",async(req,res) => {
    try {
        let student=await Student.find({inSchool:true})
        const noOfStudents=student.length
        res.json({student,noOfStudents})
    } catch (error) {
        res.json({message:error.message})
    }
})


app.listen(PORT=1902,() => {
    console.log("server started")
})