import crypto from "crypto";
import OAuth from "oauth-1.0a";
import type { Update, UpdateRealm } from "./types";

export class Client {
  private key: string;
  private secret: string;
  private baseUrl: string;
  private oauth: OAuth;

  constructor(key: string, secret: string, baseURL?: string) {
    this.key = key;
    this.secret = secret;
    this.baseUrl = baseURL ? baseURL : "https://api.schoology.com/v1";

    this.oauth = new OAuth({
      consumer: {
        key: this.key,
        secret: this.secret,
      },
      signature_method: "HMAC-SHA1",
      hash_function(base_string, key) {
        return crypto
          .createHmac("sha1", key)
          .update(base_string)
          .digest("base64");
      },
    });
  }

  async getData(
    endpoint: string,
    method: string = "GET",
    body?: string,
  ): Promise<any> {
    const requestData = {
      url: `${this.baseUrl}${endpoint}`,
      method,
      body,
    };

    const authorization = this.oauth.authorize(requestData);
    const headers = this.oauth.toHeader(authorization);

    const res = await fetch(requestData.url, {
      ...requestData,
      headers: { ...headers },
    });

    const data = await res.json();
    return data;
  }

  async getUpdates(realm: UpdateRealm): Promise<Update[]> {
    const data = (await this.getData(`/${realm}/updates`)) as {
      update: Update[];
    };
    return data.update;
  }
}
