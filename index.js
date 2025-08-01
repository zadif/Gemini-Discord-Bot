const { Client, GatewayIntentBits, ContextMenuCommandAssertions } = require('discord.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs=require("fs");
require('dotenv').config(); 
const { error } = require('console');
const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
const API_KEY = process.env.API_KEY;
const Discord_Key = process.env.Discord_Key;
console.log("Discord Key:", process.env.Discord_Key);


//determines the sensitivity of the messages , you can change it to make more safe
const safe = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_NONE",
    },
]

async function getResult(prompt , message){
    
    try {
          const genAI = new GoogleGenerativeAI(API_KEY);
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" , safe });
      
      const result = await model.generateContent([prompt + "(you are a discord bot , different users will be interacting with you)" ]);
      let AIresponse=result.response.text();
      
      return AIresponse;
    } catch (error) {
       console.log(error);
       return "Something went wrong";
    }
   
   
   }

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers

    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Event listener for new messages
client.on('messageCreate', message => {
    // Ignore messages from the bot itself
    if (message.author.bot) return;


    if(message.content.toLowerCase().includes("ai ")){
        getResult(message.content).then((response)=>{
            message.reply(respone);


        })
    }
})

client.login("MTM5NzU2Mzk1ODk1MjQ2NDYyNQ.GX__sr.u-UP80IkU-zPPVqOvORKr9jHvAIT7A2hh9pqiQ");


