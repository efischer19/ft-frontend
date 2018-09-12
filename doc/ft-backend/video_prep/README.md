# ft-backend/video_prep

My phone records videos as mp4 files, since that's my only current use case that's all the blog site supports. Here are the commands I use to generate files smaller than the default 1920x1080 resolution:

ffmpeg -i original_file.mp4 -vf scale=320:240 first_selfie_vid.small.mp4
ffmpeg -i original_file.mp4 -vf scale=720:480 first_selfie_vid.mp4

Then you can refer to the base file name as seen [here](https://github.com/efischer19/ft-frontend/blob/master/public/api/public/v0/post_data.json)

These are the external commands referenced in the script:
* `ffmpeg`: https://www.ffmpeg.org/
