document.addEventListener("DOMContentLoaded", function() {
    // Check if triggered from dashboard "Add New" button
    const urlParams = new URLSearchParams(window.location.search);
    const hasAddAction = urlParams.get('action') === 'add';

    let students = typeof getStudents === "function" ? getStudents() : [];
    const tbody = document.getElementById("studentList");
    const emptyState = document.getElementById("emptyState");
    const searchInput = document.getElementById("searchInput");
    
    // Modal elements
    const studentModalEl = document.getElementById('studentModal');
    let studentModal = null;
    if (studentModalEl) {
        studentModal = new bootstrap.Modal(studentModalEl);
        
        if (hasAddAction) {
            // Give DOM time to settle before showing modal from URL parmameter
            setTimeout(() => {
                studentModal.show();
            }, 100);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    const form = document.getElementById('studentForm');
    const saveBtn = document.getElementById('saveStudentBtn');
    const modalTitle = document.getElementById('studentModalLabel');

    // Form inputs
    const idInput = document.getElementById('studentId');
    const nameInput = document.getElementById('studentName');
    const rollNoInput = document.getElementById('rollNo');
    const courseInput = document.getElementById('course');
    const statusActiveInput = document.getElementById('statusActive');
    const statusInactiveInput = document.getElementById('statusInactive');

    // Render Table
    function renderTable(dataToRender = students) {
        if (!tbody) return;
        tbody.innerHTML = '';
        
        if (dataToRender.length === 0) {
            emptyState.classList.remove('d-none');
            document.querySelector('#studentsTable').classList.add('d-none');
        } else {
            emptyState.classList.add('d-none');
            document.querySelector('#studentsTable').classList.remove('d-none');
            
            dataToRender.forEach(s => {
                const tr = document.createElement('tr');
                const statusBadgeClass = s.status === 'Active' ? 'badge-soft-success' : 'bg-light text-secondary border';
                const statusIcon = s.status === 'Active' ? '<i class="bi bi-check-circle-fill me-1"></i>' : '';
                
                tr.innerHTML = `
                    <td class="fw-medium text-dark ps-4"><span class="bg-light px-2 py-1 rounded text-muted border">${s.rollNo}</span></td>
                    <td>
                        <div class="d-flex align-items-center py-2">
                            <div class="rounded-circle bg-light border d-flex align-items-center justify-content-center me-3 text-primary fw-bold" style="width: 40px; height: 40px;">
                                ${s.name.charAt(0)}
                            </div>
                            <div>
                                <h6 class="mb-0 fw-medium text-dark">${s.name}</h6>
                            </div>
                        </div>
                    </td>
                    <td><span class="text-dark fw-medium">${s.course}</span></td>
                    <td><span class="badge ${statusBadgeClass} px-3 py-2 rounded-pill shadow-sm">${statusIcon}${s.status}</span></td>
                    <td class="text-end pe-4">
                        <div class="d-flex justify-content-end gap-2">
                            <button class="btn btn-sm btn-light border text-primary edit-btn rounded-circle shadow-sm" style="width: 32px; height: 32px; padding: 0; display: inline-flex; align-items: center; justify-content: center;" data-id="${s.id}" title="Edit">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                            <button class="btn btn-sm btn-light border text-danger del-btn rounded-circle shadow-sm" style="width: 32px; height: 32px; padding: 0; display: inline-flex; align-items: center; justify-content: center;" data-id="${s.id}" title="Delete">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(tr);
            });
            
            // Attach event listeners for edit and delete
            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', handleEdit);
            });
            document.querySelectorAll('.del-btn').forEach(btn => {
                btn.addEventListener('click', handleDelete);
            });
        }
    }

    // Add Student Button
    const addBtn = document.getElementById('addStudentBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            form.reset();
            form.classList.remove('was-validated');
            idInput.value = '';
            modalTitle.textContent = 'Add New Student';
            studentModal.show();
        });
    }

    // Save Student Logic
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }

            const studentId = idInput.value;
            const newStudent = {
                id: studentId ? parseInt(studentId) : Date.now(),
                name: nameInput.value,
                rollNo: rollNoInput.value,
                course: courseInput.value,
                status: statusActiveInput.checked ? 'Active' : 'Inactive'
            };

            if (studentId) {
                // Update
                const index = students.findIndex(s => s.id == studentId);
                if (index !== -1) students[index] = newStudent;
            } else {
                // Insert
                students.push(newStudent);
            }

            if (typeof saveStudents === 'function') {
                saveStudents(students);
            }
            renderTable();
            studentModal.hide();
        });
    }

    // Edit Logic
    function handleEdit(e) {
        const id = e.currentTarget.getAttribute('data-id');
        const student = students.find(s => s.id == id);
        
        if (student) {
            form.classList.remove('was-validated');
            idInput.value = student.id;
            nameInput.value = student.name;
            rollNoInput.value = student.rollNo;
            courseInput.value = student.course;
            
            if (student.status === 'Active') {
                statusActiveInput.checked = true;
            } else {
                statusInactiveInput.checked = true;
            }
            
            modalTitle.textContent = 'Edit Student Details';
            studentModal.show();
        }
    }

    // Delete Logic
    function handleDelete(e) {
        const id = e.currentTarget.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
            students = students.filter(s => s.id != id);
            if (typeof saveStudents === 'function') {
                saveStudents(students);
            }
            renderTable();
        }
    }

    // Search Logic
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase().trim();
            const filtered = students.filter(s => 
                s.name.toLowerCase().includes(val) || 
                s.rollNo.toLowerCase().includes(val) || 
                s.course.toLowerCase().includes(val)
            );
            renderTable(filtered);
        });
    }

    // Reset module on disappear
    if (studentModalEl) {
        studentModalEl.addEventListener('hidden.bs.modal', () => {
            form.reset();
            form.classList.remove('was-validated');
        });
    }

    // Initial render
    renderTable();
});
