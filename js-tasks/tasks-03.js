// https://www.codewars.com/kata/geometry-basics-circle-circumference-in-2d/train/javascript

function circleCircumference(circle) {
    return 2 * Math.PI * circle.radius;
  }

  // https://www.codewars.com/kata/training-js-number-12-loop-statement-for-dot-in-and-for-dot-of/train/javascript

  function giveMeFive(obj){
    let result = [];
    for (const value in obj) {
      if(value.length === 5){
        result.push(value);
      }
      if(obj[value].length === 5){
        result.push(obj[value]);
      }
    }
    return result;
  }