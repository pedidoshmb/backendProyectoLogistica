const bcrypt = require("bcrypt");

if (process.argv.length < 4) {
  console.log("Uso: node test-hash.js <password> <hash>");
  process.exit(1);
}

const password = process.argv[2];
const hash = process.argv[3];

console.log("Password:", password);
console.log("Hash:", hash);

bcrypt.compare(password, hash, (err, isMatch) => {
  if (err) {
    console.error("Error en bcrypt.compare:", err);
    process.exit(2);
  }
  if (isMatch) {
    console.log("✅ La contraseña COINCIDE con el hash.");
  } else {
    console.log("❌ La contraseña NO coincide con el hash.");
  }
});
