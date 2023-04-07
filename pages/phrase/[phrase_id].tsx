import styles from '@/styles/Phrase.module.css'
import { useRouter } from 'next/router'
import Head from 'next/head';
import { PhraseType,AllPhraseType,Topic } from '@/types/phrase_type';
import { useState,useEffect } from 'react';
import Link from 'next/link';
import useSWR from 'swr';

type Props = {
    phrase_id:number
    txt_id:number
}

type QueryType = {
    phrase_id:string
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

function Phrase({data}:{data:PhraseType}) {
    const dynamicRoute = useRouter().asPath;
    useEffect(() => {
        setContext_before([] as React.ReactElement[])
        setContext_after([] as React.ReactElement[])
        setComment(data.comment)
        setCommentText(data.comment)
    }, [data]);
    const [context_before,setContext_before] = useState([] as React.ReactElement[])
    const [context_after,setContext_after] = useState([] as React.ReactElement[])
    const [comment,setComment] = useState(data.comment)
    const [commentText,setCommentText] = useState(data.comment)
    const next_page = `/phrase/${data._id +1}`
    const last_page = `/phrase/${data._id -1}`
    //console.log(context_before)
    const onAddCtxBf = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const new_ctx = [<Ctx_phrase txt_id={data.txt_id} phrase_id={data.a_id - context_before.length-1} key={context_before.length} />]
        setContext_before(new_ctx.concat(context_before));
    };
    const onAddCtxAf = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setContext_after(context_after.concat(<Ctx_phrase txt_id={data.txt_id} phrase_id={data.a_id + context_after.length + 1} key={context_after.length} />));
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
        const endpoint = `/api/phrases/${data._id}`
    
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

    const router = useRouter()
    const { phrase_id } = router.query
    const page_title = `Phrase: ${phrase_id}`
    const pdf_dir_location = 'file:///C:/Users/tales/Desktop/PROJECTS/PYTHON/LDA_arXiv'
    const doc_path = `${pdf_dir_location}${data.path.substring(1).slice(0, -7)}pdf`
    return (
        <>
            <Head>
                <title>{page_title}</title>
            </Head>
            <main className={styles.main}>
                <div><Link className={styles.last} href={last_page}>{"<"}</Link></div>
                <div className={styles.container}>
                    <div className={styles.meta}><span>ID: {data._id}</span><span>A_ID: {data.a_id}</span><a target="_blank"  href={doc_path}>PDF</a></div>
                    <div className={styles.more_ctx}>
                        <button onClick={onAddCtxBf}></button>
                    </div>
                    {context_before}
                    <div className={styles.phrase}>{data.phrase}</div>
                    {context_after}
                    <div className={styles.more_ctx}>
                        <button onClick={onAddCtxAf}> </button>
                    </div>
                    <form className={styles.comment} onSubmit={handleSubmit}>
                        <label htmlFor="first">Comment:</label>
                        <div className={styles.input}>
                            <textarea rows={2} className={ comment==commentText ?  styles.green : styles.blue}  value={commentText} onChange={({target})=> setCommentText(target?.value)} id="comment" name="comment" />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div><Link className={styles.next} href={next_page}>{">"}</Link></div>
            </main>
        </>
    )
}

export async function getServerSideProps({query}:{query:QueryType}) {
    const pageRequest = `http://127.0.0.1:8000/phrases/${query.phrase_id}`
    const res = await fetch(pageRequest)
    const json = await res.json()
    //console.log(json)
    return {
      props: {
          data: json,
      },
    }
  }

export default Phrase