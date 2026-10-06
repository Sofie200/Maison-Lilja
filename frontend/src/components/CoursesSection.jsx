import Button from "../components/ui/Button";
import "./CoursesSection.css";

const COURSES = [
    {
        id: "marsipan1",
        title: "Marsipankurs",
        meta: "För nybörjare",
        description:
            "Lär dig grunderna i att forma och dekorera marsipan.",
        image: "/793028504_18099047186133710_2004468186776971465_n.jpg",
        imageAlt: "Nybörjarkurs i marsipan",
        accent: "green",
    },
    {
        id: "marsipan2",
        title: "Marsipankurs",
        meta: "Fördjupning",
        description:
            "För dig som vill utveckla din teknik och prova mer avancerade former och detaljer.",
        image: "/793028504_18099047186133710_2004468186776971465_n.jpg",
        imageAlt: "Fortsättningskurs i marsipan",
        accent: "green",
    },
    {
        id: "pralin",
        title: "Pralinkurs",
        meta: "För nybörjare",
        description:
            "Upptäck hantverket bakom praliner och lär dig mer om choklad, fyllningar och tillverkning.",
        image: "/774469301_18087705608412902_556362095638142971_n.jpg",
        imageAlt: "Pralinkurs för nybörjare",
        accent: "teal",
    },
];

export default function CoursesSection() {
    return (
        <div className="bg-slate-dark">
            <section className="section-standard">
                
                <center>
                    <h1>Kurser 2027</h1>
                    <p>
                        Vill du skapa något gott med egna händer? Under 2027 planerar vi kurser i marsipan och pralintillverkning hos Maison Lilja.
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
                                {/*<div>
                                    <Button icon="arrow_forward" size="sm" to={`/kurser/${course.id}`} color={`${course.accent}`}>Boka kursen</Button>
                                </div>*/}
                            </div>
                        </article>
                    ))}
                </div>

                <center>
                    <i>
                        Datum, priser och mer information kommer längre fram.
                    </i>
                </center>
            </section>
        </div>
    );
}