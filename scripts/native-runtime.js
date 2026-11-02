import { createClient } from '@supabase/supabase-js';
import { App } from '@capacitor/app';
window.hyroxCreateClient = createClient;
window.hyroxApp = App;
