const clientPromise = require('./mongoClient');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    
    try {
        if (!clientPromise) throw new Error("No MongoDB connection configured");

        const client = await clientPromise;
        const db = client.db('lic_database');
        
        await db.collection('dashboard').deleteOne({ _id: 'dashboard' });
        
        res.status(200).json({ success: true });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, error: e.message });
    }
}
