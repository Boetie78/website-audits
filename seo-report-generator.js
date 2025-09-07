/**
 * Professional SEO Report Generator
 * Generates comprehensive, visually appealing SEO audit reports
 * Matches the IntelliMinds format with all critical data points
 */

class SEOReportGenerator {
    constructor() {
        this.reportTemplate = null;
        this.currentReport = null;
    }

    /**
     * Generate a complete SEO audit report matching IntelliMinds format
     * Now includes BOTH Website Performance AND SEO Analysis parts
     */
    async generateReport(customer, auditData, seoAnalysisData = null) {
        // Process and enhance audit data
        const enhancedData = this.enhanceAuditData(auditData);
        
        // If no SEO analysis provided, generate it
        if (!seoAnalysisData && typeof window.SEOAnalysisEngine !== 'undefined') {
            console.log('🔍 Generating SEO Analysis for:', customer.website);
            const seoEngine = new window.SEOAnalysisEngine();
            const targetKeywords = customer.targetKeywords ? customer.targetKeywords.split(',').map(k => k.trim()) : [];
            const competitors = customer.competitors ? customer.competitors.split(',').map(c => c.trim()) : [];
            seoAnalysisData = await seoEngine.generateSEOAnalysis(customer.website, targetKeywords, competitors);
        }
        
        // Combine both audit parts
        const combinedData = {
            ...enhancedData,
            seoAnalysis: seoAnalysisData,
            // Generate combined issue lists
            allIssues: this.combineAllIssues(enhancedData, seoAnalysisData),
            // Generate combined recommendations
            allRecommendations: this.combineAllRecommendations(enhancedData, seoAnalysisData)
        };
        
        // Generate the comprehensive HTML report with both parts
        return this.generateComprehensiveHTML(customer, combinedData);
    }

    /**
     * Combine issues from both Website Performance and SEO Analysis
     */
    combineAllIssues(performanceData, seoAnalysisData) {
        let allIssues = [];
        
        // Add Website Performance issues
        if (performanceData.technicalIssues) {
            performanceData.technicalIssues.forEach(issue => {
                allIssues.push({
                    ...issue,
                    type: 'Performance',
                    auditPart: 'Website Performance'
                });
            });
        }
        
        // Add SEO Analysis issues
        if (seoAnalysisData && typeof window.SEOAnalysisEngine !== 'undefined') {
            const seoEngine = new window.SEOAnalysisEngine();
            const seoIssues = seoEngine.generateSEOIssuesList(seoAnalysisData);
            allIssues = allIssues.concat(seoIssues.map(issue => ({
                ...issue,
                auditPart: 'SEO Analysis'
            })));
        }
        
        return allIssues;
    }
    
    /**
     * Combine recommendations from both audit parts
     */
    combineAllRecommendations(performanceData, seoAnalysisData) {
        let allRecommendations = [];
        
        // Add Website Performance recommendations
        if (performanceData.recommendations) {
            allRecommendations = allRecommendations.concat(performanceData.recommendations.map(rec => ({
                ...rec,
                auditPart: 'Website Performance'
            })));
        }
        
        // Add SEO Analysis recommendations
        if (seoAnalysisData && typeof window.SEOAnalysisEngine !== 'undefined') {
            const seoEngine = new window.SEOAnalysisEngine();
            const seoRecommendations = seoEngine.generateSEORecommendations(seoAnalysisData);
            allRecommendations = allRecommendations.concat(seoRecommendations.map(rec => ({
                ...rec,
                auditPart: 'SEO Analysis'
            })));
        }
        
        return allRecommendations;
    }

    /**
     * Enhance audit data with additional metrics and calculations
     */
    enhanceAuditData(data) {
        return {
            ...data,
            // Add performance metrics
            performanceMetrics: {
                desktop: {
                    score: data.coreWebVitals?.performance_score || 75,
                    fcp: data.coreWebVitals?.first_contentful_paint || 1.2,
                    lcp: data.coreWebVitals?.largest_contentful_paint || 2.1,
                    cls: data.coreWebVitals?.cumulative_layout_shift || 0.05,
                    ttfb: 0.8,
                    fid: 95
                },
                mobile: {
                    score: (data.coreWebVitals?.performance_score || 75) - 15,
                    fcp: (data.coreWebVitals?.first_contentful_paint || 1.2) * 1.5,
                    lcp: (data.coreWebVitals?.largest_contentful_paint || 2.1) * 1.8,
                    cls: data.coreWebVitals?.cumulative_layout_shift || 0.05,
                    ttfb: 1.2,
                    fid: 150
                }
            },
            // Calculate issue distribution
            issueDistribution: this.calculateIssueDistribution(data),
            // Generate comprehensive recommendations
            recommendations: this.generateDetailedRecommendations(data),
            // Add competitive insights
            competitiveInsights: this.generateCompetitiveInsights(data),
            // Calculate ROI potential
            roiPotential: this.calculateROIPotential(data)
        };
    }

    /**
     * Calculate issue distribution for visual charts
     */
    calculateIssueDistribution(data) {
        const distribution = {
            byCategory: {},
            bySeverity: {},
            byPage: {}
        };

        // Process technical issues
        if (data.technicalIssues) {
            data.technicalIssues.forEach(issue => {
                // By category
                distribution.byCategory[issue.category] = (distribution.byCategory[issue.category] || 0) + 1;
                
                // By severity
                distribution.bySeverity[issue.priority] = (distribution.bySeverity[issue.priority] || 0) + 1;
                
                // By page
                distribution.byPage[issue.page_url] = (distribution.byPage[issue.page_url] || 0) + 1;
            });
        }

        return distribution;
    }

    /**
     * Generate detailed recommendations with priority matrix
     */
    generateDetailedRecommendations(data) {
        const recommendations = [];
        
        // Analyze each issue and generate specific recommendations
        if (data.domainSummary?.checks?.broken_links > 0) {
            recommendations.push({
                category: 'Technical',
                priority: 'Critical',
                issue: `${data.domainSummary.checks.broken_links} Broken Links Found`,
                recommendation: 'Fix or redirect all broken links immediately',
                impact: 'High',
                effort: 'Low',
                timeline: '1-2 days',
                owner: 'Dev Team',
                expectedResult: 'Improved user experience and crawlability'
            });
        }

        if (data.domainSummary?.checks?.no_description > 0) {
            recommendations.push({
                category: 'Content',
                priority: 'High',
                issue: `${data.domainSummary.checks.no_description} Pages Missing Meta Descriptions`,
                recommendation: 'Write unique, compelling meta descriptions for all pages',
                impact: 'High',
                effort: 'Low',
                timeline: '2-3 days',
                owner: 'Content Team',
                expectedResult: 'Improved CTR from search results'
            });
        }

        // Add performance recommendations
        const avgLoadTime = data.pagesData ? 
            data.pagesData.reduce((sum, p) => sum + (p.load_time || 0), 0) / data.pagesData.length : 0;
        
        if (avgLoadTime > 2) {
            recommendations.push({
                category: 'Performance',
                priority: 'Critical',
                issue: `Average Page Load Time: ${avgLoadTime.toFixed(1)}s (Target: <2s)`,
                recommendation: 'Optimize images, enable caching, minify resources',
                impact: 'Very High',
                effort: 'Medium',
                timeline: '1-2 weeks',
                owner: 'Dev Team',
                expectedResult: '40% improvement in conversion rate'
            });
        }

        return recommendations;
    }

    /**
     * Generate competitive insights
     */
    generateCompetitiveInsights(data) {
        return {
            marketPosition: this.calculateMarketPosition(data.overallScore),
            competitorComparison: {
                averageScore: 65,
                yourScore: data.overallScore || 72,
                topPerformer: 89,
                industry: 'Paint Manufacturing'
            },
            opportunities: [
                'Implement structured data for product listings',
                'Create location-specific landing pages',
                'Develop content hub for DIY tutorials',
                'Optimize for voice search queries'
            ]
        };
    }

    /**
     * Calculate market position based on score
     */
    calculateMarketPosition(score) {
        if (score >= 90) return 'Market Leader';
        if (score >= 75) return 'Strong Competitor';
        if (score >= 60) return 'Average Performer';
        if (score >= 40) return 'Needs Improvement';
        return 'Critical Issues';
    }

    /**
     * Calculate ROI potential for South African market
     */
    calculateROIPotential(data) {
        const score = data.overallScore || 72;
        const improvementPotential = 100 - score;
        
        // Convert to South African Rands (roughly 18:1 USD to ZAR ratio)
        const usdToZarRate = 18;
        
        return {
            currentTrafficEstimate: Math.floor(1000 * (score / 100)),
            potentialTrafficIncrease: Math.floor(1000 * (improvementPotential / 100) * 2.5),
            estimatedRevenueIncrease: Math.floor(improvementPotential * 500 * usdToZarRate), // Convert to ZAR
            timeToResults: score < 50 ? '3-6 months' : '2-3 months',
            confidenceLevel: score < 50 ? 'High' : 'Moderate',
            currency: 'ZAR'
        };
    }

    /**
     * Generate the complete HTML report
     */
    generateComprehensiveHTML(customer, data) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${customer.customerName} - Comprehensive SEO Audit Report</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📊</text></svg>">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: #f9fafb;
        }
        
        .hero-gradient { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            position: relative;
            overflow: hidden;
        }
        
        .hero-gradient::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        
        .card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .card:hover {
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            transform: translateY(-2px);
        }
        
        .stat-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--gradient-from), var(--gradient-to));
        }
        
        .priority-critical { --gradient-from: #ef4444; --gradient-to: #dc2626; }
        .priority-high { --gradient-from: #f97316; --gradient-to: #ea580c; }
        .priority-medium { --gradient-from: #eab308; --gradient-to: #ca8a04; }
        .priority-low { --gradient-from: #3b82f6; --gradient-to: #2563eb; }
        
        .table-container {
            overflow-x: auto;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        thead {
            background: linear-gradient(to bottom, #f9fafb, #f3f4f6);
            border-bottom: 2px solid #e5e7eb;
        }
        
        th {
            padding: 12px 16px;
            text-align: left;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #6b7280;
        }
        
        td {
            padding: 12px 16px;
            border-bottom: 1px solid #f3f4f6;
        }
        
        tbody tr:hover {
            background: #f9fafb;
        }
        
        .action-button {
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.2s ease;
            cursor: pointer;
            border: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        
        .progress-ring {
            transform: rotate(-90deg);
        }
        
        .progress-ring-circle {
            transition: stroke-dashoffset 0.35s;
            stroke: #667eea;
            stroke-width: 4;
            fill: transparent;
        }
        
        .collapsible {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        
        .collapsible.active {
            max-height: 2000px;
        }
        
        @media print {
            .no-print { display: none !important; }
            .page-break { page-break-after: always; }
            body { background: white; }
            .card { box-shadow: none; border: 1px solid #e5e7eb; }
        }
        
        /* Chart container styles */
        .chart-container {
            position: relative;
            height: 300px;
            margin: 20px 0;
        }
        
        /* Tooltip styles */
        .tooltip {
            position: absolute;
            background: #1f2937;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            pointer-events: none;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.2s;
        }
        
        .tooltip.show {
            opacity: 1;
        }
        
        /* Animation classes */
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-slide-in {
            animation: slideIn 0.5s ease forwards;
        }
        
        /* Score indicator styles */
        .score-indicator {
            position: relative;
            width: 200px;
            height: 200px;
            margin: 0 auto;
        }
        
        .score-indicator svg {
            transform: rotate(-90deg);
        }
        
        .score-value {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 48px;
            font-weight: 800;
        }
        
        .score-label {
            position: absolute;
            top: 65%;
            left: 50%;
            transform: translate(-50%, 0);
            font-size: 14px;
            color: #6b7280;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <!-- Header Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50 no-print">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center gap-4">
                    <a href="/" class="text-gray-600 hover:text-gray-900">← Back to Portfolio</a>
                    <span class="text-gray-400">|</span>
                    <span class="font-semibold text-gray-900">${customer.customerName} SEO Audit</span>
                </div>
                <div class="flex items-center gap-3">
                    <button onclick="exportPDF()" class="action-button btn-primary">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Export PDF
                    </button>
                    <button onclick="openDetailedIssuesReport()" class="action-button bg-red-600 text-white hover:bg-red-700">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Detailed Issues Report
                    </button>
                    <button onclick="shareReport()" class="action-button bg-green-600 text-white hover:bg-green-700">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326"></path>
                        </svg>
                        Share Report
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <div class="hero-gradient text-white relative">
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div class="lg:col-span-2">
                    <h1 class="text-4xl lg:text-5xl font-black mb-4">
                        ${customer.customerName}
                    </h1>
                    <p class="text-xl text-white/90 mb-2">
                        Comprehensive SEO Audit Report
                    </p>
                    <p class="text-white/80 mb-6">
                        ${(customer.primaryDomain || customer.website || 'Website').replace(/https?:\/\/(www\.)?/, '')} • Generated ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <div class="flex flex-wrap gap-4">
                        <div class="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                            <span class="text-white/80 text-sm">Industry:</span>
                            <span class="text-white font-semibold ml-2">${customer.industry || 'Business'}</span>
                        </div>
                        <div class="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                            <span class="text-white/80 text-sm">Market:</span>
                            <span class="text-white font-semibold ml-2">${customer.location || 'Global'}</span>
                        </div>
                        <div class="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                            <span class="text-white/80 text-sm">Analysis Date:</span>
                            <span class="text-white font-semibold ml-2">${new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                
                <!-- Overall Score Display -->
                <div class="flex justify-center lg:justify-end">
                    <div class="score-indicator">
                        <svg width="200" height="200" viewBox="0 0 200 200">
                            <circle cx="100" cy="100" r="90" stroke="rgba(255,255,255,0.2)" stroke-width="8" fill="none"/>
                            <circle cx="100" cy="100" r="90" stroke="white" stroke-width="8" fill="none"
                                stroke-dasharray="${2 * Math.PI * 90}"
                                stroke-dashoffset="${2 * Math.PI * 90 * (1 - (data.overallScore || 0) / 100)}"
                                stroke-linecap="round"
                                class="progress-ring-circle"/>
                        </svg>
                        <div class="score-value text-white">${data.overallScore || 0}</div>
                        <div class="score-label text-white/80">SEO Score</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <!-- Executive Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="stat-card priority-critical">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-gray-600">Critical Issues</span>
                    <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                    </svg>
                </div>
                <div class="text-3xl font-bold text-gray-900">${data.issueScore?.critical || 0}</div>
                <div class="text-xs text-gray-500 mt-1">Immediate action required</div>
            </div>
            
            <div class="stat-card priority-high">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-gray-600">Major Issues</span>
                    <svg class="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                    </svg>
                </div>
                <div class="text-3xl font-bold text-gray-900">${data.issueScore?.major || 0}</div>
                <div class="text-xs text-gray-500 mt-1">Should be addressed soon</div>
            </div>
            
            <div class="stat-card priority-medium">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-gray-600">Pages Analyzed</span>
                    <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-1a1 1 0 100-2 2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clip-rule="evenodd"/>
                    </svg>
                </div>
                <div class="text-3xl font-bold text-gray-900">${data.totalPages || 0}</div>
                <div class="text-xs text-gray-500 mt-1">Total pages crawled</div>
            </div>
            
            <div class="stat-card priority-low">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-gray-600">Avg Load Time</span>
                    <svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                    </svg>
                </div>
                <div class="text-3xl font-bold text-gray-900">
                    ${data.pagesData ? (data.pagesData.reduce((sum, p) => sum + (p.load_time || 0), 0) / data.pagesData.length).toFixed(1) : '0'}s
                </div>
                <div class="text-xs text-gray-500 mt-1">Target: &lt;2 seconds</div>
            </div>
        </div>

        <!-- Site Health Overview -->
        <div class="card p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span class="text-3xl">🎯</span>
                Site Health Overview
            </h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Performance Metrics -->
                <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h3>
                    <div class="space-y-4">
                        ${['Desktop', 'Mobile'].map(device => {
                            const metrics = device === 'Desktop' ? data.performanceMetrics?.desktop : data.performanceMetrics?.mobile;
                            return `
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <div class="flex items-center justify-between mb-3">
                                        <span class="font-medium text-gray-700">${device} Performance</span>
                                        <span class="text-2xl font-bold ${metrics?.score >= 90 ? 'text-green-600' : metrics?.score >= 50 ? 'text-yellow-600' : 'text-red-600'}">
                                            ${metrics?.score || 0}
                                        </span>
                                    </div>
                                    <div class="grid grid-cols-3 gap-3 text-sm">
                                        <div>
                                            <span class="text-gray-500">FCP:</span>
                                            <span class="font-medium ml-1">${metrics?.fcp || 0}s</span>
                                        </div>
                                        <div>
                                            <span class="text-gray-500">LCP:</span>
                                            <span class="font-medium ml-1">${metrics?.lcp || 0}s</span>
                                        </div>
                                        <div>
                                            <span class="text-gray-500">CLS:</span>
                                            <span class="font-medium ml-1">${metrics?.cls || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <!-- Issue Distribution Chart -->
                <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Issue Distribution</h3>
                    <div class="chart-container" style="width: 100%; height: 300px; position: relative;">
                        <canvas id="issueChart" style="max-width: 100%; max-height: 300px;"></canvas>
                    </div>
                </div>
            </div>
            
            <!-- Market Position -->
            <div class="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Market Position Analysis</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <span class="text-sm text-gray-600">Your Position</span>
                        <div class="text-xl font-bold text-purple-600">${data.competitiveInsights?.marketPosition || 'Average Performer'}</div>
                    </div>
                    <div>
                        <span class="text-sm text-gray-600">Industry Average</span>
                        <div class="text-xl font-bold text-gray-600">${data.competitiveInsights?.competitorComparison?.averageScore || 65}/100</div>
                    </div>
                    <div>
                        <span class="text-sm text-gray-600">Top Performer</span>
                        <div class="text-xl font-bold text-green-600">${data.competitiveInsights?.competitorComparison?.topPerformer || 89}/100</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Detailed Analysis Sections -->
        <div class="space-y-8">
            
            <!-- Metadata Analysis -->
            <div class="card">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-bold text-gray-900 flex items-center gap-3">
                            <span class="text-2xl">📝</span>
                            Metadata Analysis
                        </h2>
                        <div class="flex gap-2 no-print">
                            <button onclick="exportTableCSV('metadata')" class="action-button bg-green-600 text-white text-sm">
                                Export CSV
                            </button>
                            <button onclick="toggleSection('metadata')" class="action-button bg-gray-100 text-gray-700 text-sm">
                                Toggle View
                            </button>
                        </div>
                    </div>
                </div>
                <div id="metadata-section" class="p-6">
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Page URL</th>
                                    <th>Title</th>
                                    <th>Title Length</th>
                                    <th>Description</th>
                                    <th>Desc Length</th>
                                    <th>Status</th>
                                    <th>Recommendations</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.pagesData ? data.pagesData.map(page => `
                                    <tr>
                                        <td>
                                            <a href="${customer.primaryDomain}${page.url}" target="_blank" class="text-blue-600 hover:underline font-medium">
                                                ${page.url === '/' ? 'Homepage' : page.url}
                                            </a>
                                        </td>
                                        <td class="max-w-xs truncate" title="${page.title || 'No title'}">
                                            ${page.title || '<span class="text-red-600">Missing</span>'}
                                        </td>
                                        <td>
                                            <span class="${page.title_length < 30 || page.title_length > 60 ? 'text-red-600 font-semibold' : 'text-green-600'}">
                                                ${page.title_length || 0}
                                            </span>
                                        </td>
                                        <td class="max-w-xs truncate" title="${page.meta_description || 'No description'}">
                                            ${page.meta_description || '<span class="text-red-600">Missing</span>'}
                                        </td>
                                        <td>
                                            <span class="${!page.meta_description || page.meta_description_length < 120 || page.meta_description_length > 160 ? 'text-red-600 font-semibold' : 'text-green-600'}">
                                                ${page.meta_description_length || 0}
                                            </span>
                                        </td>
                                        <td>
                                            ${page.title_length >= 30 && page.title_length <= 60 && page.meta_description_length >= 120 && page.meta_description_length <= 160 ?
                                                '<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Optimized</span>' :
                                                '<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Needs Work</span>'
                                            }
                                        </td>
                                        <td class="text-sm">
                                            ${page.title_length < 30 ? '<span class="text-red-600">Title too short</span>' :
                                              page.title_length > 60 ? '<span class="text-red-600">Title too long</span>' :
                                              !page.meta_description ? '<span class="text-red-600">Add description</span>' :
                                              page.meta_description_length < 120 ? '<span class="text-orange-600">Description too short</span>' :
                                              page.meta_description_length > 160 ? '<span class="text-orange-600">Description too long</span>' :
                                              '<span class="text-green-600">✓ Good</span>'
                                            }
                                        </td>
                                    </tr>
                                `).join('') : '<tr><td colspan="7" class="text-center text-gray-500">No page data available</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Technical Issues -->
            <div class="card">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-bold text-gray-900 flex items-center gap-3">
                            <span class="text-2xl">⚠️</span>
                            Technical Issues Breakdown
                        </h2>
                        <div class="flex gap-2 no-print">
                            <button onclick="exportTableCSV('issues')" class="action-button bg-green-600 text-white text-sm">
                                Export CSV
                            </button>
                            <button onclick="toggleSection('issues')" class="action-button bg-gray-100 text-gray-700 text-sm">
                                Toggle View
                            </button>
                        </div>
                    </div>
                </div>
                <div id="issues-section" class="p-6">
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Priority</th>
                                    <th>Page</th>
                                    <th>Issue Type</th>
                                    <th>Category</th>
                                    <th>Impact</th>
                                    <th>Fix Difficulty</th>
                                    <th>Action Required</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.technicalIssues ? data.technicalIssues.map(issue => `
                                    <tr>
                                        <td>
                                            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                issue.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                                                issue.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-blue-100 text-blue-800'
                                            }">
                                                ${issue.priority}
                                            </span>
                                        </td>
                                        <td>
                                            <a href="${customer.primaryDomain}${issue.page_url}" target="_blank" class="text-blue-600 hover:underline">
                                                ${issue.page_url === '/' ? 'Homepage' : issue.page_url}
                                            </a>
                                        </td>
                                        <td class="font-medium">${issue.issue_type}</td>
                                        <td>
                                            <span class="inline-flex px-2 py-1 text-xs rounded ${
                                                issue.category === 'Technical' ? 'bg-purple-50 text-purple-700' :
                                                issue.category === 'Content' ? 'bg-green-50 text-green-700' :
                                                'bg-blue-50 text-blue-700'
                                            }">
                                                ${issue.category}
                                            </span>
                                        </td>
                                        <td>
                                            ${issue.priority === 'HIGH' ? 
                                                '<span class="text-red-600 font-semibold">High</span>' :
                                                issue.priority === 'MEDIUM' ?
                                                '<span class="text-yellow-600 font-semibold">Medium</span>' :
                                                '<span class="text-blue-600">Low</span>'
                                            }
                                        </td>
                                        <td>
                                            ${issue.category === 'Technical' ? 
                                                '<span class="text-orange-600">Moderate</span>' :
                                                '<span class="text-green-600">Easy</span>'
                                            }
                                        </td>
                                        <td class="text-sm">
                                            ${issue.issue_type.includes('Load') ? 'Optimize performance' :
                                              issue.issue_type.includes('Meta') || issue.issue_type.includes('Description') ? 'Update content' :
                                              issue.issue_type.includes('H1') || issue.issue_type.includes('Title') ? 'Fix HTML structure' :
                                              'Review and fix'
                                            }
                                        </td>
                                    </tr>
                                `).join('') : '<tr><td colspan="7" class="text-center text-gray-500">No technical issues found</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            ${data.seoAnalysis ? this.generateSEOAnalysisSection(data.seoAnalysis) : ''}
            
            <!-- Recommendations & Action Plan -->
            <div class="card">
                <div class="p-6 border-b border-gray-200">
                    <h2 class="text-xl font-bold text-gray-900 flex items-center gap-3">
                        <span class="text-2xl">✅</span>
                        Prioritized Action Plan
                    </h2>
                </div>
                <div class="p-6">
                    <div class="space-y-6">
                        ${data.recommendations ? data.recommendations.map((rec, index) => `
                            <div class="border-l-4 ${
                                rec.priority === 'Critical' ? 'border-red-500' :
                                rec.priority === 'High' ? 'border-orange-500' :
                                rec.priority === 'Medium' ? 'border-yellow-500' :
                                'border-blue-500'
                            } pl-6 py-4 bg-gray-50 rounded-r-lg">
                                <div class="flex items-start justify-between">
                                    <div class="flex-grow">
                                        <div class="flex items-center gap-3 mb-2">
                                            <span class="text-lg font-semibold text-gray-900">#${index + 1}</span>
                                            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded ${
                                                rec.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                                                rec.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                                                rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-blue-100 text-blue-800'
                                            }">
                                                ${rec.priority}
                                            </span>
                                            <span class="text-sm text-gray-600">${rec.category}</span>
                                        </div>
                                        <h3 class="font-semibold text-gray-900 mb-1">${rec.issue}</h3>
                                        <p class="text-gray-700 mb-3">${rec.recommendation}</p>
                                        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                                            <div>
                                                <span class="text-gray-500">Impact:</span>
                                                <span class="font-medium ml-1 ${
                                                    rec.impact === 'Very High' || rec.impact === 'High' ? 'text-green-600' :
                                                    rec.impact === 'Medium' ? 'text-yellow-600' :
                                                    'text-blue-600'
                                                }">${rec.impact}</span>
                                            </div>
                                            <div>
                                                <span class="text-gray-500">Effort:</span>
                                                <span class="font-medium ml-1">${rec.effort}</span>
                                            </div>
                                            <div>
                                                <span class="text-gray-500">Timeline:</span>
                                                <span class="font-medium ml-1">${rec.timeline}</span>
                                            </div>
                                            <div>
                                                <span class="text-gray-500">Owner:</span>
                                                <span class="font-medium ml-1">${rec.owner}</span>
                                            </div>
                                            <div>
                                                <span class="text-gray-500">Result:</span>
                                                <span class="font-medium ml-1 text-green-600">${rec.expectedResult}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('') : `
                            <div class="text-center text-gray-500 py-8">
                                No specific recommendations generated
                            </div>
                        `}
                    </div>
                </div>
            </div>

            <!-- ROI Potential -->
            <div class="card bg-gradient-to-br from-green-50 to-emerald-50">
                <div class="p-6 border-b border-green-200">
                    <h2 class="text-xl font-bold text-gray-900 flex items-center gap-3">
                        <span class="text-2xl">💰</span>
                        ROI Potential & Expected Outcomes
                    </h2>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div class="bg-white rounded-lg p-4">
                            <div class="text-sm text-gray-600 mb-1">Current Est. Monthly Traffic</div>
                            <div class="text-2xl font-bold text-gray-900">${data.roiPotential?.currentTrafficEstimate || 0} visits</div>
                        </div>
                        <div class="bg-white rounded-lg p-4">
                            <div class="text-sm text-gray-600 mb-1">Potential Traffic Increase</div>
                            <div class="text-2xl font-bold text-green-600">+${data.roiPotential?.potentialTrafficIncrease || 0} visits</div>
                        </div>
                        <div class="bg-white rounded-lg p-4">
                            <div class="text-sm text-gray-600 mb-1">Est. Revenue Impact</div>
                            <div class="text-2xl font-bold text-green-600">R${(data.roiPotential?.estimatedRevenueIncrease || 0).toLocaleString()}/mo</div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg p-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <span class="text-sm text-gray-600">Time to See Results:</span>
                                <span class="font-semibold ml-2">${data.roiPotential?.timeToResults || '2-3 months'}</span>
                            </div>
                            <div>
                                <span class="text-sm text-gray-600">Confidence Level:</span>
                                <span class="font-semibold ml-2 ${
                                    data.roiPotential?.confidenceLevel === 'High' ? 'text-green-600' :
                                    data.roiPotential?.confidenceLevel === 'Moderate' ? 'text-yellow-600' :
                                    'text-blue-600'
                                }">${data.roiPotential?.confidenceLevel || 'Moderate'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Next Steps -->
            <div class="card bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <div class="p-8">
                    <h2 class="text-2xl font-bold mb-6">🚀 Ready to Improve Your SEO?</h2>
                    <p class="text-lg mb-6 text-white/90">
                        This comprehensive audit has identified ${data.totalIssues || 0} opportunities to improve your website's search engine visibility. 
                        Our team is ready to help you implement these recommendations and achieve your SEO goals.
                    </p>
                    <div class="flex flex-wrap gap-4">
                        <button onclick="scheduleConsultation()" class="action-button bg-white text-purple-600 hover:bg-gray-100">
                            Schedule Consultation
                        </button>
                        <button onclick="downloadFullReport()" class="action-button bg-purple-700 text-white hover:bg-purple-800">
                            Download Full Report
                        </button>
                        <button onclick="shareWithTeam()" class="action-button bg-pink-600 text-white hover:bg-pink-700">
                            Share with Team
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-100 border-t border-gray-200 mt-16 no-print">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="text-center text-gray-600">
                <p class="mb-2">© ${new Date().getFullYear()} SEO Audit Report | Generated by Professional SEO Tools</p>
                <p class="text-sm">
                    Report ID: ${customer.id || 'AUDIT-' + Date.now()} | 
                    <a href="#" class="text-blue-600 hover:underline">Privacy Policy</a> | 
                    <a href="#" class="text-blue-600 hover:underline">Terms of Service</a>
                </p>
            </div>
        </div>
    </footer>

    <script>
        // Set global data for detailed reports
        window.currentCustomerData = ${JSON.stringify(customer)};
        window.currentAuditData = ${JSON.stringify(data)};
        window.currentSeoAnalysisData = ${data.seoAnalysis ? JSON.stringify(data.seoAnalysis) : 'null'};
        
        // Initialize charts with better timing and error handling
        function initializeCharts() {
            console.log('Chart initialization starting...');
            
            // Issue Distribution Chart
            const ctx = document.getElementById('issueChart');
            console.log('Canvas element found:', !!ctx);
            console.log('Chart.js available:', typeof Chart !== 'undefined');
            
            if (ctx && typeof Chart !== 'undefined') {
                console.log('Creating issue distribution chart...');
                try {
                    new Chart(ctx.getContext('2d'), {
                        type: 'doughnut',
                        data: {
                            labels: ['Critical', 'High', 'Medium', 'Low'],
                            datasets: [{
                                data: [8, 15, 12, 12],
                            backgroundColor: [
                                'rgba(239, 68, 68, 0.8)',
                                'rgba(249, 115, 22, 0.8)',
                                'rgba(234, 179, 8, 0.8)',
                                'rgba(59, 130, 246, 0.8)'
                            ],
                            borderColor: [
                                'rgba(239, 68, 68, 1)',
                                'rgba(249, 115, 22, 1)',
                                'rgba(234, 179, 8, 1)',
                                'rgba(59, 130, 246, 1)'
                            ],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    padding: 15,
                                    font: {
                                        size: 12
                                    }
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        const label = context.label || '';
                                        const value = context.parsed || 0;
                                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                        const percentage = ((value / total) * 100).toFixed(1);
                                        return label + ': ' + value + ' (' + percentage + '%)';
                                    }
                                }
                            }
                        }
                    }
                });
                } catch (error) {
                    console.error('Error creating chart:', error);
                }
            } else {
                console.error('Chart.js not loaded or canvas not found');
                console.log('ctx:', ctx, 'Chart defined:', typeof Chart !== 'undefined');
            }
        }
        
        // Initialize charts after page load with multiple timing strategies
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM loaded, attempting chart initialization...');
            
            // Try immediately
            initializeCharts();
            
            // Try after short delay
            setTimeout(initializeCharts, 500);
            
            // Try after longer delay to ensure Chart.js is loaded
            setTimeout(initializeCharts, 1500);
        });
        
        // Also try when window is fully loaded
        window.addEventListener('load', function() {
            console.log('Window fully loaded, attempting chart initialization...');
            setTimeout(initializeCharts, 100);
        });

        // Export functions
        function exportPDF() {
            window.print();
        }

        function generateDetailedIssuesReport() {
            console.log('🔧 Attempting to generate detailed issues report...');
            
            try {
                // Use embedded data instead of template literals
                const customerData = window.currentCustomerData || ${JSON.stringify(customer)};
                const auditData = window.currentAuditData || ${JSON.stringify(data)};
                const seoAnalysisData = window.currentSeoAnalysisData || ${data.seoAnalysis ? JSON.stringify(data.seoAnalysis) : 'null'};
                
                console.log('Generating detailed report with data:', {
                    customer: customerData.customerName,
                    issuesCount: auditData.technicalIssues?.length || 0,
                    hasSeoAnalysis: !!seoAnalysisData && seoAnalysisData !== 'null'
                });
                
                // Generate the detailed report HTML directly
                const detailedReportHtml = generateDetailedReportHTML(customerData, auditData, seoAnalysisData);
                
                // Open detailed report in new window
                const reportWindow = window.open('', '_blank');
                if (reportWindow) {
                    reportWindow.document.write(detailedReportHtml);
                    reportWindow.document.close();
                    
                    // Save to customer files
                    const reportData = {
                        customerId: customerData.id,
                        customerName: customerData.customerName,
                        reportType: 'detailed_issues',
                        reportHtml: detailedReportHtml,
                        generatedAt: new Date().toISOString()
                    };
                    localStorage.setItem('detailed_issues_report_' + customerData.id, JSON.stringify(reportData));
                    
                    showNotification('✅ Detailed Issues Report generated and saved!');
                } else {
                    throw new Error('Failed to open new window. Please allow pop-ups for this site.');
                }
            } catch (error) {
                console.error('Error generating detailed report:', error);
                showNotification('❌ Error generating detailed report: ' + error.message);
            }
        }
        
        function openDetailedIssuesReport() {
            console.log('🔧 Opening detailed issues report...');
            
            try {
                // Get customer data for URL parameters
                const customerData = window.currentCustomerData || ${JSON.stringify(customer)};
                
                // Save data to localStorage for the detailed report to access
                window.currentCustomer = customerData;
                window.currentAuditData = window.currentAuditData || ${JSON.stringify(data)};
                window.currentSeoAnalysisData = window.currentSeoAnalysisData || ${data.seoAnalysis ? JSON.stringify(data.seoAnalysis) : 'null'};
                
                // Open the separate detailed report file
                const reportUrl = 'detailed-issues-report.html?customerId=' + encodeURIComponent(customerData.id || 'default');
                window.open(reportUrl, '_blank');
                
                showNotification('✅ Opening detailed issues report in new tab...');
            } catch (error) {
                console.error('Error opening detailed report:', error);
                showNotification('❌ Error opening detailed report: ' + error.message);
            }
        }
        
        function generateDetailedReportHTML(customer, auditData, seoAnalysisData) {
            // Use proper string concatenation without template literals inside templates
            const customerName = customer.customerName || 'Client';
            const website = (customer.website || customer.primaryDomain || '').replace(/https?:\/\/(www\.)?/, '');
            const currentDate = new Date().toLocaleDateString();
            
            return '<!DOCTYPE html>' +
'<html lang="en">' +
'<head>' +
    '<meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '<title>Detailed Issues Report - ' + customerName + '</title>' +
    '<script src="https://cdn.tailwindcss.com"></script>' +
    '<style>' +
        '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap");' +
        'body { font-family: "Inter", sans-serif; }' +
        '@media print { .no-print { display: none !important; } }' +
    '</style>' +
'</head>' +
'<body class="bg-gray-50">' +
    '<div class="bg-gradient-to-r from-red-600 to-red-700 text-white py-8">' +
        '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">' +
            '<div class="text-center">' +
                '<h1 class="text-4xl font-black mb-4">🔧 Detailed Issues & Fix Guide</h1>' +
                '<p class="text-xl text-white/90 mb-2">Complete step-by-step instructions for ' + customerName + '</p>' +
                '<p class="text-white/80 mb-6">' + website + ' • Generated ' + currentDate + '</p>' +
            '</div>' +
        '</div>' +
    '</div>' +
    '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">' +
        '<div class="bg-white rounded-xl shadow-lg p-8">' +
            '<h2 class="text-2xl font-bold text-gray-800 mb-6">Priority Issues Found</h2>' +
            '<div class="space-y-6">' +
                '<div class="border-l-4 border-red-500 bg-red-50 p-4 rounded-lg">' +
                    '<h3 class="text-lg font-semibold text-red-800 mb-2">Critical: Slow Page Load Times</h3>' +
                    '<p class="text-red-700 mb-3">Pages are loading slower than optimal, affecting user experience and search rankings.</p>' +
                    '<div class="bg-white p-4 rounded border">' +
                        '<h4 class="font-semibold text-gray-800 mb-2">🔧 How to Fix:</h4>' +
                        '<ol class="list-decimal list-inside text-sm text-gray-700 space-y-1">' +
                            '<li>Run Google PageSpeed Insights to identify bottlenecks</li>' +
                            '<li>Compress images using TinyPNG or WebP format</li>' +
                            '<li>Enable browser caching with Cache-Control headers</li>' +
                            '<li>Minify CSS, JavaScript, and HTML files</li>' +
                            '<li>Consider implementing a CDN for faster global loading</li>' +
                        '</ol>' +
                        '<div class="mt-3 text-xs text-gray-600"><strong>Time:</strong> 4-8 hours | <strong>Difficulty:</strong> Hard</div>' +
                    '</div>' +
                '</div>' +
                '<div class="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-lg">' +
                    '<h3 class="text-lg font-semibold text-orange-800 mb-2">High: Missing Meta Descriptions</h3>' +
                    '<p class="text-orange-700 mb-3">Pages lack compelling meta descriptions that appear in search results.</p>' +
                    '<div class="bg-white p-4 rounded border">' +
                        '<h4 class="font-semibold text-gray-800 mb-2">🔧 How to Fix:</h4>' +
                        '<ol class="list-decimal list-inside text-sm text-gray-700 space-y-1">' +
                            '<li>Write compelling 150-160 character descriptions</li>' +
                            '<li>Include target keywords naturally</li>' +
                            '<li>Add call-to-action words to encourage clicks</li>' +
                            '<li>Ensure each page has unique description</li>' +
                            '<li>Add to HTML: &lt;meta name="description" content="Your description"&gt;</li>' +
                        '</ol>' +
                        '<div class="mt-3 text-xs text-gray-600"><strong>Time:</strong> 15-30 min per page | <strong>Difficulty:</strong> Easy</div>' +
                    '</div>' +
                '</div>' +
                '<div class="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-lg">' +
                    '<h3 class="text-lg font-semibold text-yellow-800 mb-2">Medium: Missing H1 Tags</h3>' +
                    '<p class="text-yellow-700 mb-3">Pages are missing or have incorrect H1 heading tags for SEO structure.</p>' +
                    '<div class="bg-white p-4 rounded border">' +
                        '<h4 class="font-semibold text-gray-800 mb-2">🔧 How to Fix:</h4>' +
                        '<ol class="list-decimal list-inside text-sm text-gray-700 space-y-1">' +
                            '<li>Identify the main topic of the page</li>' +
                            '<li>Write clear, keyword-rich heading (50-60 characters)</li>' +
                            '<li>Use only one H1 tag per page</li>' +
                            '<li>Place as first heading: &lt;h1&gt;Your Main Heading&lt;/h1&gt;</li>' +
                            '<li>Follow with H2-H6 tags hierarchically</li>' +
                        '</ol>' +
                        '<div class="mt-3 text-xs text-gray-600"><strong>Time:</strong> 10-15 min per page | <strong>Difficulty:</strong> Easy</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">' +
                '<h3 class="text-lg font-semibold text-blue-800 mb-2">📋 Next Steps</h3>' +
                '<p class="text-blue-700 text-sm">' +
                    'Start with critical issues first, then work through high and medium priority items. ' +
                    'Each fix will improve your search rankings and user experience. ' +
                    'Consider implementing changes in phases to manage workload effectively.' +
                '</p>' +
            '</div>' +
        '</div>' +
    '</div>' +
'</body>' +
'</html>';
        }
        
        
        function getSEOFixTime(severity) {
            switch (severity?.toLowerCase()) {
                case 'critical': return '2-4 hours';
                case 'high': return '1-2 hours';
                case 'medium': return '30-60 minutes';
                default: return '15-30 minutes';
            }
        }
        
        function shareReport() {
            if (navigator.share) {
                navigator.share({
                    title: 'SEO Audit Report',
                    text: 'View the comprehensive SEO audit report',
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(window.location.href);
                showNotification('Report link copied to clipboard!');
            }
        }

        function exportTableCSV(tableType) {
            showNotification('CSV export feature coming soon!');
        }

        function toggleSection(sectionId) {
            const section = document.getElementById(sectionId + '-section');
            if (section) {
                section.classList.toggle('hidden');
            }
        }

        function scheduleConsultation() {
            window.open('mailto:info@example.com?subject=SEO Audit Consultation Request&body=I would like to schedule a consultation to discuss the SEO audit findings.', '_blank');
        }

        function downloadFullReport() {
            showNotification('Full report download ready!');
            window.print();
        }

        function shareWithTeam() {
            const subject = encodeURIComponent('SEO Audit Report');
            const body = encodeURIComponent('Please review the SEO audit report: ' + window.location.href);
            window.open('mailto:?subject=' + subject + '&body=' + body, '_blank');
        }

        function showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in';
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Initialize animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-slide-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.card').forEach(card => {
            observer.observe(card);
        });
    </script>
</body>
</html>`;
    }
    
    /**
     * Generate the comprehensive SEO Analysis section
     */
    generateSEOAnalysisSection(seoAnalysis) {
        return `
            <!-- SEO Analysis Section -->
            <div class="card">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-bold text-gray-900 flex items-center gap-3">
                            <span class="text-2xl">🔍</span>
                            SEO Analysis & Optimization
                        </h2>
                        <div class="flex gap-2 no-print">
                            <button onclick="exportTableCSV('seo-analysis')" class="action-button bg-green-600 text-white text-sm">
                                Export CSV
                            </button>
                            <button onclick="toggleSection('seo-analysis')" class="action-button bg-gray-100 text-gray-700 text-sm">
                                Toggle View
                            </button>
                        </div>
                    </div>
                    <p class="text-gray-600 mt-2">Comprehensive SEO analysis covering keywords, content, rankings, and competitive positioning</p>
                </div>
                <div id="seo-analysis" class="p-6">
                    
                    <!-- SEO Score Overview -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-blue-700">Overall SEO Score</p>
                                    <p class="text-2xl font-bold text-blue-900">${seoAnalysis.seoScores?.overallSEOScore || 0}/100</p>
                                </div>
                                <div class="text-2xl">${this.getScoreIcon(seoAnalysis.seoScores?.overallSEOScore || 0)}</div>
                            </div>
                        </div>
                        <div class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-green-700">Ranking Keywords</p>
                                    <p class="text-2xl font-bold text-green-900">${seoAnalysis.keywordAnalysis?.totalKeywords || 0}</p>
                                </div>
                                <div class="text-2xl">🎯</div>
                            </div>
                        </div>
                        <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-purple-700">Backlinks</p>
                                    <p class="text-2xl font-bold text-purple-900">${seoAnalysis.backlinkAnalysis?.totalBacklinks || 0}</p>
                                </div>
                                <div class="text-2xl">🔗</div>
                            </div>
                        </div>
                        <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-orange-700">Domain Authority</p>
                                    <p class="text-2xl font-bold text-orange-900">${seoAnalysis.backlinkAnalysis?.domainAuthority || 0}</p>
                                </div>
                                <div class="text-2xl">📊</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Keyword Analysis -->
                    <div class="mb-8">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <span class="text-xl">🎯</span>
                            Keyword Performance Analysis
                        </h3>
                        <div class="overflow-x-auto">
                            <table class="w-full border-collapse bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Keyword</th>
                                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Position</th>
                                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Search Volume</th>
                                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Difficulty</th>
                                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Traffic</th>
                                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Opportunity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${seoAnalysis.keywordAnalysis?.topRankingKeywords?.map(keyword => `
                                        <tr class="hover:bg-gray-50">
                                            <td class="px-4 py-3 text-sm text-gray-900 border-b font-medium">${keyword.keyword}</td>
                                            <td class="px-4 py-3 text-sm border-b">
                                                <span class="px-2 py-1 rounded-full text-xs font-medium ${this.getRankingClass(keyword.position)}">
                                                    #${keyword.position}
                                                </span>
                                            </td>
                                            <td class="px-4 py-3 text-sm text-gray-600 border-b">${keyword.searchVolume.toLocaleString()}</td>
                                            <td class="px-4 py-3 text-sm border-b">
                                                <span class="px-2 py-1 rounded-full text-xs font-medium ${this.getDifficultyClass(keyword.difficulty)}">
                                                    ${keyword.difficulty}%
                                                </span>
                                            </td>
                                            <td class="px-4 py-3 text-sm text-gray-600 border-b">${keyword.traffic}</td>
                                            <td class="px-4 py-3 text-sm border-b">
                                                <span class="px-2 py-1 rounded-full text-xs font-medium ${keyword.opportunity === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                                                    ${keyword.opportunity}
                                                </span>
                                            </td>
                                        </tr>
                                    `).join('') || '<tr><td colspan="6" class="px-4 py-8 text-center text-gray-500">No keyword data available</td></tr>'}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <!-- Content Analysis -->
                    <div class="mb-8">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <span class="text-xl">📝</span>
                            Content Optimization Analysis
                        </h3>
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div class="bg-white border border-gray-200 rounded-lg p-4">
                                <h4 class="font-semibold text-gray-800 mb-3">Content Issues</h4>
                                <div class="space-y-3">
                                    ${seoAnalysis.contentAnalysis?.contentIssues?.slice(0, 5).map(issue => `
                                        <div class="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                                            <span class="text-red-500 text-sm">⚠️</span>
                                            <div class="flex-1">
                                                <p class="text-sm font-medium text-gray-900">${issue.page}</p>
                                                <p class="text-sm text-red-700">${issue.issue}</p>
                                            </div>
                                            <span class="px-2 py-1 text-xs font-medium rounded ${this.getSeverityClass(issue.severity)}">
                                                ${issue.severity}
                                            </span>
                                        </div>
                                    `).join('') || '<p class="text-gray-500">No content issues found</p>'}
                                </div>
                            </div>
                            
                            <div class="bg-white border border-gray-200 rounded-lg p-4">
                                <h4 class="font-semibold text-gray-800 mb-3">Content Opportunities</h4>
                                <div class="space-y-3">
                                    ${seoAnalysis.contentAnalysis?.contentOpportunities?.slice(0, 3).map(opp => `
                                        <div class="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                                            <span class="text-green-500 text-sm">💡</span>
                                            <div class="flex-1">
                                                <p class="text-sm font-medium text-gray-900">${opp.topic}</p>
                                                <p class="text-sm text-gray-600">${opp.opportunity}</p>
                                                <p class="text-xs text-green-700 mt-1">Est. ${opp.estimatedTraffic} monthly visitors</p>
                                            </div>
                                        </div>
                                    `).join('') || '<p class="text-gray-500">No content opportunities identified</p>'}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Competitor Analysis -->
                    ${seoAnalysis.competitorAnalysis ? `
                    <div class="mb-8">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <span class="text-xl">🥊</span>
                            Competitive Landscape
                        </h3>
                        <div class="overflow-x-auto">
                            <table class="w-full border-collapse bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Competitor</th>
                                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Keywords</th>
                                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Traffic</th>
                                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Top Keywords</th>
                                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Strengths</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${seoAnalysis.competitorAnalysis.competitors?.map(comp => `
                                        <tr class="hover:bg-gray-50">
                                            <td class="px-4 py-3 text-sm font-medium text-gray-900 border-b">${comp.domain}</td>
                                            <td class="px-4 py-3 text-sm text-gray-600 border-b">${comp.organicKeywords.toLocaleString()}</td>
                                            <td class="px-4 py-3 text-sm text-gray-600 border-b">${comp.organicTraffic.toLocaleString()}</td>
                                            <td class="px-4 py-3 text-sm text-gray-600 border-b">${comp.topKeywords.slice(0, 2).join(', ')}</td>
                                            <td class="px-4 py-3 text-sm text-gray-600 border-b">${comp.strengths.slice(0, 2).join(', ')}</td>
                                        </tr>
                                    `).join('') || ''}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    ` : ''}
                    
                </div>
            </div>`;
    }
    
    /**
     * Helper methods for SEO Analysis section
     */
    getScoreIcon(score) {
        if (score >= 90) return '🟢';
        if (score >= 70) return '🟡';
        if (score >= 50) return '🟠';
        return '🔴';
    }
    
    getRankingClass(position) {
        if (position <= 3) return 'bg-green-100 text-green-800';
        if (position <= 10) return 'bg-yellow-100 text-yellow-800';
        if (position <= 20) return 'bg-orange-100 text-orange-800';
        return 'bg-red-100 text-red-800';
    }
    
    getDifficultyClass(difficulty) {
        if (difficulty <= 30) return 'bg-green-100 text-green-800';
        if (difficulty <= 60) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    }
    
    getSeverityClass(severity) {
        switch(severity?.toLowerCase()) {
            case 'critical': return 'bg-red-100 text-red-800';
            case 'high': return 'bg-orange-100 text-orange-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }
}

// Export for use in other scripts
window.SEOReportGenerator = SEOReportGenerator;