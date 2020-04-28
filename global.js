// change to true when in production environment
const prod = true;

export const http = prod ? "/api" : "http://localhost:3000";
export const front = prod ? "https://thehuskyhusky.com" : "http://localhost:8080";