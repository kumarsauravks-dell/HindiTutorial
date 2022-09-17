import axios from 'axios';
const { toast, snackbar } = require('tailwind-toast')
let addToCart=document.querySelectorAll('.add-to-cart');
let cartCounter=document.querySelector('#cartCounter')


addToCart.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        let pizza=JSON.parse(btn.dataset.pizza)
        //console.log(pizza)
        updateCart(pizza);        
    })
})

function updateCart(pizza){
    axios.post('/update-cart',pizza).then(res=>{
        //console.log(res);
        cartCounter.innerText=res.data.totalQty
        toast()
        .success('Pizza added to cart','')
        .with({
        shape: 'square',
        duration: 2000,
        speed: 1000,
        positionX: 'end',
        positionY: 'top'
        }).show()
    }).catch(err=>{
        toast()
        .danger('Something went wrong','')
        .with({
        shape: 'square',
        duration: 2000,
        speed: 1000,
        positionX: 'end',
        positionY: 'top',
        color: 'bg-red-600'
        }).show()
    })
}