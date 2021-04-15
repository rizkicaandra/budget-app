function twonums(input, target){
  let firstData = 0;
  let result = []
  for(let i = 0; i < input.length; i++){
    firstData = input[i]
    for(let j = i + 1; j < input.length; j++){
        if(input[i] + input[j] === target){
          result.push(i)
          result.push(j)
          break;
        }
    }
    if(result.length !== 0){
      break;
    }
  }
  return result
}

let data1 = [2,7,11,15]
let target1 = 13
let data2 = [3,2,4]
let target2 = 6
let data3 = [3,3]
let target3 = 6

let example1 = twonums(data1, target1)
let example2 = twonums(data2, target2)
let example3 = twonums(data3, target3)

console.log('Example 1:')
console.log(`input: `, data1, `, target = ${target1}`)
console.log('output:', example1)
console.log(`output: Because nums[${example1[0]}] + nums[${example1[1]}] === ${target1}, we return`, example1)

console.log('Example 2:')
console.log(`input: `, data2, `, target = ${target2}`)
console.log('output: ', example2)
console.log(`output: Because nums[${example2[0]}] + nums[${example2[1]}] === ${target2}, we return`, example2)

console.log('Example 3:');
console.log(`input: `, data3, `, target = ${target3}`)
console.log('output: ', example3)
console.log(`output: Because nums[${example3[0]}] + nums[${example3[1]}] === ${target3}, we return`, example3)