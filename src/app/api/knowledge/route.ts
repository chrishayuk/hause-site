import {knowledgeGraph,searchKnowledge} from "@/data/knowledge";
export function GET(request:Request){const q=new URL(request.url).searchParams.get("q");return Response.json(q?{query:q.slice(0,300),results:searchKnowledge(q.slice(0,300)).slice(0,20)}:knowledgeGraph());}
