'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './Input.module.scss'
import { EyeShutIcon } from '@/assets/icons/EyeShutIcon'
import { EyeOpenIcon } from '@/assets/icons/EyeOpenIcon'

interface InputProps {
    id: string
    label?: string
    type?: string
    placeholder?: string
    errorMsg?: string
    value?: string
    setValue?: (value: string) => void
    icon?: React.ReactNode
    autocomplete?: string
    disabled?: boolean
    isRequired?: boolean
    style?: React.CSSProperties
}

export const Input = (props: InputProps) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false)
    const inputRef = useRef<HTMLDivElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.setValue) {
            props.setValue(e.target.value)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setPasswordVisible(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div ref={inputRef} className={styles.inputGroup}>
            {props.label && (
                <label htmlFor={props.id} className={`${props.errorMsg && styles.error}`}>
                    {props.label} {props.isRequired && <span>*</span>}
                </label>
            )}
            <div className={styles.inputWrapper}>
                {props.icon && <span className={styles.inputIcon}>{props.icon}</span>}
                <input
                    type={props.type === 'password' ? (isPasswordVisible ? 'text' : 'password') : props.type}
                    id={props.id}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={handleChange}
                    required={false}
                    autoComplete={props.autocomplete}
                    disabled={props.disabled}
                    style={props.style}
                />
                {props.type === 'password' && (
                    <span onClick={() => setPasswordVisible(!isPasswordVisible)} className={styles.iconWrapper}>
                        {isPasswordVisible ? <EyeShutIcon width={16} height={16} /> : <EyeOpenIcon width={16} height={16} />}
                    </span>
                )}
            </div>
            {props.errorMsg && <span className={`${styles.errorMsg}`}>{props.errorMsg}</span>}
        </div>
    )
}
