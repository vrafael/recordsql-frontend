#wrong commit: line can't ended with dot
pwd
touch testfile2.js
git add testfile2.js
git commit -m "feat(): some message."
echo 'line cant ended with dot'
