export default function Pill() {
    const variants = {
        blue: "bg-(--color-pill-bg-blue) text-pill-text-blue",
        green: "bg-(--color-pill-bg-green) text-pill-text-green",
        red: "bg-(--color-pill-bg-red) text-pill-text-red",
    };

    return (
        <span 
            className={`
                inline-flex items-center justify-center
                h-5 px-2
                rounded-lg 
                text-xs
                ${variants.blue}
            `}
        >
            <span className="pb-0.5">react</span>
        </span>
    )
}