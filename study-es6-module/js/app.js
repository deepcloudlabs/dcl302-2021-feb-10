import {LotteryViewModel} from "./model.js";

window.onload = () => {
    ko.applyBindings(new LotteryViewModel())
};