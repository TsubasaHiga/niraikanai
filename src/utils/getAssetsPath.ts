/**
 * public配下のアセットのパスを取得します
 */
const GetAssetsPath = (filename: string): string => {
  // filenameがurlの場合はそのまま返す
  if (filename.match(/^https?:\/\//)) return filename

  return import.meta.env.BASE_URL + filename
}

export default GetAssetsPath
