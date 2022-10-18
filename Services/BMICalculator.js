const eBMIStatus = {
    OverWeight: "Overweight",
    UnderWeight: "Underweight",
    NormalWeight: "Normalweight"
}

const BMIResultService = {
    
    BMIValue: 0,
    BMIStatus: eBMIStatus.NormalWeight,

    updateBMIResult: async function(weight, height) {
        
        this.BMIValue = await (weight/(height * height));

        let DetermineBMIStatus = (BMIValue) => {

            //values obtained from: https://www.cdc.gov/healthyweight/assessing/index.html#:~:text=If%20your%20BMI%20is%20less,falls%20within%20the%20obese%20range.
            if (BMIValue < 18.5) {
                this.BMIStatus = eBMIStatus.UnderWeight;
            } else if (BMIValue >= 18.5 && BMIValue < 24.9) {
                this.BMIStatus = eBMIStatus.NormalWeight;
            } else {
                this.BMIStatus = eBMIStatus.OverWeight;
            }
        }

        DetermineBMIStatus(this.BMIValue);

    },

    get GetBMIValue() {
        return this.BMIValue.toPrecision(1);
    },

    get GetBMIStatus() {
        return this.BMIStatus;
    }
}

module.exports = BMIResultService;