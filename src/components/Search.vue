<template>
  <div style="heigth: 100%">
    <nav class="navbar navbar-light bg-light">
        <div class="navbar-brand">
            <img src="../assets/laptop.svg" width="30" height="30" class="d-inline-block align-top" alt="">
            Buscador de Productos
        </div>
    </nav>
    <div class="container-fluid" style="heigth: 70%">
        <div class="row justify-content-md-center">
            <div class="input-group mb-3 col-6 align-items-center" style="margin-top: 40px">
                <input @input="search" v-model="description" placeholder="Busca un Producto" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>
        </div>
        <div class="row justify-content-md-center">
            <div v-if="loading" class="d-flex align-items-center">
                <strong>Buscando... </strong>
                <div class="spinner-border" role="status" aria-hidden="true"></div>
            </div>
            <div v-if="product.length == 0 && !loading" class="d-flex align-items-center">
                <strong>Sin Resultados ☹️</strong>
            </div>
        </div>
        <div v-if="!loading" class="row">
            <div v-for="item in product" v-bind:key="item._id" class="col-md-2 col-sm-3 col-6 col-lg-2" style="margin-top: 20px">
                <div class="card">
                    <img :src="item.pic" class="card-img-top" :alt="item.upc">
                    <div class="card-body">
                        <p class="card-text">{{ item.description }}</p>
                        <div class="card">
                            <ul v-for="price in item.prices" v-bind:key="price._id" class="list-group list-group-flush">
                                <li class="list-group-item"><b>{{ price.market.marketName }}: </b>${{ price.price }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer class="page-footer font-small bg-dark">
        <div class="footer-copyright text-center py-3 text-white">© 2018 Copyright:
            <a href="https://github.com/enriqueao">Enrique Aguilar</a>
        </div>
    </footer>
  </div>
</template>


<style>
    footer {
        top: 170vh;
        width: 100%;
        height: 4rem;
        bottom: 0;
        position: absolute;
        margin-top: 20px;
    }
    .container-fluid{
        height: 100%;
    }
</style>



<script>
import gql from 'graphql-tag'

export default {
    name: 'search',
    apollo: {
        // Query with parameters
        product: {
            query: gql`query searchProduct($description: String!) {
                product(description: $description) {
                        id
                        description
                        pic
                        prices{
                        price
                        market {
                            marketName
                            marketLogo
                        }
                    }
                }
            }`,
            // Reactive parameters
            variables () {
                // Use vue reactive properties here
                return {
                    description: this.description,
                    limit: 5
                }
            },
        },
    },  
    data () {
        return {
            // Initialize your apollo data
            description: '',
            loading: false
        }
    },
    methods: {
        search: function () {
            setTimeout(()=>{
                this.loading = true
            }, 800)
            setTimeout(()=>{
                this.loading = false
            }, 2400)
        }
    }
}
</script>
