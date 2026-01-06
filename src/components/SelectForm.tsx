import { useState, useEffect } from "preact/hooks";
import type { TargetedEvent } from "preact";

// TODO accessibility 
interface SelectFormProps {
    data: string[];
    onFormSubmit?: (value: string) => void;
    filterType: string;
    resetSignal: boolean;
}
const SelectForm = ({ data, onFormSubmit, filterType, resetSignal}: SelectFormProps) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue("");
    }, [resetSignal]);

    const handle = (e: TargetedEvent<HTMLFormElement>) => {
    
        e.preventDefault(); 
    

        console.log("Submitted value:", value);
        onFormSubmit?.(value);
        
    };

    return (
        <form class="flex flex-col my-10 justify-center items-center mx-auto" onSubmit={handle}>
            <label htmlFor="selettore-input" className="sr-only">Filtra per {filterType}</label>
            <select 
                id="selettore-input"
                className="select validator"
                // required 
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
            >   
                <option disabled value="" hidden>filtro per {filterType}:</option>
                {data.map((element, index) => {
                    return (
                        <option key={index} value={element}>
                            {element}
                        </option>
                    );
                })}
            </select>
            {/* {touched && !value && <p className="validator-hint">Obbligatorio </p>}  */}
            <button className="btn mt-2" type="submit">applica filtro</button>
        </form>
    )
}

export default SelectForm;