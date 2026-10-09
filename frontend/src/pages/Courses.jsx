import { useEffect } from "react";
import CoursesSection from "../components/CoursesSection";

export default function Courses() {

    useEffect(() => {
        document.title = `Kurser | Maison Lilja`;
    }, []);

    return <>
        <CoursesSection />
    </>;
}