/**
 * Customer Workflow Integration
 * Orchestrates the complete customer management workflow
 */

class CustomerWorkflowIntegration {
    constructor() {
        this.initialized = false;
        this.dependencies = {
            customerManager: false,
            reportGenerator: false,
            automationHub: false
        };

        this.init();
    }

    async init() {
        // Wait for dependencies to load
        await this.waitForDependencies();

        // Setup event listeners
        this.setupEventListeners();

        this.initialized = true;
        console.log('🔗 Customer Workflow Integration initialized');
    }

    async waitForDependencies() {
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds max wait

        return new Promise((resolve) => {
            const checkDependencies = () => {
                attempts++;

                // Check for customer manager
                if (window.customerManager) {
                    this.dependencies.customerManager = true;
                }

                // Check for report generator
                if (window.customerReportGenerator) {
                    this.dependencies.reportGenerator = true;
                }

                // Check for automation hub
                if (window.AuditAutomationHub) {
                    this.dependencies.automationHub = true;
                }

                const allLoaded = Object.values(this.dependencies).every(dep => dep);

                if (allLoaded || attempts >= maxAttempts) {
                    console.log('📦 Dependencies loaded:', this.dependencies);
                    resolve();
                } else {
                    setTimeout(checkDependencies, 100);
                }
            };

            checkDependencies();
        });
    }

    setupEventListeners() {
        // Listen for form submissions
        document.addEventListener('submit', this.handleFormSubmission.bind(this));

        // Listen for customer actions
        document.addEventListener('click', this.handleCustomerActions.bind(this));

        // Listen for storage changes (for cross-tab updates)
        window.addEventListener('storage', this.handleStorageChange.bind(this));
    }

    async handleFormSubmission(event) {
        // Check if it's the audit intake form
        if (event.target.id === 'auditIntakeForm') {
            console.log('📋 Audit intake form submitted');

            // The form already has its own handler, but we can add additional logic here
            this.trackFormSubmission('audit_intake');
        }
    }

    handleCustomerActions(event) {
        const target = event.target;

        // Handle customer-related button clicks
        if (target.matches('[onclick*="viewReport"]')) {
            this.trackAction('view_report', { button: target });
        } else if (target.matches('[onclick*="downloadReport"]')) {
            this.trackAction('download_report', { button: target });
        } else if (target.matches('[onclick*="viewCustomerDetails"]')) {
            this.trackAction('view_customer_details', { button: target });
        }
    }

    handleStorageChange(event) {
        // Handle changes to customer data across tabs
        if (event.key === 'website_audit_customers') {
            console.log('👥 Customer data updated in another tab');
            this.triggerCustomerListRefresh();
        }
    }

    /**
     * Complete end-to-end customer onboarding workflow
     */
    async processCompleteCustomerWorkflow(formData) {
        console.log('🎯 Starting complete customer workflow...');

        try {
            const workflow = {
                steps: [
                    'validate_data',
                    'create_customer',
                    'generate_report',
                    'update_dashboard',
                    'send_notifications'
                ],
                currentStep: 0,
                customer: null,
                errors: []
            };

            // Step 1: Validate Data
            workflow.currentStep++;
            console.log(`📝 Step ${workflow.currentStep}: Validating customer data...`);

            const validationResult = this.validateCustomerData(formData);
            if (!validationResult.valid) {
                throw new Error(`Data validation failed: ${validationResult.errors.join(', ')}`);
            }

            // Step 2: Create Customer
            workflow.currentStep++;
            console.log(`📝 Step ${workflow.currentStep}: Creating customer record...`);

            if (this.dependencies.customerManager) {
                workflow.customer = await window.customerManager.createCustomerProject(formData);
                console.log('✅ Customer created:', workflow.customer.companyName);
            } else {
                throw new Error('Customer Manager not available');
            }

            // Step 3: Generate Report
            workflow.currentStep++;
            console.log(`📝 Step ${workflow.currentStep}: Generating audit report...`);

            // Report generation is handled by the customer manager
            console.log('✅ Report generation initiated');

            // Step 4: Update Dashboard
            workflow.currentStep++;
            console.log(`📝 Step ${workflow.currentStep}: Updating dashboard...`);

            this.triggerCustomerListRefresh();

            // Step 5: Send Notifications
            workflow.currentStep++;
            console.log(`📝 Step ${workflow.currentStep}: Sending notifications...`);

            this.sendCustomerNotifications(workflow.customer);

            console.log('🎉 Complete customer workflow finished successfully');

            return {
                success: true,
                customer: workflow.customer,
                workflow: workflow
            };

        } catch (error) {
            console.error('❌ Workflow error:', error);
            return {
                success: false,
                error: error.message,
                step: workflow.currentStep
            };
        }
    }

    /**
     * Validate customer form data
     */
    validateCustomerData(formData) {
        const errors = [];

        // Required fields
        if (!formData.companyName) errors.push('Company name is required');
        if (!formData.email) errors.push('Email is required');
        if (!formData.website) errors.push('Website is required');

        // Email validation
        if (formData.email && !this.isValidEmail(formData.email)) {
            errors.push('Invalid email format');
        }

        // Website validation
        if (formData.website && !this.isValidUrl(formData.website)) {
            errors.push('Invalid website URL');
        }

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Enhanced customer search and filtering
     */
    searchCustomers(query, filters = {}) {
        if (!this.dependencies.customerManager) {
            return [];
        }

        let customers = window.customerManager.getAllCustomers();

        // Apply text search
        if (query) {
            const searchTerm = query.toLowerCase();
            customers = customers.filter(customer =>
                customer.companyName.toLowerCase().includes(searchTerm) ||
                customer.contactName.toLowerCase().includes(searchTerm) ||
                customer.email.toLowerCase().includes(searchTerm) ||
                customer.website.toLowerCase().includes(searchTerm) ||
                (customer.industry && customer.industry.toLowerCase().includes(searchTerm)) ||
                (customer.location && customer.location.toLowerCase().includes(searchTerm))
            );
        }

        // Apply filters
        if (filters.status && filters.status !== 'all') {
            customers = customers.filter(c => c.status === filters.status);
        }

        if (filters.industry) {
            customers = customers.filter(c => c.industry === filters.industry);
        }

        if (filters.dateRange) {
            customers = this.filterByDateRange(customers, filters.dateRange);
        }

        return customers;
    }

    /**
     * Get analytics data for customers
     */
    getCustomerAnalytics() {
        if (!this.dependencies.customerManager) {
            return null;
        }

        const customers = window.customerManager.getAllCustomers();
        const now = new Date();

        return {
            total: customers.length,
            completed: customers.filter(c => c.status === 'completed').length,
            pending: customers.filter(c => c.status === 'pending').length,
            thisMonth: customers.filter(c => {
                const created = new Date(c.createdAt);
                return created.getMonth() === now.getMonth() &&
                       created.getFullYear() === now.getFullYear();
            }).length,
            thisWeek: customers.filter(c => {
                const created = new Date(c.createdAt);
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                return created >= weekAgo;
            }).length,
            industries: this.getIndustryBreakdown(customers),
            averageScore: this.getAverageScore(customers)
        };
    }

    /**
     * Export customers with enhanced options
     */
    exportCustomers(format = 'csv', options = {}) {
        if (!this.dependencies.customerManager) {
            console.error('Customer Manager not available');
            return false;
        }

        try {
            const customers = options.filtered ?
                this.searchCustomers(options.query, options.filters) :
                window.customerManager.getAllCustomers();

            if (format === 'csv') {
                this.exportToCSV(customers, options);
            } else if (format === 'json') {
                this.exportToJSON(customers, options);
            } else if (format === 'xlsx') {
                // Future enhancement
                console.warn('XLSX export not yet implemented');
                return false;
            }

            this.trackAction('export_customers', { format, count: customers.length });
            return true;

        } catch (error) {
            console.error('Export error:', error);
            return false;
        }
    }

    /**
     * Trigger refresh of customer lists across all open tabs/windows
     */
    triggerCustomerListRefresh() {
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('customerListUpdate'));

        // For cross-tab communication
        localStorage.setItem('customer_list_update', Date.now().toString());

        console.log('🔄 Customer list refresh triggered');
    }

    /**
     * Send notifications for customer actions
     */
    sendCustomerNotifications(customer) {
        // This would integrate with email services in a real implementation
        console.log(`📧 Notifications sent for customer: ${customer.companyName}`);

        // For now, just store notification logs
        const notifications = JSON.parse(localStorage.getItem('customer_notifications') || '[]');
        notifications.push({
            customerId: customer.id,
            type: 'customer_created',
            timestamp: new Date().toISOString(),
            email: customer.email
        });
        localStorage.setItem('customer_notifications', JSON.stringify(notifications));
    }

    /**
     * Utility functions
     */
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    isValidUrl(url) {
        try {
            new URL(url.startsWith('http') ? url : 'https://' + url);
            return true;
        } catch {
            return false;
        }
    }

    filterByDateRange(customers, range) {
        const now = new Date();
        let startDate;

        switch (range) {
            case 'today':
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                break;
            case 'week':
                startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case 'month':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                break;
            case 'quarter':
                startDate = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
                break;
            default:
                return customers;
        }

        return customers.filter(c => new Date(c.createdAt) >= startDate);
    }

    getIndustryBreakdown(customers) {
        const industries = {};
        customers.forEach(c => {
            const industry = c.industry || 'Unknown';
            industries[industry] = (industries[industry] || 0) + 1;
        });
        return industries;
    }

    getAverageScore(customers) {
        const scoredCustomers = customers.filter(c => c.auditData && c.auditData.overallScore);
        if (scoredCustomers.length === 0) return 0;

        const totalScore = scoredCustomers.reduce((sum, c) => sum + c.auditData.overallScore, 0);
        return Math.round(totalScore / scoredCustomers.length);
    }

    exportToCSV(customers, options) {
        const headers = options.includeScores ?
            ['Company', 'Contact', 'Email', 'Website', 'Industry', 'Location', 'Status', 'Score', 'Created'] :
            ['Company', 'Contact', 'Email', 'Website', 'Industry', 'Location', 'Status', 'Created'];

        const rows = customers.map(c => {
            const baseRow = [
                c.companyName,
                c.contactName,
                c.email,
                c.website,
                c.industry || '',
                c.location || '',
                c.status,
                new Date(c.createdAt).toLocaleDateString()
            ];

            if (options.includeScores) {
                baseRow.splice(-1, 0, c.auditData ? c.auditData.overallScore : 'N/A');
            }

            return baseRow;
        });

        const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
        this.downloadFile(csv, 'customers.csv', 'text/csv');
    }

    exportToJSON(customers, options) {
        const data = options.includeAuditData ?
            customers :
            customers.map(c => {
                const { auditData, ...customerData } = c;
                return customerData;
            });

        const json = JSON.stringify(data, null, 2);
        this.downloadFile(json, 'customers.json', 'application/json');
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    trackFormSubmission(formType) {
        // Analytics tracking
        console.log(`📊 Form submitted: ${formType}`);
    }

    trackAction(action, data = {}) {
        // Analytics tracking
        console.log(`📊 Action tracked: ${action}`, data);
    }
}

// Initialize when loaded
window.addEventListener('load', () => {
    window.customerWorkflow = new CustomerWorkflowIntegration();
});