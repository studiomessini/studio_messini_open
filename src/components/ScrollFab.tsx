import { useEffect, useState } from "preact/hooks";

const ScrollFab = ({ anchorId = "nav-anchor" }) => {

    const [visible, setVisible] = useState(false); 

    useEffect(() => {
        const anchor = document.getElementById(anchorId)
        console.log(anchor)
        if (!anchor) return;

        const io = new IntersectionObserver(
            (entries) => {
                setVisible(!entries[0].isIntersecting);
            }, { threshold: 1}
        );

        io.observe(anchor);
        
        return () => io.disconnect();

    }, [anchorId]);

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    return (
        <div class="fab lg:mr-4 mb-12">
            <button onClick={scrollToTop} class={`btn lg:btn-lg btn-circle btn-accent
            transition-all duration-300
            ${visible ? "opacity-80 scale-100" : "opacity-0 scale-75 pointer-events-none"}    
            `}>^</button>
        </div>
    )
};

export default ScrollFab;