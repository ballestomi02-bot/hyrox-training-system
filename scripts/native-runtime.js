import { createClient } from '@supabase/supabase-js';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { HealthSteps } from 'hyrox-health-steps';
window.Capacitor = Capacitor;
window.hyroxCreateClient = createClient;
window.hyroxApp = App;
window.hyroxSteps = HealthSteps;
