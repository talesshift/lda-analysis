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

type QueryType = {
    topic_id:string,
    skip:string,
    limit:string,
}

type PhraseProps = {
    phrase:PhraseType,
    n_topics:number
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
                <div className={styles.word_prob}>
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

function Phrases({data,topic_data,count,skip,limit,topic}:{data:PhraseType[],topic_data:TopicType[],count:number,skip:number,limit:number,topic:number}) {
    const docs_per_page = 10
    const router = useRouter()
    //console.log(router.query)
    const { topic_id } = router.query as QueryType
    const page_title = `Phrase: ${topic_id}`
    const phrases_list = [] as React.ReactElement[]
    console.log(count)
    console.log(limit)
    console.log(skip)
    const last_page =`/topic/${topic}?skip=${skip-docs_per_page>=0 ? skip-docs_per_page : 0}&limit=${skip-docs_per_page>=0? 10 : (skip>0 ? skip: 10)}`
    const next_page =`/topic/${topic}?skip=${skip+docs_per_page<count ? skip+docs_per_page : skip}&limit=10`
    for (let i = 0; i < data.length; i++) {
            phrases_list.push(<Phrase key={i} n_topics={topic_data.length} phrase={data[i]}/>);
    }
    return (
        <>
            <Head>
                <title>{page_title}</title>
            </Head>
            <Topics topics={topic_data}></Topics>
            <div className={styles.next_page}><Link href={next_page}>{">"}</Link></div>
            <div className={styles.last_page}><Link href={last_page}>{"<"}</Link></div>
            <main className={styles.main}>
                {phrases_list}
            </main>
        </>
    )
}



function Phrase(props:PhraseProps) {
    const dynamicRoute = useRouter().asPath;
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
        console.log(result.comment)
        setComment(result.comment)
    }


    const pdf_dir_location = 'file:///C:/Users/tales/Desktop/PROJECTS/PYTHON/LDA_arXiv'
    const doc_path = `${pdf_dir_location}${props.phrase.path.substring(1).slice(0, -7)}pdf`
    return (
        <>
            <div className={styles.phrase_main}>
                <div className={styles.container}>
                    <div className={styles.meta}><span>ID: {props.phrase._id}</span><span>A_ID: {props.phrase.a_id}</span><a target="_blank"  href={doc_path}>PDF</a></div>
                    <div className={styles.more_ctx}>
                        <button onClick={onAddCtxBf}></button>
                    </div>
                    {context_before}
                    <div className={styles.phrase}>{props.phrase.phrase}</div>
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