const mongoose = require('mongoose');

async function main(){
await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
main().then(() => console.log('MongoDB connected')).catch(err => console.log(err));

const Chat = require('./models/chat.js')

Chat.insertMany([
{
from: "Alice",
to: "Bob",
msg: "Hey Bob! Are you free this evening?",
created_at: new Date(),

from: "Bob",