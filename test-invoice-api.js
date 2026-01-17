import { whmcs } from './src/lib/whmcs.js';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
    try {
        const invoiceId = 4; // Based on the screenshot
        console.log(`Fetching invoice ${invoiceId}...`);
        const result = await whmcs.getInvoice(invoiceId);
        console.log('Result:', JSON.stringify(result, null, 2));

        if (result.paymentbutton) {
            console.log('Found payment button HTML!');
        } else {
            console.log('Payment button HTML not found in response.');
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

test();
