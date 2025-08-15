const bcrypt = require("bcrypt");

async function generarHash(password) {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    console.log("Hash generado:", hash);
  } catch (error) {
    console.error("Error generando hash:", error);
  }
}

generarHash("admin123");
