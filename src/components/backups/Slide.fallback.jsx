// NOTE some refactoring in flex classes should be great 
// fallback to this version in case of issues 

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
    subPar ="",
    text, children
}) => {

    const bg = bgVariant ? 'bg-base-200' : 'bg-base-300';
    let borders = hasBottomBorder ? 'border-b-2 border-base-100-content' : '';
    borders = hasTopBorder ? `${borders} border-t-2 border-base-100-content` : borders;

    if (hasCustomBorder && customBorderParams.length > 0) {
        borders = customBorderParams.join(' ');
    };

    return (
        
        <div class={`w-screen ${bg} `}>

            <div class={`container w-4/5 ${borders} mx-auto flex flex-col`} >
                <div class=" bg-inherit py-5 px-4 md:px-10 lg:px-10">
                    <div class="flex">
                        <div class={`flex flex-col  ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}

                w-full
                mx-auto
                justify-between
                items-center`}>
                            <div class={`image-container flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} `}>
                                {children}
                            </div>
                            <div class={`flex flex-col flex-wrap mt-5 lg:mt-0 text-container ${hasLongDescription ? 'lg:w-1/2' : ''} text-center text-black  `}>
                                <h2 class="title font-extrabold text-3xl text-wrap">{title}</h2>
                                <h3 class="subtitle font-bold text-2xl">{subtitle}</h3>
                                <p class="subtitle-paragraph font-bold text-2xl">{subPar}</p>
                                <p class={`text  ${hasLongDescription ? 'mt-4 text-center font-bold lg:text-justify md:text-justify' : 'text-xl font-bold'}`}>{text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Slide;