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
        item: '',
        currentitem:{},
        searchbycountry: "",
        showModal: false,
        itemsdata: [],
        paginate: ['itemsdata']
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
                //this.cart = [];
                alert("Your cart is empty");
               },
               removeonefromcart: function(items){
                this.currentitem = items;
                var available = false;
                var oneitem = {product:items, quantity: 1}
                var eachitem = this.cart.forEach(cartitem=>{
                    if (cartitem.product.id == items.id){
                        cartitem.quantity--;
                        available = true;
                        console.log("First", cartitem.quantity);
                        if (cartitem.quantity < 0 || cartitem.quantity == 0) {
                            var output = "Product removed";
                            cartitem.quantity = output;
                        }
                    }
                });
               },
            load: function () { 
                var product = this;
                axios.get('https://erply-challenge.herokuapp.com/list?AUTH=fae7b9f6-6363-45a1-a9c9-3def2dae206d')
               .then(function (response){
                    product.itemsdata = (response.data);
                    itemsdata = product.itemsdata;
                    return itemsdata; 
               console.log("See items", itemsdata[0])
               })
               .catch(function (error){
                    product.errors.push(error);
               })
           }
       }
  });
