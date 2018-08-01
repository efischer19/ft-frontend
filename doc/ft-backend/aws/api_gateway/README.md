# ft-backend/aws/api_gateway

My API Gateway defines all of 2 methods - `/posts` and `/post-data/{post-id}`. Both are using my Cognito user pool as an authorizer, so incoming requests must contain a currently-valid token in the Authorization header in order to be served. `/posts` adds nothing on top of this validation; its backend is simply fetching `fischerthings.com/api/private/posts.json`, a file only accessible to the API Gateway's IAM role, and returning it. `/post-data/{post-id}` is slightly more complex, as it
passes the request parameters through to [my ft_signImgUrls Lambda function](../lambda/), and returns the result of that function as the response.

The only other thing to mention is that CORS setup was a bit tricky, I had to search and experiment a bit to get that working.

My API Gateway is set up with very low (<10k requests per day) limits for the time being; this ensures I stay well below the free tier limits and should be enough for my expected friends-and-family use case.
