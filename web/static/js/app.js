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
    watch: {
        cart: {
          handler() { console.log('Cart added!'); },
          deep: true,
        }
      },
      computed:{
        paginated: function (country) {
           let paginated = this.itemsdata.filter((item) => {
                return item.store.toLowerCase().includes(this.searchbycountry.toLowerCase()) && item.instock == true
            }) 
            let orderbycountry= paginate.sort((a, b) => {
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
                var item = {product:items, quantity:1};
                var eachitem = this.cart.forEach(cartItem=>{
                    if (cartItem.product.id === items.id){
                       var output= cartItem.quantity++;
                      found = true;
                        
                    }
                });
                if(!found){
                    this.cart.push(item);
                  //  this.saveCart();
                }
                this.getCartSize(item);

               },
            getCartSize: function(){
                return this.cart.length;
               }, 
                      
            carttotal: function (){ 
                   var total = 0;
                     for(var i = 0; i < this.cart.length; i++){
                         total += this.cart[i].product.price * this.cart[i].quantity;
                    }
                return total;   
            },
            removeonefromcart: function(item) {
                this.removeitem = item;
                var allofcart = this.cart.splice(this.cart.indexOf(item),1);
                localStorage.removeItem(item);
                this.saveCart();
            },
            removeallfromcart:function(items){
                this.current = items;
                this.cart = [];
                return alert("Your cart will be empty");
                localStorage.removeItem(items);
                this.saveCart();
               },    
            load: function () { 
                var product = this;
                axios.get('https://erply-challenge.herokuapp.com/list?AUTH=fae7b9f6-6363-45a1-a9c9-3def2dae206d')
               .then(function (response){
                    product.itemsdata = (response.data);
                    itemsdata = product.itemsdata;
                    localStorage.setItem(itemsdata);
                    return itemsdata; 

                   console.log("See items", itemsdata)
                   var recentitem = this.product.itemsdata;
                   return recentitem;

                   
               })
               .catch(function (error){
                    product.errors.push(error);
               })
           },
          
       }
  });
