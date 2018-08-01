"""
This is a python3.6 file lifted straight out of the AWS console.
It is provided for doumentation purposes, run at your own risk.

The relevant execution role permission is:
"Statement": [
  {
    "Effect": "Allow",
    "Action": [
      "s3:GetObject"
    ],
    "Resource": "arn:aws:s3:::*"
  }
]
"""

import boto3
import botocore
import json

s3 = boto3.client('s3', region_name='us-east-2')

TWENTY_MINUTES = 20*60

def lambda_handler(event, context):
    post_id = event['pathParameters']['post-id']

    # load json from s3
    content_object = s3.get_object(
        Bucket='fischerthings.com',
        Key='api/private/{}/post_data.json'.format(post_id)
    )
    file_content = content_object.get('Body').read().decode('utf-8')
    json_content = json.loads(file_content)

    # do some just-in-time processing
    for element in json_content:
        if element['type'] == 'img':
            base_url = element['link']
            element['signed'] = {
                'large': s3.generate_presigned_url(
                    ClientMethod='get_object',
                    Params={
                        'Bucket': 'fischerthings.com',
                        'Key': 'api/private/{}/{}'.format(
                            post_id,
                            base_url
                        )
                    },
                    ExpiresIn=TWENTY_MINUTES
                ),
                'small': s3.generate_presigned_url(
                    ClientMethod='get_object',
                    Params={
                        'Bucket': 'fischerthings.com',
                        'Key': 'api/private/{}/{}'.format(
                            post_id,
                            base_url.replace('.jpg','.small.jpg')
                        )
                    },
                    ExpiresIn=TWENTY_MINUTES
                )
            }

    # send results back
    return {
        'isBase64Encoded': False,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'statusCode': 200,
        'body': json.dumps(json_content)
    }
