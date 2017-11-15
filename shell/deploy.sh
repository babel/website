SOURCE_BRANCH="cn"

if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build and linting links/prose/js."
    # skip fetching loaders/plugins in cn version
    # npm run fetch
    npm run build
    # npm run lint:prose
    # npm run lint:links
    # npm test
    exit 0
fi



npm run build

git config --global user.name "Travis CI"
git config --global user.email "ci@travis-ci.org"
git remote set-url origin git@github.com:docschina/babeljs.io.git


openssl aes-256-cbc -K $encrypted_6f04629492b4_key -iv $encrypted_6f04629492b4_iv -in shell/deploy_key.enc -out shell/deploy_key -d
chmod 600 shell/deploy_key
eval `ssh-agent -s`
ssh-add shell/deploy_key

chmod -R 777 node_modules/gh-pages/
npm run deploy
