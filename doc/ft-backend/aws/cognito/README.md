# ft-backend/aws/cognito

There's not really a lot to discuss about my Cogito setup. It's configured to use password requirements of my choosing, and only allows admins (read: me) to add new users, so I can control who sees my private posts.

Setting up the user pool and app client were pretty straightforward, the AWS documentation for these things is very thorough. One thing I will note is that the "Only administrators can create users" setting has a kind of nasty side effect - user emails can end up in a state where they are "confirmed" but not "verified", making password recovery fail. Eventually I came across [this SO
post](https://stackoverflow.com/questions/39231797/aws-cognito-user-stuck-in-confirmed-and-email-verified-false), leading to the following command being saved here for "I can't log in" support requests in the future:

`aws cognito-idp admin-update-user-attributes --user-pool-id=<my_user_pool_id> --username=<username> --user-attributes Name=email_verified,Value=true`

If I had a bigger expeced audience this would be a real problem; for my small user base I'll just field these as needed.
