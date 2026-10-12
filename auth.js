document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            // Optional: simulate network request
            const btn = loginForm.querySelector('button');
            const originalContent = btn.innerHTML;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Authenticating...';
            btn.disabled = true;

            setTimeout(() => {
                // In a real app, validate credentials here. Let's redirect for demo.
                window.location.href = "dashboard.html";
            }, 800);
        });
    }
});
