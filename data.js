// Centralized mock data storage using localStorage
const DATA_KEY = "eduadmin_students";

// Default seed data
const initialData = [
    { id: 1, name: "Alice Johnson", rollNo: "CSE-001", course: "Computer Science", status: "Active" },
    { id: 2, name: "Bob Smith", rollNo: "ME-012", course: "Mechanical Engineering", status: "Active" },
    { id: 3, name: "Charlie Davis", rollNo: "EE-045", course: "Electrical Engineering", status: "Inactive" },
    { id: 4, name: "Dana White", rollNo: "DS-089", course: "Data Science", status: "Active" },
    { id: 5, name: "Evan Wright", rollNo: "BA-102", course: "Business Admin", status: "Active" },
    { id: 6, name: "Frank Miller", rollNo: "CSE-042", course: "Computer Science", status: "Inactive" },
    { id: 7, name: "Grace Lee", rollNo: "EE-077", course: "Electrical Engineering", status: "Active" }
];

// Initialize data
function getStudents() {
    let saved = localStorage.getItem(DATA_KEY);
    if (!saved) {
        localStorage.setItem(DATA_KEY, JSON.stringify(initialData));
        return initialData;
    }
    return JSON.parse(saved);
}

function saveStudents(data) {
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
}
