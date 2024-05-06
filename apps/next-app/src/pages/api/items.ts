import { NextApiRequest, NextApiResponse } from 'next';
import { runQuery } from '../../lib/dbUtils';
import corsMiddleware from '../../lib/corsMiddleware'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await corsMiddleware(req, res);
    if (req.method === 'GET') {
        try {
        const items = await runQuery<{ id: number; item: string }>('SELECT * FROM items');
        res.status(200).json(items);
        } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Error fetching items' });
        }
    } else if (req.method === 'POST') {
        try {
        const item = req.body.item;
        await runQuery('INSERT INTO items (item) VALUES ($1)', [item]);
        res.status(201).json({ message: 'Item added successfully' });
        } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: 'Error adding item' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}