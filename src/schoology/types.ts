// https://developers.schoology.com/api-documentation/rest-api-v1/update/

export interface Update {
  id?: string; // in example
  body: string;
  uid?: string;
  display_name?: string;
  last_updated?: string;
  attachments?: Attachment[];
  polls?: Poll[];
}

export type UpdateRealm =
  | `/users/${string}`
  | `/sections/${string}`
  | `/groups/${string}`;

export interface Attachment {
  type?: "file" | "link" | "video";
  title?: string;
  url?: string;
  thumbnail?: string;
}

export interface Poll {
  options?: PollOptions[];
}

export interface PollOptions {
  title?: string;
  count?: number;
  selected?: boolean;
}
