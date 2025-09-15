/**
 * Technical Issues Export System with Actionable Fix Recommendations
 * Provides detailed page-by-page technical issue analysis with specific implementation instructions
 * For integration with MCP automation tools
 */

class TechnicalIssuesExportSystem {
    constructor() {
        this.issueTypes = this.initializeIssueTypes();
        this.fixRecommendations = this.initializeFixRecommendations();
    }

    /**
     * Initialize comprehensive technical issue types with MCP detection methods
     */
    initializeIssueTypes() {
        return {
            // Critical Issues
            'https_missing': {
                severity: 'Critical',
                category: 'Security',
                description: 'Website not using HTTPS encryption',
                impact: 'High - Search engine penalties, security warnings to users'
            },
            'mobile_responsive_fail': {
                severity: 'Critical',
                category: 'Mobile',
                description: 'Page not mobile-responsive',
                impact: 'High - Poor mobile user experience, mobile search penalties'
            },
            'page_speed_critical': {
                severity: 'Critical',
                category: 'Performance',
                description: 'Page load time exceeds 5 seconds',
                impact: 'High - High bounce rate, poor user experience, search ranking impact'
            },
            'broken_links': {
                severity: 'Critical',
                category: 'Technical',
                description: '404 errors or broken internal/external links',
                impact: 'High - Poor user experience, crawl budget waste'
            },

            // High Priority Issues
            'meta_description_missing': {
                severity: 'High',
                category: 'SEO Content',
                description: 'Missing meta description tag',
                impact: 'Medium - Reduced SERP click-through rates'
            },
            'meta_description_length': {
                severity: 'High',
                category: 'SEO Content',
                description: 'Meta description too short (<120 chars) or too long (>160 chars)',
                impact: 'Medium - Truncated SERP snippets, reduced click-through rates'
            },
            'title_tag_missing': {
                severity: 'High',
                category: 'SEO Content',
                description: 'Missing or empty title tag',
                impact: 'High - No SERP title display, major SEO impact'
            },
            'title_tag_length': {
                severity: 'High',
                category: 'SEO Content',
                description: 'Title tag too short (<30 chars) or too long (>60 chars)',
                impact: 'Medium - Truncated SERP titles, reduced effectiveness'
            },
            'h1_missing': {
                severity: 'High',
                category: 'SEO Structure',
                description: 'Missing H1 heading tag',
                impact: 'Medium - Reduced content structure clarity for search engines'
            },
            'h1_multiple': {
                severity: 'High',
                category: 'SEO Structure',
                description: 'Multiple H1 tags on single page',
                impact: 'Medium - Diluted heading hierarchy, SEO confusion'
            },
            'xml_sitemap_missing': {
                severity: 'High',
                category: 'Technical',
                description: 'XML sitemap not found or not submitted',
                impact: 'Medium - Reduced crawl efficiency, indexing delays'
            },

            // Medium Priority Issues
            'images_missing_alt': {
                severity: 'Medium',
                category: 'Accessibility',
                description: 'Images missing alt text attributes',
                impact: 'Medium - Accessibility issues, missed SEO opportunities'
            },
            'images_oversized': {
                severity: 'Medium',
                category: 'Performance',
                description: 'Unoptimized large image files',
                impact: 'Medium - Slower page load times, bandwidth waste'
            },
            'robots_txt_missing': {
                severity: 'Medium',
                category: 'Technical',
                description: 'robots.txt file missing',
                impact: 'Low - Missed crawl control opportunities'
            },
            'canonical_missing': {
                severity: 'Medium',
                category: 'SEO Technical',
                description: 'Missing canonical URL tags',
                impact: 'Medium - Potential duplicate content issues'
            },
            'schema_markup_missing': {
                severity: 'Medium',
                category: 'SEO Enhancement',
                description: 'No structured data/schema markup detected',
                impact: 'Medium - Missed rich snippet opportunities'
            },
            'internal_links_insufficient': {
                severity: 'Medium',
                category: 'SEO Structure',
                description: 'Insufficient internal linking structure',
                impact: 'Medium - Poor page authority distribution'
            },

            // Low Priority Issues
            'favicon_missing': {
                severity: 'Low',
                category: 'UX',
                description: 'Missing favicon',
                impact: 'Low - Reduced brand recognition in browser tabs'
            },
            'outdated_jquery': {
                severity: 'Low',
                category: 'Technical',
                description: 'Outdated JavaScript libraries detected',
                impact: 'Low - Potential security vulnerabilities, performance impact'
            }
        };
    }

    /**
     * Initialize actionable fix recommendations with implementation details
     */
    initializeFixRecommendations() {
        return {
            'https_missing': {
                title: 'Implement SSL/HTTPS Encryption',
                steps: [
                    '1. Purchase SSL certificate from hosting provider or use free Let\'s Encrypt',
                    '2. Install certificate on web server (contact hosting support if needed)',
                    '3. Update all internal links from http:// to https://',
                    '4. Add 301 redirects from HTTP to HTTPS in .htaccess or server config',
                    '5. Update Google Search Console and Analytics to HTTPS version',
                    '6. Test all pages to ensure proper HTTPS functionality'
                ],
                code_examples: [
                    '# .htaccess redirect example:',
                    'RewriteEngine On',
                    'RewriteCond %{HTTPS} off',
                    'RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]'
                ],
                testing: 'Use SSL checker tools to verify proper certificate installation',
                timeline: '1-3 days depending on hosting provider',
                cost: '$0-100 annually for SSL certificate'
            },

            'mobile_responsive_fail': {
                title: 'Implement Mobile-Responsive Design',
                steps: [
                    '1. Add responsive viewport meta tag to HTML head',
                    '2. Use CSS media queries for different screen sizes',
                    '3. Implement flexible grid system (CSS Grid or Flexbox)',
                    '4. Optimize images for different screen densities',
                    '5. Test touch-friendly button sizes (minimum 44px)',
                    '6. Ensure text remains readable without horizontal scrolling'
                ],
                code_examples: [
                    '<!-- Add to HTML head -->',
                    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                    '',
                    '/* CSS Media Query Example */',
                    '@media (max-width: 768px) {',
                    '  .container { width: 100%; padding: 0 15px; }',
                    '  .nav-menu { display: none; }',
                    '}'
                ],
                testing: 'Test with Google Mobile-Friendly Test tool and multiple devices',
                timeline: '1-2 weeks for comprehensive responsive redesign',
                cost: '$500-2000 for professional responsive design implementation'
            },

            'page_speed_critical': {
                title: 'Optimize Page Loading Performance',
                steps: [
                    '1. Optimize and compress images (WebP format, proper sizing)',
                    '2. Minify CSS, JavaScript, and HTML files',
                    '3. Enable browser caching with proper cache headers',
                    '4. Use Content Delivery Network (CDN) for static assets',
                    '5. Eliminate render-blocking resources',
                    '6. Reduce server response time (upgrade hosting if needed)',
                    '7. Remove unused CSS and JavaScript',
                    '8. Implement lazy loading for images and videos'
                ],
                code_examples: [
                    '<!-- Lazy loading images -->',
                    '<img src="image.jpg" loading="lazy" alt="Description">',
                    '',
                    '/* CSS minification and critical CSS inline */',
                    '<!-- Critical CSS inline in head -->',
                    '<style>/* Critical above-fold CSS here */</style>',
                    '<!-- Non-critical CSS loaded async -->',
                    '<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">'
                ],
                testing: 'Use Google PageSpeed Insights, GTmetrix, and WebPageTest',
                timeline: '1-3 weeks depending on current site complexity',
                cost: '$200-1000 for optimization tools and CDN services'
            },

            'meta_description_missing': {
                title: 'Add Optimized Meta Descriptions',
                steps: [
                    '1. Research target keywords for each page',
                    '2. Write compelling 120-160 character meta descriptions',
                    '3. Include primary keyword naturally in description',
                    '4. Add unique meta description to each page',
                    '5. Include call-to-action words when appropriate',
                    '6. Avoid duplicate meta descriptions across pages'
                ],
                code_examples: [
                    '<!-- Add to HTML head section -->',
                    '<meta name="description" content="Professional painting services in Cape Town. Get free quotes for interior & exterior painting. 15+ years experience, quality guaranteed.">',
                    '',
                    '<!-- Dynamic meta descriptions in CMS -->',
                    '<?php if ($page_description): ?>',
                    '<meta name="description" content="<?php echo htmlspecialchars($page_description); ?>">',
                    '<?php endif; ?>'
                ],
                testing: 'Check SERP appearance with Google Search Console or preview tools',
                timeline: '1-2 days for small sites, 1 week for large sites',
                cost: '$100-500 for professional SEO copywriting'
            },

            'title_tag_missing': {
                title: 'Create Optimized Title Tags',
                steps: [
                    '1. Research primary keywords for each page',
                    '2. Write descriptive 50-60 character titles',
                    '3. Include brand name at end of title',
                    '4. Front-load important keywords',
                    '5. Make titles unique for each page',
                    '6. Write for users first, search engines second'
                ],
                code_examples: [
                    '<!-- Add to HTML head section -->',
                    '<title>Professional Painting Services Cape Town | ProMac Paints</title>',
                    '',
                    '<!-- Dynamic titles in CMS -->',
                    '<title><?php echo $page_title; ?> | <?php echo $site_name; ?></title>'
                ],
                testing: 'Preview in Google SERP simulator tools',
                timeline: '1-2 days for small sites, 1 week for large sites',
                cost: '$100-300 for professional title optimization'
            },

            'h1_missing': {
                title: 'Add Proper H1 Heading Tags',
                steps: [
                    '1. Identify main topic/keyword for each page',
                    '2. Create descriptive H1 that matches page content',
                    '3. Ensure only one H1 per page',
                    '4. Make H1 different from title tag but related',
                    '5. Use H2-H6 tags for subheadings in logical hierarchy',
                    '6. Include target keywords naturally in H1'
                ],
                code_examples: [
                    '<!-- Proper heading structure -->',
                    '<h1>Professional Interior Painting Services</h1>',
                    '<h2>Why Choose Our Painting Services</h2>',
                    '<h3>Residential Painting</h3>',
                    '<h3>Commercial Painting</h3>',
                    '<h2>Our Painting Process</h2>'
                ],
                testing: 'Use browser developer tools to check heading hierarchy',
                timeline: '1 day for small sites, 3-5 days for large sites',
                cost: '$50-200 for content structure optimization'
            },

            'images_missing_alt': {
                title: 'Add Alt Text to All Images',
                steps: [
                    '1. Audit all images on website',
                    '2. Write descriptive alt text for each image (125 chars max)',
                    '3. Include keywords naturally when relevant',
                    '4. Use empty alt="" for decorative images',
                    '5. Avoid "image of" or "picture of" phrases',
                    '6. Update CMS templates to require alt text for new images'
                ],
                code_examples: [
                    '<!-- Good alt text examples -->',
                    '<img src="painter-working.jpg" alt="Professional painter applying white paint to interior wall">',
                    '<img src="before-after.jpg" alt="Living room transformation from old yellow walls to modern grey">',
                    '',
                    '<!-- Decorative image -->',
                    '<img src="decoration.png" alt="" role="presentation">'
                ],
                testing: 'Use accessibility audit tools and screen readers',
                timeline: '2-5 days depending on number of images',
                cost: '$100-500 for comprehensive alt text writing'
            },

            'xml_sitemap_missing': {
                title: 'Create and Submit XML Sitemap',
                steps: [
                    '1. Generate XML sitemap using online tools or plugins',
                    '2. Include all important pages (exclude admin/private pages)',
                    '3. Upload sitemap.xml to website root directory',
                    '4. Add sitemap location to robots.txt file',
                    '5. Submit sitemap to Google Search Console',
                    '6. Submit sitemap to Bing Webmaster Tools',
                    '7. Set up automatic sitemap updates'
                ],
                code_examples: [
                    '<!-- sitemap.xml structure -->',
                    '<?xml version="1.0" encoding="UTF-8"?>',
                    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
                    '  <url>',
                    '    <loc>https://example.com/</loc>',
                    '    <lastmod>2024-01-15</lastmod>',
                    '    <priority>1.0</priority>',
                    '  </url>',
                    '</urlset>',
                    '',
                    '# Add to robots.txt',
                    'Sitemap: https://example.com/sitemap.xml'
                ],
                testing: 'Validate sitemap using Google Search Console',
                timeline: '1-2 days for sitemap creation and submission',
                cost: '$0-100 for sitemap generation tools'
            }
        };
    }

    /**
     * Analyze page for technical issues using MCP data
     */
    async analyzePage(pageUrl, mcpOnPageData, mcpLighthouseData) {
        const issues = [];

        try {
            // Analyze HTTPS
            if (!pageUrl.startsWith('https://')) {
                issues.push({
                    type: 'https_missing',
                    page: pageUrl,
                    element: 'Protocol',
                    details: 'Page accessed via HTTP instead of HTTPS'
                });
            }

            // Analyze mobile responsiveness from lighthouse data
            if (mcpLighthouseData?.items?.[0]?.meta?.content?.lighthouse?.mobile?.performance < 50) {
                issues.push({
                    type: 'mobile_responsive_fail',
                    page: pageUrl,
                    element: 'Viewport/CSS',
                    details: `Mobile performance score: ${mcpLighthouseData.items[0].meta.content.lighthouse.mobile.performance}`
                });
            }

            // Analyze page speed from lighthouse data
            const desktopLighthouse = mcpLighthouseData?.items?.[0]?.meta?.content?.lighthouse?.desktop;
            if (desktopLighthouse?.performance < 50) {
                issues.push({
                    type: 'page_speed_critical',
                    page: pageUrl,
                    element: 'Performance',
                    details: `Desktop performance score: ${desktopLighthouse.performance}, Load time: ${desktopLighthouse.time_to_interactive}ms`
                });
            }

            // Analyze meta description from OnPage data
            const metadata = mcpOnPageData?.items?.[0]?.meta;
            if (!metadata?.description || metadata.description.length === 0) {
                issues.push({
                    type: 'meta_description_missing',
                    page: pageUrl,
                    element: '<meta name="description">',
                    details: 'No meta description found'
                });
            } else if (metadata.description.length < 120 || metadata.description.length > 160) {
                issues.push({
                    type: 'meta_description_length',
                    page: pageUrl,
                    element: '<meta name="description">',
                    details: `Meta description length: ${metadata.description.length} characters (recommended: 120-160)`
                });
            }

            // Analyze title tag
            if (!metadata?.title || metadata.title.length === 0) {
                issues.push({
                    type: 'title_tag_missing',
                    page: pageUrl,
                    element: '<title>',
                    details: 'No title tag found'
                });
            } else if (metadata.title.length < 30 || metadata.title.length > 60) {
                issues.push({
                    type: 'title_tag_length',
                    page: pageUrl,
                    element: '<title>',
                    details: `Title length: ${metadata.title.length} characters (recommended: 30-60)`
                });
            }

            // Analyze H1 tags
            const h1Count = metadata?.htags?.h1?.length || 0;
            if (h1Count === 0) {
                issues.push({
                    type: 'h1_missing',
                    page: pageUrl,
                    element: '<h1>',
                    details: 'No H1 heading tag found'
                });
            } else if (h1Count > 1) {
                issues.push({
                    type: 'h1_multiple',
                    page: pageUrl,
                    element: '<h1>',
                    details: `${h1Count} H1 tags found (should be exactly 1)`
                });
            }

            // Analyze images
            const imagesWithoutAlt = metadata?.images_without_alt || 0;
            const totalImages = metadata?.images_count || 0;
            if (imagesWithoutAlt > 0) {
                issues.push({
                    type: 'images_missing_alt',
                    page: pageUrl,
                    element: '<img>',
                    details: `${imagesWithoutAlt} out of ${totalImages} images missing alt text`
                });
            }

            // Analyze schema markup
            const schemaCount = metadata?.schema_org_markup_count || 0;
            if (schemaCount === 0) {
                issues.push({
                    type: 'schema_markup_missing',
                    page: pageUrl,
                    element: 'JSON-LD/Microdata',
                    details: 'No structured data markup detected'
                });
            }

            // Analyze canonical tags
            if (!metadata?.canonical_url) {
                issues.push({
                    type: 'canonical_missing',
                    page: pageUrl,
                    element: '<link rel="canonical">',
                    details: 'No canonical URL specified'
                });
            }

        } catch (error) {
            console.warn(`Error analyzing page ${pageUrl}:`, error);
        }

        return issues;
    }

    /**
     * Generate comprehensive CSV export data with page-by-page recommendations
     */
    async generateTechnicalIssuesCSV(auditData) {
        const csvData = [];
        const header = [
            'Page URL',
            'Issue Type',
            'Severity',
            'Category',
            'Element/Location',
            'Issue Description',
            'Impact',
            'Fix Title',
            'Implementation Steps',
            'Code Examples',
            'Testing Instructions',
            'Timeline',
            'Estimated Cost',
            'Priority Rank'
        ];

        csvData.push(header);

        // Analyze each page in the audit
        const pages = auditData.pageAnalysis?.pages || [];

        for (const page of pages) {
            try {
                // Get MCP data for this page
                const mcpOnPageData = await this.getMockOnPageData(page.url);
                const mcpLighthouseData = await this.getMockLighthouseData(page.url);

                // Analyze page for issues
                const pageIssues = await this.analyzePage(page.url, mcpOnPageData, mcpLighthouseData);

                // Add each issue to CSV with recommendations
                for (const issue of pageIssues) {
                    const issueType = this.issueTypes[issue.type];
                    const fixRecommendation = this.fixRecommendations[issue.type];

                    if (issueType && fixRecommendation) {
                        const priorityRank = this.getPriorityRank(issueType.severity);

                        csvData.push([
                            issue.page,
                            issue.type.replace(/_/g, ' ').toUpperCase(),
                            issueType.severity,
                            issueType.category,
                            issue.element,
                            issueType.description + (issue.details ? ` - ${issue.details}` : ''),
                            issueType.impact,
                            fixRecommendation.title,
                            fixRecommendation.steps.join(' | '),
                            fixRecommendation.code_examples?.join(' | ') || '',
                            fixRecommendation.testing,
                            fixRecommendation.timeline,
                            fixRecommendation.cost,
                            priorityRank
                        ]);
                    }
                }

            } catch (error) {
                console.warn(`Error processing page ${page.url}:`, error);
            }
        }

        // Sort by priority rank (Critical first)
        csvData.sort((a, b) => {
            if (a === header) return -1;
            if (b === header) return 1;
            return a[13] - b[13]; // Priority Rank column
        });

        return csvData;
    }

    /**
     * Convert priority severity to numeric rank
     */
    getPriorityRank(severity) {
        const ranks = {
            'Critical': 1,
            'High': 2,
            'Medium': 3,
            'Low': 4
        };
        return ranks[severity] || 5;
    }

    /**
     * Mock function - replace with real MCP OnPage data
     */
    async getMockOnPageData(url) {
        return {
            items: [{
                meta: {
                    title: 'Sample Page Title',
                    description: 'Sample meta description for testing',
                    htags: { h1: ['Main Heading'] },
                    images_count: 10,
                    images_without_alt: 3,
                    schema_org_markup_count: 0,
                    canonical_url: url
                }
            }]
        };
    }

    /**
     * Mock function - replace with real MCP Lighthouse data
     */
    async getMockLighthouseData(url) {
        return {
            items: [{
                meta: {
                    content: {
                        lighthouse: {
                            desktop: {
                                performance: 65,
                                time_to_interactive: 3500
                            },
                            mobile: {
                                performance: 45
                            }
                        }
                    }
                }
            }]
        };
    }

    /**
     * Convert CSV data to downloadable format
     */
    formatCSVForDownload(csvData) {
        return csvData.map(row =>
            row.map(cell =>
                typeof cell === 'string' && (cell.includes(',') || cell.includes('"') || cell.includes('\n'))
                    ? `"${cell.replace(/"/g, '""')}"`
                    : cell
            ).join(',')
        ).join('\n');
    }
}

// Export for use in other files
if (typeof window !== 'undefined') {
    window.TechnicalIssuesExportSystem = TechnicalIssuesExportSystem;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TechnicalIssuesExportSystem;
}