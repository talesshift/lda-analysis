import styles from '@/styles/Phrase.module.css'
import { useRouter } from 'next/router'
import Head from 'next/head';
import { PhraseType,AllPhraseType } from '@/types/phrase_type';
import { useState } from 'react';
import useSWR from 'swr';

type Props = {
    phrase_id:number
}

type QueryType = {
    phrase_id:string
}

const fetcher = (url:string) => fetch(url).then(res => res.json())
 
function Ctx_phrase(props:Props) {
  const { data, error, isLoading } = useSWR(`http://127.0.0.1:8000/all_phrases/${props.phrase_id}`, fetcher)
  const fraze = data as AllPhraseType
  const id = props.phrase_id.toString()
  if (error) return <div>falhou em carregar</div>
  if (isLoading) return <div>carregando...</div>
  return (<div id={id}>{fraze.phrase}!</div>)
}

function Phrase({data}:{data:PhraseType}) {
    const [context_before,setContext_before] = useState([] as React.ReactElement[])
    const [context_after,setContext_after] = useState([] as React.ReactElement[])
    console.log(context_before)
    const onAddCtxBf = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const new_ctx = [<Ctx_phrase phrase_id={data.a_id - context_before.length-1} key={context_before.length} />]
        setContext_before(new_ctx.concat(context_before));
    };
    const onAddCtxAf = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setContext_after(context_after.concat(<Ctx_phrase phrase_id={data.a_id + context_before.length + 1} key={context_after.length} />));
    };

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
                <div className={styles.container}>
                    <div className={styles.meta}><span>id: {data._id}</span><span>a_id:{data.a_id}</span><a target="_blank"  href={doc_path}>pdf</a></div>
                    <button onClick={onAddCtxBf}>...</button>
                    {context_before}
                    <div className={styles.prase}>{data.phrase}</div>
                    {context_after}
                    <button onClick={onAddCtxAf}>...</button>
                </div>
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