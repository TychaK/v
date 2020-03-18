import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    name: 'Vehicle',
    state: {
        // do ajax to get vehicles state
        vehicles: {
            0: {
                brand: 'toyota',
                total: 500
            },
            1: {
                brand: 'volkswagen',
                total: 40
            },
            2: {
                brand: 'bmw',
                total: 46
            }
        },
        errors: [],
        purchases: []
    },
    getters: {},
    mutations: {
        //    updating the information only... no logic
        removeCar(state, purchaseDetails) {
            state.vehicles[purchaseDetails.brand].total -= purchaseDetails.number;
        },
        pushErrorMessage(state, error) {
            state.errors.push(error);
        },
        addPurchase(state, purchaseDetails) {
            state.purchases.push(purchaseDetails)
        }
    },
    actions: {
        // handle business logic...
        buyCar(context, purchaseDetails) {
            if (context.state.vehicles[purchaseDetails.brand].total >= purchaseDetails.number) {
                context.commit('removeCar', purchaseDetails)
                let successfulPurchase = "You have successfully purchased " + purchaseDetails.number + " " + context.state.vehicles[purchaseDetails.brand].brand + "s";
                context.commit('addPurchase', successfulPurchase);
            } else {
                let errorMessage = "Purchase for " + purchaseDetails.number + " " + context.state.vehicles[purchaseDetails.brand].brand + "s is not possible. Please try again using " + context.state.vehicles[purchaseDetails.brand].total + " " + context.state.vehicles[purchaseDetails.brand].brand + "s";
                // context.state.errors.push("Purchase for " + purchaseDetails.number + " " + context.state.vehicles[purchaseDetails.brand].brand + "s is not possible");
                context.commit('pushErrorMessage', errorMessage);
            }
        }
    }
})
