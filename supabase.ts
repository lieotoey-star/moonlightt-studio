import {createClient} from '@supabase/supabase-js';
const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const configured=Boolean(url&&key);
export const supabase=createClient(url||'https://placeholder.supabase.co',key||'placeholder');
export type Film={id:string;title:string;description:string|null;kind:'movie'|'series';genre:string|null;poster_url:string|null;video_url:string|null;published:boolean;created_at:string;series_id:string|null;episode_number:number|null};
