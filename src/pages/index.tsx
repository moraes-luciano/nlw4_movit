import { ExpBar } from '../components/ExpBar';
import { Profile } from '../components/Profile';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountdownProvider } from '../contexts/CountdownContext';

import{GetServerSideProps} from 'next';
import Head from 'next/head';

import styles from '../styles/pages/Home.module.css';

interface HomeProps{
  level: number;
  currentExperience: number;
  challengeComplete: number;
}

// desse jeito é como fazer o react puro, o robo da google nao vai esperar renderizar o componente
export default function Home(props) {
  // console.log(props);
  return (
    <ChallengesProvider
      level ={props.level}
      currentExperience = {props.currentExperience}
      challengeComplete = {props.challengesComplete}
      >

      <div className={styles.container}>
        <Head>
          <title>Início | nlw4_moveit</title>
          <link rel="preconnect" href="htt"/>
        </Head>
        <ExpBar />

        <CountdownProvider>
          <section>
            <div> 
              <Profile /> 
              <CompletedChallenges /> 
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>

    </ChallengesProvider>
  )
  
}
// O componente motado pelo export default function Home() é montado apenas no Browser,
// o robo do Google não via esperar o default function Home() carregar a tela do site no cliente. 

// Para contornar isso utiliza-se o export const getServerSideProps = async()=>{ 
// o next antes de construir a interface pelo export default function Home() faz uma chamada api, 
//pega os dados e os repassa para os componentes os dados já prontos e ai o componente mostra os dados em tela.

export const getServerSideProps: GetServerSideProps = async(ctx)=>{ //o ctx é o parametro relacionado ao cookie (cookie é acessível do front e do back)

  // const user ={
  //   level: 1,
  //   currentExperience: 50,
  //   challengeComplete: 2,
  // }

  const { level, currentExperience, challengeComplete } = ctx.req.cookies;
  // console.log(user); //colocando aqui vc pode ver os dados que sao mostrados antes de carregar a pagina, ficam disponiveis no proprio terminal
  
  return{
    props:{
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeComplete: Number(challengeComplete),
    }
  }

}

//Back-end
//Next.js com o getServerSideProps eu posso pegar quais dados do back-end vao ser disponibilizados para o front-end antes de carregar o componente
//Front-end

// O getServerSideProps faz uma chamada api para o backend para preencher os dados em export default function Home(). Tando o Home() quanto getServerSideProps
// fazem chamadas api para o backend a diferença é que o Home() não vai estar pronto qd o motor de busca chegar no site. Como ele carrega no cliente, ele só vai 
// estar disponível depois de ser achado rs

// O getServerSideProps funciona apenas na pasta pages