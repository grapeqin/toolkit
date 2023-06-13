/**
 * 按自然月循环每一天，依次删除指定日期前缀的Es index
 * 
 */
const moment = require('moment');
const { exec } = require('child_process');

const startDate = moment().subtract(6, 'months').startOf('month');
const endDate = moment().subtract(5, 'months').startOf('month');

let currentDate = startDate;


async function executeCurlCommand(dateString) {
  //请求url
  const url = ""
  const curlCommand = `curl -X POST -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" -H "Cookie: platform_token=tqzdojxqtrmusvzfBxfeouos6hd5BzBh" -d "id=544&executorParam=${dateString}+00%3A00%3A00" ${url}`;
  exec(curlCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
    }else{
      console.log(`stdout: ${stdout}`); 
    }
  });
}

while (currentDate < endDate) {
  const dateString = currentDate.format('YYYY-MM-DD');
  console.log(`dateString: ${dateString}`)
  executeCurlCommand(dateString);
  currentDate = currentDate.add(1, 'days');
}