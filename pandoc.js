import { existsSync } from 'fs'
import { execa } from 'execa'
import path from 'path'

export async function convertFile({
  sourceType,
  sourceFilePath,
  targetType,
  targetFilePath,
}) {
  if (!existsSync(sourceFilePath)) {
    throw new Error('Source file does not exist')
  }

  // 获取输入文件的目录作为工作目录
  const workingDirectory = path.dirname(sourceFilePath)

  const args = [
    '-f',
    sourceType,
    '-t',
    targetType,
    '--extract-media',
    './images',
    '-o',
    targetFilePath,
    sourceFilePath,
  ]

  // const command = `pandoc -f ${sourceType} -t ${targetType} -o "${targetFilePath}" "${sourceFilePath}"`

  try {
    await execa('pandoc', args, {
      cwd: workingDirectory,
      shell: true,
    })
    return targetFilePath
  } catch (error) {
    throw new Error(`Pandoc failed: ${error.message}`)
  }
}
