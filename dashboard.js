document.addEventListener("DOMContentLoaded", function() {
    const students = typeof getStudents === "function" ? getStudents() : [];
    
    // Update stats
    const statTotal = document.getElementById("statTotal");
    const statActive = document.getElementById("statActive");
    
    if (statTotal) statTotal.textContent = students.length;
    
    if (statActive) {
        const activeCount = students.filter(s => s.status === "Active").length;
        statActive.textContent = activeCount;
    }

    // Populate recent students
    const tbody = document.getElementById("recentStudentsTable");
    if (tbody) {
        // Get last 4 students
        const recent = [...students].reverse().slice(0, 4);
        
        if (recent.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" class="text-center py-4 text-muted">No students available</td></tr>';
            return;
        }

        let html = '';
        recent.forEach(s => {
            const statusBadgeClass = s.status === 'Active' ? 'badge-soft-success' : 'bg-light text-secondary border';
            const statusIcon = s.status === 'Active' ? '<i class="bi bi-check-circle-fill me-1"></i>' : '';
            html += `
                <tr>
                    <td>
                        <div class="d-flex align-items-center">
                            <div class="rounded-circle bg-light border d-flex align-items-center justify-content-center me-3 text-primary fw-bold" style="width: 40px; height: 40px;">
                                ${s.name.charAt(0)}
                            </div>
                            <div>
                                <h6 class="mb-0 fw-medium text-dark">${s.name}</h6>
                                <small class="text-muted"><i class="bi bi-person-badge me-1"></i>${s.rollNo}</small>
                            </div>
                        </div>
                    </td>
                    <td><span class="text-dark fw-medium">${s.course}</span></td>
                    <td><span class="badge ${statusBadgeClass} px-3 py-2 rounded-pill">${statusIcon}${s.status}</span></td>
                </tr>
            `;
        });
        tbody.innerHTML = html;
    }
});
