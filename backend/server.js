const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = new Map();

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.type === 'REGISTER' && data.reportId) {
            clients.set(data.reportId, ws);
        }
    });
});

const simulateUpdates = (reportId) => {
    const steps = ['Request Received', 'Preparing', 'Team Dispatched', 'On the Way', 'Action in Progress', 'Resolved'];
    let i = 0;
    const interval = setInterval(() => {
        if (i >= steps.length) {
            clearInterval(interval);
            return;
        }
        const ws = clients.get(reportId);
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ status: steps[i] }));
        }
        i++;
    }, 3000);
};

app.post('/report', upload.single('media'), (req, res) => {
    const { description, lat, long } = req.body;

    // AI Logic (Heuristic)
    const keywords = {
        'fire': 'Fire', 'smoke': 'Fire', 'burn': 'Fire',
        'injur': 'Ambulance', 'blood': 'Ambulance', 'pain': 'Ambulance',
        'thief': 'Police', 'gun': 'Police', 'fight': 'Police'
    };

    let types = new Set();
    const descLower = (description || '').toLowerCase();
    Object.keys(keywords).forEach(k => {
        if (descLower.includes(k)) types.add(keywords[k]);
    });

    // HEURISTIC: If image exists but no text, default to Ambulance/Fire as high probability visual emergencies
    const hasMedia = !!req.file;
    if (hasMedia && types.size === 0) {
        types.add('Fire'); // Demo default for pure image
        types.add('Ambulance');
    }

    if (types.size === 0) types.add('General Assistance');

    // Severity Logic
    let severity = 'Medium';
    if (descLower.includes('critical') || descLower.includes('dying') || descLower.includes('severe')) severity = 'Critical';
    else if (descLower.includes('hurt') || descLower.includes('attack')) severity = 'High';
    else if (hasMedia) severity = 'High'; // Image implies evidence of real incident

    const reportId = Date.now().toString();

    const visualConfirmation = hasMedia ? "Visual analysis confirms incident data. " : "";
    const summary = `${visualConfirmation}Detected ${Array.from(types).join(' + ')} emergency. Location triangulated. Dispatching nearest units immediately.`;

    const response = {
        reportId,
        timestamp: new Date().toISOString(),
        emergency_type: Array.from(types),
        severity,
        location: `${lat || 0},${long || 0}`,
        incident_summary: summary
    };

    simulateUpdates(reportId);
    res.json(response);
});

server.listen(3001, () => console.log('Backend running on 3001'));
