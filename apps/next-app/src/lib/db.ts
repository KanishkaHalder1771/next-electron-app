import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL?.toString(),
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