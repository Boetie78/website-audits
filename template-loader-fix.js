/**
 * Template Loader Fix for CORS Issues
 * Provides alternative methods to load templates when CORS policies block fetch()
 */

class TemplateLoaderFix {
    constructor() {
        this.templates = new Map();
        this.initializeEmbeddedTemplates();
    }

    /**
     * Initialize embedded templates to avoid CORS issues
     */
    initializeEmbeddedTemplates() {
        // Basic report template fallback
        const basicTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[COMPANY_NAME] - SEO Audit Report</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        .metric-card { transition: all 0.3s ease; }
        .metric-card:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .progress-bar { transition: width 1s ease-in-out; }
        .kpi-number { font-family: 'Inter', sans-serif; font-weight: 700; }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900">[COMPANY_NAME]</h1>
                    <p class="text-lg text-gray-600">SEO Audit Report</p>
                    <p class="text-sm text-gray-500">Generated [DATE] • [WEBSITE]</p>
                </div>
                <div class="text-right">
                    <div class="text-4xl font-bold text-blue-600">[OVERALL_SCORE]</div>
                    <div class="text-sm text-gray-500">Overall Score</div>
                </div>
            </div>
        </div>
    </div>

    <!-- KPI Cards -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="metric-card bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <span class="text-red-600 font-semibold">!</span>
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-2xl font-bold text-gray-900 kpi-number">[CRITICAL_ISSUES]</div>
                        <p class="text-xs text-gray-500">Critical Issues</p>
                        <p class="text-xs text-red-600">Immediate action required</p>
                    </div>
                </div>
            </div>

            <div class="metric-card bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                            <span class="text-yellow-600 font-semibold">⚠</span>
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-2xl font-bold text-gray-900 kpi-number">[MAJOR_ISSUES]</div>
                        <p class="text-xs text-gray-500">Major Issues</p>
                        <p class="text-xs text-yellow-600">Should be addressed soon</p>
                    </div>
                </div>
            </div>

            <div class="metric-card bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span class="text-blue-600 font-semibold">i</span>
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-2xl font-bold text-gray-900 kpi-number">[MINOR_ISSUES]</div>
                        <p class="text-xs text-gray-500">Minor Issues</p>
                        <p class="text-xs text-blue-600">Can be improved</p>
                    </div>
                </div>
            </div>

            <div class="metric-card bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span class="text-green-600 font-semibold">📄</span>
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-2xl font-bold text-gray-900 kpi-number">[PAGES_ANALYZED]</div>
                        <p class="text-xs text-gray-500">Pages Analyzed</p>
                        <p class="text-xs text-green-600">Total pages crawled</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Performance Section -->
        <div class="bg-white rounded-lg shadow-sm mb-8">
            <div class="px-6 py-4 border-b border-gray-200">
                <h2 class="text-xl font-semibold text-gray-900">Performance Analysis</h2>
            </div>
            <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="text-center">
                        <div class="text-3xl font-bold text-blue-600">[DESKTOP_SCORE]</div>
                        <div class="text-sm text-gray-500">Desktop Score</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-red-600">[MOBILE_SCORE]</div>
                        <div class="text-sm text-gray-500">Mobile Score</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-green-600">[LOAD_TIME]s</div>
                        <div class="text-sm text-gray-500">Average Load Time</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Technical SEO Section -->
        <div class="bg-white rounded-lg shadow-sm mb-8">
            <div class="px-6 py-4 border-b border-gray-200">
                <h2 class="text-xl font-semibold text-gray-900">Technical SEO</h2>
            </div>
            <div class="p-6">
                <p class="text-gray-600">Technical SEO analysis results will be displayed here.</p>
            </div>
        </div>

        <!-- Backlinks Section -->
        <div class="bg-white rounded-lg shadow-sm mb-8">
            <div class="px-6 py-4 border-b border-gray-200">
                <h2 class="text-xl font-semibold text-gray-900">Backlink Analysis</h2>
            </div>
            <div class="p-6">
                <p class="text-gray-600">Backlink analysis results will be displayed here.</p>
            </div>
        </div>

        <!-- Recommendations Section -->
        <div class="bg-white rounded-lg shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200">
                <h2 class="text-xl font-semibold text-gray-900">Recommendations</h2>
            </div>
            <div class="p-6">
                <p class="text-gray-600">SEO recommendations will be displayed here.</p>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <div class="bg-white border-t border-gray-200 mt-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p class="text-center text-sm text-gray-500">
                Report generated on [DATE] • Powered by Automated SEO Audit System
            </p>
        </div>
    </div>
</body>
</html>`;

        this.templates.set('basic', basicTemplate);
    }

    /**
     * Try to load template using multiple methods to avoid CORS issues
     */
    async loadTemplate(templateName = 'promac-report-rebuild.html') {
        // Method 1: Try fetch (works when served from HTTP server)
        try {
            const response = await fetch(templateName);
            if (response.ok) {
                const template = await response.text();
                console.log('✅ Template loaded via fetch');
                return template;
            }
        } catch (error) {
            console.log('⚠️ Fetch method failed (CORS issue expected for local files)');
        }

        // Method 2: Try to get from existing DOM element with the template content
        const templateElement = document.getElementById('report-template');
        if (templateElement) {
            console.log('✅ Template loaded from DOM element');
            return templateElement.innerHTML;
        }

        // Method 3: Try to find template in global variable
        if (window.REPORT_TEMPLATE) {
            console.log('✅ Template loaded from global variable');
            return window.REPORT_TEMPLATE;
        }

        // Method 4: Use embedded fallback template
        console.log('✅ Using embedded fallback template');
        return this.templates.get('basic');
    }

    /**
     * Load the actual Promac template if available
     */
    async loadPromacTemplate() {
        return await this.loadTemplate('promac-report-rebuild.html');
    }

    /**
     * Provide template loading method that handles CORS issues gracefully
     */
    static async safeLoadTemplate(templatePath) {
        const loader = new TemplateLoaderFix();
        return await loader.loadTemplate(templatePath);
    }
}

// Global instance for easy access
window.templateLoaderFix = new TemplateLoaderFix();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TemplateLoaderFix;
}