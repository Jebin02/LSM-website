import React, { useState, useEffect } from "react";
import "./Coursepage.css";

const courses = [
  {
    id: 1,
    title: "React Basics",
    instructor: "Academy",
    description:
      "Learn the fundamentals of React, including components, state, props, and hooks.",
    videos: [
      {
        id: 1,
        title: "Introduction to React",
        url: "https://www.youtube.com/embed/w7ejDZ8SWv8",
        desc: "Learn what React is and why it is widely used.",
      },
      {
        id: 2,
        title: "Components & Props",
        url: "https://www.youtube.com/embed/Ke90Tje7VS0",
        desc: "Understand reusable components and props.",
      },
      {
        id: 3,
        title: "React Hooks",
        url: "https://www.youtube.com/embed/f687hBjwFcM",
        desc: "Learn useState and useEffect hooks.",
      },
    ],
    reviews: [
      { name: "Arun", rating: 5, comment: "Excellent course!" },
      { name: "Priya", rating: 4, comment: "Very helpful." },
    ],
  },
];

const Course = () => {
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [currentVideo, setCurrentVideo] = useState(courses[0].videos[0]);
  const [completed, setCompleted] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Load progress
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem(`progress-${selectedCourse.id}`)) || [];
    setCompleted(saved);
  }, [selectedCourse]);

  // Save progress
  useEffect(() => {
    localStorage.setItem(
      `progress-${selectedCourse.id}`,
      JSON.stringify(completed)
    );
  }, [completed, selectedCourse]);

  const markComplete = () => {
    if (!completed.includes(currentVideo.id)) {
      setCompleted([...completed, currentVideo.id]);
    }
  };

  const progress =
    (completed.length / selectedCourse.videos.length) * 100;

  const isCompleted = progress === 100;

  // ✅ FIXED FUNCTION (API CONNECTED)
  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("⚠️ Please enter your doubt");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/doubt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Doubt submitted successfully!");
        setMessage("");
      } else {
        alert(data.error || "❌ Failed to submit doubt");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="course-page">
      {/* LEFT SIDE */}
      <div className="video-section">
        <iframe
          width="100%"
          height="400"
          src={currentVideo.url}
          title={currentVideo.title}
          frameBorder="0"
          allowFullScreen
        />

        <h2>{currentVideo.title}</h2>
        <p className="instructor">
          Instructor: {selectedCourse.instructor}
        </p>

        <button className="complete-btn" onClick={markComplete}>
          ✅ Mark as Completed
        </button>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p>{Math.round(progress)}% Completed</p>

        {isCompleted && (
          <div className="certificate-box">
            <h3>🎉 Course Completed!</h3>
            <button
              className="certificate-btn"
              onClick={() =>
                alert("Certificate download coming soon!")
              }
            >
              🎓 Get Certificate
            </button>
          </div>
        )}

        <div className="video-desc">
          <h3>Description</h3>
          <p>{currentVideo.desc}</p>
        </div>

        <div className="course-desc">
          <h3>About this course</h3>
          <p>{selectedCourse.description}</p>
        </div>

        <div className="reviews">
          <h3>Student Reviews</h3>
          {selectedCourse.reviews.map((r, i) => (
            <div key={i} className="review-card">
              <h4>{r.name}</h4>
              <p>{"⭐".repeat(r.rating)}</p>
              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="content-section">
        <h3>Course Content</h3>

        {selectedCourse.videos.map((video) => (
          <div
            key={video.id}
            className={`lesson ${
              currentVideo.id === video.id ? "active" : ""
            }`}
            onClick={() => setCurrentVideo(video)}
          >
            {completed.includes(video.id) ? "✅" : "▶"}{" "}
            {video.title}
          </div>
        ))}

        {/* ✅ DOUBT SECTION */}
        <div className="chat-section">
          <h3>💬 Doubt Section</h3>

          <form onSubmit={sendMessage} className="chat-input">
            <textarea
              placeholder="Type your doubt here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Course;