const AWS = require('aws-sdk');

const credentials = {
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
};

AWS.config.update({ region: 'us-west-2', credentials });

export default async function sendEmail(to, from, subject, data) {

  const { email } = data;

  const message = Object.keys(data).reduce((msg, key) => {
    msg += `${key.toUpperCase()}\n${data[key]}\n\n`
    return msg;
  }, '')

  const params = {
    Destination: {
      ToAddresses: [process.env.NEXT_PUBLIC_ADMIN_EMAIL]
    },
    Source: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
    ReplyToAddresses: [email],
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: message
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
  };

  return new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();
}
