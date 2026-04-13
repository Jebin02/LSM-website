import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const images = [
  "/banner1.png",
  "/banner2.png",
  "/banner3.png"
];
const courses = [
  {
    id: 1,
    title: "React Basics",
    desc: "Learn to build dynamic and responsive web applications using React.js with components, hooks, and real-world projects.",
    duration: "4 Weeks",
    language: "English",
    level: "Beginner",
    price: 1999,
    img: "https://i.pinimg.com/736x/32/aa/28/32aa28605d84bfca7479d88401774587.jpg"
  },
  {
    id: 2,
    title: "Node.js",
    desc: "Learn backend development with Node.js by building APIs, handling servers, and creating scalable web applications.",
    duration: "6 Weeks",
    level: "Intermediate",
    language: "English",
    price: 999,
    img: "https://i.pinimg.com/1200x/b7/25/46/b72546039e230bfcbd512ac1741515ac.jpg"
  },
  {
    id: 3,
    title: "MongoDB",
    desc: "Learn to store and manage data using MongoDB with CRUD operations such as create , upadate and real-world database design.",
    duration: "3 Weeks",
    level: "Intermediate",
    language: "English",
    price: 699,
    img: "https://i.pinimg.com/736x/65/9b/22/659b224c8c69c7c151094a9c9e740ccb.jpg"
  },
  {
    id: 4,
    title: "JavaScript",
    desc: "Learn JavaScript fundamentals and advanced concepts to build interactive and dynamic web applications.",
    duration: "5 Weeks",
    level: "Advanced",
    language: "English",
    price: 1499,
    img: "https://i.pinimg.com/736x/47/34/08/473408a38c64587d88ca472555d0fd8c.jpg"
  },
  {
    id: 5,
    title: "HTML & CSS",
    desc: "Learn to build and style responsive web pages using HTML and CSS with modern design techniques.",
    duration: "2 Weeks",
    level: "Beginner",
    language: "Tamil",
    price: 0,
    img: "https://i.pinimg.com/736x/5a/42/33/5a423363bad4b8a5571e8a333dcb29ed.jpg"
  },
  {
    id: 6,
    title: "Full Stack",
    desc: "Learn full-stack development using MongoDB, Express, React, and Node.js to build real-world web applications.",
    duration: "8 Weeks",
    level: "Advanced",
    language: "English",
    price: 3999,
    img: "https://i.pinimg.com/1200x/1f/16/f2/1f16f23a4e4ed533ce90bc9477d2847f.jpg"
  },
  {
    id: 7,
    title: "UI/UX Design",
    desc: "Learn to design intuitive and visually appealing user interfaces with UI/UX principles and real-world projects.",
    duration: "4 Weeks",
    level: "Intermediate",
    language: "English",
    price: 2999,
    img: "https://i.pinimg.com/1200x/00/55/80/0055803309ca30c2b3b495649d1077e8.jpg"
  },
  {
    id: 8,
    title: "Web Designing",
    desc: "Learn to design responsive and visual appealing websites using modern web design techniques.",
    duration: "4 Weeks",
    level: "Beginner",
    language: "English",
    price: 1999,
    img: "https://i.pinimg.com/1200x/44/32/bf/4432bff87bf78e6e72ec277aa4260dff.jpg"
  },
  {
    id: 9,
    title: "Digital Marketing",
    desc: "Learn to promote brands online using SEO, social media, and digital marketing strategies.",
    duration: "3 Weeks",
    level: "Advanced",
    language: "English",
    price: 2399,
    img: "https://i.pinimg.com/736x/eb/75/b1/eb75b12bf1160d6d6c27fdd9d6231e5b.jpg"
  },
  {
    id: 10,
    title: "AI",
    desc: "Learn the basics of Artificial Intelligence and build smart applications using real-world concepts.",
    duration: "5 Weeks",
    level: "Advanced",
    language: "English",
    price: 2099,
    img: "https://i.pinimg.com/1200x/f8/61/7e/f8617ec73b0499ecb7cc6e54131999e8.jpg"
  },
  {
    id: 11,
    title: "Figma",
    desc: "Learn to design UI/UX layouts and prototypes using Figma with real-time collaboration and modern design.",
    duration: "2 Weeks",
    level: "Intermediate",
    language: "English",
    price: 1999,
    img: "https://i.pinimg.com/1200x/cf/96/c0/cf96c05a8c7622c64bd6b2dfc5341149.jpg"
  },
  {
    id: 12,
    title: "SQL",
    desc: "Learn to manage and query databases using SQL with real-world data handling techniques.",
    duration: "2 Weeks",
    level: "Beginner",
    language: "English",
    price: 999,
    img: "https://i.pinimg.com/1200x/60/fd/a4/60fda4bd7105c1446e64aff0771694e3.jpg"
  }
];

const Homepage = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const [filters, setFilters] = useState({
    duration: [],
    language: [],
    level: []
  });

  const [sortOption, setSortOption] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Handle checkbox
  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const exists = prev[type].includes(value);
      return {
        ...prev,
        [type]: exists
          ? prev[type].filter((item) => item !== value)
          : [...prev[type], value]
      };
    });
  };

  // ✅ Apply filters + sorting
  const applyFilters = () => {
    let updated = [...courses];

    if (filters.duration.length > 0) {
      updated = updated.filter((c) =>
        filters.duration.includes(c.duration)
      );
    }

    if (filters.language.length > 0) {
      updated = updated.filter((c) =>
        filters.language.includes(c.language)
      );
    }

    if (filters.level.length > 0) {
      updated = updated.filter((c) =>
        filters.level.includes(c.level)
      );
    }

    // ✅ Sorting
    if (sortOption === "low-high") {
      updated.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "high-low") {
      updated.sort((a, b) => b.price - a.price);
    }

    if (sortOption === "a-z") {
      updated.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortOption === "z-a") {
      updated.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredCourses(updated);
  };

  // ✅ Clear all
  const clearFilters = () => {
    setFilters({
      duration: [],
      language: [],
      level: []
    });
    setSortOption("");
    setFilteredCourses(courses);
  };

  return (
    <div className="home">

      {/* Carousel */}
      <div className="carousel">
        <img src={images[current]} alt="slide" />
      </div>

     <div className="top-bar">

  {/* Sort */}
  <div className="dropdown-box">
    <label>Sort:</label>
    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
      <option value="">Default</option>
      <option value="low-high">Price: Low to High</option>
      <option value="high-low">Price: High to Low</option>
      <option value="a-z">A to Z</option>
      <option value="z-a">Z to A</option>
    </select>
  </div>

  {/* Duration */}
  <div className="dropdown-box">
    <label>Duration:</label>
    <select onChange={(e) => handleFilterChange("duration", e.target.value)}>
      <option value="">All</option>
      <option value="2 Weeks">2 Weeks</option>
      <option value="3 Weeks">3 Weeks</option>
      <option value="4 Weeks">4 Weeks</option>
      <option value="6 Weeks">6 Weeks</option>
    </select>
  </div>

  {/* Language */}
  <div className="dropdown-box">
    <label>Language:</label>
    <select onChange={(e) => handleFilterChange("language", e.target.value)}>
      <option value="">All</option>
      <option value="English">English</option>
      <option value="Tamil">Tamil</option>
      <option value="Hindi">Hindi</option>
    </select>
  </div>

  {/* Level */}
  <div className="dropdown-box">
    <label>Level:</label>
    <select onChange={(e) => handleFilterChange("level", e.target.value)}>
      <option value="">All</option>
      <option value="Beginner">Beginner</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Advanced">Advanced</option>
    </select>
  </div>

   <div className="filter-actions">
    <button className="apply-btn" onClick={applyFilters}>Filter</button>
    <button className="clear-btn" onClick={clearFilters}>Clear All</button>
  </div>

 

</div>

      {/* Cards */}
      <div className="course-grid">
        {filteredCourses.map((course) => (
          <div key={course.id} className="card">
            <img src={course.img} alt={course.title} />
            <h3>{course.title}</h3>
            <p>{course.desc}</p>
            <p>Language: {course.language}</p>
            <p>Level: {course.level}</p>
            <p>Duration: {course.duration}</p>

            <p className="price">
              {course.price === 0 ? "Free" : `₹${course.price}`}
            </p>

            <button 
  className="enroll-btn"
  onClick={() => navigate("/Enroll", { state: course })}
>
  {course.price === 0 ? "Enroll for Free" : "Enroll Now"}
</button>
          </div>
        ))}
      </div>

    </div>
  );
};
export default Homepage;