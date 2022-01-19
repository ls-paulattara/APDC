
   
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

const APDC_LS_API_KEY = "projects/929241011807/secrets/APDC_LS_API_KEY/versions/latest";
const CALENDLY_API_TOKEN = "projects/929241011807/secrets/APDC_CALENDLY_API_TOKEN/versions/latest";

async function getLSAPICredentials() {

    const [version] = await client.accessSecretVersion({
        name: APDC_LS_API_KEY,
    });
    return version.payload.data.toString();
}
async function getCalendlyCredentials() {

    const [version] = await client.accessSecretVersion({
        name: CALENDLY_API_TOKEN,
    });
    return version.payload.data.toString();
}
module.exports = { getLSAPICredentials, getCalendlyCredentials };


