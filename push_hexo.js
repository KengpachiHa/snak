import fs from 'fs'
import path, { resolve } from "path"
import child_process from 'child_process'
import ncp from 'ncp'

const spawn = child_process.spawn
const exec = child_process.exec
const cp = ncp.ncp

ncp.limit = 16
const snakSource      = '/Users/hanjunyi/store/code/snak/dist'
const blogDestination = '/Users/hanjunyi/store/blog/blog/source/snak'
const blogPath        = '/Users/hanjunyi/store/blog/blog/'
const op = {
  dereference: true,
  clobber: false
}

const buildSnak = new Promise((resolve, reject) => {
  spawn('npm',['run', 'build'])
    .on('close', (code, signal)=> {
      if(code == 0) console.log('=== after build === && code= ', code)
      resolve()
      if(code != 0) reject(code)
    })
})
buildSnak
  .then(() => {
    spawn('rm', ['-rf', blogDestination]).on('close', (code) => {
      if(code == 0) console.log('=== after clean /blog/snak === && code= ', code) 
      resolve()
    })
  })
  .then(() => {
    cp(snakSource, blogDestination, op, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('cp snak done!');
      resolve()
    });
  })
  .then(() => {
    const generate = spawn('hexo', ['g', '-d'], { cwd: blogPath})
    generate.on('close', (code, signal) => {
      console.log('=== after generating ===', code, signal)
    })
    generate.on('error', (err) => {
      console.log('err====', err)
    })
  })
