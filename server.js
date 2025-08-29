const { exec } = require("child_process");
const express = require("express");
const fs = require("fs");

const app = express();

// ذخیره کانفیگ Xray در فایل
const config = {
  "inbounds": [
    {
      "port": process.env.PORT || 3000,   // Railway خودش PORT میده
      "protocol": "vless",
      "settings": {
        "clients": [
          {
            "id": process.env.UUID || "11111111-1111-1111-1111-111111111111", 
            "level": 0,
            "email": "railway@example.com"
          }
        ],
        "decryption": "none"
      },
      "streamSettings": {
        "network": "ws",
        "security": "none",
        "wsSettings": {
          "path": "/"
        }
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom"
    }
  ]
};

fs.writeFileSync("config.json", JSON.stringify(config, null, 2));

// اجرای Xray-core
exec("./xray -config config.json", (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`⚠️ Stderr: ${stderr}`);
    return;
  }
  console.log(`✅ Xray started: ${stdout}`);
});

// یک route ساده برای تست
app.get("/", (req, res) => {
  res.send("🚀 Xray VLESS is running on Railway!");
});

app.listen(process.env.PORT || 3000);
