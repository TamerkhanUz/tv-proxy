export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "❌ url parametri kerak" });
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).json({ error: "❌ Target server xatolik" });
    }

    // CORS va content-type
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", response.headers.get("content-type") || "application/vnd.apple.mpegurl");

    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).json({ error: "❌ Proxy server xatolik", detail: err.message });
  }
}
