import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@elastic/elasticsearch';
import IconModel from '@/app/interfaces/IconModel';

const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: "elastic",
    password: "31-nIBkp0MuxfP4T=wVT",
  },
  tls: {
    rejectUnauthorized: false // TODO: For development purposes!
  }
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');
  const categories = searchParams.getAll('category'); // Assume multiple 'category' params can be provided

  try {
    let response;
    if (query && categories.length > 0) {
      response = await client.search<IconModel>({
        index: 'icons',
        body: {
          query: {
            bool: {
              must: [
                { prefix: { name: query.toLowerCase() } },
                { terms: { category: categories } }
              ]
            }
          }
        }
      });
    } else if (query) {
      response = await client.search<IconModel>({
        index: 'icons',
        body: {
          query: {
            prefix: { name: query.toLowerCase() }
          }
        }
      });
    } else if (categories.length > 0) {
      response = await client.search<IconModel>({
        index: 'icons',
        body: {
          query: {
            terms: { category: categories }
          }
        }
      });
    } else {
      response = await client.search<IconModel>({
        index: 'icons',
        body: {
          query: {
            match_all: {}
          }
        },
        size: 1000 // Adjust the size as needed to fetch all documents
      });
    }

    const results = response.hits.hits.map((hit) => hit._source as IconModel);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching icons:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
