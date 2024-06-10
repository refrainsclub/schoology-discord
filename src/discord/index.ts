import { env } from 'bun';
import type { Update } from '../types/schoology';

/**
 * Post an update to Discord using webhooks.
 *
 * @params update - The update to post
 */
export async function postUpdate(update: Update) {
  const embed = {
    title: `${update.author} posted an update`,
    description: update.body,
    footer: {
      text: 'Schoology',
    },
    timestamp: new Date().toISOString(),
  };

  await fetch(env.DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ embeds: [embed] }),
  });
}
