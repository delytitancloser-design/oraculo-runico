# Oráculo Rúnico de Ventas — Versión GRATIS con Groq + Llama 3.3

Web pública de tirada de runas vikingas con interpretación en vivo por IA. Usa **Groq** (gratis, sin tarjeta de crédito) con el modelo **Llama 3.3 70B**, que es ultra rápido (las lecturas tardan 1-2 segundos) y de buena calidad.

## Cuotas gratuitas (sin tarjeta)

- **30 peticiones por minuto.**
- **14.400 peticiones al día.**
- Si pasa el límite, espera al día siguiente. Cero riesgo de cobro.

## Arquitectura

```
[Visitante] → [/api/oraculo en Vercel] → [Groq API] → respuesta
                       ↑
                       └── tu GROQ_API_KEY vive aquí, nunca en el navegador
```

Tu key no la ve nadie. Vive como variable de entorno en Vercel.

## Despliegue completo (5-10 minutos)

### 1. Conseguir API key de Groq (GRATIS, sin tarjeta)

1. Entra en **https://console.groq.com/**.
2. Regístrate (con Google, GitHub o email).
3. Una vez dentro, en el menú lateral pulsa **"API Keys"**.
4. Click en **"Create API Key"**, le pones un nombre (ej: "oraculo-runas") y copias la key (empieza por `gsk_...`).
5. Guárdala bien. **No se vuelve a mostrar.**

### 2. Subir el proyecto a GitHub

1. Crea cuenta en https://github.com/ si no tienes.
2. Click en "New repository", ponle un nombre (ej: `oraculo-runico`), puede ser **privado**.
3. Sube TODOS los archivos de esta carpeta al repositorio (puedes arrastrarlos a la web de GitHub o usar git desde el terminal).

### 3. Desplegar en Vercel

1. Entra en **https://vercel.com/** y crea cuenta con tu cuenta de GitHub.
2. Click en **"Add New..."** → **"Project"**.
3. Importa el repositorio que acabas de crear.
4. **MUY IMPORTANTE**: antes de pulsar "Deploy", despliega la sección **"Environment Variables"** y añade:
   - **Name:** `GROQ_API_KEY`
   - **Value:** `gsk_...` (tu key de Groq, completa)
5. Pulsa **"Deploy"**. Espera unos 30 segundos.
6. Vercel te dará una URL del tipo `https://oraculo-runico-xxx.vercel.app`. **Ya está online.**

### 4. (Opcional) Conectar dominio propio

En Vercel → Project → Settings → Domains. Añade `runas.titancloser.com` (o lo que quieras) y Vercel te dará los registros DNS para configurar en tu proveedor (Namecheap, GoDaddy, etc.).

## Probarlo en local antes de subir (opcional)

```bash
npm install -g vercel
cd oraculo-runico
echo "GROQ_API_KEY=gsk_tu_key_aqui" > .env.local
vercel dev
```
Abre http://localhost:3000 y prueba. El archivo `.env.local` está en `.gitignore`, no se sube a GitHub.

## Personalización rápida

### Cambiar el modelo
En `api/oraculo.js`, busca la línea con `model:`. Opciones gratuitas en Groq (a fecha de hoy):
- `llama-3.3-70b-versatile` — recomendado, calidad alta y razonablemente rápido.
- `llama-3.1-8b-instant` — más rápido pero respuestas más simples.
- Otros modelos disponibles en https://console.groq.com/docs/models

### Modificar los copys de Titan Closer y Titánica
Edita `index.html` → busca la función `buildPrompt` → ajusta el bloque `###SECTION:TITAN###`. Ahí está la lógica que adapta el cierre comercial al tipo de pregunta y siempre menciona el CRM Titánica.

### Cambiar las preguntas predefinidas (chips)
En `index.html`, busca `<div class="chips">` y edita el atributo `data-text` de cada `<button>`.

## Solución de problemas

**"Estado 401":** la API key de Groq es incorrecta o expiró. Genera una nueva en console.groq.com → API Keys, y actualízala en Vercel → Project Settings → Environment Variables.

**"Estado 429":** has superado el límite (30/minuto o 14.400/día). Espera. Si pasa muy seguido, en console.groq.com puedes activar el plan Developer (añadir tarjeta) que multiplica por 10 los límites.

**"Estado 500":** revisa los logs en Vercel → tu proyecto → Deployments → último deploy → Functions → click en el endpoint para ver errores detallados.

**No carga nada:** abre la consola del navegador (F12) y mira si hay errores en rojo.

**La lectura sale corta o sin formato:** Llama a veces no respeta los marcadores. El parser tiene un fallback que muestra el texto plano. Si quieres mayor consistencia, cambia a `llama-3.3-70b-versatile` (el que ya viene por defecto, tiene mejor seguimiento de instrucciones).

## ¿Qué hago si quiero migrar más adelante a Claude o GPT?

El código está preparado para ser portable: solo cambias `api/oraculo.js`. Si algún día quieres migrar a Claude o a OpenAI, dímelo y te paso la versión equivalente.

¿Algo se atasca? Cuéntame el error exacto.
