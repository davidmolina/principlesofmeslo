create extension if not exists vector;

create table if not exists rag_documents (
  id text primary key,
  title text not null,
  collection text not null,
  tags text[] not null default '{}',
  url text not null,
  excerpt text not null,
  content text,
  embedding vector(1536),
  updated_at timestamptz not null default now()
);

create index if not exists rag_documents_collection_idx on rag_documents (collection);
create index if not exists rag_documents_tags_idx on rag_documents using gin (tags);

create or replace function match_rag_documents (
  query_embedding vector(1536),
  match_count int default 8
)
returns table (
  id text,
  title text,
  collection text,
  tags text[],
  url text,
  excerpt text,
  similarity double precision
)
language sql
as $$
  select
    rag_documents.id,
    rag_documents.title,
    rag_documents.collection,
    rag_documents.tags,
    rag_documents.url,
    rag_documents.excerpt,
    1 - (rag_documents.embedding <=> query_embedding) as similarity
  from rag_documents
  where rag_documents.embedding is not null
  order by rag_documents.embedding <=> query_embedding
  limit match_count;
$$;
