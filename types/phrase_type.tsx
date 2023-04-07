export interface AllPhraseType {
    _id: number
    txt_id: number
    path: string
    phrase: string
    lenght: number
    section: string
  }
  

export type PhraseLtype = PhraseType[]

export interface PhraseType {
    _id: number
    txt_id: number
    path: string
    phrase: string
    lenght: number
    section: string
    tags: any[]
    comment: string
    a_id: number
    match_word: string[]
    topics: Topic[]
}
  
export interface Topic {
topic: number
prob: number
}