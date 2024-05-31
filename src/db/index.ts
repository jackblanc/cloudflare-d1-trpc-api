import { drizzle } from 'drizzle-orm/sqlite-proxy';
import { Resource } from 'sst';

// Inspired by https://github.com/drizzle-team/drizzle-orm/issues/2086

export const db = drizzle(async (sql, params, method) => {
  const url = `https://api.cloudflare.com/client/v4/accounts/${Resource.CloudflareAccountId.value}/d1/database/${
    Resource.DatabaseId.value
  }/query`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${Resource.CloudflareApiToken.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql, params, method }),
  })

  const data = await res.json()

  if (res.status !== 200)
    throw new Error(`Error from sqlite proxy server: ${res.status} ${res.statusText}\n${JSON.stringify(data)}`)
  if (data.errors.length > 0 || !data.success)
    throw new Error(`Error from sqlite proxy server: \n${JSON.stringify(data)}}`)

  const qResult = data.result[0]

  if (!qResult.success) throw new Error(`Error from sqlite proxy server: \n${JSON.stringify(data)}`)

  // https://orm.drizzle.team/docs/get-started-sqlite#http-proxy
  return { rows: qResult.results.map((r: any) => Object.values(r)) }
})