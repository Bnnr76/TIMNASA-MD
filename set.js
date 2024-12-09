const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkxxMzlKeXU5bnBWR2ljSExkMHNWRlgyWFV1a3A0cEcxN3NLS0NobkFYND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQys5SWVhaTZHd1BpdDE1SVRpeDJVM1FlU0F0WjljSVVJM1FTT1hiRzR6UT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnS1hTcWprNzQxb0Y2OUVYaDBsMlFZNnBPNkFxMWR4R1d4c1RYekNkMWtNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5b2YybERCeTFWWFBkcnlXWEVWeHVoUG5qWVVybFErRWJQODN0bnJHK0RBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVEZ1gyeElhQXY2dG5UdDgwTC9OamRtZVJROWF4Q0NJdkFwSXluNUFnMHc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldNOWpoQTBNOEIxQ0NTdHVNS0hmZ2dTMzJPeU1NVGZWY0RpdG0zSk5xZ1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0tpbkgrVEN3d1hKZW5Ea1BqQnJMS0pmZmlTbkNZQ2pmeGtOeXY5OExVOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRWYvS29LdDJ1dzdNN0NvNndNV3IxekRMTmhGWUZrUlNhUVl3SmFSc0JoMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFMbmpwUDU2VmhiQVNFMi9GaE9mTHFFNnhoTmVPVnYram5QMnh4VXFZd2VJbmQyWlRGN0xvUm02TlM4ZXBRRlRwZFFlZHdINkJRZW5CL3dxcjl1TkNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM3LCJhZHZTZWNyZXRLZXkiOiJqcnB5MzkzZkJIQk5nMVE3VWZqTHhhMnJrNzFrUmpsNkJBc3YzcUFwV0NFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJGNGdUcWpfMFIzLVRqVUJiMjZSeU5BIiwicGhvbmVJZCI6IjQ3YWE3ZjdjLWIxNDYtNDU5MS04NWVhLTNkOGU5MDRmNzZlNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQbG1xYW5vQzZwTk10c3ErcDQrMVJRV0laOEk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieTlHNDdGU0owS0pHZG96K2RXaHAxTjFPbzFRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlA0QzNLUlBHIiwibWUiOnsiaWQiOiI5MjMyMjUyOTQ2MDU6MTZAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ052SXE0SUVFTzNzMjdvR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlhKTVNUYzdMQTREd0N3M1VJOWZCWWsyWWQ5bjNvdjE0dDhNcGtiZjhPeVU9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImlpbUo2Q2dITWxaMDM1SkV4T2Vld3FPZVNhZkZvUnRLRjcrY3I0Uzc3bGxjazdpUjR5WCt2NnEyU2lwM0U1ZytqWUtuYThMWTJTZVphS3JMRTNNQ0NBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJRODZmUERRZThsUGJRN1orYml0ZER4UmhJRzFkNUVMZm5RQms4YTRLMUN5dTZ5cmxKQis0Z25qcTVuOWg1a25QQk80cHd2dDJ5RUt0c0s1NXFLcUdDdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzIyNTI5NDYwNToxNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWeVRFazNPeXdPQThBc04xQ1BYd1dKTm1IZlo5Nkw5ZUxmREtaRzMvRHNsIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMzNzUyNDU2fQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "TIMNASA",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255784766591",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TIMNASA Md ',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/347ba7a613b4d025b89a8.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
