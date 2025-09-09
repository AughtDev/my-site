"use client"
import {useMediaQuery} from "react-responsive";

interface MediaTypeResponse {
    is_mobile: boolean;
    is_tablet: boolean;
    is_desktop: boolean;
}

export default function useMediaType(): MediaTypeResponse {
    const is_mobile = useMediaQuery({maxWidth: 564})
    const is_tablet = useMediaQuery({minWidth: 564, maxWidth: 899})
    const is_desktop = useMediaQuery({minWidth: 900})

    return {is_mobile, is_tablet, is_desktop}
}
