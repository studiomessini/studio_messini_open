import { useState, useEffect } from "preact/hooks";

const FontToggle = () => {
    // retrieve initial state from cookie to avoid flickering
    const [isDyslexic, setIsDyslexic] = useState(() => {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('preferredFont='))
            ?.split('=')[1];

        return cookieValue === "dyslexic";
    });

    // then set on toggle 
    useEffect(() => {

        document.documentElement.classList.toggle("font-dyslexic", isDyslexic);
        document.documentElement.classList.toggle("font-roboto", !isDyslexic);

        document.cookie = `preferredFont=${isDyslexic ? "dyslexic" : "roboto"}; path=/;`;
    }, [isDyslexic]);

    return (
        <>
            <label for="font-toggle" class="text-center font-semibold">
                <p>(se hai bisogno, puoi impostare <br />usare un carattere più leggibile)</p>
            </label>

            <input id="font-toggle" type="checkbox" aria-label="attiva/disattiva font per la dislessia/leggibilità" checked={isDyslexic} onChange={() => setIsDyslexic(!isDyslexic)} class="toggle" />
        </>
    )
}

export default FontToggle;