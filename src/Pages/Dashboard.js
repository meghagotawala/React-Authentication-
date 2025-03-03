import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/Action/authAction";

const Dashboard = () => {
  const users = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [view, setView] = useState("form");
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 3;

  const [formData, setFormData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    language: "",
    profile: "",
    hobbies: [],
  });

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(storedStudents);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };


  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }
    if (!formData.language) {
      newErrors.language = "Language is required";
    }
    if (formData.hobbies.length === 0) {
      newErrors.hobbies = "At least one hobby is required";
    }
    if (!formData.profile) {
      newErrors.profile = "Profile picture is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData({ ...formData, profile: reader.result });
      };
    }
  };


  const handleHobbyChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedHobbies = checked
        ? [...prevData.hobbies, value]
        : prevData.hobbies.filter((hobby) => hobby !== value);
      return { ...prevData, hobbies: updatedHobbies };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let updatedStudents;
    if (formData.id !== null) {
      updatedStudents = students.map((student) =>
        student.id === formData.id ? formData : student
      );
    } else {
      const newStudent = { ...formData, id: Date.now() };
      updatedStudents = [...students, newStudent];
    }

    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));

    setFormData({
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      language: "",
      profile: "",
      hobbies: [],
    });

    setErrors({});
    setView("list");
  };


  const handleEdit = (student) => {
    setFormData({
      ...student,
      hobbies: Array.isArray(student.hobbies) ? student.hobbies : student.hobbies.split(","),
    });
    setView("form");
  };

  const handleDeleteConfirm = () => {
    const updatedStudents = students.filter((student) => student.id !== selectedStudentId);
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
    setShowModal(false);
  };

  const handleDeleteClick = (id) => {
    setSelectedStudentId(id);
    setShowModal(true);
  };

  return (
    <>
      <div className="d-flex justify-content-between py-3 px-2">
        <div>
          <h2>Welcome, {users.username}</h2>
          <p>Your role is {users.role}</p>
        </div>
        <div className="d-flex gap-3" style={{ cursor: "pointer" }}>
          {users.role !== "Viewer" && (
            <>
              <span onClick={() => setView("form")} className={view === "form" ? "fw-bold" : ""}>
                Form
              </span>
              <span onClick={() => setView("list")} className={view === "list" ? "fw-bold" : ""}>
                Listing
              </span>
            </>
          )}
        </div>
        <div>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="pb-5 px-5">
        {view === "form" && users.role !== "Viewer" ? (
          <>
            <h3 className="m-auto w-25 py-3 text-center pb-5">Student Form</h3>
            <form onSubmit={handleSubmit} className="w-50 border p-3 m-auto">
              <input type="hidden" name="id" value={formData.id || ""} />
              <div className="d-flex flex-column gap-2 mt-2">
                <label>First Name:</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
              </div>
              {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
              <div className="d-flex flex-column gap-2 mt-2">
                <label>Last Name:</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
              </div>
              {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
              <div className="d-flex flex-column gap-2 mt-2">
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
              {errors.email && <p className="text-danger">{errors.email}</p>}
              <div className="d-flex flex-column gap-2 mt-2">
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
              </div>
              {errors.password && <p className="text-danger">{errors.password}</p>}
              <div className="d-flex flex-column gap-2 mt-2">
                <label>Gender:</label>
                <div className="d-flex gap-2">
                  <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} /> Male
                  <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} /> Female
                </div>
              </div>
              {errors.gender && <p className="text-danger">{errors.gender}</p>}
              <div className="d-flex flex-column gap-2 mt-2">
                <label>Language:</label>
                <select name="language" value={formData.language} onChange={handleChange}>
                  <option value="">Choose language</option>
                  <option value="React js">React js</option>
                  <option value="ASP .NET">ASP .NET</option>
                  <option value="Node js">Node js</option>
                  <option value="Shopify">Shopify</option>
                  <option value="Angular">Angular</option>
                </select>
              </div>
              {errors.language && <p className="text-danger">{errors.language}</p>}
              <div className="d-flex flex-column gap-2 mt-2">
                <label>Hobbies:</label>
                <div className="d-flex gap-2">
                  {["Gardening", "Painting", "Reading", "Solving Crosswords"].map((hobby) => (
                    <label key={hobby}>
                      <input
                        type="checkbox"
                        value={hobby}
                        checked={formData.hobbies.includes(hobby)}
                        onChange={handleHobbyChange}
                      />
                      {hobby}
                    </label>
                  ))}
                </div>
              </div>
              {errors.hobbies && <p className="text-danger">{errors.hobbies}</p>}
              <div className="d-flex flex-column gap-2 mt-2">
                <label>Profile:</label>
                <input type="file" onChange={handleFileChange} />
                {formData.profile && <img src={formData.profile} alt="Profile Preview" width="100" className="mt-2" />}
              </div>
              {errors.profile && <p className="text-danger">{errors.profile}</p>}
              <div className="d-flex justify-content-end mt-5">
                <button type="submit" className="btn btn-secondary">
                  {formData.id ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h3 className="mt-5">Student List</h3>
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Language</th>
                  <th>Hobbies</th>
                  <th>Profile</th>
                  {users.role !== "Viewer" && (
                    <th>Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student, index) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.email}</td>
                    <td>{student.gender}</td>
                    <td>{student.language}</td>
                    <td>{student.hobbies.join(",")}</td>
                    <td>{student.profile && <img src={student.profile} alt="Profile" width="50" />}</td>
                    {users.role !== "Viewer" && (
                      <td className=" d-flex gap-2">
                        <button className="btn btn-warning" onClick={() => handleEdit(student)}>Edit</button>
                        {users.role === "Admin" && (
                          <button className="btn btn-danger" onClick={() => handleDeleteClick(student.id)}>Delete</button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-center mt-3">
              <nav>
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>

                  {Array.from({ length: Math.ceil(students.length / studentsPerPage) }, (_, i) => (
                    <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                      <button onClick={() => paginate(i + 1)} className="page-link">
                        {i + 1}
                      </button>
                    </li>
                  ))}

                  <li className={`page-item ${currentPage === Math.ceil(students.length / studentsPerPage) ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === Math.ceil(students.length / studentsPerPage)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

          </>
        )}
      </div>
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this student?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDeleteConfirm}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default Dashboard;
