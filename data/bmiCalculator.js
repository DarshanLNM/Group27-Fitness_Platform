function BMICalculator(height, weight)
{
    const regex = /[!"#$%&'()*+,-/:;<=>?@[\]^_`{|}~]/g;

        if((height.match("[a-zA-Z]") !== null) || (weight.match("[a-zA-Z]") !== null))
        {
            throw `Error : Input can only be Numeric`;
        }

        //For InputHeight Error Checking

        for(i=0; i<height.length; i++)
        {
            if((height.charCodeAt(i)<46) || (height.charCodeAt(i)===47) || (height.charCodeAt(i)<46))
            {
                throw `Error : Input can only be Numeric`;
            }

            if((height.charCodeAt(i)<65) && (height.charCodeAt(i)>57))
            {
                throw `Error : Input can only be Numeric`;
            }

            if((height.charCodeAt(i)<97) && (height.charCodeAt(i)>90))
            {
                throw `Error : Input can only be Numeric`;
            }

            if((height.charCodeAt(i)<127) && (height.charCodeAt(i)>122))
            {
                throw `Error : Input can only be Numeric`;
            }
        }

        //For InputWeight Error Checking

        for(i=0; i<weight.length; i++)
        {
            if((weight.charCodeAt(i)<46) || (weight.charCodeAt(i)===47) || (weight.charCodeAt(i)<46))
            {
                throw `Error : Input can only be Numeric`;
            }

            if((weight.charCodeAt(i)<65) && (weight.charCodeAt(i)>57))
            {
                throw `Error : Input can only be Numeric`;
            }

            if((weight.charCodeAt(i)<97) && (weight.charCodeAt(i)>90))
            {
                throw `Error : Input can only be Numeric`;
            }

            if((weight.charCodeAt(i)<127) && (weight.charCodeAt(i)>122))
            {
                throw `Error : Input can only be Numeric`;
            }
        }

        /*if((inputHeightRoute.match(regex) !== null) || (inputWeightRoute.match(regex) !== null))
        {
            throw `Error : Input can only be Numeric`;
        }*/

        if(height > 3.0)
        {
            throw `Error : Input Height should be in Meters and not over 3.0m`;
        }

        if(height < 0.5)
        {
            throw `Error : Input Height should be in Meters and not below 0.5m`;
        }

        if(weight < 1)
        {
            throw `Error : Input Weight should be in kg and not below 1kg`;
        }

    let sqHeight = height*height;

    let bmiValue = weight/(sqHeight);
    let bmiValueRounded = bmiValue.toFixed(1);
    
    return bmiValueRounded;
}

module.exports= 
{
    BMICalculator
};