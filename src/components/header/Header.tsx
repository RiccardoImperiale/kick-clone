import { BurgerIcon } from '@/assets/icons/BurgerIcon'
import styles from './Header.module.css'
import Image from 'next/image'
import { Button } from '@/components/button/Button'
import { InputSearch } from '../input/input-search/InputSearch'

export const Header = () => {
    return (
        <header className={styles.header}>
            <nav>
                <div className={styles.left}>
                    <div className={styles.iconBox}>
                        <BurgerIcon width={16} height={16} />
                    </div>
                    <Image src="/kick-logo.svg" alt="Logo" width={97} height={26} priority />
                </div>
                <div className={styles.middle}>
                    <InputSearch placeholder="Search" />
                </div>
                <div className={styles.right}>
                    <Button text="Sign Up" color="neutral" />
                    <Button text="Sign Up" color="primary" />
                </div>
            </nav>
        </header>
    )
}
