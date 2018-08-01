# ft-backend

This is just a dumping ground for explaining the portions of fischerthings.com that are *not* included in the main Vue application.

* **[aws](aws/README.md)**: describes AWS products I use, and how they're configured as relevant.
  * **[s3](aws/s3/README.md)**: Describes my s3 hosted static site setup. Also includes details about my cloudfront setup, and continuous deployment.
  * **[API Gateway](aws/api_gateway/README.md)**: Describes my API Gateway setup, which is primarily used to gate access to private resources.
  * **[Lambda](aws/lambda/ft_signImgUrls.py)**: My lambda code, used for creating signed image urls.
* **[img_prep](img_prep/README.md)**: Details about the scripts I wrote to prepare images for posting on the blog.
