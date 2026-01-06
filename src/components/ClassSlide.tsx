// this is a special refactoring of the Slide component for class slides only
// I prefer keeping them separate for easier maintenance

import { useState, useRef } from "preact/hooks";
import { type Ref, type VNode } from "preact";

interface ClassSlideProps {
    isLeft?: boolean;
    hasBottomBorder?: boolean;
    hasTopBorder?: boolean;
    type: string;
    when: string;
    where?: string;
    isSoldout?: boolean;
    isPostponed?: boolean;
    method: string;
    title: string;
    subtitle: string;
    subsubtitle?: string;
    children: any;
};


const ClassSlide = ({
    hasBottomBorder = false,
    hasTopBorder = false,
    type = "",
    when,
    where = "Latina (LT)",
    isSoldout = false,
    isPostponed = false,
    method,
    title, subtitle, subsubtitle = "",
    children
}: ClassSlideProps) => {

    const [modalChildren, setModalChildren] = useState<VNode | null>(null);
    // FIXME better typing here 
    const modalRef = useRef<HTMLDialogElement>(null);

    let downloadLink = type === "TMF" ? "/MIOFUNZIONALE_con_consenso.pdf" 
        : (type === "FRN" ? "/FRENULO_con_consenso.pdf"
             : "/TUBARICA_con_consenso.pdf");

    const bg = 'bg-base-300';
    const borderColor = "border-black";
    let borders = hasBottomBorder ? `border-b-2 ${borderColor}` : '';
    borders = hasTopBorder ? `${borders} border-t-2 ${borderColor}` : borders;

    const btnState = (isSoldout || isPostponed) ? 'btn-disabled' : 'btn-primary';
    const btnText = isSoldout ? 'Sold Out' : (isPostponed ? 'Posticipato' : 'Voglio Iscrivermi');
    return (


        <div class={`w-screen ${bg} `}>

            <div class={`w-4/5 lg:max-w-7xl   ${borders} mx-auto flex flex-col`} >
                <div class=" bg-inherit py-5 px-4 md:px-10 lg:px-10">
                    <div class="flex">
                        <div class={`
                                    flex flex-col 
                                    lg:flex-row
                                    w-full
                                    mx-auto
                                    justify-between
                                    items-center`
                        }>
                            {/* image container */}
                            <div
                                class={`flex flex-row items-center justify-center`}>
                                {children}
                            </div>
                            <div class={`flex flex-col mx-auto mt-5 lg:mt-0 text-container text-center text-black  `}>


                                <h2 aria-label="titolo della slide" class="title font-extrabold text-3xl text-wrap">{title}</h2>
                                <h3 aria-label="sottotitolo della slide (può essere vuoto)" class="subtitle font-bold text-xl">{subtitle}</h3>
                                <h4 aria-label="sotto-sottotitolo (può essere vuoto)" class="mt-2 text-lg font-bold">{subsubtitle}</h4>
                                <h4 aria-label="metodo" class="mt-2 text-lg font-bold">[{method}]</h4>
                                <h4 aria-label="data o date del corso" class="mt-4 text-lg font-bold">{when}</h4>
                                <h4 aria-label="luogo del corso" class="text-lg font-bold">{where}</h4>

                                <button className={`btn mx-auto mt-16 mb-5  ${btnState} text-xl text-black font-bold`} onClick={() => {

                                    // NOTE setTimeout is used to wait a tick in order to trigger accessibility focus 
                                    // when content is hydrated inside the modal
                                    let subscriptionButton = createSubscriptionButton(downloadLink);
                                    setModalChildren(subscriptionButton);
                                    setTimeout(() => modalRef.current?.showModal(), 0);
                                    // modalRef.current.showModal();

                                }}>{btnText}</button>

                                <Modal modalRef={modalRef}>
                                    {modalChildren}
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>

    )
};

const createSubscriptionButton = (downloadLink: string): VNode => {
    return (<button aria-label="bottone per scaricare modulo di inscrizione" role="button" onClick={() => window.open(downloadLink, '_blank')} class="btn btn-accent btn-lg">scarica modulo iscrizione</button>);
};

const Modal = ({ modalRef, children } : {modalRef: Ref<HTMLDialogElement>, children: VNode | null}) => {
    return (
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
            <div className="pt-16 modal-box text-3xl">
                <p class="font-bold  text-center text-black">Per qualsiasi dubbio</p>
                <a aria-label="scarica modulo di iscrizione" href="/navigable/contact" class="font-bold text-center link text-black text-2xl">la segreteria è a disposizione</a>
                <div class="mt-10">

                    {children}
                
                </div>
                <div>
                    <p class="font-bold text-lg mt-4">(oppure clicca fuori per uscire)</p>
                </div>
            </div>
                    <form method="dialog" class="modal-backdrop" >
                        <button>torna indietro</button>
                    </form>
        </dialog>
    )
}


export default ClassSlide;