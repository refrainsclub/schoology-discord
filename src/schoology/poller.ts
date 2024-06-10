import type { Update } from "../types/schoology";
import { Client } from "./client";

export class Poller {
  private client: Client;
  private knownUpdates: Update[] = [];

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Start polling Schoology for new updates.
   *
   * @param interval - How often to poll for new updates in milliseconds
   * @param onNewUpdates - How to handle new updates
   */
  async start(interval: number, onNewUpdates: (updates: Update[]) => void) {
    this.knownUpdates = await this.client.getUpdates();

    setInterval(async () => {
      const newUpdates = await this.findNewUpdates();

      if (newUpdates.length) {
        onNewUpdates(newUpdates);
      }
    }, interval);
  }

  private async findNewUpdates(): Promise<Update[]> {
    const updates = await this.client.getUpdates();
    const newUpdates: Update[] = [];

    for (const update of updates) {
      if (this.knownUpdates.some((u) => u.id === update.id)) {
        break;
      }

      newUpdates.push(update);
    }

    this.knownUpdates = [...newUpdates, ...this.knownUpdates];
    return newUpdates;
  }
}
