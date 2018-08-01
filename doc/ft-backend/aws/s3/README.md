# ft-backend/aws/s3

This fairly difficut task was made much easier when I stumbled upon [a tutorial written by an ex-coworker](https://www.davidbaumgold.com/tutorials/host-static-site-aws-s3-cloudfront/) in the wild. Thanks for the info @singingwolfboy!

There's not really much point to repeating that content, so suffice it to say that I used my hand-crafted HTML mac and cheese post as content and followed along until I had both fischerthings.com and www.fischerthings.com set up with https, cloudfront and email. At one point I was going to try and *only* use pre-rendered html for this project - that ended up being not such a Great Idea in the long run, but it was nice for setting up the s3 site.

So at this point, index.html is what gets served at the bucket root. Thanks to the magic of webpack, it includes links to the latest versions of my js and css, which take over to make xhr requests and display data. Public data is publically read-only, while private data is restricted to only myself and the relevant API Gateway/Lambda roles. Here's the relevant bucket policy to enable that access:

```
{
    "Version": "2012-10-17",
    "Id": "Policy12345",
    "Statement": [
        {
            "Sid": "Stmt12345",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::12345:role/API_Gateway"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::fischerthings.com/api/private/posts.json"
        },
        {
            "Sid": "Stmt12345",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::12345:role/service-role/ft_lambda"
            },
            "Action": "s3:GetObject",
            "Resource": [
                "arn:aws:s3:::fischerthings.com/api/private/*/post_data.json",
                "arn:aws:s3:::fischerthings.com/api/private/*/*.jpg"
            ]
        }
    ]
}
```

I'd be remiss if I didn't mention continuous deployment. Thanks to [another tutorial written by an ex-coworker](https://renzo.lucioni.xyz/s3-deployment-with-travis/), this github repo is connected to Travis CI in such a way as to upload the latest build of my code to the live s3 buckets after merging changes, if all test pass. Shoutout to @rlucioni as well! Small world!
