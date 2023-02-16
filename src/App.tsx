import { useState } from 'react'
import {Select, SelectOption} from './Select'
import styles from "./select.module.css"

const options =[
    {label: 'React', value: 1},
    {label: 'NextJS', value: 2},
    {label: 'HTML', value: 3},
    {label: 'Python', value: 4},
    {label: 'Project Manager', value: 5},
    {label: 'Accounting', value: 6},
    {label: 'Data Engineer', value: 7},
    {label: 'Data Analyst', value: 8},
    {label: 'TypeScript', value: 8},
    {label: 'Business Anaylst', value: 9},
    {label: 'Content Marketer', value: 10},
    {label: 'Social Media Manager', value: 11},
    {label: 'UI Designer', value: 8},
    {label: 'Graphics Designer', value: 8},

]


function App() {
    const [value1, setValue1 ] = useState<SelectOption[]>([options[0]])
    // const [value2, setValue2 ] = useState<SelectOption | undefined>(options[0])
 return (
    <>
    <div className={styles.base}>
        <div className={styles.body}>
        <h2 className={styles.title}>What are your Skills Set</h2>
        <Select multiple options={options} value={value1} onChange={o => setValue1(o)}/>
        <div className={styles.btn}>save</div>
        </div>
       
        
    </div>
   
    <br/>
    {/* <Select options={options} value={value2} onChange={o => setValue2(o)}/> */}
    </>
 )
}
export default App
