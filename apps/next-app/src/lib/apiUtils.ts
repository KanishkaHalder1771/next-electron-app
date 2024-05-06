import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL.toString() : 'postgresql://user1:pass1@localhost:5431/nextdb',
});

export async function runQuery<T>(query: string, params: any[] = []): Promise<T[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result.rows;
  } finally {
    client.release();
  }
}