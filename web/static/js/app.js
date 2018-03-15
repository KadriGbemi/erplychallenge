import Vue from "vue";


import axios from "axios";
var product = new Vue({
    el:'#shop-app',
    data: {
        listsgrid: [],
        errors: [],
        cart: [],
        currentitem:{},
        searchbycountry: "", 
    },
    computed: {
        findbycountry: function () {
            let findbycountry = this.listsgrid.filter((country) => {
                return country.store.toLowerCase().includes(this.searchbycountry.toLowerCase()) && country.instock == true 
            }) 
            let orderbycountry= findbycountry.sort((a, b) => {
                return b.name - a.name;
            }) 
            return orderbycountry;
            },    
    }, 
        mounted: function () {
            console.log("1....");
             this.load();
        },
        methods: {
            addtocart: function (country) {
                this.currentitem = country;
                var found = false;
                var item = {product:country, quantity:1}
                this.cart.forEach(cartItem=>{
                    if (cartItem.product.id==country.id){
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
                   console.log("Size",this.cart.length);
                     return this.cart.length;
               },

            // getCartSizeitem: function(count){
            //    var count = 0;
            //    count++;
            // }, 
          
               removefromcart:function(country){
                this.currentitem = country;
                   this.cart.splice(this.cart.indexOf(country),1);
               },
            load: function () {          
                var product = this;
                console.log("1....");
                axios.get('https://erply-challenge.herokuapp.com/list?AUTH=fae7b9f6-6363-45a1-a9c9-3def2dae206d')
               .then(function (response){
                    product.listsgrid = (response.data);
                    listsgrid = product.listsgrid; 
                   console.log(listsgrid[0].name);
               })
               .catch(function (error){
                    product.errors.push(error);
               })
           } 
       }
  });
