import regionFile from '../data/regioni.json';
import SelectForm from './SelectForm';
import { useState, useMemo } from 'preact/hooks';

interface Attendee {
    nome: string;
    cognome: string;
    email: string;
    telefono: string;
    città: string;
    specializzazioni: string[];
    professione: string[];
}

const parsedRegions: Record<string, Attendee[]> = regionFile as Record<string, Attendee[]>;
const regions = Object.keys(parsedRegions);
const specilizations = new Set<string>();

// create specializations set 
// this will be passed as pre computed from a node procedure or as a c/rust script 
// in the future 
// this computation is really inefficient and silly 
Object.entries(parsedRegions).forEach(([_, attendees]) => {
    attendees.forEach((attendee) => {
        attendee?.specializzazioni.forEach((s) => specilizations.add(s));
    });
});

const MapComponent = () => {
    const [selectedSpec, setSelectedSpec] = useState<string>('');
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [resetSignal, setResetSignal] = useState<boolean>(false);

    // memoize the filtered result to avoid too much computation
    const filtered = useMemo(() => {
        // initial result will contain all parsed region (with attendees) {"region" : [attendee1, attendee2...]}
        let res: Record<string, Attendee[]> = { ...parsedRegions }; // shallow copy   


        if (selectedSpec) {
            // reconstruct the object from 
            res = Object.fromEntries(
                // unpacked entries [["region", [attendee1, attendee2]], [region2]] etc 
                Object.entries(res).map(([region, attendees]) => [
                    // first filter will select (region, attendees) for selected spec compliant attendee
                    region,
                    attendees.filter((a) =>
                        a.specializzazioni.some(spec => spec.toLowerCase().includes(selectedSpec.toLowerCase())
                        )
                    )
                    // then i will filter out regions with 0 attendee in them
                ]).filter(([_, a]) => a.length > 0)
            );
        }

        if (selectedRegion) {
            // construct object in place 
            res = { [selectedRegion]: res[selectedRegion] || [] }
        };

        return res;

    }, [selectedSpec, selectedRegion]);


    return (
        <>  
            
            <div>

                <SelectForm
                    data={Array.from(specilizations)}
                    onFormSubmit={setSelectedSpec}
                    resetSignal={resetSignal}
                    filterType="specializzazioni"
                />

                <SelectForm

                    data={regions}
                    onFormSubmit={setSelectedRegion}
                    resetSignal={resetSignal}
                    filterType="regioni"
                />
            </div>
            <div class="mt-5 text-center flex flex-col items-center justify-center ">
                <button class="btn btn-accent rounded-4xl" onClick={() => { setResetSignal(!resetSignal); setSelectedRegion(''); setSelectedSpec(''); }}>azzera filtri</button>
            </div>
            <div class="mx-auto w-lg lg:max-w-full md:max-w-md max-w-xs pt-10 mb-10">

                <ul>
                    {Object.entries(filtered).map(([region, attendees]) => (
                        <li key={region}>
                            <div class="text-center bg-base-200">

                                <h2 class="mt-10 font-bold text-xl">{region}</h2>
                                <h3>trovati: {attendees.length || 0}</h3>
                            </div>
                            {
                                // for each attendee sorted by surname first letter
                                attendees.sort((a, b) => a.cognome.localeCompare(b.cognome))
                                    //  display as stated down there
                                    .map((attendee) => (

                                <ul class="list-disc" key={attendee.email}>
                                    <li>

                                        <p class="mt-6 font-bold text-xl inline-block bg-accent p-2 m-2 rounded-xl">{attendee.nome} {attendee.cognome}</p>
                                        <p class="text-lg mb-2"><span class="font-bold">Professione: </span>{attendee.professione.join(", ")}</p>
                                        <p class="text-lg"><span class="font-bold">Città:</span> {attendee.città}</p>
                                        <p class="text-lg wrap-break-word"><span class="font-bold">Email:</span> {attendee.email}</p>
                                        <p class="text-lg"><span class="font-bold">Telefono:</span> {attendee.telefono}</p>
                                        <p class="text-lg"><span class="font-bold">Specializzazioni:</span> {attendee.specializzazioni.join(", ")}</p>
                                    
                                    </li>
                                </ul>
                            ))
                            
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
};

export default MapComponent;