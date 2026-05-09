// Endpoint serverless que actúa de intermediario seguro
// entre el navegador y la API de Groq.
// La GROQ_API_KEY vive como variable de entorno en Vercel, NUNCA en el código.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Solo POST permitido' });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY no configurada en Vercel' });
  }

  try {
    const { prompt } = req.body || {};
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Falta el campo prompt' });
    }

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 2500,
        temperature: 0.85,
        messages: [
          { role: 'system', content: 'Eres un völva nórdico experto en runas del Futhark Antiguo, especializado en lecturas comerciales. Sigues estrictamente el formato y las instrucciones del usuario. Respondes en español con tono místico pero claro.' },
          { role: 'user', content: prompt }
        ]
      })
    });

    const raw = await groqResponse.text();

    if (!groqResponse.ok) {
      return res.status(groqResponse.status).json({
        error: 'Error desde Groq',
        status: groqResponse.status,
        detail: raw.slice(0, 1000)
      });
    }

    const data = JSON.parse(raw);
    const text = data?.choices?.[0]?.message?.content;

    if (!text || !text.trim()) {
      return res.status(502).json({ error: 'Respuesta vacía del oráculo', detail: JSON.stringify(data).slice(0, 500) });
    }

    return res.status(200).json({ text });
  } catch (err) {
    return res.status(500).json({
      error: 'Fallo del servidor',
      detail: err && err.message ? err.message : String(err)
    });
  }
}
