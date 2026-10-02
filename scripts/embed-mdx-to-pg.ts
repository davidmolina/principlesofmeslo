import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { buildContentIndex } from '@/lib/content-index';

async function main() {
  const docs = await buildContentIndex();
  const outFile = path.join(process.cwd(), 'tmp-rag-documents.json');

  await writeFile(outFile, JSON.stringify(docs, null, 2));

  console.log(`Prepared ${docs.length} content records for RAG ingestion.`);
  console.log(`Wrote ${outFile}`);
  console.log('Next step: replace this file export with your pgvector embed-and-upsert pipeline.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
