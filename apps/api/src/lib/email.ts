import { Resend } from 'resend';

let cachedClient: Resend | null = null;
let cachedKey: string | null = null;

function getClient(apiKey: string): Resend {
  if (cachedClient && cachedKey === apiKey) return cachedClient;
  cachedClient = new Resend(apiKey);
  cachedKey = apiKey;
  return cachedClient;
}

function buildWelcomeHtml(loginLink: string): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <meta name="supported-color-schemes" content="dark" />
    <title>You're in.</title>
  </head>
  <body style="margin:0;padding:0;background-color:#06070a;color:#e8eaf2;-webkit-font-smoothing:antialiased;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#06070a;">
      <tr>
        <td align="center" style="padding:48px 24px;">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">
            <tr>
              <td style="font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:1.1;letter-spacing:-0.02em;color:#e8eaf2;padding-bottom:28px;">
                You&rsquo;re in.
              </td>
            </tr>
            <tr>
              <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.7;color:#e8eaf2;padding-bottom:20px;">
                LuKaiAI is the workflow for building software with Claude &mdash; for people who have an idea and want to ship it.
              </td>
            </tr>
            <tr>
              <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.7;color:#e8eaf2;padding-bottom:20px;">
                Module 0 is short. Start when you have ten quiet minutes.
              </td>
            </tr>
            <tr>
              <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.7;color:#e8eaf2;padding-bottom:36px;">
                When you ship something, add it to the showcase at <a href="https://lukaiai.com/projects" style="color:#00c8f0;text-decoration:none;border-bottom:1px dotted #00c8f0;">lukaiai.com/projects</a>. Everyone&rsquo;s first project belongs there.
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:40px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="background-color:#00c8f0;border-radius:9px;">
                      <a href="${loginLink}" style="display:inline-block;padding:14px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#06070a;text-decoration:none;letter-spacing:-0.005em;">
                        Start Module 0 &rarr;
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#7a8299;padding-top:24px;border-top:1px solid rgba(255,255,255,0.07);">
                &mdash; LuKaiAI
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildWelcomeText(loginLink: string): string {
  return `You're in.

LuKaiAI is the workflow for building software with Claude — for people who have an idea and want to ship it.

Module 0 is short. Start when you have ten quiet minutes.

When you ship something, add it to the showcase at https://lukaiai.com/projects — everyone's first project belongs there.

${loginLink}

— LuKaiAI
`;
}

export async function sendWelcomeEmail(toEmail: string, loginLink: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.EMAIL_FROM;
  const fromName = process.env.EMAIL_FROM_NAME || 'LuKaiAI';

  if (!apiKey || !fromAddress) {
    console.warn('sendWelcomeEmail: RESEND_API_KEY or EMAIL_FROM not set; skipping send');
    return;
  }

  const client = getClient(apiKey);
  const from = `${fromName} <${fromAddress}>`;

  const { error } = await client.emails.send({
    from,
    to: toEmail,
    subject: "You're in.",
    text: buildWelcomeText(loginLink),
    html: buildWelcomeHtml(loginLink),
  });

  if (error) {
    throw new Error(`Resend error: ${error.message ?? JSON.stringify(error)}`);
  }
}
