import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dns.lookup("google.com", (err, address, family) => {
  console.log(err);
  console.log("Address:", address);
  console.log("IPv Family:", family);
});
