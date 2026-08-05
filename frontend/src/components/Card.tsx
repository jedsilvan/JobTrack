import Pill from "./Pill";

export default function Card() {
    return (
        <div className="bg-(--color-card) rounded-lg border-1 border-solid border-border py-1 px-3">
            <h1 className="text-primary text-base">Application Title</h1>
            <p className="text-secondary text-sm">This is some supporting information for the user.</p>
            <Pill />
        </div>
    )
}