// const client = new Paho.MQTT.Client("ws://iot.eclipse.org/ws", "myClientId" + new Date().getTime());
// const myTopic = "Tapped";

// client.onMessageArrived = onMessageArrived;

// client.onConnectionLost = onConnectionLost;

// function onConnectionLost(responseObject) {
//     if (responseObject.errorCode !== 0) {
//         console.log("onConnectionLost:" + responseObject.errorMessage);
//     }
//     client.connect({ onSuccess: onConnect });
// }
// client.connect({ onSuccess: onConnect })
// function onConnect() {
//     console.log("Connection Successful")
//     client.subscribe(myTopic)
// }

// function onMessageArrived(mess) {
//     var table = document.getElementById("myTable");
//     var row = table.insertRow(0);
//     row.innerHTML = mess.payloadString;
// }

var client  = mqtt.connect('ws://iot.eclipse.org/ws')
 
client.on('connect', function () {
  client.subscribe('Tapped', function (err) {
    if (err) {
      console.log('Error')
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})