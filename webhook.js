export default async function handler(req, res) {
  const TOKEN = process.env.BOT_TOKEN;
  const API = `https://api.telegram.org/bot${TOKEN}`;

  if (req.method !== "POST") {
    return res.status(200).send("Traveler Bot Aktif");
  }

  const update = req.body;
  const message = update.message;

  if (!message) return res.status(200).end();

  const chatId = message.chat.id;
  const text = message.text || "";

  let reply = "";

  if (text === "/start") {
    await fetch(`${API}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: "🤖 Selamat Datang di Traveler APK Store!\n\nAda yang saya bisa bantu?",
        reply_markup: {
          keyboard: [
            [{ text: "🛒 Beli APK" }],
            [{ text: "❓ Tanya-Tanya" }],
            [{ text: "👨‍💻 Chat Admin" }]
          ],
          resize_keyboard: true
        }
      })
    });

    return res.status(200).end();
  }

  switch (text) {
    case "🛒 Beli APK":
      reply = "🛒 Traveler APK\n\n💰 Harga: Rp35.000\n\nSilakan hubungi admin untuk pembelian.";
      break;

    case "❓ Tanya-Tanya":
      reply = "Silakan kirim pertanyaan Anda. Admin akan membantu.";
      break;

    case "👨‍💻 Chat Admin":
      reply = "Hubungi Admin:\nhttps://t.me/Ganxzz01";
      break;

    default:
      reply = "Silakan pilih menu yang tersedia.";
  }

  await fetch(`${API}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: reply
    })
  });

  res.status(200).end();
}
