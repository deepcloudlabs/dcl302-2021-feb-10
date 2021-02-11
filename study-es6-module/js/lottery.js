export async function draw(max=50,size=6){
    let numbers = [];
    while (numbers.length<size){
        let number = Math.floor(Math.random()*max)+1;
        if (numbers.includes(number)) continue;
        numbers.push(number);
    }
    numbers.sort((x,y)=>x-y);
    return numbers;
}