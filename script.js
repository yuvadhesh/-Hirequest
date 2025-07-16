// Sample job data
const jobsData = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$120,000 - $160,000",
        posted: "2 days ago",
        description: "We are looking for a Senior Frontend Developer to join our dynamic team and help build the next generation of web applications.",
        requirements: ["5+ years React experience", "TypeScript proficiency", "Modern CSS frameworks"],
        benefits: ["Health insurance", "401k matching", "Flexible hours"],
        logo: "💻",
        featured: true
    },
    {
        id: 2,
        title: "UX/UI Designer",
        company: "DesignStudio",
        location: "New York, NY",
        type: "Full-time",
        salary: "$90,000 - $120,000",
        posted: "1 week ago",
        description: "Join our creative team as a UX/UI Designer to craft exceptional user experiences for our clients.",
        requirements: ["3+ years design experience", "Figma expertise", "User research skills"],
        benefits: ["Creative environment", "Design budget", "Remote work options"],
        logo: "🎨",
        featured: false
    },
    {
        id: 3,
        title: "Data Scientist",
        company: "DataFlow",
        location: "Remote",
        type: "Remote",
        salary: "$130,000 - $180,000",
        posted: "3 days ago",
        description: "We are seeking a talented Data Scientist to join our analytics team and drive data-driven decisions.",
        requirements: ["PhD in related field", "Python/R proficiency", "Machine learning expertise"],
        benefits: ["Remote work", "Learning budget", "Stock options"],
        logo: "📊",
        featured: true
    },
    {
        id: 4,
        title: "Product Manager",
        company: "InnovateCorp",
        location: "Austin, TX",
        type: "Full-time",
        salary: "$110,000 - $140,000",
        posted: "5 days ago",
        description: "Lead product strategy and development for our flagship products in a fast-paced environment.",
        requirements: ["5+ years PM experience", "Agile methodology", "Technical background"],
        benefits: ["Equity package", "Health benefits", "Professional development"],
        logo: "📱",
        featured: false
    },
    {
        id: 5,
        title: "DevOps Engineer",
        company: "CloudTech",
        location: "Seattle, WA",
        type: "Full-time",
        salary: "$115,000 - $150,000",
        posted: "1 week ago",
        description: "Join our infrastructure team to build and maintain scalable cloud solutions.",
        requirements: ["AWS/Azure experience", "Docker/Kubernetes", "CI/CD pipelines"],
        benefits: ["Cloud certifications", "Flexible schedule", "Team events"],
        logo: "☁️",
        featured: false
    },
    {
        id: 6,
        title: "Marketing Specialist",
        company: "GrowthCo",
        location: "Los Angeles, CA",
        type: "Part-time",
        salary: "$60,000 - $80,000",
        posted: "4 days ago",
        description: "Drive marketing campaigns and growth initiatives for our expanding customer base.",
        requirements: ["Digital marketing experience", "Analytics tools", "Content creation"],
        benefits: ["Flexible hours", "Creative freedom", "Growth opportunities"],
        logo: "📈",
        featured: false
    }
];

// DOM elements
const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');
const profileDropdown = document.getElementById('profileDropdown');
const userEmailSpan = document.getElementById('userEmail');
const jobModal = document.getElementById('jobModal');

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('userEmail');
    
    if (isLoggedIn === 'true' && userEmail) {
        // Redirect to dashboard if on login page
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            window.location.href = 'dashboard.html';
        }
        
        // Set user email in dashboard
        if (userEmailSpan) {
            userEmailSpan.textContent = userEmail;
        }
        
        // Load jobs data
        loadJobs();
    } else {
        // Redirect to login if on dashboard page
        if (window.location.pathname.includes('dashboard.html')) {
            window.location.href = 'index.html';
        }
    }
});

// Login form submission
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        if (email && password) {
            // Show loading state
            const btnText = loginBtn.querySelector('.btn-text');
            const loadingSpinner = loginBtn.querySelector('.loading-spinner');
            
            btnText.style.display = 'none';
            loadingSpinner.style.display = 'flex';
            loginBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Store login state
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                }
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            }, 1500);
        }
    });
}

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleIcon.className = 'fas fa-eye';
    }
}

// Navigation functionality
if (navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('active');
            }
        });
    });
}

// Profile dropdown toggle
function toggleProfileDropdown() {
    if (profileDropdown) {
        profileDropdown.classList.toggle('show');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (profileDropdown && !e.target.closest('.profile-dropdown')) {
        profileDropdown.classList.remove('show');
    }
});

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('show');
}

// Logout functionality
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('rememberMe');
    window.location.href = 'index.html';
}

// Load jobs data
function loadJobs() {
    const featuredJobsGrid = document.getElementById('featuredJobsGrid');
    const allJobsGrid = document.getElementById('allJobsGrid');
    
    if (featuredJobsGrid) {
        const featuredJobs = jobsData.filter(job => job.featured);
        featuredJobsGrid.innerHTML = featuredJobs.map(job => createJobCard(job)).join('');
    }
    
    if (allJobsGrid) {
        allJobsGrid.innerHTML = jobsData.map(job => createJobCard(job)).join('');
    }
}

// Create job card HTML
function createJobCard(job) {
    return `
        <div class="job-card ${job.featured ? 'featured' : ''}" onclick="openJobModal(${job.id})">
            <div class="job-header">
                <div class="job-logo">${job.logo}</div>
                <div class="job-info">
                    <h3>${job.title}</h3>
                    <div class="company">${job.company}</div>
                </div>
            </div>
            <div class="job-tags">
                <span class="job-tag location">${job.location}</span>
                <span class="job-tag type">${job.type}</span>
            </div>
            <div class="job-description">
                ${job.description}
            </div>
            <div class="job-footer">
                <div class="job-salary">${job.salary}</div>
                <div class="job-posted">
                    <i class="fas fa-clock"></i>
                    ${job.posted}
                </div>
            </div>
        </div>
    `;
}

// Open job modal
function openJobModal(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (!job || !jobModal) return;
    
    const modalContent = document.getElementById('jobModalContent');
    modalContent.innerHTML = `
        <div class="job-detail">
            <div class="job-detail-header">
                <div class="job-logo">${job.logo}</div>
                <div>
                    <h2>${job.title}</h2>
                    <h3>${job.company}</h3>
                    <div class="job-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                        <span><i class="fas fa-briefcase"></i> ${job.type}</span>
                        <span><i class="fas fa-dollar-sign"></i> ${job.salary}</span>
                    </div>
                </div>
            </div>
            
            <div class="job-detail-content">
                <section>
                    <h4>Job Description</h4>
                    <p>${job.description}</p>
                </section>
                
                <section>
                    <h4>Requirements</h4>
                    <ul>
                        ${job.requirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                </section>
                
                <section>
                    <h4>Benefits</h4>
                    <ul>
                        ${job.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </section>
                
                <div class="job-actions">
                    <button class="apply-btn">Apply Now</button>
                    <button class="save-btn"><i class="fas fa-heart"></i> Save Job</button>
                </div>
            </div>
        </div>
    `;
    
    jobModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close job modal
function closeJobModal() {
    if (jobModal) {
        jobModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
if (jobModal) {
    jobModal.addEventListener('click', function(e) {
        if (e.target === jobModal) {
            closeJobModal();
        }
    });
}

// Search functionality
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredJobs = jobsData.filter(job => 
            job.title.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.location.toLowerCase().includes(searchTerm)
        );
        
        const allJobsGrid = document.getElementById('allJobsGrid');
        if (allJobsGrid) {
            allJobsGrid.innerHTML = filteredJobs.map(job => createJobCard(job)).join('');
        }
    });
}

// Add some additional CSS for job modal
const additionalCSS = `
    .job-detail-header {
        display: flex;
        gap: 20px;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e1e5e9;
    }
    
    .job-detail-header .job-logo {
        width: 80px;
        height: 80px;
        font-size: 32px;
    }
    
    .job-detail-header h2 {
        font-size: 28px;
        margin-bottom: 10px;
        color: #333;
    }
    
    .job-detail-header h3 {
        font-size: 20px;
        color: #667eea;
        margin-bottom: 15px;
    }
    
    .job-meta {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
    }
    
    .job-meta span {
        display: flex;
        align-items: center;
        gap: 5px;
        color: #666;
        font-size: 14px;
    }
    
    .job-detail-content section {
        margin-bottom: 25px;
    }
    
    .job-detail-content h4 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 10px;
        color: #333;
    }
    
    .job-detail-content ul {
        list-style: none;
        padding: 0;
    }
    
    .job-detail-content li {
        padding: 5px 0;
        padding-left: 20px;
        position: relative;
    }
    
    .job-detail-content li::before {
        content: '•';
        color: #667eea;
        font-weight: bold;
        position: absolute;
        left: 0;
    }
    
    .job-actions {
        display: flex;
        gap: 15px;
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #e1e5e9;
    }
    
    .apply-btn {
        flex: 1;
        padding: 15px 30px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .apply-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
    }
    
    .save-btn {
        padding: 15px 20px;
        background: white;
        color: #667eea;
        border: 2px solid #667eea;
        border-radius: 10px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .save-btn:hover {
        background: #667eea;
        color: white;
    }
`;

// Add the additional CSS to the page
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
