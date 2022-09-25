const {AuthApi, PaymentApi, PayoutApi} = require('@akanta21/sdk-triplea-js')


async function login() {
    const authApi = new AuthApi()
    try{
        const response = await authApi.authorizeUser('{{client-id}}', '{{client_secret}}', 'client_credentials')
        return response.data
    } catch(err){
        console.log('err', err)
    }
}

async function createPayment(){
    const paymentApi = new PaymentApi()
    try {
        const body = {
            "type": "widget",
            "merchant_key": "{{merchant_key}}",
            "order_currency": "USD",
            "order_amount": 10,
            "payer_id": "{{payer_id}}"
        }

        const response = await paymentApi.createPaymentRequest(body,{headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer {{token_response_during_login}}'
        }})
        return response.data
    }catch(err){
        console.log('err', err)
    }
}

async function getPayoutBalance(){
    const payoutApi = new PayoutApi()
    try {

        const response = await payoutApi.getPayoutBalance({headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer {{token_response_during_login}}'
        }})
        return response.data
    }catch(err){
        console.log('err', err)
    }
}

(async () => {
    try {
        const text = await getPayoutBalance();
        console.log('text', JSON.stringify(text));
    } catch (e) {
        console.log('e', e)
    }
})();