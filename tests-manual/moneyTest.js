import {formatMoney} from '../scripts/utils/money.js';
console.log('test suite : formatMoney');

console.log('converts cents into dollars');
if(formatMoney(2095) === '20.95') {
    console.log("Passed");
} else {
    console.log("Failed");
}

console.log('works with 0');
if(formatMoney(0) === '0.00') {
    console.log("Passed");
} else {
    console.log("Failed");
}

console.log('rounds up to the nearest cent');
if(formatMoney(2000.5) === '20.01') {
    console.log("Passed");
} else {
    console.log("Failed");
}