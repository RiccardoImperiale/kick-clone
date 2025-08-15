import { BurgerIcon } from '../icons/BurgerIcon'
import styles from './Header.module.css'
import Image from 'next/image'

export const Header = () => {
    return (
        <header className={styles.header}>
            <nav>
                <div className={styles.left}>
                    <div className={styles.iconBox}>
                        <BurgerIcon width={16} height={16} />
                    </div>
                    <Image src="/kick-logo.svg" alt="Logo" width={97} height={26} />
                </div>
                <div className={styles.middle}>search</div>
                <div className={styles.right}>buttons</div>
            </nav>
        </header>
    )
}
