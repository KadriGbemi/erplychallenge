import Vue from "vue"

import axios from "axios"

import VuePaginate from 'vue-paginate'

Vue.use(VuePaginate)

Vue.component('modal', {
    template: '#modal-template'
})

var product = new Vue({
    el:'#shop-app',
    data: {
        errors: [],
        cart: [],
        layout: 'categorylist',
        oneitem: '',
        output: '',
        search: '',
        currentitem:{},
        searchbycountry: "",
        showModal: false,
        itemsdata: [],
        recentitem:[],
        paginate: ['itemsdata'],
        show: true,
        seen: true
    
    },
    computed: {
        findbycountry: function () {
            let findbycountry = this.itemsdata.filter((country) => {
                return country.store.toLowerCase().includes(this.searchbycountry.toLowerCase()) && country.instock == true 
            }) 
            let orderbycountry= findbycountry.sort((a, b) => {
                return b.name - a.name;
            }) 
            return orderbycountry;
            },
            carttotal: function (){ 
               
              let carttotal =  this.currentitem;
              var total = 0;             
                for(var i = 0; i < this.carttotal.length; i++) {
                    total += this.carttotal[i].price;
                }
                return carttotal;
              },
     }, 
        mounted: function () {
             this.load();
        },
      
        methods: {
            addtocart: function (items) {
                this.currentitem = items;
                var found = false;
                var item = {product:items, quantity:1}
                var eachitem = this.cart.forEach(cartItem=>{
                    if (cartItem.product.id == items.id){
                        cartItem.quantity++;
                        found = true;
                    }
                });
                if(!found){
                    this.cart.push(item); 
                }
                this.getCartSize();
               },
            getCartSize: function(){
                     return this.cart.length;
               },   
               removeallfromcart:function(items){
                this.currentitem = items;
                var allofcart = this.cart.splice(this.cart.indexOf(items),1);
                   return alert("Your cart will be empty");
               },

            removeonefromcart: function(item) {
                this.recentitem = item;
                if (item.quantity > 0){
                    item.quantity -=1;
                }
                    if(cart.length === 0){
                    {
                    var output="Your cart is empty";
                    return alert("Your cart will be empty");
                    }
                }
            },
            load: function () { 
                var product = this;
                axios.get('https://erply-challenge.herokuapp.com/list?AUTH=fae7b9f6-6363-45a1-a9c9-3def2dae206d')
               .then(function (response){
                    product.itemsdata = (response.data);
                    itemsdata = product.itemsdata;
                    return itemsdata; 

                   console.log("See items", itemsdata)
                   var recentitem = this.product.itemsdata;
                   return recentitem;

                   
               })
               .catch(function (error){
                    product.errors.push(error);
               })
           }
       }
  });
