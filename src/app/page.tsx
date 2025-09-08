import ProfilePic from "@/components/home/ProfilePic";
import Intro from "@/components/home/Intro";
import ContactLinks from "@/components/layout/ContactLinks";

export default function Home() {

    return (
        <div className="flex flex-row align-center justify-center w-full">
            <div className="flex flex-row w-full ml-16 mr-4 justify-between">
                <div className="flex flex-row items-center"
                     style={{
                         gap: "3rem",
                         width: '100%'
                }}>
                    <ProfilePic/>
                    <Intro/>
                </div>
            </div>
        </div>
    );
}
