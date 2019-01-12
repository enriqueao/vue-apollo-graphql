<template>
  <div class="container">
    <div class="input-group mb-3 col-sm">
        <input v-model="description" placeholder="Busca un Producto" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    </div>
    <!-- <p>
      {{product}}
    </p> -->
    <div class="row">
        <div v-for="item in product" v-bind:key="item._id" class="col-sm">
            <div class="card">
                <img :src="item.pic" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{ item.prices[0].market.marketName }}</h5>
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
        }
    },
    methods: {
        search: function () {
            this.msg = this.name
        }
    }
}
</script>
