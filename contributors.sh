# This script generates a json list of contributors for techhigh.us
# To run this script you must create a Github access token (Github >> Settings >> Developer Settings >> Tokens (Classic))
# Run in terminal:
# sh ./contributors.sh YOUR_TOKEN
# KEEP YOUR TOKEN SECRET!

curl \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $1"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/worcestertechnicalhighschool/techhigh.us/contributors >> ./_data/contributors.json