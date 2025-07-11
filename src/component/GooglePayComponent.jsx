import React, { useEffect } from 'react';

const GooglePayComponent = () => {
  useEffect(() => {
    const paymentsClient = new window.google.payments.api.PaymentsClient({ environment: 'TEST' });

    const googlePayConfig = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [{
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example', // e.g., 'stripe', 'adyen'
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }],
      merchantInfo: {
        merchantId: '12345678901234567890', // Your merchant ID
        merchantName: 'Example Merchant'
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPrice: '1.00', // Example price
        currencyCode: 'USD'
      }
    };

    const button = paymentsClient.createButton({
      onClick: () => {
        paymentsClient.loadPaymentData(googlePayConfig)
          .then(paymentData => {
            console.log('Success', paymentData);
            // Handle the payment data (e.g., log it or display a message)
          })
          .catch(error => {
            console.error('Error', error);
          });
      }
    });

    document.getElementById('google-pay-button').appendChild(button);
  }, []);

  return (
    <div id="google-pay-button"></div>
  );
};

export default GooglePayComponent;
