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
  a_id: number
  match_word: string[]
  topics: Topics
}

export interface Topics {
  "nt5_alpha0,05_eta0,005": Nt5Alpha005Eta0005
  "nt10_alpha0,05_eta0,005": Nt10Alpha005Eta0005
  "nt20_alpha0,05_eta0,005": Nt20Alpha005Eta0005
  "nt40_alpha0,05_eta0,005": Nt40Alpha005Eta0005
  "nt5_alpha0,05_eta0,01": Nt5Alpha005Eta001
  "nt10_alpha0,05_eta0,01": Nt10Alpha005Eta001
  "nt20_alpha0,05_eta0,01": Nt20Alpha005Eta001
  "nt40_alpha0,05_eta0,01": Nt40Alpha005Eta001
  "nt5_alpha0,05_eta0,05": Nt5Alpha005Eta005
  "nt10_alpha0,05_eta0,05": Nt10Alpha005Eta005
  "nt20_alpha0,05_eta0,05": Nt20Alpha005Eta005
  "nt40_alpha0,05_eta0,05": Nt40Alpha005Eta005
  "nt5_alpha0,05_eta0,1": Nt5Alpha005Eta01
  "nt10_alpha0,05_eta0,1": Nt10Alpha005Eta01
  "nt20_alpha0,05_eta0,1": Nt20Alpha005Eta01
  "nt40_alpha0,05_eta0,1": Nt40Alpha005Eta01
  "nt5_alpha0,1_eta0,005": Nt5Alpha01Eta0005
  "nt10_alpha0,1_eta0,005": Nt10Alpha01Eta0005
  "nt20_alpha0,1_eta0,005": Nt20Alpha01Eta0005
  "nt40_alpha0,1_eta0,005": Nt40Alpha01Eta0005
  "nt5_alpha0,1_eta0,01": Nt5Alpha01Eta001
  "nt10_alpha0,1_eta0,01": Nt10Alpha01Eta001
  "nt20_alpha0,1_eta0,01": Nt20Alpha01Eta001
  "nt40_alpha0,1_eta0,01": Nt40Alpha01Eta001
  "nt5_alpha0,1_eta0,05": Nt5Alpha01Eta005
  "nt10_alpha0,1_eta0,05": Nt10Alpha01Eta005
  "nt20_alpha0,1_eta0,05": Nt20Alpha01Eta005
  "nt40_alpha0,1_eta0,05": Nt40Alpha01Eta005
  "nt5_alpha0,1_eta0,1": Nt5Alpha01Eta01
  "nt10_alpha0,1_eta0,1": Nt10Alpha01Eta01
  "nt20_alpha0,1_eta0,1": Nt20Alpha01Eta01
  "nt40_alpha0,1_eta0,1": Nt40Alpha01Eta01
  "nt5_alpha0,5_eta0,005": Nt5Alpha05Eta0005
  "nt10_alpha0,5_eta0,005": Nt10Alpha05Eta0005
  "nt20_alpha0,5_eta0,005": Nt20Alpha05Eta0005
  "nt40_alpha0,5_eta0,005": Nt40Alpha05Eta0005
  "nt5_alpha0,5_eta0,01": Nt5Alpha05Eta001
  "nt10_alpha0,5_eta0,01": Nt10Alpha05Eta001
  "nt20_alpha0,5_eta0,01": Nt20Alpha05Eta001
  "nt40_alpha0,5_eta0,01": Nt40Alpha05Eta001
  "nt5_alpha0,5_eta0,05": Nt5Alpha05Eta005
  "nt10_alpha0,5_eta0,05": Nt10Alpha05Eta005
  "nt20_alpha0,5_eta0,05": Nt20Alpha05Eta005
  "nt40_alpha0,5_eta0,05": Nt40Alpha05Eta005
  "nt5_alpha0,5_eta0,1": Nt5Alpha05Eta01
  "nt10_alpha0,5_eta0,1": Nt10Alpha05Eta01
  "nt20_alpha0,5_eta0,1": Nt20Alpha05Eta01
  "nt40_alpha0,5_eta0,1": Nt40Alpha05Eta01
  "nt5_alpha0,9_eta0,005": Nt5Alpha09Eta0005
  "nt10_alpha0,9_eta0,005": Nt10Alpha09Eta0005
  "nt20_alpha0,9_eta0,005": Nt20Alpha09Eta0005
  "nt40_alpha0,9_eta0,005": Nt40Alpha09Eta0005
  "nt5_alpha0,9_eta0,01": Nt5Alpha09Eta001
  "nt10_alpha0,9_eta0,01": Nt10Alpha09Eta001
  "nt20_alpha0,9_eta0,01": Nt20Alpha09Eta001
  "nt40_alpha0,9_eta0,01": Nt40Alpha09Eta001
  "nt5_alpha0,9_eta0,05": Nt5Alpha09Eta005
  "nt10_alpha0,9_eta0,05": Nt10Alpha09Eta005
  "nt20_alpha0,9_eta0,05": Nt20Alpha09Eta005
  "nt40_alpha0,9_eta0,05": Nt40Alpha09Eta005
  "nt5_alpha0,9_eta0,1": Nt5Alpha09Eta01
  "nt10_alpha0,9_eta0,1": Nt10Alpha09Eta01
  "nt20_alpha0,9_eta0,1": Nt20Alpha09Eta01
  "nt40_alpha0,9_eta0,1": Nt40Alpha09Eta01
}

export interface Nt5Alpha005Eta0005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic[]
}

export interface Topic {
  topic: number
  prob: number
}

export interface Nt10Alpha005Eta0005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic2[]
}

export interface Topic2 {
  topic: number
  prob: number
}

export interface Nt20Alpha005Eta0005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic3[]
}

export interface Topic3 {
  topic: number
  prob: number
}

export interface Nt40Alpha005Eta0005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic4[]
}

export interface Topic4 {
  topic: number
  prob: number
}

export interface Nt5Alpha005Eta001 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic5[]
}

export interface Topic5 {
  topic: number
  prob: number
}

export interface Nt10Alpha005Eta001 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic6[]
}

export interface Topic6 {
  topic: number
  prob: number
}

export interface Nt20Alpha005Eta001 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic7[]
}

export interface Topic7 {
  topic: number
  prob: number
}

export interface Nt40Alpha005Eta001 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic8[]
}

export interface Topic8 {
  topic: number
  prob: number
}

export interface Nt5Alpha005Eta005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic9[]
}

export interface Topic9 {
  topic: number
  prob: number
}

export interface Nt10Alpha005Eta005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic10[]
}

export interface Topic10 {
  topic: number
  prob: number
}

export interface Nt20Alpha005Eta005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic11[]
}

export interface Topic11 {
  topic: number
  prob: number
}

export interface Nt40Alpha005Eta005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic12[]
}

export interface Topic12 {
  topic: number
  prob: number
}

export interface Nt5Alpha005Eta01 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic13[]
}

export interface Topic13 {
  topic: number
  prob: number
}

export interface Nt10Alpha005Eta01 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic14[]
}

export interface Topic14 {
  topic: number
  prob: number
}

export interface Nt20Alpha005Eta01 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic15[]
}

export interface Topic15 {
  topic: number
  prob: number
}

export interface Nt40Alpha005Eta01 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic16[]
}

export interface Topic16 {
  topic: number
  prob: number
}

export interface Nt5Alpha01Eta0005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic17[]
}

export interface Topic17 {
  topic: number
  prob: number
}

export interface Nt10Alpha01Eta0005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic18[]
}

export interface Topic18 {
  topic: number
  prob: number
}

export interface Nt20Alpha01Eta0005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic19[]
}

export interface Topic19 {
  topic: number
  prob: number
}

export interface Nt40Alpha01Eta0005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic20[]
}

export interface Topic20 {
  topic: number
  prob: number
}

export interface Nt5Alpha01Eta001 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic21[]
}

export interface Topic21 {
  topic: number
  prob: number
}

export interface Nt10Alpha01Eta001 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic22[]
}

export interface Topic22 {
  topic: number
  prob: number
}

export interface Nt20Alpha01Eta001 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic23[]
}

export interface Topic23 {
  topic: number
  prob: number
}

export interface Nt40Alpha01Eta001 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic24[]
}

export interface Topic24 {
  topic: number
  prob: number
}

export interface Nt5Alpha01Eta005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic25[]
}

export interface Topic25 {
  topic: number
  prob: number
}

export interface Nt10Alpha01Eta005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic26[]
}

export interface Topic26 {
  topic: number
  prob: number
}

export interface Nt20Alpha01Eta005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic27[]
}

export interface Topic27 {
  topic: number
  prob: number
}

export interface Nt40Alpha01Eta005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic28[]
}

export interface Topic28 {
  topic: number
  prob: number
}

export interface Nt5Alpha01Eta01 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic29[]
}

export interface Topic29 {
  topic: number
  prob: number
}

export interface Nt10Alpha01Eta01 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic30[]
}

export interface Topic30 {
  topic: number
  prob: number
}

export interface Nt20Alpha01Eta01 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic31[]
}

export interface Topic31 {
  topic: number
  prob: number
}

export interface Nt40Alpha01Eta01 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic32[]
}

export interface Topic32 {
  topic: number
  prob: number
}

export interface Nt5Alpha05Eta0005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic33[]
}

export interface Topic33 {
  topic: number
  prob: number
}

export interface Nt10Alpha05Eta0005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic34[]
}

export interface Topic34 {
  topic: number
  prob: number
}

export interface Nt20Alpha05Eta0005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic35[]
}

export interface Topic35 {
  topic: number
  prob: number
}

export interface Nt40Alpha05Eta0005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic36[]
}

export interface Topic36 {
  topic: number
  prob: number
}

export interface Nt5Alpha05Eta001 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic37[]
}

export interface Topic37 {
  topic: number
  prob: number
}

export interface Nt10Alpha05Eta001 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic38[]
}

export interface Topic38 {
  topic: number
  prob: number
}

export interface Nt20Alpha05Eta001 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic39[]
}

export interface Topic39 {
  topic: number
  prob: number
}

export interface Nt40Alpha05Eta001 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic40[]
}

export interface Topic40 {
  topic: number
  prob: number
}

export interface Nt5Alpha05Eta005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic41[]
}

export interface Topic41 {
  topic: number
  prob: number
}

export interface Nt10Alpha05Eta005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic42[]
}

export interface Topic42 {
  topic: number
  prob: number
}

export interface Nt20Alpha05Eta005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic43[]
}

export interface Topic43 {
  topic: number
  prob: number
}

export interface Nt40Alpha05Eta005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic44[]
}

export interface Topic44 {
  topic: number
  prob: number
}

export interface Nt5Alpha05Eta01 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic45[]
}

export interface Topic45 {
  topic: number
  prob: number
}

export interface Nt10Alpha05Eta01 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic46[]
}

export interface Topic46 {
  topic: number
  prob: number
}

export interface Nt20Alpha05Eta01 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic47[]
}

export interface Topic47 {
  topic: number
  prob: number
}

export interface Nt40Alpha05Eta01 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic48[]
}

export interface Topic48 {
  topic: number
  prob: number
}

export interface Nt5Alpha09Eta0005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic49[]
}

export interface Topic49 {
  topic: number
  prob: number
}

export interface Nt10Alpha09Eta0005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic50[]
}

export interface Topic50 {
  topic: number
  prob: number
}

export interface Nt20Alpha09Eta0005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic51[]
}

export interface Topic51 {
  topic: number
  prob: number
}

export interface Nt40Alpha09Eta0005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic52[]
}

export interface Topic52 {
  topic: number
  prob: number
}

export interface Nt5Alpha09Eta001 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic53[]
}

export interface Topic53 {
  topic: number
  prob: number
}

export interface Nt10Alpha09Eta001 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic54[]
}

export interface Topic54 {
  topic: number
  prob: number
}

export interface Nt20Alpha09Eta001 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic55[]
}

export interface Topic55 {
  topic: number
  prob: number
}

export interface Nt40Alpha09Eta001 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic56[]
}

export interface Topic56 {
  topic: number
  prob: number
}

export interface Nt5Alpha09Eta005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic57[]
}

export interface Topic57 {
  topic: number
  prob: number
}

export interface Nt10Alpha09Eta005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic58[]
}

export interface Topic58 {
  topic: number
  prob: number
}

export interface Nt20Alpha09Eta005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic59[]
}

export interface Topic59 {
  topic: number
  prob: number
}

export interface Nt40Alpha09Eta005 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic60[]
}

export interface Topic60 {
  topic: number
  prob: number
}

export interface Nt5Alpha09Eta01 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic61[]
}

export interface Topic61 {
  topic: number
  prob: number
}

export interface Nt10Alpha09Eta01 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic62[]
}

export interface Topic62 {
  topic: number
  prob: number
}

export interface Nt20Alpha09Eta01 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic63[]
}

export interface Topic63 {
  topic: number
  prob: number
}

export interface Nt40Alpha09Eta01 {
  number_of_topics: number
  alpha: number
  eta: number
  topics: Topic64[]
}

export interface Topic64 {
  topic: number
  prob: number
}
