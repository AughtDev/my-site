"use client"
import {useMediaQuery} from "react-responsive";

interface MediaTypeResponse {
    is_mobile: boolean;
    is_tablet: boolean;
    is_desktop: boolean;
}

export default function useMediaType(): MediaTypeResponse {
    const is_mobile = useMediaQuery({maxWidth: 767})
    const is_tablet = useMediaQuery({minWidth: 768, maxWidth: 1023})
    const is_desktop = useMediaQuery({minWidth: 1024})

    return {is_mobile, is_tablet, is_desktop}
}
