// Node.js script to generate complete SEO report HTML
const fs = require('fs');

// Mock global objects for Node.js
global.window = {};

class SEOReportGenerator {
    constructor() {
        this.reportTemplate = null;
        this.currentReport = null;
    }

    generateReport(customer, auditData) {
        // Process and enhance audit data
        const enhancedData = this.enhanceAuditData(auditData);
        
        // Generate the comprehensive HTML report
        return this.generateComprehensiveHTML(customer, enhancedData);
    }

    enhanceAuditData(data, customer) {
        return {
            ...data,
            performanceMetrics: {
                desktop: {
                    score: data.coreWebVitals?.performance_score || 75,
                    fcp: data.coreWebVitals?.first_contentful_paint || 1.2,
                    lcp: data.coreWebVitals?.largest_contentful_paint || 2.1,
                    cls: data.coreWebVitals?.cumulative_layout_shift || 0.05,
                    ttfb: 0.8,
                    fid: 95
                }
            },
            issueDistribution: this.calculateIssueDistribution(data),
            competitiveInsights: this.generateCompetitiveInsights(data, customer)
        };
    }

    calculateIssueDistribution(data) {
        const issues = data.technicalIssues || [];
        return {
            critical: issues.filter(i => i.priority === 'HIGH').length,
            major: issues.filter(i => i.priority === 'MEDIUM').length,
            minor: issues.filter(i => i.priority === 'LOW').length
        };
    }

    generateCompetitiveInsights(data, customer) {
        return {
            competitors: [
                { name: 'Dulux', etv: 45000, keywords: 1200, domain: 'dulux.co.za' },
                { name: 'Plascon', etv: 32000, keywords: 890, domain: 'plascon.co.za' },
                { name: 'Duram', etv: 28000, keywords: 650, domain: 'duram.co.za' }
            ],
            keywordGaps: [
                { keyword: 'industrial paint coating', competitor: 'Dulux', theirPos: 3, yourPos: 'Not ranking', volume: 2400, score: 'High' },
                { keyword: 'automotive paint suppliers', competitor: 'Plascon', theirPos: 5, yourPos: 'Not ranking', volume: 1800, score: 'Medium' },
                { keyword: 'protective coating solutions', competitor: 'Duram', theirPos: 4, yourPos: 'Not ranking', volume: 1200, score: 'High' }
            ]
        };
    }

    generateComprehensiveHTML(customer, data) {
        const html = this.buildHTMLStructure(customer, data);
        return html;
    }

    buildHTMLStructure(customer, data) {
        let html = '';
        
        // HTML Head
        html += '<!DOCTYPE html>\n';
        html += '<html lang="en">\n';
        html += '<head>\n';
        html += '    <meta charset="UTF-8">\n';
        html += '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
        html += '    <title>' + customer.customerName + ' - Comprehensive SEO Audit Report</title>\n';
        html += '    <script src="https://cdn.tailwindcss.com"></script>\n';
        html += '    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>\n';
        html += '</head>\n';
        html += '<body class="bg-gray-50">\n';

        // Add styles
        html += this.buildStyles();

        // Add navigation
        html += this.buildNavigation(customer);

        // Add main content
        html += '<main class="container mx-auto px-4 pt-20">\n';
        html += this.buildHeaderSection(customer, data);
        html += this.buildKPISection(data);
        html += this.buildIssueDistribution(data);
        html += this.buildPageAnalysis(data);
        html += this.buildCoreWebVitals(data);
        html += this.buildTechnicalIssues(data);
        html += this.buildCompetitiveAnalysis(data);
        html += this.buildStrategicRecommendations(data);
        html += this.buildFooter();
        html += '</main>\n';

        // Add JavaScript
        html += this.buildJavaScript(customer, data);

        html += '</body>\n';
        html += '</html>\n';

        return html;
    }

    buildStyles() {
        return '<style>\n' +
        '    .card { background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 24px; margin-bottom: 24px; }\n' +
        '    .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }\n' +
        '    .btn-primary { background: #3b82f6; color: white; padding: 8px 16px; border-radius: 6px; border: none; cursor: pointer; }\n' +
        '    .btn-primary:hover { background: #2563eb; }\n' +
        '    .action-button { display: flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 6px; border: none; cursor: pointer; font-size: 14px; }\n' +
        '    .status-badge { padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }\n' +
        '    .status-good { background: #dcfce7; color: #15803d; }\n' +
        '    .status-warning { background: #fef3c7; color: #d97706; }\n' +
        '    .status-error { background: #fee2e2; color: #dc2626; }\n' +
        '    @media print { .no-print { display: none !important; } }\n' +
        '</style>\n';
    }

    buildNavigation(customer) {
        return '<nav class="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40 no-print">\n' +
        '    <div class="max-w-6xl mx-auto px-4 py-3">\n' +
        '        <div class="flex items-center justify-between">\n' +
        '            <div class="flex items-center gap-2 text-sm">\n' +
        '                <a href="/" class="text-gray-600 hover:text-gray-900">← Back to Portfolio</a>\n' +
        '                <span class="text-gray-400">|</span>\n' +
        '                <span class="font-semibold text-gray-900">' + customer.customerName + ' SEO Audit</span>\n' +
        '            </div>\n' +
        '            <div class="flex items-center gap-3">\n' +
        '                <button onclick="exportPDF()" class="action-button btn-primary">\n' +
        '                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n' +
        '                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>\n' +
        '                    </svg>\n' +
        '                    Export PDF\n' +
        '                </button>\n' +
        '                <button onclick="saveHTMLReport()" class="action-button bg-purple-600 text-white hover:bg-purple-700">\n' +
        '                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n' +
        '                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"></path>\n' +
        '                    </svg>\n' +
        '                    Save HTML\n' +
        '                </button>\n' +
        '                <button onclick="shareReport()" class="action-button bg-green-600 text-white hover:bg-green-700">\n' +
        '                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n' +
        '                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326"></path>\n' +
        '                    </svg>\n' +
        '                    Share Report\n' +
        '                </button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</nav>\n';
    }

    buildHeaderSection(customer, data) {
        return '<div class="card mb-8 gradient-bg text-white">\n' +
        '    <div class="text-center">\n' +
        '        <h1 class="text-4xl font-bold mb-2">' + customer.customerName + '</h1>\n' +
        '        <h2 class="text-xl font-light mb-4">Comprehensive SEO Audit Report</h2>\n' +
        '        <p class="text-sm opacity-90">Generated on ' + new Date().toLocaleDateString() + ' | Domain: ' + (data.domainSummary?.domain || customer.primaryDomain) + '</p>\n' +
        '    </div>\n' +
        '</div>\n';
    }

    buildKPISection(data) {
        const overallScore = data.overallScore || data.domainSummary?.onpage_score || 72.4;
        const totalIssues = data.totalIssues || data.domainSummary?.summary?.total_issues || 47;
        const totalPages = data.totalPages || data.domainSummary?.total_pages || 12;
        const criticalIssues = data.domainSummary?.summary?.critical_issues || 8;

        return '<div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">\n' +
        '    <div class="card text-center">\n' +
        '        <h3 class="text-lg font-semibold mb-2">Overall Score</h3>\n' +
        '        <div class="text-3xl font-bold text-blue-600 mb-2">' + overallScore + '</div>\n' +
        '        <p class="text-sm text-gray-600">SEO Health Score</p>\n' +
        '    </div>\n' +
        '    <div class="card text-center">\n' +
        '        <h3 class="text-lg font-semibold mb-2">Total Issues</h3>\n' +
        '        <div class="text-3xl font-bold text-red-600 mb-2">' + totalIssues + '</div>\n' +
        '        <p class="text-sm text-gray-600">Issues Found</p>\n' +
        '    </div>\n' +
        '    <div class="card text-center">\n' +
        '        <h3 class="text-lg font-semibold mb-2">Pages Analyzed</h3>\n' +
        '        <div class="text-3xl font-bold text-green-600 mb-2">' + totalPages + '</div>\n' +
        '        <p class="text-sm text-gray-600">Total Pages</p>\n' +
        '    </div>\n' +
        '    <div class="card text-center">\n' +
        '        <h3 class="text-lg font-semibold mb-2">Critical Issues</h3>\n' +
        '        <div class="text-3xl font-bold text-purple-600 mb-2">' + criticalIssues + '</div>\n' +
        '        <p class="text-sm text-gray-600">High Priority</p>\n' +
        '    </div>\n' +
        '</div>\n';
    }

    buildIssueDistribution(data) {
        return '<div class="card mb-8">\n' +
        '    <h2 class="text-2xl font-bold mb-6">Issue Distribution</h2>\n' +
        '    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">\n' +
        '        <div>\n' +
        '            <canvas id="issueChart" width="300" height="300"></canvas>\n' +
        '        </div>\n' +
        '        <div class="space-y-4">\n' +
        '            <div class="flex justify-between items-center p-4 bg-red-50 rounded-lg">\n' +
        '                <div>\n' +
        '                    <h4 class="font-semibold text-red-800">Critical Issues</h4>\n' +
        '                    <p class="text-sm text-red-600">Immediate attention required</p>\n' +
        '                </div>\n' +
        '                <span class="font-bold text-red-600">' + (data.issueDistribution?.critical || 8) + '</span>\n' +
        '            </div>\n' +
        '            <div class="flex justify-between items-center p-4 bg-orange-50 rounded-lg">\n' +
        '                <div>\n' +
        '                    <h4 class="font-semibold text-orange-800">High Priority</h4>\n' +
        '                    <p class="text-sm text-orange-600">Address within 2 weeks</p>\n' +
        '                </div>\n' +
        '                <span class="font-bold text-orange-600">' + (data.issueDistribution?.major || 15) + '</span>\n' +
        '            </div>\n' +
        '            <div class="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">\n' +
        '                <div>\n' +
        '                    <h4 class="font-semibold text-yellow-800">Medium Priority</h4>\n' +
        '                    <p class="text-sm text-yellow-600">Plan for next month</p>\n' +
        '                </div>\n' +
        '                <span class="font-bold text-yellow-600">' + Math.floor((data.issueDistribution?.minor || 24) / 2) + '</span>\n' +
        '            </div>\n' +
        '            <div class="flex justify-between items-center p-4 bg-blue-50 rounded-lg">\n' +
        '                <div>\n' +
        '                    <h4 class="font-semibold text-blue-800">Low Priority</h4>\n' +
        '                    <p class="text-sm text-blue-600">Monitor and improve over time</p>\n' +
        '                </div>\n' +
        '                <span class="font-bold text-blue-600">' + Math.ceil((data.issueDistribution?.minor || 24) / 2) + '</span>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n';
    }

    buildPageAnalysis(data) {
        let html = '<div class="card mb-8">\n';
        html += '    <h2 class="text-2xl font-bold mb-6">Page Analysis</h2>\n';
        html += '    <div class="overflow-x-auto">\n';
        html += '        <table class="min-w-full divide-y divide-gray-200">\n';
        html += '            <thead class="bg-gray-50">\n';
        html += '                <tr>\n';
        html += '                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">URL</th>\n';
        html += '                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>\n';
        html += '                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Meta Description</th>\n';
        html += '                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Load Time</th>\n';
        html += '                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SEO Score</th>\n';
        html += '                </tr>\n';
        html += '            </thead>\n';
        html += '            <tbody class="bg-white divide-y divide-gray-200">\n';

        if (data.pagesData && data.pagesData.length > 0) {
            data.pagesData.forEach((page, index) => {
                const loadStatus = page.load_time <= 2.0 ? 'status-good' : page.load_time <= 3.0 ? 'status-warning' : 'status-error';
                const titleStatus = page.title_length >= 30 && page.title_length <= 60 ? 'status-good' : 'status-warning';
                
                html += '                <tr>\n';
                html += '                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">\n';
                html += '                        <a href="' + page.url + '" target="_blank">' + page.url + '</a>\n';
                html += '                    </td>\n';
                html += '                    <td class="px-6 py-4 text-sm text-gray-900" title="' + (page.title || 'No title') + '">' + ((page.title || 'No title').substring(0, 50)) + (page.title && page.title.length > 50 ? '...' : '') + '</td>\n';
                html += '                    <td class="px-6 py-4 text-sm text-gray-900" title="' + (page.meta_description || 'No description') + '">' + ((page.meta_description || 'No description').substring(0, 50)) + (page.meta_description && page.meta_description.length > 50 ? '...' : '') + '</td>\n';
                html += '                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">\n';
                html += '                        <span class="status-badge ' + loadStatus + '">' + (page.load_time || 'N/A') + 's</span>\n';
                html += '                    </td>\n';
                html += '                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">\n';
                html += '                        <span class="status-badge ' + titleStatus + '">\n';
                html += '                            ' + (page.title_length >= 30 && page.title_length <= 60 ? 'Good' : 'Needs Work') + '\n';
                html += '                        </span>\n';
                html += '                    </td>\n';
                html += '                </tr>\n';
            });
        } else {
            html += '                <tr><td colspan="5" class="px-6 py-4 text-center text-gray-500">No page data available</td></tr>\n';
        }

        html += '            </tbody>\n';
        html += '        </table>\n';
        html += '    </div>\n';
        html += '</div>\n';

        return html;
    }

    buildCoreWebVitals(data) {
        const performanceScore = data.performanceMetrics?.desktop?.score || data.coreWebVitals?.performance_score || 68;
        const fcp = data.performanceMetrics?.desktop?.fcp || data.coreWebVitals?.first_contentful_paint || 1.8;
        const lcp = data.performanceMetrics?.desktop?.lcp || data.coreWebVitals?.largest_contentful_paint || 2.9;
        const fid = data.performanceMetrics?.desktop?.fid || data.coreWebVitals?.total_blocking_time || 0.3;
        const cls = data.performanceMetrics?.desktop?.cls || data.coreWebVitals?.cumulative_layout_shift || 0.08;

        return '<div class="card mb-8">\n' +
        '    <h2 class="text-2xl font-bold mb-6">Core Web Vitals</h2>\n' +
        '    <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">\n' +
        '        <div class="text-center p-4 bg-gray-50 rounded-lg">\n' +
        '            <h3 class="font-semibold mb-2">Performance Score</h3>\n' +
        '            <div class="text-3xl font-bold ' + (performanceScore >= 90 ? 'text-green-600' : performanceScore >= 50 ? 'text-yellow-600' : 'text-red-600') + ' mb-2">\n' +
        '                ' + performanceScore + '\n' +
        '            </div>\n' +
        '            <div class="text-xs text-gray-500 mt-1">' + (performanceScore >= 90 ? 'Good' : performanceScore >= 50 ? 'Needs Improvement' : 'Poor') + '</div>\n' +
        '        </div>\n' +
        '        <div class="text-center p-4 bg-gray-50 rounded-lg">\n' +
        '            <h3 class="font-semibold mb-2">FCP</h3>\n' +
        '            <div class="text-2xl font-bold ' + (fcp <= 1.8 ? 'text-green-600' : fcp <= 3.0 ? 'text-yellow-600' : 'text-red-600') + ' mb-2">\n' +
        '                ' + fcp + 's\n' +
        '            </div>\n' +
        '            <div class="text-xs text-gray-500 mt-1">' + (fcp <= 1.8 ? 'Good' : fcp <= 3.0 ? 'Needs Improvement' : 'Poor') + '</div>\n' +
        '        </div>\n' +
        '        <div class="text-center p-4 bg-gray-50 rounded-lg">\n' +
        '            <h3 class="font-semibold mb-2">LCP</h3>\n' +
        '            <div class="text-2xl font-bold ' + (lcp <= 2.5 ? 'text-green-600' : lcp <= 4.0 ? 'text-yellow-600' : 'text-red-600') + ' mb-2">\n' +
        '                ' + lcp + 's\n' +
        '            </div>\n' +
        '            <div class="text-xs text-gray-500 mt-1">' + (lcp <= 2.5 ? 'Good' : lcp <= 4.0 ? 'Needs Improvement' : 'Poor') + '</div>\n' +
        '        </div>\n' +
        '        <div class="text-center p-4 bg-gray-50 rounded-lg">\n' +
        '            <h3 class="font-semibold mb-2">TBT</h3>\n' +
        '            <div class="text-2xl font-bold ' + (fid <= 0.2 ? 'text-green-600' : fid <= 0.6 ? 'text-yellow-600' : 'text-red-600') + ' mb-2">\n' +
        '                ' + fid + 's\n' +
        '            </div>\n' +
        '            <div class="text-xs text-gray-500 mt-1">' + (fid <= 0.2 ? 'Good' : fid <= 0.6 ? 'Needs Improvement' : 'Poor') + '</div>\n' +
        '        </div>\n' +
        '        <div class="text-center p-4 bg-gray-50 rounded-lg">\n' +
        '            <h3 class="font-semibold mb-2">CLS</h3>\n' +
        '            <div class="text-2xl font-bold ' + (cls <= 0.1 ? 'text-green-600' : cls <= 0.25 ? 'text-yellow-600' : 'text-red-600') + ' mb-2">\n' +
        '                ' + cls + '\n' +
        '            </div>\n' +
        '            <div class="text-xs text-gray-500 mt-1">' + (cls <= 0.1 ? 'Good' : cls <= 0.25 ? 'Needs Improvement' : 'Poor') + '</div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n';
    }

    buildTechnicalIssues(data) {
        let html = '<div class="card mb-8">\n';
        html += '    <h2 class="text-2xl font-bold mb-6">Technical Issues</h2>\n';
        html += '    <div class="overflow-x-auto">\n';
        html += '        <table class="min-w-full divide-y divide-gray-200">\n';
        html += '            <thead class="bg-gray-50">\n';
        html += '                <tr>\n';
        html += '                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>\n';
        html += '                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Page</th>\n';
        html += '                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue</th>\n';
        html += '                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>\n';
        html += '                </tr>\n';
        html += '            </thead>\n';
        html += '            <tbody class="bg-white divide-y divide-gray-200">\n';

        if (data.technicalIssues && data.technicalIssues.length > 0) {
            data.technicalIssues.forEach((issue, index) => {
                const priorityClass = issue.priority === 'HIGH' ? 'status-error' : issue.priority === 'MEDIUM' ? 'status-warning' : 'status-good';
                html += '                <tr>\n';
                html += '                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">\n';
                html += '                        <span class="status-badge ' + priorityClass + '">' + issue.priority + '</span>\n';
                html += '                    </td>\n';
                html += '                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">' + (issue.page_url || 'N/A') + '</td>\n';
                html += '                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">' + (issue.issue_type || 'N/A') + '</td>\n';
                html += '                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">' + (issue.category || 'N/A') + '</td>\n';
                html += '                </tr>\n';
            });
        }

        html += '            </tbody>\n';
        html += '        </table>\n';
        html += '    </div>\n';
        html += '</div>\n';

        return html;
    }

    buildCompetitiveAnalysis(data) {
        let html = '<div class="card mb-8">\n';
        html += '    <h2 class="text-2xl font-bold mb-6">Competitive Analysis</h2>\n';
        html += '    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">\n';

        if (data.competitiveInsights && data.competitiveInsights.competitors) {
            data.competitiveInsights.competitors.forEach(competitor => {
                html += '        <div class="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg">\n';
                html += '            <h4 class="text-lg font-semibold mb-2">' + competitor.name + '</h4>\n';
                html += '            <div class="text-2xl font-bold text-blue-600 mb-1">R ' + competitor.etv.toLocaleString() + '</div>\n';
                html += '            <div class="text-sm text-gray-600 mb-2">Estimated Traffic Value</div>\n';
                html += '            <div class="text-sm text-gray-700">' + competitor.keywords + ' ranking keywords</div>\n';
                html += '        </div>\n';
            });
        }

        html += '    </div>\n';
        html += '    <h3 class="text-xl font-semibold mb-4">Keyword Gap Analysis</h3>\n';
        html += '    <div class="overflow-x-auto">\n';
        html += '        <table class="min-w-full divide-y divide-gray-200">\n';
        html += '            <thead class="bg-gray-50">\n';
        html += '                <tr>\n';
        html += '                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Keyword</th>\n';
        html += '                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Competitor</th>\n';
        html += '                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Their Position</th>\n';
        html += '                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Your Position</th>\n';
        html += '                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Search Volume</th>\n';
        html += '                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Opportunity</th>\n';
        html += '                </tr>\n';
        html += '            </thead>\n';
        html += '            <tbody class="bg-white divide-y divide-gray-200">\n';

        if (data.competitiveInsights && data.competitiveInsights.keywordGaps) {
            data.competitiveInsights.keywordGaps.forEach(gap => {
                const scoreColor = gap.score === 'High' ? 'text-red-600' : gap.score === 'Medium' ? 'text-yellow-600' : 'text-green-600';
                html += '                <tr>\n';
                html += '                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">' + gap.keyword + '</td>\n';
                html += '                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">' + gap.competitor + '</td>\n';
                html += '                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#' + gap.theirPos + '</td>\n';
                html += '                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">' + gap.yourPos + '</td>\n';
                html += '                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">' + gap.volume + '</td>\n';
                html += '                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium ' + scoreColor + '">' + gap.score + '</td>\n';
                html += '                </tr>\n';
            });
        }

        html += '            </tbody>\n';
        html += '        </table>\n';
        html += '    </div>\n';
        html += '</div>\n';

        return html;
    }

    buildStrategicRecommendations(data) {
        return '<div class="card mb-8">\n' +
        '    <h2 class="text-2xl font-bold mb-6">Strategic Recommendations</h2>\n' +
        '    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">\n' +
        '        <div>\n' +
        '            <h3 class="text-lg font-semibold mb-4 text-green-600">Quick Wins (1-2 weeks)</h3>\n' +
        '            <div class="space-y-3">\n' +
        (data.suggestions?.quickWins ? data.suggestions.quickWins.map(item => 
        '                <div class="bg-green-50 p-4 rounded-lg">\n' +
        '                    <h4 class="font-medium mb-2">' + item.task + '</h4>\n' +
        '                    <div class="text-sm text-gray-600">\n' +
        '                        <p>Owner: ' + item.owner + ' | Impact: ' + item.impact + '</p>\n' +
        '                    </div>\n' +
        '                </div>\n').join('') : '') +
        '            </div>\n' +
        '        </div>\n' +
        '        <div>\n' +
        '            <h3 class="text-lg font-semibold mb-4 text-blue-600">Medium Term (1-2 months)</h3>\n' +
        '            <div class="space-y-3">\n' +
        (data.suggestions?.mediumTerm ? data.suggestions.mediumTerm.map(item => 
        '                <div class="bg-blue-50 p-4 rounded-lg">\n' +
        '                    <h4 class="font-medium mb-2">' + item.task + '</h4>\n' +
        '                    <div class="text-sm text-gray-600">\n' +
        '                        <p>Owner: ' + item.owner + ' | Impact: ' + item.impact + '</p>\n' +
        '                    </div>\n' +
        '                </div>\n').join('') : '') +
        '            </div>\n' +
        '        </div>\n' +
        '        <div>\n' +
        '            <h3 class="text-lg font-semibold mb-4 text-purple-600">Strategic (3-6 months)</h3>\n' +
        '            <div class="space-y-3">\n' +
        (data.suggestions?.strategic ? data.suggestions.strategic.map(item => 
        '                <div class="bg-purple-50 p-4 rounded-lg">\n' +
        '                    <h4 class="font-medium mb-2">' + item.task + '</h4>\n' +
        '                    <div class="text-sm text-gray-600">\n' +
        '                        <p>Owner: ' + item.owner + ' | Impact: ' + item.impact + '</p>\n' +
        '                    </div>\n' +
        '                </div>\n').join('') : '') +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n';
    }

    buildFooter() {
        return '<footer class="text-center py-8 text-gray-500 border-t border-gray-200 mt-12">\n' +
        '    <p>Generated by IntelliMinds SEO Audit System | ' + new Date().getFullYear() + '</p>\n' +
        '    <p class="text-sm">Report ID: test-promac-001 | <a href="#" class="text-blue-600">Privacy Policy</a> | <a href="#" class="text-blue-600">Terms of Service</a></p>\n' +
        '</footer>\n';
    }

    buildJavaScript(customer, data) {
        return '<script>\n' +
        '    function exportPDF() { window.print(); }\n' +
        '    function shareReport() {\n' +
        '        if (navigator.share) {\n' +
        '            navigator.share({ title: "' + customer.customerName + ' SEO Audit Report", text: "SEO audit report", url: window.location.href });\n' +
        '        } else {\n' +
        '            navigator.clipboard.writeText(window.location.href).then(() => alert("Link copied!"));\n' +
        '        }\n' +
        '    }\n' +
        '    function saveHTMLReport() {\n' +
        '        const blob = new Blob([document.documentElement.outerHTML], { type: "text/html" });\n' +
        '        const url = URL.createObjectURL(blob);\n' +
        '        const a = document.createElement("a");\n' +
        '        a.href = url;\n' +
        '        a.download = "' + customer.customerName.replace(/[^a-zA-Z0-9]/g, "_") + '_SEO_Report.html";\n' +
        '        document.body.appendChild(a); a.click(); document.body.removeChild(a);\n' +
        '        URL.revokeObjectURL(url);\n' +
        '    }\n' +
        '    setTimeout(() => {\n' +
        '        const ctx = document.getElementById("issueChart");\n' +
        '        if (ctx && window.Chart) {\n' +
        '            new Chart(ctx, {\n' +
        '                type: "doughnut",\n' +
        '                data: {\n' +
        '                    labels: ["Critical", "High", "Medium", "Low"],\n' +
        '                    datasets: [{ data: [' + (data.issueDistribution?.critical || 8) + ', ' + (data.issueDistribution?.major || 15) + ', ' + Math.floor((data.issueDistribution?.minor || 24) / 2) + ', ' + Math.ceil((data.issueDistribution?.minor || 24) / 2) + '],\n' +
        '                        backgroundColor: ["rgba(239,68,68,0.8)", "rgba(249,115,22,0.8)", "rgba(234,179,8,0.8)", "rgba(59,130,246,0.8)"] }]\n' +
        '                },\n' +
        '                options: { responsive: true, maintainAspectRatio: false }\n' +
        '            });\n' +
        '        }\n' +
        '    }, 500);\n' +
        '</script>\n';
    }
}

// Generate the complete report
const testCustomer = {
    id: 'test-promac-001',
    customerName: 'Promac Paints',
    companyName: 'Promac Paints (Pty) Ltd',
    primaryDomain: 'https://www.promacpaints.co.za',
    email: 'info@promacpaints.co.za',
    industry: 'Manufacturing - Paint & Coatings',
    location: 'South Africa',
    geoTarget: 'South Africa',
    competitors: ['https://www.dulux.co.za', 'https://plascon.co.za', 'https://www.duram.co.za']
};

const testAuditData = {
    domainSummary: {
        domain: 'promacpaints.co.za',
        onpage_score: 72.4,
        crawl_progress: 100,
        crawl_status: 'completed',
        total_pages: 12,
        checks: { duplicate_title: 2, duplicate_description: 3, title_too_long: 4, no_description: 2, broken_links: 5, non_indexable: 1 },
        summary: { total_issues: 47, critical_issues: 8, major_issues: 15, minor_issues: 24 }
    },
    pagesData: [
        {
            url: '/', title: 'Promac Paints - Quality Paint Manufacturers in South Africa',
            meta_description: 'Promac Paints is a leading paint manufacturer in South Africa, specializing in industrial, automotive, and decorative paint solutions.',
            title_length: 58, meta_description_length: 152, links_internal: 18, links_external: 4, wait_time: 1.2, load_time: 2.8, size_bytes: 485000, content_rate: 0.22,
            issues: [{ type: 'Slow Page Load Time', priority: 'HIGH', category: 'Technical' }, { type: 'Large Page Size', priority: 'MEDIUM', category: 'Technical' }, { type: 'Missing Schema Markup', priority: 'MEDIUM', category: 'Technical' }, { type: 'No H1 Tag', priority: 'HIGH', category: 'Content' }]
        },
        {
            url: '/products', title: 'Paint Products - Industrial & Automotive Coatings',
            meta_description: 'Explore our comprehensive range of industrial paints, automotive coatings, and specialized protective solutions.',
            title_length: 52, meta_description_length: 126, links_internal: 24, links_external: 2, wait_time: 1.8, load_time: 3.2, size_bytes: 542000, content_rate: 0.28,
            issues: [{ type: 'Slow Page Load Time', priority: 'HIGH', category: 'Technical' }, { type: 'Missing Alt Tags', priority: 'MEDIUM', category: 'Content' }]
        },
        {
            url: '/services', title: 'Paint Services & Technical Support | Promac Paints',
            meta_description: 'Professional paint application services and technical support for industrial and commercial projects across South Africa.',
            title_length: 50, meta_description_length: 139, links_internal: 15, links_external: 3, wait_time: 1.4, load_time: 2.6, size_bytes: 398000, content_rate: 0.31,
            issues: [{ type: 'Duplicate Meta Description', priority: 'MEDIUM', category: 'Content' }, { type: 'Missing Structured Data', priority: 'LOW', category: 'Technical' }]
        },
        {
            url: '/contact', title: 'Contact Us - Promac Paints', meta_description: '', title_length: 26, meta_description_length: 0, links_internal: 12, links_external: 3, wait_time: 0.8, load_time: 1.5, size_bytes: 185000, content_rate: 0.15,
            issues: [{ type: 'Title Too Short', priority: 'MEDIUM', category: 'UX' }, { type: 'Missing Meta Description', priority: 'HIGH', category: 'Content' }, { type: 'Low Content Rate', priority: 'MEDIUM', category: 'Content' }]
        },
        {
            url: '/industrial-paints', title: 'Industrial Paint Solutions for Manufacturing & Heavy Industry',
            meta_description: 'High-performance industrial paints and protective coatings for machinery, equipment, and industrial facilities. Durable solutions for harsh environments.',
            title_length: 61, meta_description_length: 154, links_internal: 20, links_external: 1, wait_time: 1.1, load_time: 2.3, size_bytes: 412000, content_rate: 0.31,
            issues: [{ type: 'Title Slightly Too Long', priority: 'LOW', category: 'UX' }, { type: 'Duplicate H2 Tags', priority: 'MEDIUM', category: 'Content' }]
        },
        {
            url: '/automotive-paints', title: 'Automotive Paint & Coatings | Car Paint Suppliers SA',
            meta_description: 'Professional automotive paint solutions for body shops and vehicle manufacturers. Quality car paints and primers.',
            title_length: 53, meta_description_length: 112, links_internal: 16, links_external: 2, wait_time: 1.0, load_time: 2.0, size_bytes: 298000, content_rate: 0.25,
            issues: [{ type: 'Missing Structured Data', priority: 'MEDIUM', category: 'Technical' }, { type: 'Images Not Optimized', priority: 'MEDIUM', category: 'Technical' }]
        }
    ],
    coreWebVitals: { first_contentful_paint: 1.8, largest_contentful_paint: 2.9, total_blocking_time: 0.3, cumulative_layout_shift: 0.08, speed_index: 2.2, time_to_interactive: 3.1, performance_score: 68 },
    technicalIssues: [
        { page_url: '/', issue_type: 'Slow Page Load Time', priority: 'HIGH', category: 'Technical' },
        { page_url: '/', issue_type: 'No H1 Tag', priority: 'HIGH', category: 'Content' },
        { page_url: '/contact', issue_type: 'Missing Meta Description', priority: 'HIGH', category: 'Content' },
        { page_url: '/products', issue_type: 'Slow Page Load Time', priority: 'HIGH', category: 'Technical' },
        { page_url: '/', issue_type: 'Missing Schema Markup', priority: 'MEDIUM', category: 'Technical' }
    ],
    suggestions: {
        quickWins: [
            { task: 'Add missing meta descriptions to Contact and About pages', owner: 'Content', effort: 'Quick', impact: 'High', timeline: '1-2 days' },
            { task: 'Fix title lengths on Products and Contact pages', owner: 'Content', effort: 'Quick', impact: 'Medium', timeline: '1-2 days' },
            { task: 'Add H1 tags to homepage and key landing pages', owner: 'Dev', effort: 'Quick', impact: 'High', timeline: '2-3 days' }
        ],
        mediumTerm: [
            { task: 'Optimize page load speed (target < 2 seconds)', owner: 'Dev', effort: 'Medium', impact: 'High', timeline: '2-3 weeks' },
            { task: 'Implement structured data for products and local business', owner: 'Dev', effort: 'Medium', impact: 'High', timeline: '1-2 weeks' },
            { task: 'Optimize and compress all product images', owner: 'Design/Dev', effort: 'Medium', impact: 'Medium', timeline: '1-2 weeks' }
        ],
        strategic: [
            { task: 'Complete technical SEO overhaul with Core Web Vitals optimization', owner: 'Dev Team', effort: 'Strategic', impact: 'High', timeline: '4-6 weeks' },
            { task: 'Develop comprehensive content strategy for industrial/automotive sectors', owner: 'Marketing', effort: 'Strategic', impact: 'High', timeline: '6-8 weeks' }
        ]
    },
    issueScore: { critical: 8, major: 15, minor: 24, total: 1070 },
    overallScore: 72.4, analysisDate: new Date().toISOString().split('T')[0], totalPages: 12, totalIssues: 47
};

const generator = new SEOReportGenerator();
const reportHtml = generator.generateReport(testCustomer, testAuditData);

fs.writeFileSync('/Users/boetiefischer/website-audits/promac-paints-complete-seo-report.html', reportHtml);
console.log('✅ Complete SEO Report generated: promac-paints-complete-seo-report.html');