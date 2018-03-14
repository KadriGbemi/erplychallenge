import Vue from "vue";

import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);

import axios from "axios";
var product = new Vue({
    el:'#shop-app',
    data: {
        searchbyinstock: 'true',
        listsgrid: [],
        errors: [],
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
         
        created: function () {
             this.load();
        },
        methods: {
            load: function () {          
            var product = this;
               axios.get('https://erply-challenge.herokuapp.com/list?AUTH=fae7b9f6-6363-45a1-a9c9-3def2dae206d')
               .then(function (response){
                    product.listsgrid = (response.data);
                    const listsgrid = product.listsgrid; 
                   console.log(listsgrid);
               })
               .catch(function (error){
                    product.errors.push(e);
               })
           } 
       }

  });
