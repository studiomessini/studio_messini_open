// NOTE some refactoring in flex classes should be great 
// fallback to this version in case of issues 

interface SlideProps {
    isLeft?: boolean;
    bgVariant?: boolean;
    hasBottomBorder?: boolean;
    hasTopBorder?: boolean;
    hasCustomBorder?: boolean;
    hasLongDescription?: boolean;
    customBorderParams?: string[];
    title: string;
    subtitle: string;
    subPar?: string;
    subSubtitle?: string;
    text: string;
    children: any;
}
/*
    this slide component is intended for slides in about and pathologies pages
    for classes i will define a slightly different slide type 

*/
const Slide = ({
    isLeft = false,
    bgVariant = false,
    hasBottomBorder = false,
    hasTopBorder = false,
    hasCustomBorder = false,
    hasLongDescription = false,
    customBorderParams = [],
    title, subtitle,
    subPar = "",
    subSubtitle = "",
    text, children
}: SlideProps ) => {

    const borderColor = 'linear-to-r from-white via-base-300 to-primary';
    const bg = bgVariant ?  'bg-linear-to-r from-base-300 to-primary' : 'bg-linear-to-l from-base-300 to-primary';
    // const bg = bgVariant ? 'bg-base-200' : 'bg-base-300';
    let borders = hasBottomBorder ? `border-b-2 ${borderColor}` : '';
    borders = hasTopBorder ? `${borders} border-t-2 ${borderColor}` : borders;

    if (hasCustomBorder && customBorderParams.length > 0) {
        borders = customBorderParams.join(' ');
    };

    return (

        // FIXME lesser but tedious unwanted horizontal scroll on big screens
        // is using chromium based browser due to vw calculated with scrollbars
        // fixable using w-full but obtaining less viewport covered than intended
        // on mobile is fine
        <div class={`min-w-screen ${bg} `}>

            <div class={`${borders} mx-3`} >
                <div class=" bg-inherit py-5 px-4 md:px-10 lg:px-10">
                    <div class="flex">
                        <div class={`
                                    flex flex-col 
                                    ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}
                                    w-full
                                    mx-auto
                                    justify-between
                                    items-center`
                                    }>
                            {/* image container */}
                            <div
                                class={`flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} `}>
                                {children}
                            </div>
                            <div class={`flex flex-col flex-wrap mt-5 lg:mt-0 text-container ${hasLongDescription ? 'lg:w-1/2' : ''} text-center text-black  `}>
                                <h2 aria-label="titolo della slide" class="title font-extrabold text-3xl text-wrap">{title}</h2>
                                <h3 aria-label="sottotitolo della slide (può essere vuoto)" class="subtitle font-bold text-2xl">{subtitle}</h3>
                                <p aria-label="paragrafo secondario per la paginazione" class="subtitle-paragraph font-bold text-2xl">{subPar}</p>
                                <p aria-label="sottotitolo secondario per la paginazione (può essere vuoto)" class=" font-bold text-2xl">{subSubtitle}</p>
                                <p aria-label="testo principale della slide, può essere una descrizione lunga" class={`text  
                                    ${hasLongDescription ? 'mt-4 text-center font-bold lg:text-justify md:text-justify' : 'text-xl font-bold'}`}>
                                    {text}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Slide;