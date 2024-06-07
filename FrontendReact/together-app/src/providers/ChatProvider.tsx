import { HubConnectionBuilder } from '@microsoft/signalr';

const connection = new HubConnectionBuilder()
  .withUrl('https://localhost:7241/chatHub')
  .withAutomaticReconnect()
  .build();

connection.start()
  .then(() => console.log('Connection started!'))
  .catch(err => console.log('Error while establishing connection :(', err));

const sendMessage = async (chatRoomId:number, message:string) => {
  await connection.invoke('SendMessage', chatRoomId, 'userId', message);
};
