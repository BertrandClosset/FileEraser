const fs = require('fs');
const {execSync} = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Where do you want me to erase files : ', (directory) => {
    console.log(`Let's clean : ${directory}`);
    fs.readdirSync(directory, {'withFileTypes': true}).forEach(content => {
        if (content.isFile()) {
            var filePath = directory+'/'+content.name;
            fs.unlinkSync(filePath);
            execSync('sh commit.sh '+filePath, (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(`${filePath} was deleted`);
            });
    }
})
    rl.close();
});
