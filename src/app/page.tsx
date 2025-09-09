import Intro from "@/components/home/Intro";
import Pfp from "@/components/home/Pfp";

export default function Home() {
    return (
        <div className="flex flex-row align-center justify-center w-full">
            <div className="flex flex-row w-full justify-between">
                <div className="flex flex-row items-center justify-center"
                     style={{
                         // gap: "3rem",
                         width: '100%'
                     }}>
                    <Pfp/>
                    <Intro/>
                </div>
            </div>
        </div>
    );
}
