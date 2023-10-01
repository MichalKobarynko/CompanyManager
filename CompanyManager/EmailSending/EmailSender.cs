using MailKit.Net.Smtp;
using MimeKit;
using System.Net.Mail;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace CompanyManager.Models.EmailSending
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailConfiguration configuration;

        public EmailSender(EmailConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public void SendEmail(Message message)
        {
            var emailMessage = CreateEmailMessage(message);

            Send(emailMessage);
        }

        private MimeMessage CreateEmailMessage(Message message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("email", configuration.From));
            emailMessage.To.AddRange(message.To);
            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html) 
            { 
                Text = string.Format("<h2 style='color:red;'>{0}</h2>", message.Content) 
            };

            return emailMessage;
        }

        private async Task Send(MimeMessage message)
        {
            using (var client = new SmtpClient())
            {
                try
                {
                    client.Connect(configuration.SmtpServer, configuration.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    client.Authenticate(configuration.UserName, configuration.Password);

                    await client.SendAsync(message);
                }
                catch
                {
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }

        public async Task SendEmailAsync(Message message)
        {
            var mailMessage = CreateEmailMessage(message);
            await SendAsync(mailMessage);
        }

        private async Task SendAsync(MimeMessage mailMessage)
        {
            using (var client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(configuration.SmtpServer, configuration.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    await client.AuthenticateAsync(configuration.UserName, configuration.Password);
                    await client.SendAsync(mailMessage);
                }
                catch
                {
                    //log an error message or throw an exception, or both.
                    throw;
                }
                finally
                {
                    await client.DisconnectAsync(true);
                    client.Dispose();
                }
            }
        }
    }
}
