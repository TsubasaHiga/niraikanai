import archiver from 'archiver'
import dayjs from 'dayjs'
import fs from 'fs'
import path from 'path'

const __dirname = new URL(import.meta.url).pathname

const zipArchive = async (targetDir: string, outputFileName: string) => {
  const zipPath = `${outputFileName}.zip`
  const output = fs.createWriteStream(path.join(__dirname, '../../' + zipPath))

  const archive = archiver('zip', {
    zlib: { level: 9 }
  })

  archive.pipe(output)
  archive.glob('**', {
    cwd: targetDir
  })

  await archive.finalize()

  return
}

;(async () => {
  const date = dayjs().format('YYYYMMDD-HHmm')
  const projectName = process.env.npm_package_name?.toUpperCase()
  await zipArchive('dist', `${projectName}_ProdBuild_${date}`)
})()
