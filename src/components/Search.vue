<template>
  <div class="container">
    <div class="input-group mb-3 col-sm">
        <input @input="search" v-model="description" placeholder="Busca un Producto" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    </div>
    <!-- <p>
      {{product}}
    </p> -->
    <div v-if="loading" class="row justify-content-center">
        <img src="../assets/loading.svg" class="col-6">
    </div>
    <div v-if="!loading" class="row">
        <div v-for="item in product" v-bind:key="item._id" class="col-md-3">
            <div class="card">
                <img :src="item.pic" class="card-img-top" :alt="item.upc">
                <div class="card-body">
                    <h6 class="card-title">{{ item.prices[0].market.marketName }}</h6>
                    <h5 class="card-title">${{ item.prices[0].price }}</h5>
                    <p class="card-text">{{ item.description }}</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

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
            },800)
            setTimeout(()=>{
                this.loading = false
            },2400)
        }
    }
}
</script>
