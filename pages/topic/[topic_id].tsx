import styles from '@/styles/Phrase.module.css'
import chroma from "chroma-js";
import { useRouter } from 'next/router'
import Head from 'next/head';
import { PhraseType,PhraseLtype,AllPhraseType,Topic } from '@/types/phrase_type';
import { TopicListType, TopicType } from '@/types/topic_type';
import { useState,useEffect,useContext  } from 'react';
import AppContext from '@/components/app_context'
import Link from 'next/link';
import useSWR from 'swr';

type Props = {
    phrase_id:number
    txt_id:number
}

interface StrCount {
    [key: string]: number
}

type QueryType = {
    topic_id:string,
    skip:string,
    limit:string,
    color:any,
}

type PhraseProps = {
    phrase:PhraseType,
    n_topics:number,
    relative_id:number,
    words_color:{ word: string; color: string; }[],
}


const fetcher = (url:string) => fetch(url).then(res => res.json())
 

function Ctx_phrase(props:Props) {
  const { data, error, isLoading } = useSWR(`/api/all_phrases/${props.phrase_id}`, fetcher)
  const fraze = data as AllPhraseType
  const id = props.phrase_id.toString()
  if (error) return <div className={styles.context}>falhou em carregar</div>
  if (isLoading) return <div className={styles.context}>carregando...</div>
  if(fraze.txt_id != props.txt_id) return(<></>)
  return (<div id={id} className={styles.context}>{fraze.phrase}</div>)
}

function Topics({topics}:{topics:TopicType[]}){
    const value = useContext(AppContext);
    const scl = chroma.scale('YlGnBu').padding([0.4, 0]);
    const topicsList = [] as React.ReactElement[]
    for (let i = 0; i < topics.length; i++) {
        const words = [] as React.ReactElement[]
        for (let j = 0; j < topics[i].word_probabilities.length; j++) {
            const act = topics[i].word_probabilities[j].prob
            const first = topics[i].word_probabilities[0].prob
            const last = topics[i].word_probabilities[topics[i].word_probabilities.length - 1].prob
            const scaled = (act-last)/(first-last)
            const sqrscaled = Math.cbrt(scaled)
            const color = scl(sqrscaled).alpha(0.9).hex()
            words.push(
                <div key={j} className={styles.word_prob}>
                    <div key={j}  style={{ backgroundColor: color,width:`${sqrscaled*100}%`}}>{topics[i].word_probabilities[j].word}</div>
                </div>
            )
        }
        topicsList.push(
            <div key={i} style={{display: (value.topic == i?'initial':'none')}} className={styles.all_topic}>
                <div className={styles.all_topic_label}>Topic {i}</div>
                {words}
            </div>
        )
    }
    return(
        <>        
            <div onClick={() => value.setTopic(-1)} style={{display: (value.topic < 0? 'none':'initial')}} className={styles.shadow}></div>
            <div className={styles.all_topics}>
                {topicsList}
            </div>
        </>

    )
}

function CommentCount({word_count}:{word_count:StrCount}){
    const wordList = [] as React.ReactElement[]
    let arr = Object.values(word_count);
    let max = Math.max(...arr);
    const sortable = Object.entries(word_count)
    .sort(([,a],[,b]) => b-a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {}) as StrCount
    for (const key in sortable) {
        if (key != ""){
            wordList.push(
                <div key={key} className={styles.t_word_prob}>
                    <div key={key}  style={{ width:`${(sortable[key]/max)*100}%`}}>{key}</div>
                </div>
            )
        }
    }
    return(
        <div className={styles.comment_count}>
            {wordList}
        </div>
    )
}

function TopicBar({n,topics}:{n:number,topics:Topic[]}){
    const topicsList = [] as React.ReactElement[]
    const topicColors = []
    const value = useContext(AppContext);
    let phi = 0
    for (let i = 0; i < n; i++) {
        const color = chroma.lch(77, 36, phi)
        phi = phi + (360/n)
        //topicsList.push(<div className={styles.topic} style={{ backgroundColor: color.hex() }}></div>)
        topicColors.push(color.hex())
    }
    for (let i = 0; i < topics.length; i++) {
        const percent = `${topics[i].prob * 98}%`
        topicsList.push(<div className={styles.meter} onClick={() => value.setTopic(topics[i].topic)} style={{ backgroundColor: topicColors[topics[i].topic],width: percent}} key={i}>{topics[i].topic}</div>)
    }
    

    return(
        <>
            <div className={styles.topics}>
                {topicsList}
            </div>
        </>
    )
}



function count_words(str:string,obj:StrCount) {
    
    str.split(" ").forEach(function(el, i, arr) {
      obj[el] = obj[el] ? ++obj[el] : 1;
    });
    
    return obj;
  }

function joinTags(stri:string){
    const list = []
    for (const i of stri.split("<")){
        let j = i.split(">")
        
        for (let r = 0; r < j.length-1; r++){
            list.push(j[r].replace(/ /g,"-"))
        }
        list.push(j[j.length-1])
    }
    return(list.join(" ").replace(/ +(?= )/g,''));
}

function remove_stopwords(str:string) {
    const stopwords = ["de","a","o","que","e","do","da","em","um","para","é","com","não","uma","os","no","se","na","por","mais","as","dos","como","mas","foi","ao","ele","das","tem","à","seu","sua","ou","ser","quando","muito","há","nos","já","está","eu","também","só","pelo","pela","até","isso","ela","entre","era","depois","sem","mesmo","aos","ter","seus","quem","nas","me","esse","eles","estão","você","tinha","foram","essa","num","nem","suas","meu","às","minha","têm","numa","pelos","elas","havia","seja","qual","será","nós","tenho","lhe","deles","essas","esses","pelas","este","fosse","dele","tu","te","vocês","vos","lhes","meus","minhas","teu","tua","teus","tuas","nosso","nossa","nossos","nossas","dela","delas","esta","estes","estas","aquele","aquela","aqueles","aquelas","isto","aquilo","estou","está","estamos","estão","estive","esteve","estivemos","estiveram","estava","estávamos","estavam","estivera","estivéramos","esteja","estejamos","estejam","estivesse","estivéssemos","estivessem","estiver","estivermos","estiverem","hei","há","havemos","hão","houve","houvemos","houveram","houvera","houvéramos","haja","hajamos","hajam","houvesse","houvéssemos","houvessem","houver","houvermos","houverem","houverei","houverá","houveremos","houverão","houveria","houveríamos","houveriam","sou","somos","são","era","éramos","eram","fui","foi","fomos","foram","fora","fôramos","seja","sejamos","sejam","fosse","fôssemos","fossem","for","formos","forem","serei","será","seremos","serão","seria","seríamos","seriam","tenho","tem","temos","tém","tinha","tínhamos","tinham","tive","teve","tivemos","tiveram","tivera","tivéramos","tenha","tenhamos","tenham","tivesse","tivéssemos","tivessem","tiver","tivermos","tiverem","terei","terá","teremos","terão","teria","teríamos","teriam"]
    var res = []
    var words = str.split(' ')
    for(let i=0;i<words.length;i++) {
       let word_clean = words[i].split(".").join("")
       if(!stopwords.includes(word_clean)) {
           res.push(word_clean)
       }
    }
    return(res.join(' '))
}  

function Phrases({data,topic_data,count,skip,limit,topic}:{data:PhraseType[],topic_data:TopicType[],count:number,skip:number,limit:number,topic:number}) {
    
    let comment_count = {} as StrCount
    for (let j = 0; j < data.length; j++) {
        comment_count = count_words(remove_stopwords(joinTags(data[j].comment)),comment_count)
    }

    const scl = chroma.scale('YlGnBu').padding([0.4, 0]);
    const words_color = []
    //console.log(topic_data)
    for (let j = 0; j < topic_data[topic].word_probabilities.length; j++) {
        const act = topic_data[topic].word_probabilities[j].prob
        const first = topic_data[topic].word_probabilities[0].prob
        const last = topic_data[topic].word_probabilities[topic_data[topic].word_probabilities.length - 1].prob
        const scaled = (act-last)/(first-last)
        const sqrscaled = Math.cbrt(scaled)
        const color = scl(sqrscaled).alpha(0.9).hex()
        words_color.push(
            {"word": topic_data[topic].word_probabilities[j].word,"color":color}
        )
    }
    const docs_per_page = 10
    const router = useRouter()
    //console.log(router.query)
    const { topic_id } = router.query as QueryType
    const page_title = `Topic: ${topic_id}`
    const phrases_list = [] as React.ReactElement[]
    //console.log(count)
    //console.log(limit)
    //console.log(skip)
    const last_page =`/topic/${topic}?skip=${skip-docs_per_page>=0 ? skip-docs_per_page : 0}&limit=${skip-docs_per_page>=0? 10 : (skip>0 ? skip: 10)}`
    const next_page =`/topic/${topic}?skip=${skip+docs_per_page<count ? skip+docs_per_page : skip}&limit=10`
    for (let i = 0; i < data.length; i++) {
            phrases_list.push(<Phrase key={i} relative_id={skip+i+1} words_color={words_color} n_topics={topic_data.length} phrase={data[i]}/>);
    }
    return (
        <>
            <Head>
                <title>{page_title}</title>
            </Head>
            {/*<CommentCount word_count={comment_count}/>*/}
            <div className={styles.topic_meta}>- TOPIC {topic} -</div>
            <Topics topics={topic_data}></Topics>
            <div className={styles.next_page}><Link href={next_page}>{">"}</Link></div>
            <div className={styles.last_page}><Link href={last_page}>{"<"}</Link></div>
            <main className={styles.main}>
                {phrases_list}
            </main>
            <div className={styles.topic_meta}>{count} PHRASES</div>
        </>
    )
}



function Phrase(props:PhraseProps) {
    const [colored,setColored] = useState(false)
    const dynamicRoute = useRouter().asPath;
    const desc_color_w = props.words_color.sort(function(a, b){
        // ASC  -> a.length - b.length
        // DESC -> b.length - a.length
        return a.word.length - b.word.length;
    });
    //console.log(desc_color_w)
    const phrase_text = props.phrase.phrase.replace("machine learning", 'machine-learning').replace("artificial intelligence", 'artificial-intelligence')
    const list_of_words = phrase_text.split(" ")
    const colored_phrase = [] as React.ReactElement[]
    for (let i = 0; i < list_of_words.length; i++) {
        let word = <span>{list_of_words[i]} </span> as React.ReactElement
        for (let j = 0; j < desc_color_w.length; j++) {
            if (list_of_words[i].replace(/[^a-z0-9]/gi, '') == desc_color_w[j].word.replace(/[^a-z0-9]/gi, '')){
                word = <span style={{color:desc_color_w[j].color}}>{list_of_words[i]} </span>
            }
        }
        colored_phrase.push(word)
    }
    useEffect(() => {
        setContext_before([] as React.ReactElement[])
        setContext_after([] as React.ReactElement[])
        setComment(props.phrase.comment)
        setCommentText(props.phrase.comment)
    }, [props.phrase]);
    const [context_before,setContext_before] = useState([] as React.ReactElement[])
    const [context_after,setContext_after] = useState([] as React.ReactElement[])
    const [comment,setComment] = useState(props.phrase.comment)
    const [commentText,setCommentText] = useState(props.phrase.comment)
    const next_page = `/phrase/${props.phrase._id +1}`
    const last_page = `/phrase/${props.phrase._id -1}`
    //console.log(context_before)
    const onAddCtxBf = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const new_ctx = [<Ctx_phrase txt_id={props.phrase.txt_id} phrase_id={props.phrase.a_id - context_before.length-1} key={context_before.length} />]
        setContext_before(new_ctx.concat(context_before));
    };
    const onAddCtxAf = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setContext_after(context_after.concat(<Ctx_phrase txt_id={props.phrase.txt_id} phrase_id={props.phrase.a_id + context_after.length + 1} key={context_after.length} />));
    };

    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
    
        // Get data from the form.
        const com_data = {
            comment: (event.target as HTMLFormElement).comment.value,
        }
    
        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(com_data)
    
        // API endpoint where we send form data.
        const endpoint = `/api/phrases/${props.phrase._id}`
    
        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'PUT',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }
    
        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)
    
        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
        //console.log(result.comment)
        setComment(result.comment)
    }


    const pdf_dir_location = 'file:///C:/Users/tales/Desktop/PROJECTS/PYTHON/LDA_arXiv'
    const doc_path = `${pdf_dir_location}${props.phrase.path.substring(1).slice(0, -7)}pdf`
    return (
        <>
            <div className={styles.phrase_main}>
                <div className={styles.container}>
                    <div onClick={()=>{setColored(!colored)}} className={styles.meta}><span className={styles.meta_left}>{props.relative_id}</span><span>TXT_ID: {props.phrase.txt_id}</span><span>ID: {props.phrase._id}</span><span>A_ID: {props.phrase.a_id}</span><a target="_blank"  href={doc_path}>PDF</a></div>
                    <div className={styles.more_ctx}>
                        <button onClick={onAddCtxBf}></button>
                    </div>
                    {context_before}
                    <div className={styles.phrase}>{colored? colored_phrase : props.phrase.phrase}</div>
                    {context_after}
                    <div className={styles.more_ctx}>
                        <button onClick={onAddCtxAf}> </button>
                    </div>
                    <div></div>
                    <TopicBar n={props.n_topics} topics={props.phrase.topics}></TopicBar>
                    <form className={styles.comment} onSubmit={handleSubmit}>
                        <label htmlFor="first">Comment:</label>
                        <div className={styles.input}>
                            <textarea rows={2} className={ comment==commentText ?  styles.green : styles.blue}  value={commentText} onChange={({target})=> setCommentText(target?.value)} id="comment" name="comment" />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps({query}:{query:QueryType}) {
    const pageRequest = `http://127.0.0.1:8000/phrases/?skip=${query.skip}&limit=${query.limit}&topic=${query.topic_id}`
    const res = await fetch(pageRequest)
    const json = await res.json()
    const count_n = res.headers.get('count') as string
    const pageRequestTopics = `http://127.0.0.1:8000/topics?limit=100`
    const resTopics = await fetch(pageRequestTopics)
    const jsonTopics = await resTopics.json()
    //console.log(count_n)
    return {
      props: {
          data: json,
          topic_data: jsonTopics,
          count: parseInt(count_n),
          skip:  parseInt(query.skip),
          limit: parseInt(query.limit),
          topic: parseInt(query.topic_id),
      },
    }
  }

export default Phrases