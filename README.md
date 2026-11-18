# 🌙 MOONLIGHT STUDIO V3

Next.js + Supabase starter for a Thai-language short-film and episodic-series site. **This is source code, not a deployed site.**

## Features
- Home, Movies, Series, Watch, Login, Profile and Admin pages.
- Email/password sign-up and Google OAuth via Supabase Auth.
- Published films, series episodes, search, favorites and comments.
- Admin-only uploads of posters and MP4 to Supabase Storage; publication toggle and deletion of database records.
- Private video bucket with signed playback links (1 hour). **This is basic MP4 delivery, not adaptive streaming/transcoding.**

## Local setup
1. Install Node.js 20+ and run `npm install`.
2. Create a Supabase project; run `supabase/schema.sql` in the SQL editor **once** on a new project.
3. Copy `.env.example` to `.env.local` and enter your Supabase project URL and **publishable/anon** key. Never put a service-role key here.
4. In Supabase Authentication → URL Configuration, set your Site URL and add `http://localhost:3000/auth/callback` and your future production callback URL to Redirect URLs.
5. Enable email provider. To enable Google, configure Google OAuth credentials in Supabase and Google Cloud Console, with the callback URL provided by Supabase.
6. Run `npm run dev`, then open `http://localhost:3000`.
7. Sign up your owner account and verify email. In Supabase SQL Editor, grant owner access **using your actual auth.users ID**:
   ```sql
   insert into public.admins(user_id) values ('REPLACE-WITH-OWNER-USER-UUID');
   ```
   Do not grant admin to ordinary users.
8. Open `/admin` and upload your first film. For a series, create the series entry first, then select it when uploading episodes.

## Deploy free-first
- Push the project to a private Git repository and import into Vercel. Set the two `NEXT_PUBLIC_` environment variables on Vercel. Add the deployed domain to Supabase Authentication redirect URLs.
- A free web-hosting tier does **not** guarantee free video storage or bandwidth. Check current quotas and terms before public launch. A custom domain can be connected later.

## Production considerations / limitations
- Supabase Storage standard uploads are best for small files; large MP4 files need resumable/TUS uploads or a dedicated video service (Mux/Cloudflare Stream etc.). The current uploader is **not** resumable and does not transcode video.
- Signed URLs are valid for one hour from initial page load; long viewing sessions may require URL renewal.
- There is no rate limiting, comment moderation UI, abuse reporting, thumbnail generation, watch history, analytics, notifications, password-reset UI, or episode editing yet.
- Removing a film deletes its database record, **not** the underlying Storage files. Clean orphaned objects through Storage management.
- Supabase email confirmation, OAuth provider setup, bucket file-size limits, and SMTP quotas must be configured in the project dashboard.
- This is an initial application scaffold. Test authentication, permissions, upload limits and mobile playback before public launch.
