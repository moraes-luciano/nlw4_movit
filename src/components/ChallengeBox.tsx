import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from'../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
   
    const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengesContext);
    const {resetCountdown} = useContext(CountdownContext);

    function handleChallengeSucceded(){
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFail(){
        resetChallenge();
        resetCountdown();
    }
    return(  
        <div className={styles.challengeBoxContainer}>
            {activeChallenge? (
                <div className={styles.challengeActive}>
                    <header>{activeChallenge.amount}</header>´
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`}/>
                        <strong>Novo dessafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button 
                            type='button' 
                            className={styles.challengeFailedButton}   
                            onClick= {handleChallengeFail}
                        >
                            Falhei
                        </button>
                        <button 
                            type='button' 
                            className={styles.challengeSucessedButton}  
                            onClick={handleChallengeSucceded}     
                        >
                            Completei
                        </button>
                         
                    </footer>
                </div>
            ):(
                <div className={styles.challengeNotActive}>
                    <strong>Inicie um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="level-up"/>
                        Avance de level completando desafios
                    </p>
                </div>
            )}

        </div>
    )   
}