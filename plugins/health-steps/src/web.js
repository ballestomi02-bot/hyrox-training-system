import { WebPlugin } from '@capacitor/core';
export class HealthStepsWeb extends WebPlugin {
  async isAvailable() { return { available: false }; }
  async requestAuthorization() { throw new Error('Apple Salud está disponible únicamente en la app nativa de iPhone.'); }
  async readToday() { throw new Error('Apple Salud está disponible únicamente en la app nativa de iPhone.'); }
}
