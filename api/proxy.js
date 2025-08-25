export default async function handler(req, res) {
  const { ch } = req.query;

  const channels = {
    uzreport: "https://stream8.cinerama.uz/1015/tracks-v1a1/playlist.m3u8",
    my5: "https://stream8.cinerama.uz/1017/tracks-v1a1/playlist.m3u8",
    milliy: "https://stream8.cinerama.uz/1019/tracks-v1a1/playlist.m3u8",
  };

  if (!ch || !channels[ch]) {
    return res.status(400).json({ error: "❌ Kanal topilmadi" });
  }

  try {
    const response = await fetch(channels[ch]);
    const data = await response.text();

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(data);
  } catch (e) {
    res.status(500).json({ error: "❌ Target server xatolik" });
  }
}
