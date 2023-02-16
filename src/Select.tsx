import { useEffect, useRef, useState } from "react"
import styles from "./select.module.css"

export type SelectOption = {
    label: string
    value: string | number
}
type MultipleSelectProps = {
    multiple: true
    value: SelectOption []
    onChange: (value: SelectOption[]) => void
}

type SingleSelectProps = {
    multiple?: false
    value?: SelectOption 
    onChange: (value: SelectOption | undefined) => void
}

type SelectProps = {
    options: SelectOption[]
} & (SingleSelectProps | MultipleSelectProps)


export function Select({multiple, value, onChange, options}: SelectProps){
    const [isOpen, setIsOpen] = useState(false)
    const [HightlightedIndex, setHightlightedIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    function clearOptions(){
       multiple ? onChange([]) : onChange(undefined)
    }
    function selectOption(option: SelectOption){
        if(multiple){
            if (value?.includes(option)){
                onChange(value.filter(o => o !== option))
            }else{
                onChange([...value, option])
            }

        }else {
            if (option !== value) onChange(option)
        }
    }
    function isOptionSelected(option: SelectOption){
        return multiple ? value.includes(option) :  option === value
    }
    useEffect(() => {
        if(isOpen) setHightlightedIndex(0)
    }, [isOpen])
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.target != containerRef.current) return
            switch (e.code){
                case "Enter":
                case "Sapce":
                    setIsOpen(prev => !prev)
            }      
        }
        containerRef.current?.addEventListener("keydown", handler)
        return () => {
            containerRef.current?.removeEventListener("keydown", handler)
        }
    }, [])
    return (
        <>
        <div ref={containerRef} onBlur={() => setIsOpen(false)} onClick={() => setIsOpen(prev => !prev)} tabIndex={0} className={styles.container}>
            <span className={styles.value}>{multiple ? value.map(v => (
                <button key={v.value} onClick={e => {
                    e.stopPropagation()
                    selectOption(v)
                }} className={styles['option-badge']}>{v.label} <span className={styles["remove-btn"]}>&times;</span></button>
            )) : value?.label}</span>
            <button onClick={e => {
                e.stopPropagation()
                clearOptions()
            }} className={styles["clear-btn"]}>&times;</button>
            <div className={styles.divider}></div>
            <div className={styles.caret}></div>
            <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
                {options.map((option, index) => (
                    <li onClick={e => {
                        e.stopPropagation()
                        selectOption(option)
                        setIsOpen(false)
                    }} 
                    onMouseEnter={() => setHightlightedIndex(index)}
                    
                    key={option.value} className={`${styles.option} ${isOptionSelected(option) ? styles.selected: ''} ${index === HightlightedIndex? styles.hightlighted : ''}`}>{option.label}</li>
                ))}
            </ul>
        </div>
        </>
    )

}