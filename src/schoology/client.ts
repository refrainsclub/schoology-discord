import { env } from "bun";
import type { Page } from "playwright";
import type { Update } from "../types/schoology";

export class Client {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Log in to Schoology.
   */
  async login() {
    await this.page.goto(env.SCHOOLOGY_LOGIN_URL);

    await this.page
      .getByPlaceholder("Email or Username")
      .fill(env.SCHOOLOGY_EMAIL);
    await this.page.getByPlaceholder("Password").fill(env.SCHOOLOGY_PASSWORD);

    await this.page.getByText("Log in").click();
  }

  /**
   * Get updates from Schoology.
   *
   * Updates may only include an excerpt of the full body.
   *
   * @returns Recent updates from Schoology
   */
  async getUpdates(): Promise<Update[]> {
    await this.page.goto(env.SCHOOLOGY_UPDATES_URL);

    const data = await this.page.$$eval("ul.s-edge-feed > li", (updates) =>
      updates
        .map((update) => {
          const author = update.querySelector('a[title="View user profile."]');
          const body = update.querySelector(".update-body");

          if (!author || !body) {
            return null;
          }

          return {
            id: update.id.substring(11),
            author: author.innerText,
            body: body.innerText,
          };
        })
        .filter((update) => update !== null),
    );

    return data as Update[];
  }
}
