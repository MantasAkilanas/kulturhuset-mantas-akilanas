let adjson = require("../data/ad.json");

class AdModule {
    constructor() {
        this.values = []
        this.maxValue = 0;
        this.startValue = 0;
        adjson.forEach((element, index) => {
            this.maxValue = this.startValue + element.paid;
            this.values.push({ start: this.startValue, max: this.maxValue })
            this.startValue = this.maxValue;
        });
        this.maxValue= this.startValue;
        this.currentAd = Math.floor((Math.random() * this.maxValue) + 1);
        
        this.values.forEach((element, index) => {
            if (this.currentAd <= element.max && this.currentAd >= element.start) {
                console.log(adjson[index].name)
            }
        })
    }
}
new AdModule();