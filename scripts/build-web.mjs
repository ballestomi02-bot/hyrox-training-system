import { build } from 'esbuild';
import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'www');
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const file of ['manifest.webmanifest', 'icon.svg', 'service-worker.js']) {
  await copyFile(path.join(root, file), path.join(out, file));
}

let html = await readFile(path.join(root, 'index.html'), 'utf8');
const remoteClient = "const {createClient}=await import('https://esm.sh/@supabase/supabase-js@2');supabase=createClient(SUPABASE_URL,SUPABASE_ANON_KEY);";
if (!html.includes(remoteClient)) throw new Error('Could not locate Supabase client initialization in index.html');
html = html.replace(remoteClient, 'const createClient=window.hyroxCreateClient;supabase=createClient(SUPABASE_URL,SUPABASE_ANON_KEY);');
const projectUrl = process.env.SUPABASE_URL?.trim();
const publicKey = process.env.SUPABASE_ANON_KEY?.trim();
if (projectUrl && publicKey) {
  html = html.replace("'https://TU-PROYECTO.supabase.co'", JSON.stringify(projectUrl));
  html = html.replace("'TU-PUBLISHABLE-KEY'", JSON.stringify(publicKey));
}
html = html.replace('<script>\nconst KEY=', '<script src="./native-runtime.js"></script>\n<script>\nconst KEY=');
await writeFile(path.join(out, 'index.html'), html, 'utf8');
await build({
  entryPoints: [path.join(root, 'scripts/native-runtime.js')],
  outfile: path.join(out, 'native-runtime.js'),
  bundle: true,
  platform: 'browser',
  format: 'iife',
  target: 'safari16',
  minify: true
});
console.log('Prepared bundled web assets for the native iOS container.');
