import Button from "../components/ui/Button";
import "./CoursesSection.css";

const COURSES = [
    {
        id: "pralin",
        title: "Pralintillverkning",
        meta: "Grundkurs, tre timmar",
        description:
            "Temperera choklad för blank yta och rätt knäck, fyll formar med ganache och karamell, och ta hem din egen låda pralin. Passar dig som aldrig hållit i en chokladtermometer förut.",
        image: "/774469301_18087705608412902_556362095638142971_n.jpg",
        imageAlt: "Handgjorda pralinger läggs upp på ett marmorbord",
        accent: "pink",
    },
    {
        id: "marsipan",
        title: "Marsipanfigurer",
        meta: "Familjekurs, två timmar",
        description:
            "Färga, kavla och forma marsipan för hand — från enkla djur till mer detaljerade figurer. En kurs för både vuxna och barn som vill jobba med händerna.",
        image: "/793028504_18099047186133710_2004468186776971465_n.jpg",
        imageAlt: "Färgglada handformade marsipanfigurer",
        accent: "green",
    },
    {
        id: "dessert",
        title: "Chokladdesserter",
        meta: "Fördjupning, fyra timmar",
        description:
            "Bygg upp en flerkomponents chokladdessert från grunden: mousse, kladdig kaka, chokladsås och crunch. För dig som redan känner dig hemma i köket och vill utmana dig själv.",
        image: "/pushpak-dsilva-2UeBOL7UD34-unsplash.jpg",
        imageAlt: "Chokladdessert med mousse och kladdkaka på tallrik",
        accent: "blue",
    },
];

export default function CoursesSection() {
    return (
        <div className="bg-slate-dark">
            <section className="section-standard">
                
                <center>
                    <h1>Kom in i vårt kök</h1>
                    <p>
                        Tre kurser, tre hantverk — lär dig grunderna av oss som gör det varje dag.
                    </p>
                </center>

                <div className="courses-grid">
                    {COURSES.map((course) => (
                        <article key={course.id} className={`course course-${course.accent}`}>
                            <div className="course-image-wrap">
                                <img
                                    className="course-image"
                                    src={course.image}
                                    alt={course.imageAlt}
                                    loading="lazy"
                                />
                            </div>

                            <div className="course-info">
                                <p className="meta">{course.meta}</p>
                                <h2>{course.title}</h2>
                                <p>{course.description}</p>
                                <Button to={`/kurser/${course.id}`} color={`${course.accent}`}>Boka kursen</Button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}