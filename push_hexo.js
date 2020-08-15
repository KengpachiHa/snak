import fs from 'fs'
import path from "path"
import child_process from 'child_process'
import ncp from 'ncp'

const spawn = child_process.spawn
const exec = child_process.exec
const cp = ncp.ncp

ncp.limit = 16
const snakSource      = '/Users/hanjunyi/store/code/snak/dist'
const blogDestination = '/Users/hanjunyi/store/blog/blog/source/snak'
const op = {
  dereference: true,
  clobber: false
}

const buildSnak = new Promise((resolve, reject) => {
  spawn('npm',['run', 'build']).on('close', (data) => {
    resolve(data)
  })
})
buildSnak.then((v) => {
  cp(snakSource, blogDestination, op, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('done!');
   });
})



// import { stdout } from 'process';
// const exec = child_process.exec



// build.on('error', (err) => {
//   console.log(err)
// })

// exec('npm run build', (err, stdout, stderr) => {
//   console.log('after build in push ==>>', stdout, stderr)
//   exec('cd ../snak', (e, out, outerr) => {
//     console.log(path.resolve('./'))
//   })
// })

// exec('cd /Users/hanjunyi/store/code/blog ', (e, out, outerr) => {
//   console.log(path.resolve('/Users/hanjunyi/store/code/blog'), outerr, out)


// })
// exec('cd /Users/hanjunyi/store/code/blog',)
// path.resolve('/Users','/hanjunyi')
// console.log(path.resolve())
// console.log(process.cwd())
// const blogPath = '/Users/hanjunyi/store/blog/blog/source/snak/index.html'
// fs.unlink(blogPath, (err) => {
//   if(err) { console.log(err) }
//     console.log('unlink ')
// })
