'use client'
import { SearchIcon } from '@/assets/icons/SearchIcon'
import styles from './Search.module.scss'

interface InputProps {
    onChange?: (value: string) => void
    placeholder?: string
    errorMsg?: string
    value?: string
    icon?: React.ReactNode
    disabled?: boolean
    autocomplete?: string
}

export const Search = (props: InputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
            props.onChange(e.target.value)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    return (
        <div className={`${styles.inputSearch} ${props.errorMsg && styles.error}`}>
            {props.icon ? (
                <span className={styles.inputIcon}>{props.icon}</span>
            ) : (
                <span className={styles.inputIcon}>
                    <SearchIcon width={16} height={16} fill="#fff" />
                </span>
            )}
            <input
                className={`${props.errorMsg && styles.error}`}
                id="search"
                placeholder={props.placeholder}
                value={props.value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                required={false}
                disabled={props.disabled}
                // autoComplete={props.autocomplete || 'off'}
            />
            {props.errorMsg && <span className={styles.errorMsg}>{props.errorMsg}</span>}
        </div>
    )
}
