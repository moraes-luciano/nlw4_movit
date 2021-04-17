import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData{
    level: number;
    currentExperience: number;
    challengesComplete: number;
    activeChallenge: Challenge;
    experienceToNextLevel:number;
    levelUp: ()=> void;
    startNewChallenge: ()=> void;
    resetChallenge: ()=> void;
    completeChallenge: ()=> void;
    closeLevelUpModal: ()=> void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengeComplete: number;
}


export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children, ...rest}:ChallengesProviderProps){

    const [level,setLevel] = useState(rest.level?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience?? 0);
    const [challengesComplete, setChallengesComplete] = useState(rest.challengeComplete?? 0); 

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const experienceToNextLevel = Math.pow(((level + 1) *4), 2);
  
    useEffect(()=>{
        Notification.requestPermission();
    }, []); // se o segundo paramentro for um array vazio ele irá rodar a função anônima uma única vez qd esse componente carregar

    useEffect(()=>{
        Cookies.set('level',String(level));
        Cookies.set('currentExperience',String(currentExperience));
        Cookies.set('challengesComplete',String(challengesComplete));
        
    },[level, currentExperience, challengesComplete]);

    function levelUp(){
      setLevel(level+1);
      setIsLevelUpModalOpen(true);
    }
  
    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge(){
        const randomChallengeIndex =  Math.floor(Math.random()* challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        // new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio 🎉',{
                body:`Valendo ${challenge.amount}xp!`
            });
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }
        
        const {amount} = activeChallenge;
        let finalExperience = currentExperience + amount;
        
        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience -experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesComplete(challengesComplete + 1);

        
    }

    return (
        <ChallengesContext.Provider 
            value={{
                level, 
                currentExperience, 
                challengesComplete,
                experienceToNextLevel,
                activeChallenge,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal,
            }}
        >
            {children}
            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
}