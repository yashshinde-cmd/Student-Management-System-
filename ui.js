// Sidebar Toggle functionality
document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", function(e) {
            e.preventDefault();
            sidebar.classList.toggle("toggled");
        });
    }

    // Logout functionality
    const logoutBtns = document.querySelectorAll("#logoutBtn, #logoutBtnTop");
    logoutBtns.forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            // Just redirect to login page for this demo
            window.location.href = "index.html";
        });
    });

    // Close sidebar on mobile when clicking outside
    document.addEventListener("click", function(e) {
        if (window.innerWidth <= 768) {
            if (sidebar && sidebar.classList.contains("toggled")) {
                if (!sidebar.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove("toggled");
                }
            }
        }
    });
});
