const mongoose=require('mongoose')

const studentSchema=new mongoose.Schema({
    studentName:{
        type:String,
        required:true
    },
    rollNo:{
        type:String,
        required:true
    },
    date:{
        type:String,
    },
    checkInTime:{
        type:Number,
    },
    checkOutTime:{
        type:Number,
    },
    inSchool:{
        type:Boolean,
        default:false
    },
})

module.exports=mongoose.model('Student',studentSchema)