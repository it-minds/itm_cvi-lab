import { NextResponse } from 'next/server';
import { Client } from '@elastic/elasticsearch';

const client = new Client({
    node: 'https://localhost:9200',
    auth: {
      username: "elastic",
      password: "bKIWAQB=_BjF_AyPvgZi",
    },
    tls: {
      rejectUnauthorized: false // TODO: For development purposes!
    }
  });

export async function GET() {
  try {
    const response = await client.search({
      index: 'icons',
      body: {
        size: 0, // No need to return actual documents
        aggs: {
          langs: {
            terms: {
              field: 'category', // Adjust if your field mapping requires
              size: 1000 // Adjust the size if needed to cover all unique categories
            }
          }
        }
      }
    });

    console.log()
    return NextResponse.json(response?.aggregations?.langs?.buckets);
  } catch (error) {
    console.error('Error fetching unique categories:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
