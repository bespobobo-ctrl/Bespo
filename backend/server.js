require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 5000;

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

// Setup storage for local images
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR);
}

// Serve uploaded images publicly
app.use('/uploads', express.static(UPLOADS_DIR));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOADS_DIR);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'bespo-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Health check for AI Moderator
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', engine: 'Gemini-1.5-Flash', timestamp: new Date() });
});

// --- AI ENDPOINTS ---

// 1. AI Copywriter (Gemini) endpoint
app.post('/api/ai/generate-description', async (req, res) => {
    try {
        const { productName, category } = req.body;

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `
=== SYSTEM PERSONA ===
You are an Elite Fashion Copywriter and SEO Expert working for "BESPO", a premium, futuristic luxury streetwear brand. Your tone is bold, minimalist, authoritative, and high-convert.

=== TASK ===
Write a highly engaging product description for a new item.

=== CONTEXT ===
- Product Name: "${productName}"
- Category: "${category}"

=== RULES & CONSTRAINTS ===
1. Length: Exactly 2 or 3 short, punchy sentences. Maximum 40 words total.
2. Structure: 
   - Sentence 1: The Hook/Vibe (Why it's premium).
   - Sentence 2: The Material/Tech (Comfort, durability, or silhouette).
   - Sentence 3: The Urgency (Limited drop, exclusive, must-have).
3. SEO: Naturally weave in keywords: "streetwear", "premium", "drip", "luxury".
4. Language: UZBEK ONLY (O'zbek tilida yozing - Cyrillic yoki Latin farqi yo'q, zamonaviy uslubda).
5. Output restriction: Return ONLY the exact product description. Do NOT include phrases like "Here is the description" or quotes.
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ description: text });
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: "AI failed to generate description." });
    }
});

// 2. Image Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Please upload a file' });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    res.json({
        message: 'Image fully secured on server.',
        url: imageUrl
    });
});

// --- PRODUCTION: Serve React frontend ---
if (process.env.NODE_ENV === 'production') {
    const frontendDist = path.join(__dirname, '..', 'dist');
    app.use(express.static(frontendDist));

    // All non-API routes → React app (SPA routing)
    app.get('*', (req, res) => {
        if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
            res.sendFile(path.join(frontendDist, 'index.html'));
        }
    });
} else {
    app.get('/', (req, res) => {
        res.send('Bespo Premium Backend is Running with Gemini Engine 🟢');
    });
}

app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Bespo Backend → http://0.0.0.0:${port}`);
    console.log(`📦 Mode: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🤖 Gemini AI: ✅`);
    console.log(`📁 Local Storage: ✅`);
});
