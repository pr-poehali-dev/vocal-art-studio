import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта арт-студии на почту администратора."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    message = body.get('message', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'}, ensure_ascii=False)
        }

    contact_email = os.environ.get('CONTACT_EMAIL', '')
    smtp_password = os.environ.get('SMTP_PASSWORD', '')

    if not contact_email or not smtp_password:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Почта не настроена'}, ensure_ascii=False)
        }

    # Определяем SMTP сервер по домену почты
    domain = contact_email.split('@')[-1].lower()
    if 'yandex' in domain or 'ya.ru' in domain:
        smtp_host = 'smtp.yandex.ru'
        smtp_port = 465
        use_ssl = True
    elif 'mail.ru' in domain or 'bk.ru' in domain or 'inbox.ru' in domain or 'list.ru' in domain:
        smtp_host = 'smtp.mail.ru'
        smtp_port = 465
        use_ssl = True
    elif 'gmail' in domain:
        smtp_host = 'smtp.gmail.com'
        smtp_port = 587
        use_ssl = False
    else:
        smtp_host = f'smtp.{domain}'
        smtp_port = 587
        use_ssl = False

    html_body = f"""
    <html>
    <body style="font-family: Georgia, serif; background: #f9f5ee; padding: 40px;">
      <div style="max-width: 560px; margin: 0 auto; background: #fff; border: 1px solid #e8dcc8; border-radius: 4px; overflow: hidden;">
        <div style="background: #1A1612; padding: 28px 32px;">
          <h1 style="color: #C9A86C; font-size: 22px; margin: 0; letter-spacing: 1px;">Новая заявка с сайта</h1>
          <p style="color: rgba(245,239,224,0.5); font-family: sans-serif; font-size: 12px; margin: 6px 0 0; letter-spacing: 2px; text-transform: uppercase;">Арт-Студия · Вокал & Живопись</p>
        </div>
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0e8d8; color: #999; font-family: sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; width: 100px;">Имя</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0e8d8; font-size: 16px; color: #1A1612;">{name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0e8d8; color: #999; font-family: sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Телефон</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0e8d8; font-size: 16px; color: #C4614A;"><a href="tel:{phone}" style="color: #C4614A; text-decoration: none;">{phone}</a></td>
            </tr>
            {"" if not message else f'''<tr><td style="padding: 10px 0; color: #999; font-family: sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Сообщение</td><td style="padding: 10px 0; font-size: 15px; color: #333; line-height: 1.6;">{message}</td></tr>'''}
          </table>
        </div>
        <div style="background: #f9f5ee; padding: 20px 32px; text-align: center;">
          <p style="color: #bbb; font-family: sans-serif; font-size: 11px; margin: 0;">Отправлено с сайта арт-студии</p>
        </div>
      </div>
    </body>
    </html>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка от {name} — Арт-Студия'
    msg['From'] = contact_email
    msg['To'] = contact_email
    msg.attach(MIMEText(html_body, 'html', 'utf-8'))

    if use_ssl:
        with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
            server.login(contact_email, smtp_password)
            server.sendmail(contact_email, contact_email, msg.as_string())
    else:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(contact_email, smtp_password)
            server.sendmail(contact_email, contact_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True, 'message': 'Заявка отправлена'}, ensure_ascii=False)
    }
