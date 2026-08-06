import Pill from "./Pill";

export default function Card() {
    return (
        <div className="bg-(--color-card) rounded-lg border-1 border-solid border-border pt-1 pb-3 px-3">
            <h1 className="text-primary text-base font-medium text-lg">Application Title</h1>
            <p className="text-secondary text-sm mb-2 font-medium">This is some supporting information for the user.</p>
            <Pill />
        </div>
    )
}