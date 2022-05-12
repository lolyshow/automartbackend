const { Validator } = require('node-input-validator');
const Car = require('../models/Car');
const {ResponsePayload } = require('../helper/helper');

const CreateCar =async(req,res)=>{
    const v = new Validator(req.body, {
        name:'required',
        description: 'required',
        amount:'required',
    });
    let validationFailed = true;
    await v.check().then((matched) => {
      if (!matched || !req.file.fieldname) {
        validationFailed = true;
      }else{
        validationFailed = false;
      }
    });

    if(validationFailed === true){
      res.status(422).send({...v.errors, status:303});
    }
    else{
      try {
        const {name,amount,description} = req.body;
        const car = new Car({
            name:name,
            amount: amount,
            description:description,
            image: req.file.filename
        });
        console.log("carCar",car);
        try{
            await car.save((error)=>{
                if(!error){
                    console.log("Successssss")
                    return res.status(200).json(ResponsePayload(200,"Saved Successfully"))
                }else{
                    console.log(error)
                    return res.status(400).json(ResponsePayload());
                }
            });
            // return res.status(200).json(ResponsePayload(200,"Car Saved"));
        }
        catch(error)
        {
            console.log(error)
            return res.status(400).json(ResponsePayload());
        }
        
      }catch(error){
        // console.log(error)
        return res.status(400).json({ message : "Technical Error. Please try again later"});
      }
    }
}




const FetchAllCars =async(req,res)=>{

    try{
        let {size,page} = req.body;
        if(!page){
            page = 1;
        }

        if(!size){
            size=8;
        }

        const limit  = parseInt(size);
        const skip = (page -1) * limit;
        
         try{
             const cars = await Car.find().limit(limit).skip(skip)//get paginated Products
             console.log("myCars",cars);
             let imagePath= {imagePath:"http://localhost:5000/image/"}
             

            //  console.log("MyBewCars",newCar)
             res.status(200).json(ResponsePayload(200,"Success",cars,imagePath))  
         }
         catch(error){
            
             console.log(error)
            res.status.json(ResponsePayload())
         }
    }
    catch(error){
        console.log(error)
    }
    
}


const JoinProductsWithUser =async(req,res)=>{

    try{
        Product.find({},(error,result)=>{
            if(error){
                console.log(error)
                res.status.json(ResponsePayload())
            }else{
                res.status(200).json(ResponsePayload(200,"Success",result))
            }
        })
        .populate({path:"createdBy",select:["name","email"]}) //returns only the selected columns
        // .populate("createdBy"); //this returns every thing 
    }
    catch(error){
        console.log(error)
    }
    
}

module.exports={
    CreateCar,
    FetchAllCars,
    JoinProductsWithUser
}

