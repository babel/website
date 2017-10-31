npm run build

REPO=`git config remote.origin.url`
SSH_REPO=${REPO}
git config --global user.name "QC-L"
git config --global user.email "liqichang_4869@163.com"
git remote set-url origin "${SSH_REPO}"

openssl aes-256-cbc -K $encrypted_9d42543f6ef0_key -iv $encrypted_9d42543f6ef0_iv -in shell/deploy_key.enc -out shell/deploy_key -d
chmod 600 shell/deploy_key
eval `ssh-agent -s`
ssh-add shell/deploy_key

chmod -R 777 node_modules/gh-pages/
npm run deploy
