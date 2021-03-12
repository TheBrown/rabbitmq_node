const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
    if (err) throw err;

    connection.createChannel((error1, channel) => {
        if (error1) throw error1;


        const queue = "hello";

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, (msg) => {
            console.log(" [x] Receive %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});