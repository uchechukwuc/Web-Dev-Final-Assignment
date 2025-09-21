/* CarEase script.js
   - Small, modular functions with comments
   - Handles menu toggle, dynamic year, form validation and progressive enhancement
*/

        // Global variables
        let currentPage = 'home';
        const pages = ['home', 'about', 'services', 'fleet', 'contact'];
        
        // DOM Content Loaded Event
        document.addEventListener('DOMContentLoaded', function() {
            initializeWebsite();
        });

        // Initialize website functionality
        function initializeWebsite() {
            // Hide loading screen
            setTimeout(() => {
                document.getElementById('loading').classList.add('hidden');
            }, 1500);

            // Setup navigation
            setupNavigation();
            
            // Setup form validation
            setupFormValidation();
            
            // Setup scroll animations
            setupScrollAnimations();
            
            // Setup mobile menu
            setupMobileMenu();
            
            // Set minimum dates for booking form
            setMinDates();
            
            // Initialize intersection observer for navigation highlighting
            observePages();
            
            console.log('LuxeDrive website initialized successfully!');
        }

        // Navigation setup
        function setupNavigation() {
            const navLinks = document.querySelectorAll('.nav-link');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    scrollToSection(targetId);
                    
                    // Update active states
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }

        // Smooth scroll to section
        function scrollToSection(targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }

        // Scroll to top function
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Mobile menu setup
        function setupMobileMenu() {
            const mobileToggle = document.querySelector('.mobile-toggle');
            const navLinks = document.querySelector('.nav-links');
            
            mobileToggle.addEventListener('click', function() {
                const isExpanded = navLinks.classList.contains('active');
                navLinks.classList.toggle('active');
                this.setAttribute('aria-expanded', !isExpanded);
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                });
            });
        }

        // Form validation setup
        function setupFormValidation() {
            const form = document.querySelector('.contact-form');
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm()) {
                    // Simulate form submission
                    showToast('Booking request submitted successfully! We\'ll contact you within 24 hours.', 'success');
                    form.reset();
                } else {
                    showToast('Please fill in all required fields correctly.', 'error');
                }
            });

            // Real-time validation
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => validateField(input));
                input.addEventListener('input', () => clearFieldError(input));
            });
        }

        // Validate individual field
        function validateField(field) {
            const value = field.value.trim();
            const fieldName = field.name;
            let isValid = true;
            let errorMessage = '';

            switch(fieldName) {
                case 'fullName':
                    if (value.length < 2) {
                        errorMessage = 'Name must be at least 2 characters long';
                        isValid = false;
                    }
                    break;
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        errorMessage = 'Please enter a valid email address';
                        isValid = false;
                    }
                    break;
                case 'phone':
                    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                        errorMessage = 'Please enter a valid phone number';
                        isValid = false;
                    }
                    break;
                case 'vehicleType':
                    if (!value) {
                        errorMessage = 'Please select a vehicle type';
                        isValid = false;
                    }
                    break;
                case 'pickupDate':
                case 'returnDate':
                    if (!value) {
                        errorMessage = 'Please select a date';
                        isValid = false;
                    }
                    break;
            }

            const errorElement = document.getElementById(`${fieldName}-error`);
            if (errorElement) {
                errorElement.textContent = errorMessage;
                field.style.borderColor = isValid ? '' : '#f44336';
            }

            return isValid;
        }

        // Clear field error
        function clearFieldError(field) {
            const errorElement = document.getElementById(`${field.name}-error`);
            if (errorElement) {
                errorElement.textContent = '';
                field.style.borderColor = '';
            }
        }

        // Validate entire form
        function validateForm() {
            const form = document.querySelector('.contact-form');
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });

            // Additional validation for date range
            const pickupDate = new Date(form.pickupDate.value);
            const returnDate = new Date(form.returnDate.value);
            
            if (pickupDate >= returnDate) {
                showToast('Return date must be after pickup date', 'error');
                isValid = false;
            }

            return isValid;
        }

        // Set minimum dates for booking form
        function setMinDates() {
            const today = new Date().toISOString().split('T')[0];
            const pickupInput = document.getElementById('pickupDate');
            const returnInput = document.getElementById('returnDate');
            
            if (pickupInput) pickupInput.setAttribute('min', today);
            if (returnInput) returnInput.setAttribute('min', today);

            // Update return date minimum when pickup date changes
            pickupInput?.addEventListener('change', function() {
                const selectedDate = new Date(this.value);
                selectedDate.setDate(selectedDate.getDate() + 1);
                const minReturnDate = selectedDate.toISOString().split('T')[0];
                returnInput.setAttribute('min', minReturnDate);
            });
        }

        // Scroll animations setup
        function setupScrollAnimations() {
            const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(element => {
                observer.observe(element);
            });
        }

        // Observe pages for navigation highlighting
        function observePages() {
            const sections = document.querySelectorAll('section[id]');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        updateActiveNavLink(id);
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '-80px 0px -80px 0px'
            });

            sections.forEach(section => {
                observer.observe(section);
            });
        }

        // Update active navigation link
        function updateActiveNavLink(activeId) {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${activeId}`) {
                    link.classList.add('active');
                }
            });
        }

        // Show toast notification
        function showToast(message, type = 'info') {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toast-message');
            
            toastMessage.textContent = message;
            toast.className = `toast show ${type}`;
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 5000);
        }

        // Close toast notification
        function closeToast() {
            document.getElementById('toast').classList.remove('show');
        }

        // Show modal
        function showModal(type) {
            const modal = document.getElementById('modal');
            const modalTitle = document.getElementById('modal-title');
            const modalBody = document.getElementById('modal-body');
            
            let title = '';
            let content = '';
            
            
            modalTitle.textContent = title;
            modalBody.innerHTML = content;
            modal.style.display = 'flex';
            modal.setAttribute('aria-hidden', 'false');
            
            // Focus management for accessibility
            setTimeout(() => {
                modal.querySelector('.modal-close').focus();
            }, 100);
        }


        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            const modal = document.getElementById('modal');
            if (e.target === modal) {
                closeModal();
            }
        });

        // Keyboard navigation for accessibility
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
                closeToast();
            }
        });

        // Performance optimization: Lazy load images (if we had actual images)
        function lazyLoadImages() {
            const images = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
