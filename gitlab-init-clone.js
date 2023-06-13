/**
 * 已知某个
 */
const fetch = require('node-fetch');
const { spawn } = require('child_process');
const fs = require('fs');

const gitlabUrl = 'https://ldgit.imlaidian.com/'; // GitLab服务器地址
const accessToken = 'bnjmCWJpv-nuBWP69RGR'; // 访问令牌

// 获取所有项目
fetch(`${gitlabUrl}/api/v4/projects?per_page=1000&access_token=${accessToken}`)
  .then((response) => response.json())
  .then((projects) => {
    projects.forEach((project) => {
      // 处理每个项目
      // console.log(project.name);
//      console.log(project);
      const directoryPath = `./${project.name}`;
      if (!fs.existsSync(directoryPath)) {
        // console.log('directoryPath = %s,fs.existsSync(directoryPath) = %d',directoryPath,fs.existsSync(directoryPath))
        const clone = spawn('git', ['clone', `${project.ssh_url_to_repo}`]);
        clone.stdout.on('data', (data) => {
          console.log(`clone success: ${data}`);
        });
        clone.stderr.on('data', (data) => {
          console.error(`clone error: ${data}`);
        });
      }
    });
  })
  .catch((err) => console.error(err));
