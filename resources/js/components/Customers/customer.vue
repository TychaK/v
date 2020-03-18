<template>
    <div>
        Vehicles:
        <div v-for="(vehicle, index) in vehicles" :key="index">
            {{vehicle.brand}} : {{vehicle.total}}
        </div>
        <div v-if="errors" v-for="error in errors" class="alert alert-danger">
            {{error}}
        </div>
        <div v-if="purchases" v-for="purchase in purchases">
            {{purchase}}
        </div>
        <form @submit="buyVehicle">
            <select :name="brand" :id="brand" v-model="brand" required>
                <option v-for="(vehicle, index) in vehicles" :value="index">
                    {{vehicle.brand}}
                </option>
            </select>
            <input type="text" :id="number" :name="number" v-model="number" required>
            <button type="submit">Buy</button>
        </form>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                brand: '',
                number: ''
            }
        },
        computed: {
            vehicles() {
                return this.$store.state.vehicles
            },
            errors() {
                return this.$store.state.errors
            },
            purchases() {
                return this.$store.state.purchases
            }
        }, methods: {
            buyVehicle: function (e) {
                e.preventDefault();
                let purchasePayload = {
                    brand: this.brand,
                    number: this.number
                };
                this.$store.dispatch('buyCar', purchasePayload);
            }
        }
    }
</script>
