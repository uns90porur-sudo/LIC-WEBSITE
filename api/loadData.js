const clientPromise = require('./mongoClient');

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    
    try {
        if (!clientPromise) throw new Error("No MongoDB connection configured");

        const client = await clientPromise;
        const db = client.db('lic_database');
        
        const doc = await db.collection('dashboard').findOne({ _id: 'dashboard' });
        
        if (doc) {
            res.status(200).json({ success: true, payload: doc.payload });
        } else {
            res.status(404).json({ success: false, message: 'Not found' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, error: e.message });
    }
}
