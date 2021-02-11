import {draw} from "./lottery.js";

export class LotteryViewModel {
    constructor() {
        this.numbers = ko.observableArray([]);
        this.drawNumbersAlternative = this.drawNumbersAlternative.bind(this);
    }
    drawNumbers = () => {
        draw().then( nums => this.numbers(nums) )
            .catch( err => console.error(err) )
    }
    async drawNumbersAlternative(){
        let nums = await draw(); // blocking
        this.numbers(nums);
    }

}