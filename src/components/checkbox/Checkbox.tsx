'use client'
import { useState } from 'react'
import styles from './Checkbox.module.scss'
import { CheckIcon } from '@/assets/icons/CheckIcon'

interface ICheckboxProps {
    label?: string | React.ReactNode
    value: string
    checked?: boolean
    setChecked?: (checked: boolean) => void
    errorMsg?: string
}

export const Checkbox = (props: ICheckboxProps) => {
    const [isChecked, setIsChecked] = useState(props.checked || false)
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])

    const handleCheckboxChange = () => {
        const newCheckedState = !isChecked
        setIsChecked(newCheckedState)
        props.setChecked?.(newCheckedState)

        if (newCheckedState) {
            setSelectedOptions([...selectedOptions, props.value])
        } else {
            setSelectedOptions(selectedOptions.filter(option => option !== props.label))
        }
    }

    return (
        <label className={styles.checkboxGroup} htmlFor={`checkbox-${props.value}`}>
            {props.label && <span className={styles.label}>{props.label}</span>}
            <input id={`checkbox-${props.value}`} className={styles.checkbox} checked={isChecked} onChange={handleCheckboxChange} type="checkbox" />
            <span className={`${styles.checkmark} ${isChecked && styles.checked} ${props.errorMsg && styles.error}`}>
                {isChecked && <CheckIcon />}
            </span>
            {props.errorMsg && <div className={styles.errorMsg}>{props.errorMsg}</div>}
        </label>
    )
}
