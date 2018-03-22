import Vue from "vue"

import axios from "axios"

import VuePaginate from 'vue-paginate'

Vue.use(VuePaginate)
  
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
        itemsdata: [],
        recentitem:[],
        paginate: ['itemsdata'],
        show: true,
        seen: true,

    
    },
      computed:{
        filteredItems() {
            return this.itemsdata.filter(item => {
                return item.store.toLowerCase().includes(this.searchbycountry.toLowerCase()) && item.instock == true
            })
            let orderbycountry= paginate.sort((a, b) => {
                return b.name - a.name;
            }) 
            return orderbycountry;
          }
      },
        mounted: function () {
             this.load();
        },
      
        methods: {
            addtocart: function (items) {
                this.currentitem = items;
                 var found = false;
                var item = {product:items, quantity:1};
                var eachitem = this.cart.forEach(cartItem=>{
                    if (cartItem.product.id === items.id){
                       var output= cartItem.quantity++;
                      found = true;           
                    }
                });
                if(!found){
                    this.cart.push(item);
                }           
                this.getCartSize(item);
                this.saveCart();
               },
              getCartSize: function(){
                return this.cart.length;
               }, 
               saveCart: function(){
                localStorage.setItem("cart", JSON.stringify(this.cart));
               },
                carttotal: function (){ 
                   var total = 0;
                     for(var i = 0; i < this.cart.length; i++){
                         total += this.cart[i].product.price * this.cart[i].quantity;
                    }
                return total;  
            },
            increaseitem: function(item){
                    this.increaseitem = item;
                    var increase = item.quantity += 1;              
                    this.saveCart();                  
            },
            reduceitem: function(item){
                this.removeitem = item;
                if(item.quantity > 1){
                    var reduce = item.quantity -= 1;              
                }
                else {
                    this.removeonefromcart(item);
                }              
                this.saveCart();
            },
            removeonefromcart: function(item) {
                this.removeitem = item;
                var allofcart = this.cart.splice(this.cart.indexOf(item), 1);
                this.saveCart();
            },
            removeallfromcart:function(items){
                this.current = items;
                this.cart = [];
                this.saveCart();
               },    
            load: function () { 
               if(localStorage.getItem("cart")!=null){
                     this.cart = JSON.parse(localStorage.getItem("cart"));
                 }
                var product = this;
                axios.get('https://erply-challenge.herokuapp.com/list?AUTH=fae7b9f6-6363-45a1-a9c9-3def2dae206d')
               .then(function (response){
                    product.itemsdata = (response.data);
                    itemsdata = product.itemsdata;
                    localStorage.setItem("items",itemsdata);
                    return itemsdata; 

                   var recentitem = this.product.itemsdata;
                   return recentitem;
                   
               })
               .catch(function (error){
                    product.errors.push(error);
               })
           },
          
       }
  });
