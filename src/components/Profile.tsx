
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile(){
    const {level} = useContext(ChallengesContext);
    
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/moraes-luciano.png" alt='Luciano Moraes'/>
            <div>
                <strong>Luciano Moraes</strong>
                <p>
                    <img src="icons/level.svg"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}