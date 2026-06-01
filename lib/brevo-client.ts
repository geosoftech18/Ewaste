import https from 'node:https'

export interface BrevoSendEmailPayload {
  sender: { name: string; email: string }
  to: Array<{ email: string; name?: string }>
  subject: string
  htmlContent?: string
  textContent?: string
}

export interface BrevoSendEmailResult {
  messageId?: string
}

/**
 * Skip TLS verify in local dev (Windows SSL inspection). Never in production.
 * BREVO_TLS_SKIP_VERIFY=true takes precedence over BREVO_TLS_STRICT=true.
 */
function shouldSkipTlsVerify(): boolean {
  if (process.env.NODE_ENV === 'production') return false
  if (process.env.BREVO_TLS_SKIP_VERIFY === 'true') return true
  if (process.env.BREVO_TLS_STRICT === 'true') return false
  return true
}

function createHttpsAgent(): https.Agent | undefined {
  if (!shouldSkipTlsVerify()) return undefined
  return new https.Agent({ rejectUnauthorized: false })
}

function postToBrevo(
  payload: BrevoSendEmailPayload,
  apiKey: string
): Promise<{ statusCode: number; body: string }> {
  const data = JSON.stringify(payload)
  const agent = createHttpsAgent()

  return new Promise((resolve, reject) => {
    const options: https.RequestOptions = {
      hostname: 'api.brevo.com',
      port: 443,
      path: '/v3/smtp/email',
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
      agent,
    }

    if (shouldSkipTlsVerify()) {
      console.warn(
        '[brevo] TLS certificate verification disabled for local development only.'
      )
    }

    const req = https.request(options, (res) => {
      let body = ''
      res.on('data', (chunk) => {
        body += chunk
      })
      res.on('end', () => {
        resolve({ statusCode: res.statusCode ?? 500, body })
      })
    })

    req.on('error', reject)
    req.write(data)
    req.end()
  })
}

export async function sendBrevoTransactionalEmail(
  payload: BrevoSendEmailPayload
): Promise<BrevoSendEmailResult> {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    throw new Error('BREVO_API_KEY is not configured')
  }

  const { statusCode, body } = await postToBrevo(payload, apiKey)

  let parsed: { messageId?: string; message?: string; code?: string } = {}
  try {
    parsed = JSON.parse(body)
  } catch {
    // non-JSON error body
  }

  if (statusCode < 200 || statusCode >= 300) {
    const message = parsed.message || `Brevo API request failed with status ${statusCode}`
    const error = new Error(message) as Error & { brevoStatus?: number; isIpRestriction?: boolean }
    error.brevoStatus = statusCode
    error.isIpRestriction = /unrecognised ip|authorized_ips|authorised_ips/i.test(message)
    throw error
  }

  return { messageId: parsed.messageId }
}
