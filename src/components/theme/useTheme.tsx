"use client"
import React from 'react';
import {ThemeContext} from "@/components/theme/ThemeProvider";

export default function useTheme() {
    return React.useContext(ThemeContext);
}
