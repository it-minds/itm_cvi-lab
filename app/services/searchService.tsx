import { Client } from "@elastic/elasticsearch";
import IconModel from "../interfaces/IconModel";

const client = new Client({
  node: "http://localhost:9200",
  auth: {
    username: "elastic",
    password: "bKIWAQB=_BjF_AyPvgZi",
  },
});

export async function searchIcons(query: string): Promise<IconModel[]> {
  try {
    const response = await client.search<IconModel>({
      index: "icons",
      body: {
        query: {
          bool: {
            should: [
              { match: { name: { query, fuzziness: "AUTO" } } },
            ],
          },
        },
      },
    });

    return response.hits.hits.map((hit) => hit._source as IconModel);
  } catch (error) {
    console.error("Error searching icons:", error);
    return [];
  }
}
