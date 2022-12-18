const express = require("express");
const path = require("path")
const router = express.Router();

const data = require("../data");
const bmicalculatorData = data.bmiCalculator;

router.get('/bmicalculator', async (req, res) => 
{
    res.render("bmi");
    //res.redirect('homePage');
});

router.post('/bmicalculator', async (req, res) => 
{
    try
    {
        const regex = /[!"#$%&'()*+,-/:;<=>?@[\]^_`{|}~]/g;

        let inputHeightRoute = req.body.inputHeight;
        let inputWeightRoute = req.body.inputWeight;

        if((inputHeightRoute.match("[a-zA-Z]") !== null) || (inputWeightRoute.match("[a-zA-Z]") !== null))
        {
            throw `Error : Input can only be Numeric`;
        }

        for(i=0; i<inputHeightRoute.length; i++)
        {
            if((inputHeightRoute.charCodeAt(i)<46) || (inputHeightRoute.charCodeAt(i)===47) || (inputHeightRoute.charCodeAt(i)<46))
            {
                throw `Error : Input can only be Numeric`;
            }

            if((inputHeightRoute.charCodeAt(i)<65) && (inputHeightRoute.charCodeAt(i)>57))
            {
                throw `Error : Input can only be Numeric`;
            }

            if((inputHeightRoute.charCodeAt(i)<97) && (inputHeightRoute.charCodeAt(i)>90))
            {
                throw `Error : Input can only be Numeric`;
            }

            if((inputHeightRoute.charCodeAt(i)<127) && (inputHeightRoute.charCodeAt(i)>122))
            {
                throw `Error : Input can only be Numeric`;
            }
        }

        for(i=0; i<inputWeightRoute.length; i++)
        {
            if((inputWeightRoute.charCodeAt(i)<46) || (inputWeightRoute.charCodeAt(i)===47) || (inputWeightRoute.charCodeAt(i)<46))
            {
                throw `Error : Input can only be Numeric`;
            }

            if((inputWeightRoute.charCodeAt(i)<65) && (inputWeightRoute.charCodeAt(i)>57))
            {
                throw `Error : Input can only be Numeric`;
            }

            if((inputWeightRoute.charCodeAt(i)<97) && (inputWeightRoute.charCodeAt(i)>90))
            {
                throw `Error : Input can only be Numeric`;
            }

            if((inputWeightRoute.charCodeAt(i)<127) && (inputWeightRoute.charCodeAt(i)>122))
            {
                throw `Error : Input can only be Numeric`;
            }
        }

        /*if((inputHeightRoute.match(regex) !== null) || (inputWeightRoute.match(regex) !== null))
        {
            throw `Error : Input can only be Numeric`;
        }*/

        if(inputHeightRoute > 3.0)
        {
            throw `Error : Input Height should be in Meters and not over 3.0m`;
        }

        if(inputHeightRoute < 0.5)
        {
            throw `Error : Input Height should be in Meters and not below 0.5m`;
        }

        if(inputWeightRoute < 1)
        {
            throw `Error : Input Weight should be in kg and not below 1kg`;
        }

        const bmiValueTemp = bmicalculatorData.BMICalculator(req.body.inputHeight, req.body.inputWeight);
        const bmiValue = bmiValueTemp.toString();
        
        if (bmiValueTemp < 19) 
        {
            res.render("bmi", {bmiComputed : bmiValue, bmiResult : "Underweight", title : "BMI Calculator"}); 
        } 
        else if (19 <= bmiValueTemp && bmiValueTemp < 25) 
        {
            res.render("bmi", {bmiComputed : bmiValue, bmiResult : "Normal Weight", title : "BMI Calculator"}); 
        } 
        else if (25 <= bmiValueTemp && bmiValueTemp < 30) 
        {
            res.render("bmi", {bmiComputed : bmiValue, bmiResult : "Overweight", title : "BMI Calculator"}); 
        } 
        else 
        {
            res.render("bmi", {bmiComputed : bmiValue, bmiResult : "Obese", title : "BMI Calculator"}); 
        }
    }
    catch (error)
    {
        //res.redirect('/homePage');
        //res.status(404).send(error);
        res.render("bmi", {Error : error});
        
    }
});

module.exports = router;