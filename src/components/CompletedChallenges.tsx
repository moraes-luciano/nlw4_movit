import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges(){
    const {challengesComplete} = useContext(ChallengesContext);
    return(
        <div className={styles.completedChallengesContainer}>
            <span>Desafios Completados</span>
            <span>{challengesComplete}</span>
        </div>
    );
}