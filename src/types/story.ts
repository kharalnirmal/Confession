export const sceneIds = ['encounter', 'little-things', 'constellation', 'confession', 'afterglow'] as const
export type SceneId = typeof sceneIds[number]

export interface Chapter {
  sceneId: SceneId
  start: number
  end: number
}

export interface StoryCue {
  id: string
  sceneId: SceneId
  start: number
  end: number
  text: string
}

export interface TrackDefinition {
  src: string
  assetVersion: string
  expectedDuration: number
  chapters: readonly Chapter[]
  cues: readonly StoryCue[]
}

export interface ResolvedStory {
  sceneId: SceneId
  chapterIndex: number
  cue: StoryCue | null
  localTime: number
  completed: boolean
}
