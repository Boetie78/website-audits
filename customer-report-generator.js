/**
 * Customer Report Generator
 * Creates individual customer report HTML files based on the Promac template
 */

class CustomerReportGenerator {
    constructor() {
        this.templatePath = 'promac-report-rebuild.html';
        this.template = null;
        this.customersDir = 'customers';
        this.init();
    }

    async init() {
        await this.loadTemplate();
    }

    /**
     * Load the Promac report template
     */
    async loadTemplate() {
        try {
            const response = await fetch(this.templatePath);
            if (!response.ok) {
                throw new Error(`Failed to load template: ${response.status}`);
            }
            this.template = await response.text();
            console.log('✅ Report template loaded successfully');
        } catch (error) {
            console.error('❌ Error loading report template:', error);
            // Fallback - try to get from current page if we're on the report page
            if (document.title.includes('SEO Audit Report')) {
                this.template = document.documentElement.outerHTML;
                console.log('✅ Using current page as template');
            }
        }
    }

    /**
     * Generate a customer report based on the template and audit data
     */
    async generateCustomerReport(customer, auditData) {
        if (!this.template) {
            await this.loadTemplate();
        }

        if (!this.template) {
            throw new Error('Template not available');
        }

        console.log(`📊 Generating report for ${customer.companyName}...`);

        // Clone the template
        let reportHtml = this.template;

        // Replace customer-specific data
        reportHtml = this.replaceCustomerData(reportHtml, customer);

        // Update audit results
        if (auditData) {
            reportHtml = this.replaceAuditData(reportHtml, auditData);
        }

        // Generate the report file content
        const reportContent = this.finalizeReport(reportHtml, customer);

        // Save the report (for GitHub Pages compatibility, we'll store in localStorage)
        this.saveReport(customer.slug, reportContent);

        return reportContent;
    }

    /**
     * Replace customer-specific placeholders in the template
     */
    replaceCustomerData(html, customer) {
        // Replace company name
        html = html.replace(/Promac Paints/g, customer.companyName);

        // Replace domain
        const cleanDomain = customer.website.replace(/^https?:\/\//, '').replace(/\/$/, '');
        html = html.replace(/promacpaints\.co\.za/g, cleanDomain);

        // Update title tag
        html = html.replace(/<title>.*?<\/title>/g,
            `<title>${customer.companyName} - SEO Audit Report</title>`);

        // Update dates
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        const shortDate = today.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        });

        html = html.replace(/Generated September \d+, \d+/g, `Generated ${formattedDate}`);
        html = html.replace(/07\/09\/2025/g, shortDate);

        // Update industry if provided
        if (customer.industry) {
            html = html.replace(/Manufacturing - Paint & Coatings/g, customer.industry);
        }

        // Update location if provided
        if (customer.location) {
            html = html.replace(/South Africa/g, customer.location);
        }

        return html;
    }

    /**
     * Replace audit data placeholders
     */
    replaceAuditData(html, auditData) {
        // Overall score
        if (auditData.overallScore) {
            html = html.replace(/>72\.4</g, `>${auditData.overallScore}<`);
        }

        // Critical issues
        if (auditData.criticalIssues !== undefined) {
            html = html.replace(/>8<\/div>\s*<p class="text-xs text-gray-500">Immediate action required/g,
                              `>${auditData.criticalIssues}</div>\n<p class="text-xs text-gray-500">Immediate action required`);
        }

        // Major issues
        if (auditData.majorIssues !== undefined) {
            html = html.replace(/>15<\/div>\s*<p class="text-xs text-gray-500">Should be addressed soon/g,
                              `>${auditData.majorIssues}</div>\n<p class="text-xs text-gray-500">Should be addressed soon`);
        }

        // Pages analyzed
        if (auditData.pagesAnalyzed !== undefined) {
            html = html.replace(/>12<\/div>\s*<p class="text-xs text-gray-500">Total pages crawled/g,
                              `>${auditData.pagesAnalyzed}</div>\n<p class="text-xs text-gray-500">Total pages crawled`);
        }

        // Average load time
        if (auditData.avgLoadTime !== undefined) {
            html = html.replace(/>2\.4s</g, `>${auditData.avgLoadTime}s<`);
        }

        // Performance scores
        if (auditData.desktopScore !== undefined) {
            html = html.replace(/>68<\/div>\s*<\/div>\s*<div class="grid grid-cols-3/g,
                              `>${auditData.desktopScore}</div>\n</div>\n<div class="grid grid-cols-3`);
        }

        if (auditData.mobileScore !== undefined) {
            html = html.replace(/>53<\/div>\s*<\/div>\s*<div class="grid grid-cols-3/g,
                              `>${auditData.mobileScore}</div>\n</div>\n<div class="grid grid-cols-3`);
        }

        return html;
    }

    /**
     * Finalize the report with proper navigation and metadata
     */
    finalizeReport(html, customer) {
        // Update navigation to go back to customers dashboard
        html = html.replace(/onclick="goBack\(\)"/g,
            `onclick="window.location.href='../customers-dashboard.html'"`);

        // Add customer-specific metadata
        const metaTag = `<meta name="customer-id" content="${customer.id}">
    <meta name="customer-slug" content="${customer.slug}">
    <meta name="generated-date" content="${new Date().toISOString()}">`;

        html = html.replace(/<meta name="viewport"[^>]*>/g,
            `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n    ${metaTag}`);

        // Add customer report specific styling if needed
        const customCSS = `
        <style>
        .customer-report-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .back-to-dashboard {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #3b82f6;
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            z-index: 1000;
        }
        .back-to-dashboard:hover {
            background: #2563eb;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
        }
        </style>`;

        html = html.replace(/<\/head>/, `${customCSS}\n</head>`);

        // Add floating back button
        const backButton = `
        <a href="../customers-dashboard.html" class="back-to-dashboard">
            ← Back to Dashboard
        </a>`;

        html = html.replace(/<\/body>/, `${backButton}\n</body>`);

        return html;
    }

    /**
     * Save the report (GitHub Pages compatible method)
     */
    saveReport(customerSlug, reportContent) {
        // Store in localStorage (since we can't write files directly in browser)
        const reportsKey = 'customer_reports';
        const reports = JSON.parse(localStorage.getItem(reportsKey) || '{}');
        reports[customerSlug] = reportContent;
        localStorage.setItem(reportsKey, JSON.stringify(reports));

        // Also create a downloadable version
        this.createDownloadableReport(customerSlug, reportContent);

        console.log(`✅ Report saved for ${customerSlug}`);
    }

    /**
     * Create a downloadable version of the report
     */
    createDownloadableReport(customerSlug, reportContent) {
        // For now, we'll just store the download function
        // In a real implementation, this could trigger automatic file download
        const downloadKey = 'customer_downloads';
        const downloads = JSON.parse(localStorage.getItem(downloadKey) || '{}');
        downloads[customerSlug] = {
            filename: `${customerSlug}-audit-report.html`,
            content: reportContent,
            createdAt: new Date().toISOString()
        };
        localStorage.setItem(downloadKey, JSON.stringify(downloads));
    }

    /**
     * Get a customer report
     */
    getCustomerReport(customerSlug) {
        const reports = JSON.parse(localStorage.getItem('customer_reports') || '{}');
        return reports[customerSlug] || null;
    }

    /**
     * Download a customer report
     */
    downloadCustomerReport(customerSlug) {
        const report = this.getCustomerReport(customerSlug);
        if (!report) {
            console.error('Report not found for customer:', customerSlug);
            return false;
        }

        const blob = new Blob([report], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${customerSlug}-audit-report.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        return true;
    }

    /**
     * Generate sample audit data for testing
     */
    generateSampleAuditData(customer) {
        return {
            overallScore: Math.floor(Math.random() * 30) + 60, // 60-90
            criticalIssues: Math.floor(Math.random() * 8) + 1, // 1-8
            majorIssues: Math.floor(Math.random() * 15) + 5, // 5-20
            pagesAnalyzed: Math.floor(Math.random() * 40) + 10, // 10-50
            avgLoadTime: (Math.random() * 2 + 1).toFixed(1), // 1.0-3.0s
            desktopScore: Math.floor(Math.random() * 30) + 60, // 60-90
            mobileScore: Math.floor(Math.random() * 30) + 40, // 40-70
            timestamp: new Date().toISOString(),
            // Performance metrics
            fcp: (Math.random() * 2 + 1).toFixed(1),
            lcp: (Math.random() * 3 + 2).toFixed(1),
            cls: (Math.random() * 0.1).toFixed(3),
            // SEO data
            keywords: customer.targetKeywords || [],
            competitors: customer.competitors || []
        };
    }

    /**
     * Create complete customer project structure
     */
    async createCustomerProject(customer) {
        // Generate audit data
        const auditData = this.generateSampleAuditData(customer);

        // Generate the report
        const reportHtml = await this.generateCustomerReport(customer, auditData);

        // Store audit data separately for future reference
        const dataKey = 'customer_audit_data';
        const auditDataStore = JSON.parse(localStorage.getItem(dataKey) || '{}');
        auditDataStore[customer.slug] = {
            customer: customer,
            auditData: auditData,
            generatedAt: new Date().toISOString()
        };
        localStorage.setItem(dataKey, JSON.stringify(auditDataStore));

        return {
            success: true,
            reportHtml: reportHtml,
            auditData: auditData,
            reportUrl: `customers/${customer.slug}/${customer.slug}-report.html`
        };
    }
}

// Initialize when loaded
window.customerReportGenerator = new CustomerReportGenerator();