let languages=['javascript','python','c#'];
console.log(languages);
console.log("Length is : ",languages.length);
console.log("0 index value is : ",languages[0]);

languages.push('dart');
console.log('After adding element at last',languages);

languages.unshift('java');
console.log('After adding element at begining',languages);

let removedElement=languages.pop();
console.log('After removing last element',languages)
console.log(removedElement)

removedElement= languages.shift();
console.log('After removing first element',languages)
console.log(removedElement)

// loop
let ntimes=10;
for(let i=0;i<ntimes;i++){
    console.log("*");
}

let actors=[
    {name:'Actor One',payment:100},
    {name:'Actor Two',payment:200},
    {name:'Actor Three',payment:150},
]
let overActingDeduction=10;
for(let i=0;i<actors.length;i++){
    actors[i].payment-=10;
}
console.log(actors)

//foreach
actors.forEach((actor)=>{
    actor.payment-=overActingDeduction
})
console.log(actors)

// for of
for(let actor of actors){
    console.log(actor)
}

// filter - jo element nhi chaiye nikal skte hain.
//      true ya false k hisab se new array return hogi
// in the arrow function we are getting - item,index,array
// original values ko kuch nhi hota hai . filtered element ko hum ek another variable me store kr lete hain.
let students=[
    {name:'Student One' , marks:60},
    {name:'Student Two' , marks:35},
    {name:'Student Three' , marks:45}
]
let faliedStudents=students.filter((student)=>{
    //return true;
    return student.marks<45;
});
let passStudents=students.filter((student)=>student.marks>=45)
console.log("Fail Students",faliedStudents)
console.log("Pass Students",passStudents)

//map - original array ko modify krke new array return kregi
// originsl values ko kuch nhi hota hai .
let users=[
    {id:1, firstName:'Kumar', lastName:'Saurav'},
    {id:2, firstName:'Abhishek', lastName:'Jain'},
    {id:3, firstName:'John', lastName:'Doe'},
]
const userFullName=users.map((user)=>{
    return {fullName:user.firstName+' '+user.lastName}
})
console.log('Full Names of users : ',userFullName)

//reduce
const movies=[
    {name:'Intersteller',budget:100},
    {name:'Social',budget:150},
    {name:'Matrix',budget:300},
]
//We want the total budget
//We can do it by foreach too.
let totalBudget=0;
movies.forEach((movie)=>{
    totalBudget+=movie.budget
});
console.log("Total Budget using forEach : ",totalBudget)
// Same thing using reduce
totalBudget=movies.reduce((acc,movie)=>{
    return acc+=movie.budget
},0)// 0 in the initialvalue
console.log("Total Budget using reduce : ",totalBudget)

// indexOf
const admins=[1,2,5];
const user1={
    name:'XYZ',id:5
}
const user2={
    name:'ABC',id:6
}
console.log("Is Admin",admins.indexOf(user1.id)) // returns index of admins array 
console.log("Is Admin",admins.indexOf(user2.id)) // returns -1 if id doesnot exist in admins array.

//includes
console.log("Is Admin",admins.includes(user1.id))
console.log("Is Admin",admins.includes(user2.id))

//find
const userTwo=users.find((user)=>{
    return user.id===2
});
console.log(userTwo)

//Sort
const names=['John','Jane','Shyam','Ram','Sameer','Mansi']
names.sort();
console.log(names);

//Splice
names.splice(2,1);
console.log(names);