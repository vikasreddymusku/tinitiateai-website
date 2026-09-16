import nodemailer from 'nodemailer'

type DemoBookingEmailInput = {
  name: string
  email: string
  phone: string
  message?: string | null
  courseTitle?: string | null
  slotStartsAt: string
}

function formatDemoDate(iso: string) {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date(iso))
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export async function sendDemoBookingEmail({
  name,
  email,
  phone,
  message,
  courseTitle,
  slotStartsAt,
}: DemoBookingEmailInput) {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const secure = process.env.SMTP_SECURE === 'true'
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.SMTP_FROM || user
  const to =
    process.env.DEMO_NOTIFICATION_EMAIL || 'vikas.reddy@tinitiateai.com'

  if (!host || !user || !pass || !from) {
    throw new Error(
      'Demo email is not configured. Check SMTP_HOST, SMTP_USER, SMTP_PASS and SMTP_FROM.',
    )
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  })

  const demoDate = formatDemoDate(slotStartsAt)
  const selectedCourse = courseTitle || 'Not specified'
  const bookingMessage = message?.trim() || 'No additional message'

  await transporter.sendMail({
    from: `"TinitiateAI Demo Bookings" <${from}>`,
    to,
    replyTo: email,

    subject: `New Demo Booking — ${selectedCourse}`,

    text: [
      'New TinitiateAI Demo Booking',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Course: ${selectedCourse}`,
      `Demo Date & Time: ${demoDate}`,
      `Message: ${bookingMessage}`,
      '',
      'Status: Pending',
    ].join('\n'),

    html: `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#172033">
        <h2 style="margin-bottom:4px;">New Demo Booking</h2>
        <p style="color:#667085;margin-top:0;">
          A new demo request was submitted on TinitiateAI.
        </p>

        <table
          cellpadding="10"
          cellspacing="0"
          style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;"
        >
          <tr>
            <td style="font-weight:bold;border-bottom:1px solid #e5e7eb;">Name</td>
            <td style="border-bottom:1px solid #e5e7eb;">${escapeHtml(name)}</td>
          </tr>

          <tr>
            <td style="font-weight:bold;border-bottom:1px solid #e5e7eb;">Email</td>
            <td style="border-bottom:1px solid #e5e7eb;">
              <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
            </td>
          </tr>

          <tr>
            <td style="font-weight:bold;border-bottom:1px solid #e5e7eb;">Phone</td>
            <td style="border-bottom:1px solid #e5e7eb;">${escapeHtml(phone)}</td>
          </tr>

          <tr>
            <td style="font-weight:bold;border-bottom:1px solid #e5e7eb;">Course</td>
            <td style="border-bottom:1px solid #e5e7eb;">${escapeHtml(selectedCourse)}</td>
          </tr>

          <tr>
            <td style="font-weight:bold;border-bottom:1px solid #e5e7eb;">
              Demo Date & Time
            </td>
            <td style="border-bottom:1px solid #e5e7eb;">${escapeHtml(demoDate)} IST</td>
          </tr>

          <tr>
            <td style="font-weight:bold;">Message</td>
            <td>${escapeHtml(bookingMessage)}</td>
          </tr>
        </table>

        <p style="margin-top:20px;">
          <strong>Status:</strong> Pending
        </p>
      </div>
    `,
  })
}