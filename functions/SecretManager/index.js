
   
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

const calendly_API_Credentials = "projects/929241011807/secrets/APDC-Credentials/versions/latest"

async function getCalendlyCredentials() {

    const [version] = await client.accessSecretVersion({
        name: calendly_API_Credentials,
    });
    const responsePayload = version.payload.data.toString();
    const {Calendly_API_Key} = JSON.parse(responsePayload)
    return {Calendly_API_Key};
}

// module.exports = {getCalendlyCredentials};


