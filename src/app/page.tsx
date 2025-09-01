import ProfilePic from "@/components/home/ProfilePic";
import Intro from "@/components/home/Intro";
import ContactLinks from "@/components/home/ContactLinks";

export default function Home() {

    return (
        <div className="flex flex-row align-center justify-center w-full">
            <div className="flex flex-row w-full mx-16">
                <div className="flex flex-col items-center"
                     style={{gap: "4rem"}}>
                    <ProfilePic/>
                    <ContactLinks/>
                </div>
                <Intro/>
            </div>
        </div>
    );
}
