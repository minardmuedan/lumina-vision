export type TUrls = {
  raw: string
  full: string
  regular: string
  small: string
  thumb: string
  small_s3: string
}

export type TTag = {
  type: 'search' | 'landing_page'
  title: string
}

export type TOrderBy = 'oldest' | 'popular' | 'latest'
export type TPhotoOrietation = 'landscape' | 'portrait' | 'squarish'
export type TPhotoColor = 'black_and_white' | 'black' | 'white' | 'yellow' | 'orange' | 'red' | 'purple' | 'magenta' | 'green' | 'teal' | 'blue'
