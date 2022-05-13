const { Validator } = require('node-input-validator');
const Car = require('../models/Cars');
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

    if(validationFailed === true || amount<1){
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
        // console.log("carCar",car);
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
            // console.log(error)
            return res.status(400).json(ResponsePayload());
        }
        
      }catch(error){
        // console.log(error)
        return res.status(400).json({ message : "Technical Error. Please try again later"});
      }
    }
}

const DeleteCar =async (req,res)=>{
    
    const { id } = req.body;
    console.log("IdToDelete",req.body);
    try{
        const cars = await Car.deleteOne({_id: id});
        if (cars.deletedCount === 1) {
            // console.log("Successfully deleted one document.");
            return res.json(ResponsePayload(200,"Deletion Successfully"))
          } else {
                return res.json(ResponsePayload(300,"No documents matched the query. Deleted 0 documents."));
          }
    }
    catch(error){
        console.log(error)
        return res.json(ResponsePayload());
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

module.exports={
    CreateCar,
    FetchAllCars,
    DeleteCar
    
}

