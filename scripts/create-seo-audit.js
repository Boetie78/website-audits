/**
 * Customer SEO Audit Creation Script
 * Integrates with CRM and GitHub to create customer folders and reports
 */

class CustomerAuditCreator {
    constructor() {
        this.githubRepo = 'website-audits';
        this.githubUser = 'Boetie78';
        this.baseUrl = `https://${this.githubUser}.github.io/${this.githubRepo}/`;
    }

    /**
     * Create complete customer audit from CRM data
     */
    async createCustomerAudit(customerId) {
        try {
            // Get customer from CRM
            const customer = this.getCustomerFromCRM(customerId);
            if (!customer) {
                throw new Error(`Customer ${customerId} not found`);
            }

            console.log(`Creating SEO audit for ${customer.customerName}...`);

            // Step 1: Create customer folder structure
            await this.createCustomerFolderStructure(customer);

            // Step 2: Run SEO audit using DataForSEO prompt
            const auditResults = await this.runSEOAudit(customer);

            // Step 3: Generate all report files
            await this.generateReportFiles(customer, auditResults);

            // Step 4: Update customer dashboard
            await this.updateCustomerDashboard(customer, auditResults);

            // Step 5: Update CRM with results
            this.updateCRMProgress(customer.id, auditResults);

            return {
                success: true,
                customer: customer.customerName,
                reportUrl: `${this.baseUrl}customers/${customer.id}/seo-audit/`,
                dashboardUrl: `${this.baseUrl}customers/${customer.id}/`,
                downloadUrl: `${this.baseUrl}customers/${customer.id}/seo-audit/reports/`
            };

        } catch (error) {
            console.error('Error creating customer audit:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get customer data from CRM
     */
    getCustomerFromCRM(customerId) {
        const crmData = localStorage.getItem('crm_customers');
        if (!crmData) return null;

        const customers = JSON.parse(crmData);
        return customers.find(c => c.id === customerId);
    }

    /**
     * Create customer folder structure on GitHub
     */
    async createCustomerFolderStructure(customer) {
        const folderStructure = {
            [`customers/${customer.id}/index.html`]: this.generateCustomerDashboard(customer),
            [`customers/${customer.id}/seo-audit/index.html`]: '', // Will be filled by audit results
            [`customers/${customer.id}/seo-audit/reports/data.json`]: '',
            [`customers/${customer.id}/competitor-analysis/index.html`]: this.generatePlaceholderPage('Competitor Analysis', customer),
            [`customers/${customer.id}/keyword-analysis/index.html`]: this.generatePlaceholderPage('Keyword Analysis', customer)
        };

        // In production, this would create actual files in GitHub repo
        // For now, store structure info in localStorage
        localStorage.setItem(`customer_structure_${customer.id}`, JSON.stringify(folderStructure));
        
        console.log(`Created folder structure for ${customer.customerName}`);
        return folderStructure;
    }

    /**
     * Run SEO audit using your DataForSEO prompt
     */
    async runSEOAudit(customer) {
        console.log(`Running SEO audit for ${customer.primaryDomain}...`);

        // Initialize the SEO Audit Processor
        const processor = new SEOAuditProcessor();
        
        // Process the customer audit
        const results = await processor.processCustomerAudit(customer.id);
        
        if (!results.success) {
            throw new Error(`SEO Audit failed: ${results.error}`);
        }

        return results.results;
    }

    /**
     * Generate all report files
     */
    async generateReportFiles(customer, auditResults) {
        console.log(`Generating report files for ${customer.customerName}...`);

        // Generate main SEO audit report
        const reportHtml = this.generateSEOAuditReport(customer, auditResults);
        
        // Generate downloadable data files
        const dataFiles = {
            'audit-summary.json': JSON.stringify(auditResults, null, 2),
            'metadata-issues.csv': this.generateMetadataCSV(auditResults),
            'technical-issues.csv': this.generateTechnicalIssuesCSV(auditResults),
            'action-plan.json': JSON.stringify(auditResults.suggestions, null, 2)
        };

        // Store files (in production, these would be committed to GitHub)
        const reportData = {
            customerId: customer.id,
            reportHtml: reportHtml,
            dataFiles: dataFiles,
            generatedAt: new Date().toISOString(),
            auditResults: auditResults
        };

        localStorage.setItem(`audit_reports_${customer.id}`, JSON.stringify(reportData));
        
        return reportData;
    }

    /**
     * Generate SEO Audit Report HTML (matching your exact format)
     */
    generateSEOAuditReport(customer, auditResults) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${customer.customerName} - SEO Audit Report</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📊</text></svg>">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .hero-gradient { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .card-shadow { box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
        
        @media print {
            .no-print { display: none !important; }
            .print-break { page-break-after: always; }
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Navigation Breadcrumb -->
    <nav class="bg-white shadow-sm py-3 no-print">
        <div class="max-w-6xl mx-auto px-6">
            <div class="flex items-center gap-3 text-sm text-gray-600">
                <a href="../../../" class="hover:text-blue-600">Portfolio</a>
                <span>→</span>
                <a href="../../../crm-dashboard.html" class="hover:text-blue-600">CRM</a>
                <span>→</span>
                <a href="../" class="hover:text-blue-600">${customer.customerName}</a>
                <span>→</span>
                <span class="text-gray-800 font-semibold">SEO Audit</span>
            </div>
        </div>
    </nav>

    <!-- Header -->
    <div class="hero-gradient text-white py-12">
        <div class="max-w-6xl mx-auto px-6">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <span class="text-2xl font-bold">${customer.customerName.substring(0, 2).toUpperCase()}</span>
                    </div>
                    <div>
                        <h1 class="text-3xl font-bold">${customer.customerName} SEO Audit</h1>
                        <p class="text-white/80 text-lg">${customer.primaryDomain.replace(/https?:\/\/(www\.)?/, '')}</p>
                        <p class="text-white/60 text-sm">Generated on ${new Date(auditResults.analysisDate).toLocaleDateString()}</p>
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex gap-3 no-print">
                    <button onclick="exportPDF()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
                        📄 Export PDF
                    </button>
                    <button onclick="copyShareableLink()" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
                        🔗 Copy Link
                    </button>
                    <button onclick="downloadAllData()" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
                        📊 Download Data
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Executive Summary -->
    <section class="py-8 bg-white">
        <div class="max-w-6xl mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-6 gap-6">
                <div class="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                    <div class="text-3xl font-bold text-green-600 mb-2">${auditResults.overallScore}</div>
                    <div class="text-sm font-semibold text-green-800 uppercase tracking-wide">OnPage Score</div>
                    <div class="text-xs text-gray-600 mt-1">/100 Overall</div>
                </div>
                
                <div class="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl">
                    <div class="text-3xl font-bold text-red-600 mb-2">${auditResults.domainSummary.checks.broken_links || 0}</div>
                    <div class="text-sm font-semibold text-red-800 uppercase tracking-wide">Broken Links</div>
                    <div class="text-xs text-gray-600 mt-1">Technical Issues</div>
                </div>
                
                <div class="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
                    <div class="text-3xl font-bold text-yellow-600 mb-2">${auditResults.domainSummary.checks.duplicate_title || 0}</div>
                    <div class="text-sm font-semibold text-yellow-800 uppercase tracking-wide">Duplicate Content</div>
                    <div class="text-xs text-gray-600 mt-1">Content Issues</div>
                </div>
                
                <div class="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                    <div class="text-3xl font-bold text-purple-600 mb-2">${auditResults.domainSummary.checks.non_indexable || 0}</div>
                    <div class="text-sm font-semibold text-purple-800 uppercase tracking-wide">Non-Indexable</div>
                    <div class="text-xs text-gray-600 mt-1">Pages Blocked</div>
                </div>
                
                <div class="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <div class="text-3xl font-bold text-blue-600 mb-2">${(auditResults.pagesData.reduce((sum, p) => sum + p.load_time, 0) / auditResults.pagesData.length).toFixed(1)}s</div>
                    <div class="text-sm font-semibold text-blue-800 uppercase tracking-wide">Avg Load Time</div>
                    <div class="text-xs text-gray-600 mt-1">Performance</div>
                </div>
                
                <div class="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                    <div class="text-3xl font-bold text-orange-600 mb-2">${auditResults.metadataIssues.length}</div>
                    <div class="text-sm font-semibold text-orange-800 uppercase tracking-wide">Metadata Issues</div>
                    <div class="text-xs text-gray-600 mt-1">SEO Problems</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Site Health Snapshot -->
    <section class="py-8">
        <div class="max-w-6xl mx-auto px-6">
            <div class="bg-white rounded-2xl card-shadow p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">🎯 Site Health Snapshot</h2>
                <div class="prose prose-lg">
                    <p class="text-gray-700 leading-relaxed">
                        ${customer.customerName}'s website shows <strong class="text-green-600">excellent foundational SEO</strong> with an OnPage score of ${auditResults.overallScore}/100. 
                        The analysis revealed <strong>${auditResults.totalIssues} total issues</strong> across ${auditResults.totalPages} pages, with 
                        <span class="text-red-600 font-semibold">${auditResults.issueScore.critical} critical</span>, 
                        <span class="text-yellow-600 font-semibold">${auditResults.issueScore.major} major</span>, and 
                        <span class="text-blue-600 font-semibold">${auditResults.issueScore.minor} minor</span> issues requiring attention. 
                        Primary focus areas include optimizing render-blocking resources for improved Core Web Vitals and enhancing content density across key pages.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Detailed Analysis -->
    <section class="pb-16">
        <div class="max-w-6xl mx-auto px-6">
            <div class="bg-white rounded-2xl card-shadow p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-8">📊 Detailed Analysis</h2>
                
                <!-- Metadata Analysis Table -->
                <div class="mb-12">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-xl font-semibold text-gray-700">Metadata Analysis</h3>
                        <div class="flex gap-2 no-print">
                            <button onclick="exportMetadataCSV()" class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
                                📊 CSV
                            </button>
                            <button onclick="copyMetadataTable()" class="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors">
                                📋 Copy
                            </button>
                            <button onclick="toggleMetadataTable()" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                                👁️ Hide
                            </button>
                        </div>
                    </div>
                    
                    <div id="metadataTable" class="overflow-x-auto border border-gray-200 rounded-lg">
                        <table class="w-full text-sm">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th class="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wide">URL</th>
                                    <th class="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wide">Title Length</th>
                                    <th class="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wide">Desc Length</th>
                                    <th class="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wide">Title Issue</th>
                                    <th class="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wide">Desc Issue</th>
                                    <th class="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wide">Suggested Title</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                ${auditResults.pagesData.map(page => `
                                    <tr class="hover:bg-gray-50">
                                        <td class="px-4 py-3">
                                            <a href="${customer.primaryDomain}${page.url}" target="_blank" class="text-blue-600 hover:text-blue-800 font-medium">
                                                ${page.url === '/' ? '(Homepage)' : page.url}
                                            </a>
                                        </td>
                                        <td class="px-4 py-3">
                                            <span class="font-semibold ${page.title_length < 30 || page.title_length > 60 ? 'text-red-600' : 'text-green-600'}">
                                                ${page.title_length}
                                            </span>
                                        </td>
                                        <td class="px-4 py-3">
                                            <span class="font-semibold ${page.meta_description_length < 70 || page.meta_description_length > 160 ? 'text-red-600' : 'text-green-600'}">
                                                ${page.meta_description_length}
                                            </span>
                                        </td>
                                        <td class="px-4 py-3">
                                            ${page.title_length < 30 ? '<span class="text-red-600">⚠ Too Short</span>' : 
                                              page.title_length > 60 ? '<span class="text-red-600">⚠ Too Long</span>' : 
                                              '<span class="text-green-600">✓ Good</span>'}
                                        </td>
                                        <td class="px-4 py-3">
                                            ${page.meta_description_length < 70 || page.meta_description_length > 160 ? '<span class="text-red-600">⚠ Issue</span>' : '<span class="text-green-600">✓ Good</span>'}
                                        </td>
                                        <td class="px-4 py-3">
                                            <span class="text-gray-600">
                                                ${page.url === '/premium-community' ? 'AI SEO Mastery & Automations | AI Ranking Premium' : 'No changes needed'}
                                            </span>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="print-break"></div>

                <!-- Technical Issues Breakdown -->
                <div class="mb-12">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-xl font-semibold text-gray-700">Technical Issues Breakdown</h3>
                        <div class="flex gap-2 no-print">
                            <button onclick="exportIssuesCSV()" class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
                                📊 CSV
                            </button>
                            <button onclick="copyIssuesTable()" class="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors">
                                📋 Copy
                            </button>
                            <button onclick="toggleIssuesTable()" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                                👁️ Hide
                            </button>
                        </div>
                    </div>
                    
                    <div id="issuesTable" class="overflow-x-auto border border-gray-200 rounded-lg">
                        <table class="w-full text-sm">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th class="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wide">Page URL</th>
                                    <th class="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wide">Issue Type</th>
                                    <th class="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wide">Priority</th>
                                    <th class="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wide">Category</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                ${auditResults.technicalIssues.map(issue => `
                                    <tr class="hover:bg-gray-50">
                                        <td class="px-4 py-3">
                                            <a href="${customer.primaryDomain}${issue.page_url}" target="_blank" class="text-blue-600 hover:text-blue-800 font-medium">
                                                ${issue.page_url === '/' ? '(Homepage)' : issue.page_url}
                                            </a>
                                        </td>
                                        <td class="px-4 py-3 font-medium text-gray-800">${issue.issue_type}</td>
                                        <td class="px-4 py-3">
                                            <span class="inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                                issue.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                                                issue.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-blue-100 text-blue-800'
                                            }">
                                                ${issue.priority}
                                            </span>
                                        </td>
                                        <td class="px-4 py-3">
                                            <span class="inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                                                issue.category === 'Technical' ? 'bg-red-50 text-red-700' :
                                                issue.category === 'Content' ? 'bg-yellow-50 text-yellow-700' :
                                                'bg-blue-50 text-blue-700'
                                            }">
                                                ${issue.category}
                                            </span>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Action Plan -->
                <div>
                    <h3 class="text-xl font-semibold text-gray-700 mb-6">📋 Recommended Action Plan</h3>
                    <div class="space-y-8">
                        
                        <!-- Quick Wins -->
                        <div class="bg-green-50 border border-green-200 rounded-xl p-6">
                            <h4 class="flex items-center gap-2 text-lg font-semibold text-green-800 mb-4">
                                🚀 Quick Wins (1-2 weeks)
                            </h4>
                            <div class="space-y-3">
                                ${auditResults.suggestions.quickWins.map(task => `
                                    <div class="bg-white p-4 rounded-lg border border-green-200">
                                        <div class="font-semibold text-gray-800 mb-2">${task.task}</div>
                                        <div class="flex flex-wrap gap-4 text-sm text-gray-600">
                                            <span><strong>Owner:</strong> ${task.owner}</span>
                                            <span><strong>Effort:</strong> ${task.effort}</span>
                                            <span><strong>Expected Impact:</strong> ${task.impact}</span>
                                            <span><strong>Timeline:</strong> ${task.timeline}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Medium Term -->
                        <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                            <h4 class="flex items-center gap-2 text-lg font-semibold text-yellow-800 mb-4">
                                ⚡ Medium Term (3-6 weeks)
                            </h4>
                            <div class="space-y-3">
                                ${auditResults.suggestions.mediumTerm.map(task => `
                                    <div class="bg-white p-4 rounded-lg border border-yellow-200">
                                        <div class="font-semibold text-gray-800 mb-2">${task.task}</div>
                                        <div class="flex flex-wrap gap-4 text-sm text-gray-600">
                                            <span><strong>Owner:</strong> ${task.owner}</span>
                                            <span><strong>Effort:</strong> ${task.effort}</span>
                                            <span><strong>Expected Impact:</strong> ${task.impact}</span>
                                            <span><strong>Timeline:</strong> ${task.timeline}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Strategic -->
                        <div class="bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <h4 class="flex items-center gap-2 text-lg font-semibold text-blue-800 mb-4">
                                🎯 Strategic Initiatives (7-12 weeks)
                            </h4>
                            <div class="space-y-3">
                                ${auditResults.suggestions.strategic.map(task => `
                                    <div class="bg-white p-4 rounded-lg border border-blue-200">
                                        <div class="font-semibold text-gray-800 mb-2">${task.task}</div>
                                        <div class="flex flex-wrap gap-4 text-sm text-gray-600">
                                            <span><strong>Owner:</strong> ${task.owner}</span>
                                            <span><strong>Effort:</strong> ${task.effort}</span>
                                            <span><strong>Expected Impact:</strong> ${task.impact}</span>
                                            <span><strong>Timeline:</strong> ${task.timeline}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 no-print">
        <div class="max-w-6xl mx-auto px-6 text-center">
            <p class="text-gray-400">
                © 2025 Website Audits Portfolio | Generated on ${new Date().toLocaleDateString()} | 
                <a href="../../../crm-dashboard.html" class="text-blue-400 hover:text-blue-300">Return to CRM</a>
            </p>
        </div>
    </footer>

    <script>
        // Report interaction functions
        function exportPDF() {
            window.print();
        }
        
        function copyShareableLink() {
            navigator.clipboard.writeText(window.location.href).then(() => {
                showNotification('Shareable link copied to clipboard! 🔗', 'success');
            }).catch(() => {
                showNotification('Failed to copy link. Please copy manually from address bar.', 'error');
            });
        }
        
        function downloadAllData() {
            const auditData = ${JSON.stringify(auditResults, null, 2)};
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditData, null, 2));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "${customer.customerName.replace(/\s+/g, '_')}_SEO_Audit_Complete_${auditResults.analysisDate}.json");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
            showNotification('Complete audit data downloaded! 📊', 'success');
        }
        
        function exportMetadataCSV() {
            const pages = ${JSON.stringify(auditResults.pagesData)};
            const csvContent = "URL,Title Length,Description Length,Title Issue,Description Issue,Current Title,Suggested Title\\n" +
                pages.map(page => 
                    \`"\${page.url}",\${page.title_length},\${page.meta_description_length},"\${page.title_length < 30 || page.title_length > 60 ? 'Issue' : 'Good'}","\${page.meta_description_length < 70 || page.meta_description_length > 160 ? 'Issue' : 'Good'}","\${page.title}","\${page.url === '/premium-community' ? 'AI SEO Mastery & Automations | AI Ranking Premium' : 'No changes needed'}"\`
                ).join('\\n');
            
            const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "${customer.customerName.replace(/\s+/g, '_')}_Metadata_Analysis_${auditResults.analysisDate}.csv");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
            showNotification('Metadata analysis exported! 📊', 'success');
        }
        
        function exportIssuesCSV() {
            const issues = ${JSON.stringify(auditResults.technicalIssues)};
            const csvContent = "Page URL,Issue Type,Priority,Category,Description\\n" +
                issues.map(issue => 
                    \`"\${issue.page_url}","\${issue.issue_type}","\${issue.priority}","\${issue.category}","Technical issue requiring attention"\`
                ).join('\\n');
            
            const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "${customer.customerName.replace(/\s+/g, '_')}_Technical_Issues_${auditResults.analysisDate}.csv");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
            showNotification('Technical issues exported! 📊', 'success');
        }
        
        function copyMetadataTable() {
            const table = document.querySelector('#metadataTable table');
            const range = document.createRange();
            range.selectNode(table);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
            showNotification('Metadata table copied to clipboard! 📋', 'success');
        }
        
        function copyIssuesTable() {
            const table = document.querySelector('#issuesTable table');
            const range = document.createRange();
            range.selectNode(table);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
            showNotification('Issues table copied to clipboard! 📋', 'success');
        }
        
        function toggleMetadataTable() {
            const table = document.getElementById('metadataTable');
            const button = event.target;
            if (table.style.display === 'none') {
                table.style.display = 'block';
                button.innerHTML = '👁️ Hide';
            } else {
                table.style.display = 'none';
                button.innerHTML = '👁️ Show';
            }
        }
        
        function toggleIssuesTable() {
            const table = document.getElementById('issuesTable');
            const button = event.target;
            if (table.style.display === 'none') {
                table.style.display = 'block';
                button.innerHTML = '👁️ Hide';
            } else {
                table.style.display = 'none';
                button.innerHTML = '👁️ Show';
            }
        }
        
        function showNotification(message, type) {
            const colors = {
                success: 'bg-green-600',
                error: 'bg-red-600',
                info: 'bg-blue-600'
            };
            
            const notification = document.createElement('div');
            notification.className = \`fixed top-4 right-4 px-6 py-3 rounded-lg font-semibold z-50 transition-all transform translate-x-full \${colors[type]} text-white max-w-md\`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.remove('translate-x-full');
            }, 100);
            
            setTimeout(() => {
                notification.classList.add('translate-x-full');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }, 4000);
        }
        
        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            console.log('SEO Audit Report loaded for ${customer.customerName}');
        });
    </script>
</body>
</html>`;
    }

    /**
     * Generate CSV for metadata issues
     */
    generateMetadataCSV(auditResults) {
        const header = 'URL,Title Length,Description Length,Title Issue,Description Issue,Current Title,Suggested Title\n';
        const rows = auditResults.pagesData.map(page => {
            const titleIssue = page.title_length < 30 || page.title_length > 60 ? 'Issue' : 'Good';
            const descIssue = page.meta_description_length < 70 || page.meta_description_length > 160 ? 'Issue' : 'Good';
            const suggestedTitle = page.url === '/premium-community' ? 'AI SEO Mastery & Automations | AI Ranking Premium' : 'No changes needed';
            
            return `"${page.url}",${page.title_length},${page.meta_description_length},"${titleIssue}","${descIssue}","${page.title}","${suggestedTitle}"`;
        });
        
        return header + rows.join('\n');
    }

    /**
     * Generate CSV for technical issues
     */
    generateTechnicalIssuesCSV(auditResults) {
        const header = 'Page URL,Issue Type,Priority,Category,Description\n';
        const rows = auditResults.technicalIssues.map(issue => {
            return `"${issue.page_url}","${issue.issue_type}","${issue.priority}","${issue.category}","Technical issue requiring attention"`;
        });
        
        return header + rows.join('\n');
    }

    /**
     * Update customer dashboard with audit results
     */
    async updateCustomerDashboard(customer, auditResults) {
        // Generate updated customer dashboard HTML
        const dashboardHtml = this.generateCustomerDashboard(customer, auditResults);
        
        // Store updated dashboard
        const dashboardData = {
            customerId: customer.id,
            dashboardHtml: dashboardHtml,
            lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem(`customer_dashboard_${customer.id}`, JSON.stringify(dashboardData));
        
        console.log(`Updated customer dashboard for ${customer.customerName}`);
    }

    /**
     * Generate customer dashboard HTML
     */
    generateCustomerDashboard(customer, auditResults = null) {
        const seoProgress = auditResults ? 100 : 0;
        const seoScore = auditResults ? auditResults.overallScore : 0;
        
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${customer.customerName} - Audit Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .hero-gradient { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .card-shadow { box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm py-3">
        <div class="max-w-6xl mx-auto px-6">
            <div class="flex items-center gap-3 text-sm text-gray-600">
                <a href="../../" class="hover:text-blue-600">Portfolio</a>
                <span>→</span>
                <a href="../../crm-dashboard.html" class="hover:text-blue-600">CRM</a>
                <span>→</span>
                <span class="text-gray-800 font-semibold">${customer.customerName}</span>
            </div>
        </div>
    </nav>

    <!-- Customer Header -->
    <div class="hero-gradient text-white py-12">
        <div class="max-w-6xl mx-auto px-6">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <span class="text-2xl font-bold">${customer.customerName.substring(0, 2).toUpperCase()}</span>
                    </div>
                    <div>
                        <h1 class="text-3xl font-bold">${customer.customerName}</h1>
                        <p class="text-white/80">${customer.primaryDomain.replace(/https?:\/\/(www\.)?/, '')}</p>
                        <div class="flex items-center gap-3 mt-2">
                            <span class="px-3 py-1 bg-white/20 rounded-full text-sm">${customer.industry || 'Business'}</span>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-sm">${customer.location || 'Global'}</span>
                        </div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-3xl font-bold">${seoScore}</div>
                    <div class="text-white/80 text-sm">SEO Score</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Audit Progress Cards -->
    <section class="py-12">
        <div class="max-w-6xl mx-auto px-6">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <!-- SEO Audit Card -->
                <div class="bg-white rounded-2xl card-shadow p-8 text-center">
                    <div class="w-16 h-16 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">
                        📈
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 mb-3">SEO Audit</h3>
                    <p class="text-gray-600 text-sm mb-6">Comprehensive technical SEO analysis with actionable recommendations</p>
                    
                    <div class="mb-6">
                        <div class="flex justify-between text-sm mb-2">
                            <span class="text-gray-600">Progress</span>
                            <span class="font-semibold ${seoProgress === 100 ? 'text-green-600' : 'text-yellow-600'}">${seoProgress}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-green-500 h-2 rounded-full" style="width: ${seoProgress}%"></div>
                        </div>
                    </div>
                    
                    <div class="space-y-2 mb-6">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">SEO Score:</span>
                            <span class="font-bold text-green-600">${seoScore}/100</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Pages Analyzed:</span>
                            <span class="font-semibold">${auditResults ? auditResults.totalPages : 0}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Issues Found:</span>
                            <span class="font-semibold text-red-600">${auditResults ? auditResults.totalIssues : 0}</span>
                        </div>
                    </div>
                    
                    ${seoProgress === 100 ? `
                        <a href="seo-audit/" class="block w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                            📊 View Full Report
                        </a>
                    ` : `
                        <button class="w-full bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold cursor-not-allowed">
                            ⏳ Audit In Progress
                        </button>
                    `}
                </div>

                <!-- Competitor Analysis Card -->
                <div class="bg-white rounded-2xl card-shadow p-8 text-center">
                    <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">
                        🎯
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 mb-3">Competitor Analysis</h3>
                    <p class="text-gray-600 text-sm mb-6">In-depth analysis of competitor strategies and market positioning</p>
                    
                    <div class="mb-6">
                        <div class="flex justify-between text-sm mb-2">
                            <span class="text-gray-600">Progress</span>
                            <span class="font-semibold text-yellow-600">Scheduled</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-yellow-500 h-2 rounded-full" style="width: 0%"></div>
                        </div>
                    </div>
                    
                    <div class="space-y-2 mb-6">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Competitors:</span>
                            <span class="font-semibold">${customer.competitors ? customer.competitors.length : 0}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Analysis Type:</span>
                            <span class="font-semibold">Comprehensive</span>
                        </div>
                    </div>
                    
                    <button class="w-full bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold cursor-not-allowed">
                        📊 Coming Soon
                    </button>
                </div>

                <!-- Keyword Analysis Card -->
                <div class="bg-white rounded-2xl card-shadow p-8 text-center">
                    <div class="w-16 h-16 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">
                        🔍
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 mb-3">Keyword Strategy</h3>
                    <p class="text-gray-600 text-sm mb-6">Strategic keyword research and content optimization planning</p>
                    
                    <div class="mb-6">
                        <div class="flex justify-between text-sm mb-2">
                            <span class="text-gray-600">Progress</span>
                            <span class="font-semibold text-yellow-600">Scheduled</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-purple-500 h-2 rounded-full" style="width: 0%"></div>
                        </div>
                    </div>
                    
                    <div class="space-y-2 mb-6">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Target Keywords:</span>
                            <span class="font-semibold">${customer.targetKeywords ? customer.targetKeywords.length : 0}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Geographic Focus:</span>
                            <span class="font-semibold">${customer.geoTarget || 'Global'}</span>
                        </div>
                    </div>
                    
                    <button class="w-full bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold cursor-not-allowed">
                        🔍 Coming Soon
                    </button>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`;
    }

    /**
     * Generate placeholder page for future audit types
     */
    generatePlaceholderPage(auditType, customer) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${customer.customerName} - ${auditType}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 flex items-center justify-center min-h-screen">
    <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">${auditType}</h1>
        <p class="text-gray-600 mb-8">Coming soon for ${customer.customerName}</p>
        <a href="../" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Return to Dashboard
        </a>
    </div>
</body>
</html>`;
    }

    /**
     * Update CRM with audit progress
     */
    updateCRMProgress(customerId, auditResults) {
        const crmData = localStorage.getItem('crm_customers');
        if (!crmData) return;

        const customers = JSON.parse(crmData);
        const customer = customers.find(c => c.id === customerId);
        
        if (customer) {
            customer.progress.seoAudit = 100;
            customer.seoScore = auditResults.overallScore;
            customer.lastUpdate = new Date().toISOString().split('T')[0];
            customer.status = 'active'; // Still have other audits pending
            
            // Add to audit history
            customer.auditHistory.push({
                type: 'SEO Audit',
                date: auditResults.analysisDate,
                score: auditResults.overallScore,
                status: 'completed',
                reportUrl: `customers/${customerId}/seo-audit/`
            });
            
            // Update notes
            customer.notes = (customer.notes || '') + `\n\nSEO Audit Completed: ${auditResults.analysisDate}\nScore: ${auditResults.overallScore}/100\nIssues Found: ${auditResults.totalIssues}`;
            
            localStorage.setItem('crm_customers', JSON.stringify(customers));
        }
    }
}

// Initialize the Customer Audit Creator
window.customerAuditCreator = new CustomerAuditCreator();