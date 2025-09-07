/**
 * Detailed Issues and Recommendations Report Generator
 * Creates comprehensive downloadable reports with all issues and step-by-step fix instructions
 */

class DetailedIssuesReportGenerator {
    constructor() {
        this.reportData = null;
    }

    /**
     * Generate comprehensive issues and recommendations report
     */
    generateDetailedReport(customer, auditData, seoAnalysisData = null) {
        console.log('📋 Generating detailed issues and recommendations report for:', customer.customerName);
        
        // Collect all issues from both Website Performance and SEO Analysis
        const allIssues = this.collectAllIssues(auditData, seoAnalysisData);
        const allRecommendations = this.collectAllRecommendations(auditData, seoAnalysisData);
        
        return this.generateDetailedHTML(customer, allIssues, allRecommendations);
    }
    
    /**
     * Collect all issues from both audit parts
     */
    collectAllIssues(auditData, seoAnalysisData) {
        let allIssues = [];
        
        // Website Performance Issues
        if (auditData.technicalIssues) {
            auditData.technicalIssues.forEach(issue => {
                allIssues.push({
                    id: `perf-${Math.random().toString(36).substr(2, 9)}`,
                    type: 'Website Performance',
                    page: issue.page_url || 'Multiple pages',
                    category: issue.category || 'Technical',
                    severity: this.mapPriority(issue.priority),
                    issue: issue.issue_type || issue.issue,
                    description: this.getIssueDescription(issue.issue_type),
                    impact: this.getIssueImpact(issue.issue_type),
                    howToFix: this.getDetailedFixInstructions(issue.issue_type, issue.page_url),
                    estimatedTime: this.getFixTimeEstimate(issue.issue_type),
                    difficulty: this.getFixDifficulty(issue.issue_type),
                    tools: this.getRequiredTools(issue.issue_type),
                    priority: issue.priority
                });
            });
        }
        
        // SEO Analysis Issues
        if (seoAnalysisData && typeof window.SEOAnalysisEngine !== 'undefined') {
            const seoEngine = new window.SEOAnalysisEngine();
            const seoIssues = seoEngine.generateSEOIssuesList(seoAnalysisData);
            
            seoIssues.forEach(issue => {
                allIssues.push({
                    id: `seo-${Math.random().toString(36).substr(2, 9)}`,
                    type: 'SEO Analysis',
                    page: issue.page || 'Site-wide',
                    category: issue.category,
                    severity: issue.severity,
                    issue: issue.issue,
                    description: this.getSEOIssueDescription(issue.issue),
                    impact: issue.impact,
                    howToFix: issue.recommendation,
                    estimatedTime: this.getSEOFixTimeEstimate(issue.severity),
                    difficulty: this.getSEOFixDifficulty(issue.category),
                    tools: this.getSEORequiredTools(issue.category),
                    priority: issue.severity
                });
            });
        }
        
        // Sort by severity (Critical > High > Medium > Low)
        const severityOrder = ['Critical', 'High', 'Medium', 'Low'];
        allIssues.sort((a, b) => severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity));
        
        return allIssues;
    }
    
    /**
     * Collect all recommendations from both audit parts
     */
    collectAllRecommendations(auditData, seoAnalysisData) {
        let allRecommendations = [];
        
        // Website Performance Recommendations
        if (auditData.recommendations) {
            auditData.recommendations.forEach(rec => {
                allRecommendations.push({
                    id: `perf-rec-${Math.random().toString(36).substr(2, 9)}`,
                    type: 'Website Performance',
                    priority: rec.priority,
                    category: rec.category,
                    title: rec.issue,
                    recommendation: rec.recommendation,
                    impact: rec.impact,
                    effort: rec.effort,
                    timeline: rec.timeline,
                    owner: rec.owner || 'Development Team',
                    expectedResult: rec.expectedResult || '+10-15% performance',
                    stepByStepGuide: this.getStepByStepGuide(rec.issue, rec.category),
                    successMetrics: this.getSuccessMetrics(rec.category)
                });
            });
        }
        
        // SEO Analysis Recommendations
        if (seoAnalysisData && typeof window.SEOAnalysisEngine !== 'undefined') {
            const seoEngine = new window.SEOAnalysisEngine();
            const seoRecommendations = seoEngine.generateSEORecommendations(seoAnalysisData);
            
            seoRecommendations.forEach(rec => {
                allRecommendations.push({
                    id: `seo-rec-${Math.random().toString(36).substr(2, 9)}`,
                    type: 'SEO Analysis',
                    priority: rec.priority,
                    category: rec.category,
                    title: rec.recommendation,
                    recommendation: rec.recommendation,
                    impact: rec.impact,
                    effort: rec.effort,
                    timeline: rec.timeline,
                    owner: rec.owner,
                    expectedResult: rec.expectedResult,
                    stepByStepGuide: this.getSEOStepByStepGuide(rec.category, rec.recommendation),
                    successMetrics: this.getSEOSuccessMetrics(rec.category)
                });
            });
        }
        
        // Sort by priority
        const priorityOrder = ['High', 'Critical', 'Medium', 'Low'];
        allRecommendations.sort((a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority));
        
        return allRecommendations;
    }
    
    /**
     * Generate detailed HTML report
     */
    generateDetailedHTML(customer, allIssues, allRecommendations) {
        const issuesCount = {
            critical: allIssues.filter(i => i.severity === 'Critical').length,
            high: allIssues.filter(i => i.severity === 'High').length,
            medium: allIssues.filter(i => i.severity === 'Medium').length,
            low: allIssues.filter(i => i.severity === 'Low').length
        };
        
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${customer.customerName} - Detailed Issues & Fix Guide</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔧</text></svg>">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        body { 
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: #f9fafb;
        }
        
        .hero-gradient { 
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        }
        
        @media print {
            .no-print { display: none !important; }
            .break-page { page-break-before: always; }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="hero-gradient text-white py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between mb-6 no-print">
                <div class="flex items-center gap-4">
                    <a href="javascript:history.back()" class="text-white hover:text-red-200">← Back to Main Report</a>
                    <span class="text-white/40">|</span>
                    <span class="font-semibold">${customer.customerName} Detailed Issues Report</span>
                </div>
                <div class="flex items-center gap-3">
                    <button onclick="exportToCSV()" class="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                        📊 Export CSV
                    </button>
                    <button onclick="window.print()" class="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors font-semibold">
                        🖨️ Print Report
                    </button>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                    <h1 class="text-4xl font-black mb-4">
                        🔧 Detailed Issues & Fix Guide
                    </h1>
                    <p class="text-xl text-white/90 mb-2">
                        Complete step-by-step instructions for ${customer.customerName}
                    </p>
                    <p class="text-white/80 mb-6">
                        ${(customer.website || customer.primaryDomain || '').replace(/https?:\/\/(www\.)?/g, '')} • Generated ${new Date().toLocaleDateString('en-ZA', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                        <div class="text-3xl font-bold mb-1">${allIssues.length}</div>
                        <div class="text-white/80 text-sm">Total Issues</div>
                    </div>
                    <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                        <div class="text-3xl font-bold mb-1">${allRecommendations.length}</div>
                        <div class="text-white/80 text-sm">Recommendations</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <!-- Issues Summary -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span class="text-3xl">📊</span>
                Issues Summary
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-red-700">Critical Issues</p>
                            <p class="text-2xl font-bold text-red-900">${issuesCount.critical}</p>
                        </div>
                        <div class="text-red-500 text-2xl">🚨</div>
                    </div>
                    <p class="text-xs text-red-600 mt-1">Immediate action required</p>
                </div>
                <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-orange-700">High Priority</p>
                            <p class="text-2xl font-bold text-orange-900">${issuesCount.high}</p>
                        </div>
                        <div class="text-orange-500 text-2xl">⚠️</div>
                    </div>
                    <p class="text-xs text-orange-600 mt-1">Address within 1-2 weeks</p>
                </div>
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-yellow-700">Medium Priority</p>
                            <p class="text-2xl font-bold text-yellow-900">${issuesCount.medium}</p>
                        </div>
                        <div class="text-yellow-500 text-2xl">⚡</div>
                    </div>
                    <p class="text-xs text-yellow-600 mt-1">Plan for next month</p>
                </div>
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-blue-700">Low Priority</p>
                            <p class="text-2xl font-bold text-blue-900">${issuesCount.low}</p>
                        </div>
                        <div class="text-blue-500 text-2xl">ℹ️</div>
                    </div>
                    <p class="text-xs text-blue-600 mt-1">Nice to have improvements</p>
                </div>
            </div>
        </div>
        
        <!-- Detailed Issues List -->
        <div class="space-y-6">
            ${allIssues.map((issue, index) => `
                <div class="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${this.getSeverityBorderColor(issue.severity)}">
                    <div class="p-6">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <div class="flex items-center gap-3 mb-2">
                                    <span class="text-lg font-bold text-gray-700">#${index + 1}</span>
                                    <span class="inline-flex px-3 py-1 text-sm font-semibold rounded-full ${this.getSeverityClass(issue.severity)}">
                                        ${issue.severity}
                                    </span>
                                    <span class="inline-flex px-2 py-1 text-xs font-medium rounded ${this.getTypeClass(issue.type)}">
                                        ${issue.type}
                                    </span>
                                    <span class="text-sm text-gray-600">${issue.category}</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-2">${issue.issue}</h3>
                                <p class="text-gray-700 mb-3">${issue.description}</p>
                                <div class="text-sm text-gray-600 mb-2">
                                    <strong>Affected:</strong> ${issue.page}
                                </div>
                                <div class="text-sm text-gray-600 mb-4">
                                    <strong>Impact:</strong> ${issue.impact}
                                </div>
                            </div>
                            <div class="flex flex-col gap-2 text-right">
                                <span class="text-sm text-gray-500">Est. Fix Time</span>
                                <span class="font-semibold text-gray-700">${issue.estimatedTime}</span>
                                <span class="text-sm text-gray-500">Difficulty</span>
                                <span class="font-semibold ${this.getDifficultyColor(issue.difficulty)}">${issue.difficulty}</span>
                            </div>
                        </div>
                        
                        <!-- How to Fix Section -->
                        <div class="bg-gray-50 rounded-lg p-4 mb-4">
                            <h4 class="font-semibold text-gray-800 mb-2">🔧 How to Fix This Issue:</h4>
                            <div class="prose text-sm text-gray-700">
                                ${issue.howToFix}
                            </div>
                        </div>
                        
                        <!-- Tools Required -->
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="text-sm font-medium text-gray-600">Tools needed:</span>
                            ${issue.tools.map(tool => `
                                <span class="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                                    ${tool}
                                </span>
                            `).join('')}
                        </div>
                        
                        <!-- Action Checklist -->
                        <div class="border-t pt-4">
                            <h5 class="font-semibold text-gray-800 mb-2">✅ Action Checklist:</h5>
                            <div class="space-y-2">
                                ${this.generateActionChecklist(issue).map(action => `
                                    <div class="flex items-center gap-2">
                                        <input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded">
                                        <span class="text-sm text-gray-700">${action}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <!-- Page Break for Recommendations -->
        <div class="break-page"></div>
        
        <!-- Detailed Recommendations Section -->
        <div class="bg-white rounded-xl shadow-lg p-6 mt-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span class="text-3xl">📋</span>
                Prioritized Action Plan & Recommendations
            </h2>
            
            <div class="space-y-6">
                ${allRecommendations.map((rec, index) => `
                    <div class="border rounded-lg p-6 ${this.getPriorityBorderClass(rec.priority)}">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <div class="flex items-center gap-3 mb-2">
                                    <span class="text-lg font-bold text-gray-700">#${index + 1}</span>
                                    <span class="inline-flex px-3 py-1 text-sm font-semibold rounded-full ${this.getPriorityClass(rec.priority)}">
                                        ${rec.priority}
                                    </span>
                                    <span class="inline-flex px-2 py-1 text-xs font-medium rounded ${this.getTypeClass(rec.type)}">
                                        ${rec.type}
                                    </span>
                                    <span class="text-sm text-gray-600">${rec.category}</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-2">${rec.title}</h3>
                                <p class="text-gray-700 mb-4">${rec.recommendation}</p>
                            </div>
                            <div class="flex flex-col gap-2 text-right">
                                <span class="text-sm text-gray-500">Timeline</span>
                                <span class="font-semibold text-gray-700">${rec.timeline}</span>
                                <span class="text-sm text-gray-500">Owner</span>
                                <span class="font-semibold text-blue-600">${rec.owner}</span>
                            </div>
                        </div>
                        
                        <!-- Step-by-Step Guide -->
                        <div class="bg-blue-50 rounded-lg p-4 mb-4">
                            <h4 class="font-semibold text-blue-800 mb-2">📝 Step-by-Step Implementation Guide:</h4>
                            <div class="space-y-2 text-sm text-blue-700">
                                ${rec.stepByStepGuide.map((step, stepIndex) => `
                                    <div class="flex items-start gap-2">
                                        <span class="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-600 rounded-full flex-shrink-0">
                                            ${stepIndex + 1}
                                        </span>
                                        <span>${step}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Expected Results & Success Metrics -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div class="bg-green-50 rounded-lg p-3">
                                <h5 class="font-semibold text-green-800 mb-1">🎯 Expected Result:</h5>
                                <p class="text-sm text-green-700">${rec.expectedResult}</p>
                            </div>
                            <div class="bg-purple-50 rounded-lg p-3">
                                <h5 class="font-semibold text-purple-800 mb-1">📊 Success Metrics:</h5>
                                <div class="text-sm text-purple-700">
                                    ${rec.successMetrics.map(metric => `<div>• ${metric}</div>`).join('')}
                                </div>
                            </div>
                        </div>
                        
                        <!-- Implementation Tracker -->
                        <div class="border-t pt-4">
                            <div class="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                    <span class="text-gray-500">Impact:</span>
                                    <span class="font-medium ml-1 ${this.getImpactColor(rec.impact)}">${rec.impact}</span>
                                </div>
                                <div>
                                    <span class="text-gray-500">Effort:</span>
                                    <span class="font-medium ml-1">${rec.effort}</span>
                                </div>
                                <div>
                                    <span class="text-gray-500">Status:</span>
                                    <select class="ml-1 text-xs border rounded px-2 py-1">
                                        <option>Not Started</option>
                                        <option>In Progress</option>
                                        <option>Completed</option>
                                        <option>On Hold</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
    
    <script>
        function exportToCSV() {
            const csvData = [
                ['ID', 'Type', 'Priority', 'Category', 'Issue', 'Page', 'How to Fix', 'Estimated Time', 'Difficulty', 'Tools'],
                ${allIssues.map(issue => `
                    ['${issue.id}', '${issue.type}', '${issue.severity}', '${issue.category}', 
                     '${issue.issue.replace(/"/g, '""')}', '${issue.page}', 
                     '${issue.howToFix.replace(/"/g, '""').substring(0, 200)}...', 
                     '${issue.estimatedTime}', '${issue.difficulty}', '${issue.tools.join(', ')}']
                `).join(',\n')}
            ];
            
            const csv = csvData.map(row => 
                row.map(cell => typeof cell === 'string' ? \`"\${cell}"\` : cell).join(',')
            ).join('\\n');
            
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = '${customer.customerName.replace(/[^a-z0-9]/gi, '_')}_detailed_issues_report.csv';
            a.click();
            window.URL.revokeObjectURL(url);
        }
    </script>
</body>
</html>`;
    }
    
    // Helper methods for styling and data processing
    mapPriority(priority) {
        if (priority === 'HIGH') return 'Critical';
        if (priority === 'MEDIUM') return 'High';
        if (priority === 'LOW') return 'Medium';
        return priority || 'Low';
    }
    
    getSeverityBorderColor(severity) {
        switch (severity?.toLowerCase()) {
            case 'critical': return 'border-red-500';
            case 'high': return 'border-orange-500';
            case 'medium': return 'border-yellow-500';
            default: return 'border-blue-500';
        }
    }
    
    getSeverityClass(severity) {
        switch (severity?.toLowerCase()) {
            case 'critical': return 'bg-red-100 text-red-800';
            case 'high': return 'bg-orange-100 text-orange-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-blue-100 text-blue-800';
        }
    }
    
    getTypeClass(type) {
        return type.includes('SEO') ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800';
    }
    
    getDifficultyColor(difficulty) {
        switch (difficulty?.toLowerCase()) {
            case 'easy': return 'text-green-600';
            case 'medium': return 'text-yellow-600';
            case 'hard': return 'text-red-600';
            default: return 'text-gray-600';
        }
    }
    
    getPriorityClass(priority) {
        switch (priority?.toLowerCase()) {
            case 'critical': return 'bg-red-100 text-red-800';
            case 'high': return 'bg-orange-100 text-orange-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-blue-100 text-blue-800';
        }
    }
    
    getPriorityBorderClass(priority) {
        switch (priority?.toLowerCase()) {
            case 'critical': return 'border-red-200';
            case 'high': return 'border-orange-200';
            case 'medium': return 'border-yellow-200';
            default: return 'border-blue-200';
        }
    }
    
    getImpactColor(impact) {
        switch (impact?.toLowerCase()) {
            case 'very high':
            case 'high': return 'text-green-600';
            case 'medium': return 'text-yellow-600';
            default: return 'text-blue-600';
        }
    }
    
    // Detailed fix instruction methods
    getIssueDescription(issueType) {
        const descriptions = {
            'SLOW_PAGE_LOAD': 'Pages are loading slower than optimal, affecting user experience and search rankings.',
            'MISSING_META_DESCRIPTION': 'Pages lack compelling meta descriptions that appear in search results.',
            'MISSING_H1_TAG': 'Pages are missing or have incorrect H1 heading tags for SEO structure.',
            'BROKEN_LINKS': 'Internal or external links are returning 404 errors or are inaccessible.',
            'LARGE_IMAGES': 'Images are not optimized for web, causing slow loading times.',
            'NO_ALT_TEXT': 'Images lack alternative text descriptions for accessibility and SEO.',
            'DUPLICATE_TITLE': 'Multiple pages share the same title tag, causing SEO confusion.'
        };
        return descriptions[issueType] || 'Website issue requiring attention to improve performance and SEO.';
    }
    
    getIssueImpact(issueType) {
        const impacts = {
            'SLOW_PAGE_LOAD': 'High - Affects user experience, bounce rate, and Google Core Web Vitals scoring',
            'MISSING_META_DESCRIPTION': 'Medium - Reduces click-through rates from search results',
            'MISSING_H1_TAG': 'High - Critical for SEO structure and page understanding',
            'BROKEN_LINKS': 'High - Damages user experience and crawl efficiency',
            'LARGE_IMAGES': 'Medium - Slows page loading and mobile experience',
            'NO_ALT_TEXT': 'Medium - Affects accessibility and image SEO',
            'DUPLICATE_TITLE': 'High - Confuses search engines about page content'
        };
        return impacts[issueType] || 'Medium - Affects website performance and user experience';
    }
    
    getDetailedFixInstructions(issueType, pageUrl) {
        const instructions = {
            'SLOW_PAGE_LOAD': `
                <ol class="list-decimal list-inside space-y-2">
                    <li><strong>Optimize Images:</strong> Compress images using tools like TinyPNG or WebP format</li>
                    <li><strong>Enable Caching:</strong> Set up browser caching headers (Cache-Control, Expires)</li>
                    <li><strong>Minify Resources:</strong> Compress CSS, JavaScript, and HTML files</li>
                    <li><strong>Use CDN:</strong> Implement Content Delivery Network for faster global loading</li>
                    <li><strong>Database Optimization:</strong> Clean up and optimize database queries if applicable</li>
                </ol>
            `,
            'MISSING_META_DESCRIPTION': `
                <ol class="list-decimal list-inside space-y-2">
                    <li><strong>Write Compelling Description:</strong> Create 150-160 character description for "${pageUrl}"</li>
                    <li><strong>Include Target Keywords:</strong> Naturally incorporate main keywords for this page</li>
                    <li><strong>Make it Actionable:</strong> Include call-to-action words to encourage clicks</li>
                    <li><strong>Avoid Duplication:</strong> Ensure each page has a unique meta description</li>
                    <li><strong>HTML Implementation:</strong> Add &lt;meta name="description" content="Your description here"&gt; in &lt;head&gt;</li>
                </ol>
            `,
            'MISSING_H1_TAG': `
                <ol class="list-decimal list-inside space-y-2">
                    <li><strong>Identify Main Topic:</strong> Determine the primary subject of page "${pageUrl}"</li>
                    <li><strong>Write Descriptive H1:</strong> Create clear, keyword-rich heading (50-60 characters)</li>
                    <li><strong>Use Only One H1:</strong> Ensure each page has exactly one H1 tag</li>
                    <li><strong>HTML Structure:</strong> Place H1 as the first heading: &lt;h1&gt;Your Main Heading&lt;/h1&gt;</li>
                    <li><strong>Follow with H2-H6:</strong> Structure subsequent headings hierarchically</li>
                </ol>
            `,
            'BROKEN_LINKS': `
                <ol class="list-decimal list-inside space-y-2">
                    <li><strong>Identify All Broken Links:</strong> Use tools like Screaming Frog or online checkers</li>
                    <li><strong>Fix Internal Links:</strong> Update links to correct internal pages</li>
                    <li><strong>Handle External Links:</strong> Remove or replace dead external links</li>
                    <li><strong>Implement Redirects:</strong> Set up 301 redirects for moved content</li>
                    <li><strong>Regular Monitoring:</strong> Set up automated link checking tools</li>
                </ol>
            `
        };
        return instructions[issueType] || `<p>Review and address this issue following SEO best practices for "${pageUrl}".</p>`;
    }
    
    getFixTimeEstimate(issueType) {
        const estimates = {
            'SLOW_PAGE_LOAD': '4-8 hours',
            'MISSING_META_DESCRIPTION': '15-30 minutes per page',
            'MISSING_H1_TAG': '10-15 minutes per page',
            'BROKEN_LINKS': '2-4 hours',
            'LARGE_IMAGES': '1-2 hours',
            'NO_ALT_TEXT': '5-10 minutes per image',
            'DUPLICATE_TITLE': '15-30 minutes per page'
        };
        return estimates[issueType] || '30-60 minutes';
    }
    
    getFixDifficulty(issueType) {
        const difficulties = {
            'SLOW_PAGE_LOAD': 'Hard',
            'MISSING_META_DESCRIPTION': 'Easy',
            'MISSING_H1_TAG': 'Easy',
            'BROKEN_LINKS': 'Medium',
            'LARGE_IMAGES': 'Medium',
            'NO_ALT_TEXT': 'Easy',
            'DUPLICATE_TITLE': 'Easy'
        };
        return difficulties[issueType] || 'Medium';
    }
    
    getRequiredTools(issueType) {
        const tools = {
            'SLOW_PAGE_LOAD': ['Google PageSpeed Insights', 'GTmetrix', 'TinyPNG', 'CDN Service'],
            'MISSING_META_DESCRIPTION': ['HTML Editor', 'SEO Tools', 'Google Search Console'],
            'MISSING_H1_TAG': ['HTML Editor', 'Browser Inspector', 'SEO Audit Tools'],
            'BROKEN_LINKS': ['Screaming Frog', 'Broken Link Checker', 'Google Search Console'],
            'LARGE_IMAGES': ['Image Compression Tools', 'WebP Converter', 'Photo Editing Software'],
            'NO_ALT_TEXT': ['HTML Editor', 'CMS Admin', 'Accessibility Tools'],
            'DUPLICATE_TITLE': ['SEO Audit Tools', 'HTML Editor', 'Content Management System']
        };
        return tools[issueType] || ['Text Editor', 'Web Browser', 'SEO Tools'];
    }
    
    generateActionChecklist(issue) {
        const baseChecklist = [
            'Backup current website before making changes',
            'Document the current state for comparison',
            'Test fix on staging environment first',
            'Implement the recommended solution',
            'Verify fix is working correctly',
            'Monitor for any unintended side effects',
            'Update documentation and notes'
        ];
        
        // Add issue-specific checklist items
        const specificItems = {
            'SLOW_PAGE_LOAD': ['Run speed test before and after changes', 'Check mobile loading times'],
            'MISSING_META_DESCRIPTION': ['Verify description appears in search results', 'Check character length'],
            'MISSING_H1_TAG': ['Validate HTML structure', 'Ensure H1 is visible to users'],
            'BROKEN_LINKS': ['Test all repaired links manually', 'Update sitemap if needed']
        };
        
        const specific = specificItems[issue.issue] || [];
        return [...baseChecklist, ...specific];
    }
    
    // SEO-specific helper methods
    getSEOIssueDescription(issue) {
        // Generate meaningful descriptions for SEO issues
        if (issue.includes('meta description')) {
            return 'Meta descriptions are missing or poorly optimized, reducing click-through rates from search results.';
        }
        if (issue.includes('title')) {
            return 'Page titles need optimization to better target keywords and improve search visibility.';
        }
        if (issue.includes('content')) {
            return 'Page content requires improvement to better serve user intent and search engine requirements.';
        }
        return 'SEO optimization opportunity to improve search rankings and organic visibility.';
    }
    
    getSEOFixTimeEstimate(severity) {
        switch (severity?.toLowerCase()) {
            case 'critical': return '2-4 hours';
            case 'high': return '1-2 hours';
            case 'medium': return '30-60 minutes';
            default: return '15-30 minutes';
        }
    }
    
    getSEOFixDifficulty(category) {
        const difficulties = {
            'Content': 'Medium',
            'On-Page SEO': 'Easy',
            'Technical SEO': 'Hard',
            'Link Building': 'Hard',
            'Local SEO': 'Medium'
        };
        return difficulties[category] || 'Medium';
    }
    
    getSEORequiredTools(category) {
        const tools = {
            'Content': ['Content Editor', 'Keyword Research Tools', 'Grammar Checker'],
            'On-Page SEO': ['HTML Editor', 'SEO Browser Extensions', 'Meta Tag Tools'],
            'Technical SEO': ['Google Search Console', 'Schema Markup Tools', 'XML Sitemap Generator'],
            'Link Building': ['Outreach Tools', 'Backlink Checkers', 'Content Creation Tools'],
            'Local SEO': ['Google Business Profile', 'Local Directory Tools', 'Review Management']
        };
        return tools[category] || ['SEO Tools', 'HTML Editor', 'Analytics'];
    }
    
    getStepByStepGuide(issue, category) {
        // Generate step-by-step guides for performance recommendations
        if (issue.includes('Page Load') || issue.includes('performance')) {
            return [
                'Run baseline performance test using Google PageSpeed Insights',
                'Identify largest performance bottlenecks from the test results',
                'Optimize images by compressing and converting to WebP format',
                'Minify CSS, JavaScript, and HTML files',
                'Enable browser caching with appropriate cache headers',
                'Consider implementing a Content Delivery Network (CDN)',
                'Retest performance and compare with baseline results'
            ];
        }
        
        if (issue.includes('Meta Description') || category === 'Content') {
            return [
                'Audit all pages missing meta descriptions',
                'Research target keywords for each page',
                'Write compelling 150-160 character descriptions',
                'Include primary keywords naturally in descriptions',
                'Add call-to-action phrases to encourage clicks',
                'Implement descriptions in HTML head section',
                'Monitor click-through rates in Google Search Console'
            ];
        }
        
        return [
            'Identify specific pages or elements affected by this issue',
            'Research best practices and solutions for this type of problem',
            'Plan implementation strategy and timeline',
            'Make necessary changes following recommended guidelines',
            'Test changes thoroughly across different devices and browsers',
            'Monitor results and performance metrics',
            'Document changes and maintain ongoing monitoring'
        ];
    }
    
    getSEOStepByStepGuide(category, recommendation) {
        const guides = {
            'Quick Win': [
                'Identify all pages affected by this quick win opportunity',
                'Gather necessary content and keyword research',
                'Implement changes following SEO best practices',
                'Test changes using browser developer tools',
                'Validate HTML markup and meta tags',
                'Submit updated pages to Google Search Console',
                'Monitor search rankings and traffic changes'
            ],
            'Content': [
                'Conduct thorough keyword research for target topics',
                'Analyze competitor content for inspiration and gaps',
                'Create detailed content outline with target keywords',
                'Write high-quality, user-focused content',
                'Optimize content with proper heading structure (H1, H2, H3)',
                'Add relevant internal and external links',
                'Publish content and promote through appropriate channels',
                'Monitor content performance and engagement metrics'
            ],
            'Link Building': [
                'Research relevant websites and publications in your industry',
                'Identify contact information for editors and content managers',
                'Develop valuable content or resources worthy of linking',
                'Craft personalized outreach emails explaining mutual benefits',
                'Follow up appropriately while respecting recipients\' time',
                'Track successful link placements and relationship building',
                'Monitor new backlinks using tools like Google Search Console'
            ]
        };
        
        return guides[category] || guides['Quick Win'];
    }
    
    getSuccessMetrics(category) {
        const metrics = {
            'Performance': [
                'Page load time improvement (target: <2 seconds)',
                'Core Web Vitals scores improvement',
                'Bounce rate reduction',
                'User session duration increase'
            ],
            'Content': [
                'Organic traffic increase to optimized pages',
                'Time on page improvement',
                'Reduced bounce rate',
                'Increased conversion rate'
            ],
            'Technical': [
                'Crawl error reduction in Google Search Console',
                'Indexation rate improvement',
                'Search visibility increase',
                'Technical audit score improvement'
            ]
        };
        return metrics[category] || metrics['Technical'];
    }
    
    getSEOSuccessMetrics(category) {
        const metrics = {
            'Quick Win': [
                'Search ranking improvement within 2-4 weeks',
                'Click-through rate increase from search results',
                'Organic traffic growth to optimized pages'
            ],
            'Content': [
                'Organic keyword ranking improvements',
                'Increased organic traffic and engagement',
                'Higher content engagement metrics',
                'Social sharing and backlink acquisition'
            ],
            'Link Building': [
                'Number of quality backlinks acquired',
                'Domain authority improvement',
                'Referral traffic from new links',
                'Search ranking improvements for target keywords'
            ]
        };
        return metrics[category] || metrics['Quick Win'];
    }
}

// Export for use in other scripts
window.DetailedIssuesReportGenerator = DetailedIssuesReportGenerator;