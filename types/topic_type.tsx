export type TopicListType = TopicType[]

export interface TopicType {
  _id: string
  word_probabilities: WordProbability[]
}

export interface WordProbability {
  word: string
  prob: number
}