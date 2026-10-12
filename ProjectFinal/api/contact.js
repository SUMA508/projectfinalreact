const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sendJson(response, status, body) {
  response.status(status).json(body)
}

function readContactFields(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null

  const fields = ['name', 'email', 'subject', 'message']
  const values = Object.fromEntries(fields.map((field) => [field, body[field]]))
  if (fields.some((field) => typeof values[field] !== 'string')) return null

  const contact = Object.fromEntries(fields.map((field) => [field, values[field].trim()]))
  if (
    !contact.name || contact.name.length > 100
    || !emailPattern.test(contact.email) || contact.email.length > 254
    || !contact.subject || contact.subject.length > 150
    || !contact.message || contact.message.length > 5000
  ) return null

  return contact
}

export function createContactHandler(environment = process.env) {
  return async function handler(request, response) {
    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST')
      return sendJson(response, 405, { error: 'Method not allowed.' })
    }

    const contact = readContactFields(request.body)
    if (!contact) return sendJson(response, 400, { error: 'Please check your details and try again.' })

    const { RESEND_API_KEY, RESEND_FROM_EMAIL, CONTACT_TO_EMAIL } = environment
    if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !CONTACT_TO_EMAIL) {
      console.error('Contact email is not configured. Set RESEND_API_KEY, RESEND_FROM_EMAIL, and CONTACT_TO_EMAIL.')
      return sendJson(response, 503, { error: 'Contact messages are temporarily unavailable. Please call the restaurant.' })
    }

    let resendResponse
    try {
      resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: RESEND_FROM_EMAIL,
          to: [CONTACT_TO_EMAIL],
          reply_to: contact.email,
          subject: `Website contact: ${contact.subject}`,
          text: `Name: ${contact.name}\nEmail: ${contact.email}\n\n${contact.message}`,
        }),
      })
    } catch (error) {
      console.error('Resend request failed:', error)
      return sendJson(response, 502, { error: 'We could not send your message right now. Please try again.' })
    }

    if (!resendResponse.ok) {
      console.error(`Resend rejected contact email with status ${resendResponse.status}.`)
      return sendJson(response, 502, { error: 'We could not send your message right now. Please try again.' })
    }

    return sendJson(response, 200, { message: 'Thanks for reaching out! Your message was sent.' })
  }
}

export default createContactHandler()
