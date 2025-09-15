/**
 * MCP Tool Validator - Tests all MCP tools used in the workflow
 * Validates real MCP API calls for SEO audit data collection
 */

class MCPToolValidator {
    constructor() {
        this.validationResults = {};
        this.testResults = [];
    }

    /**
     * Main validation method - tests all MCP tools
     */
    async validateAllMCPTools(testWebsite = 'example.com') {
        console.log('🔍 Starting MCP Tool Validation for:', testWebsite);

        const tests = [
            { name: 'Lighthouse Performance', tool: 'mcp__dataforseo__on_page_lighthouse' },
            { name: 'Backlinks Analysis', tool: 'mcp__dataforseo__backlinks_bulk_referring_domains' },
            { name: 'Keyword Rankings', tool: 'mcp__dataforseo__dataforseo_labs_google_ranked_keywords' },
            { name: 'Technical SEO', tool: 'mcp__dataforseo__on_page_instant_pages' },
            { name: 'Competitor Analysis', tool: 'mcp__dataforseo__dataforseo_labs_google_competitors_domain' },
            { name: 'Content Parsing', tool: 'mcp__dataforseo__on_page_content_parsing' },
            { name: 'Keyword Ideas', tool: 'mcp__dataforseo__dataforseo_labs_google_keyword_ideas' },
            { name: 'Social Media (Firecrawl)', tool: 'mcp__firecrawl__firecrawl_scrape' }
        ];

        for (const test of tests) {
            await this.validateSingleTool(test, testWebsite);
        }

        return this.generateValidationReport();
    }

    /**
     * Test individual MCP tool
     */
    async validateSingleTool(test, website) {
        console.log(`🧪 Testing ${test.name} (${test.tool})...`);

        const startTime = Date.now();
        let result = {
            toolName: test.name,
            mcpTool: test.tool,
            status: 'pending',
            responseTime: 0,
            dataStructure: null,
            error: null
        };

        try {
            let mcpResponse;

            switch (test.tool) {
                case 'mcp__dataforseo__on_page_lighthouse':
                    mcpResponse = await this.testLighthouseCall(website);
                    break;

                case 'mcp__dataforseo__backlinks_bulk_referring_domains':
                    mcpResponse = await this.testBacklinksCall(website);
                    break;

                case 'mcp__dataforseo__dataforseo_labs_google_ranked_keywords':
                    mcpResponse = await this.testKeywordsCall(website);
                    break;

                case 'mcp__dataforseo__on_page_instant_pages':
                    mcpResponse = await this.testTechnicalSEOCall(website);
                    break;

                case 'mcp__dataforseo__dataforseo_labs_google_competitors_domain':
                    mcpResponse = await this.testCompetitorsCall(website);
                    break;

                case 'mcp__dataforseo__on_page_content_parsing':
                    mcpResponse = await this.testContentParsingCall(website);
                    break;

                case 'mcp__dataforseo__dataforseo_labs_google_keyword_ideas':
                    mcpResponse = await this.testKeywordIdeasCall(website);
                    break;

                case 'mcp__firecrawl__firecrawl_scrape':
                    mcpResponse = await this.testFirecrawlCall(website);
                    break;

                default:
                    throw new Error('Unknown MCP tool');
            }

            result.status = 'success';
            result.responseTime = Date.now() - startTime;
            result.dataStructure = this.analyzeDataStructure(mcpResponse);

            console.log(`✅ ${test.name} validated successfully (${result.responseTime}ms)`);

        } catch (error) {
            result.status = 'failed';
            result.responseTime = Date.now() - startTime;
            result.error = error.message;

            console.error(`❌ ${test.name} validation failed:`, error.message);
        }

        this.testResults.push(result);
        return result;
    }

    /**
     * Test Lighthouse MCP call
     */
    async testLighthouseCall(website) {
        if (typeof mcp__dataforseo__on_page_lighthouse !== 'function') {
            throw new Error('Lighthouse MCP tool not available');
        }

        return await mcp__dataforseo__on_page_lighthouse({
            url: `https://${website}`
        });
    }

    /**
     * Test Backlinks MCP call
     */
    async testBacklinksCall(website) {
        if (typeof mcp__dataforseo__backlinks_bulk_referring_domains !== 'function') {
            throw new Error('Backlinks MCP tool not available');
        }

        return await mcp__dataforseo__backlinks_bulk_referring_domains({
            targets: [website]
        });
    }

    /**
     * Test Keywords MCP call
     */
    async testKeywordsCall(website) {
        if (typeof mcp__dataforseo__dataforseo_labs_google_ranked_keywords !== 'function') {
            throw new Error('Keywords MCP tool not available');
        }

        return await mcp__dataforseo__dataforseo_labs_google_ranked_keywords({
            target: website,
            language_code: 'en',
            location_name: 'United States',
            limit: 10
        });
    }

    /**
     * Test Technical SEO MCP call
     */
    async testTechnicalSEOCall(website) {
        if (typeof mcp__dataforseo__on_page_instant_pages !== 'function') {
            throw new Error('Technical SEO MCP tool not available');
        }

        return await mcp__dataforseo__on_page_instant_pages({
            url: `https://${website}`
        });
    }

    /**
     * Test Competitors MCP call
     */
    async testCompetitorsCall(website) {
        if (typeof mcp__dataforseo__dataforseo_labs_google_competitors_domain !== 'function') {
            throw new Error('Competitors MCP tool not available');
        }

        return await mcp__dataforseo__dataforseo_labs_google_competitors_domain({
            target: website,
            language_code: 'en',
            location_name: 'United States',
            limit: 5
        });
    }

    /**
     * Test Content Parsing MCP call
     */
    async testContentParsingCall(website) {
        if (typeof mcp__dataforseo__on_page_content_parsing !== 'function') {
            throw new Error('Content Parsing MCP tool not available');
        }

        return await mcp__dataforseo__on_page_content_parsing({
            url: `https://${website}`
        });
    }

    /**
     * Test Keyword Ideas MCP call
     */
    async testKeywordIdeasCall(website) {
        if (typeof mcp__dataforseo__dataforseo_labs_google_keyword_ideas !== 'function') {
            throw new Error('Keyword Ideas MCP tool not available');
        }

        return await mcp__dataforseo__dataforseo_labs_google_keyword_ideas({
            keywords: ['business', 'services'],
            language_code: 'en',
            location_name: 'United States',
            limit: 10
        });
    }

    /**
     * Test Firecrawl MCP call for social media
     */
    async testFirecrawlCall(website) {
        if (typeof mcp__firecrawl__firecrawl_scrape !== 'function') {
            throw new Error('Firecrawl MCP tool not available');
        }

        return await mcp__firecrawl__firecrawl_scrape({
            url: `https://${website}`,
            formats: ['markdown'],
            onlyMainContent: true
        });
    }

    /**
     * Analyze data structure returned by MCP tools
     */
    analyzeDataStructure(response) {
        if (!response) return { type: 'null', hasData: false };

        const structure = {
            type: typeof response,
            hasItems: !!response.items,
            itemCount: response.items ? response.items.length : 0,
            hasData: false,
            keyFields: []
        };

        if (response.items && response.items.length > 0) {
            const firstItem = response.items[0];
            structure.hasData = true;
            structure.keyFields = Object.keys(firstItem);
        }

        return structure;
    }

    /**
     * Generate comprehensive validation report
     */
    generateValidationReport() {
        const totalTests = this.testResults.length;
        const passedTests = this.testResults.filter(r => r.status === 'success').length;
        const failedTests = totalTests - passedTests;
        const averageResponseTime = this.testResults.reduce((sum, r) => sum + r.responseTime, 0) / totalTests;

        const report = {
            summary: {
                totalTests,
                passedTests,
                failedTests,
                successRate: Math.round((passedTests / totalTests) * 100),
                averageResponseTime: Math.round(averageResponseTime)
            },
            testResults: this.testResults,
            recommendations: this.generateRecommendations()
        };

        console.log('📊 MCP Validation Report:', report);
        return report;
    }

    /**
     * Generate recommendations based on test results
     */
    generateRecommendations() {
        const recommendations = [];
        const failedTools = this.testResults.filter(r => r.status === 'failed');

        if (failedTools.length > 0) {
            recommendations.push({
                type: 'error',
                message: `${failedTools.length} MCP tools failed validation. Check MCP server connections.`,
                tools: failedTools.map(t => t.mcpTool)
            });
        }

        const slowTools = this.testResults.filter(r => r.responseTime > 10000);
        if (slowTools.length > 0) {
            recommendations.push({
                type: 'warning',
                message: `${slowTools.length} tools have slow response times (>10s). Consider optimizing.`,
                tools: slowTools.map(t => ({ name: t.toolName, time: t.responseTime }))
            });
        }

        const noDataTools = this.testResults.filter(r =>
            r.status === 'success' && r.dataStructure && !r.dataStructure.hasData
        );
        if (noDataTools.length > 0) {
            recommendations.push({
                type: 'warning',
                message: `${noDataTools.length} tools returned empty data. May need different test parameters.`,
                tools: noDataTools.map(t => t.toolName)
            });
        }

        if (recommendations.length === 0) {
            recommendations.push({
                type: 'success',
                message: 'All MCP tools passed validation! System ready for production use.',
                tools: []
            });
        }

        return recommendations;
    }

    /**
     * Test specific workflow data collection
     */
    async testWorkflowDataCollection(customerData, competitorUrls) {
        console.log('🎯 Testing complete workflow data collection...');

        const workflowTest = {
            customer: customerData,
            competitors: competitorUrls,
            results: {
                mainCustomer: null,
                competitorData: []
            },
            errors: []
        };

        try {
            // Test main customer data collection
            workflowTest.results.mainCustomer = await this.collectSingleWebsiteValidation(
                customerData.website,
                'Main Customer'
            );

            // Test each competitor
            for (let i = 0; i < competitorUrls.length; i++) {
                try {
                    const competitorResult = await this.collectSingleWebsiteValidation(
                        competitorUrls[i],
                        `Competitor ${i + 1}`
                    );
                    workflowTest.results.competitorData.push(competitorResult);
                } catch (error) {
                    workflowTest.errors.push({
                        competitor: i + 1,
                        url: competitorUrls[i],
                        error: error.message
                    });
                }
            }

            console.log('✅ Workflow data collection test completed');
            return workflowTest;

        } catch (error) {
            console.error('❌ Workflow test failed:', error);
            workflowTest.errors.push({ general: error.message });
            return workflowTest;
        }
    }

    /**
     * Validate data collection for single website
     */
    async collectSingleWebsiteValidation(websiteUrl, label) {
        const website = websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
        const fullUrl = `https://${website}`;

        console.log(`🔍 Validating data collection for ${label}: ${website}`);

        const validationData = {
            website: website,
            url: fullUrl,
            label: label,
            dataPoints: {},
            validationStatus: {}
        };

        // Test each required data collection
        const dataTests = [
            { key: 'lighthouse', test: () => this.testLighthouseCall(website) },
            { key: 'backlinks', test: () => this.testBacklinksCall(website) },
            { key: 'keywords', test: () => this.testKeywordsCall(website) },
            { key: 'technical', test: () => this.testTechnicalSEOCall(fullUrl) }
        ];

        for (const dataTest of dataTests) {
            try {
                const result = await dataTest.test();
                validationData.dataPoints[dataTest.key] = result;
                validationData.validationStatus[dataTest.key] = 'success';
            } catch (error) {
                validationData.validationStatus[dataTest.key] = 'failed';
                validationData.dataPoints[dataTest.key] = { error: error.message };
            }
        }

        return validationData;
    }
}

// Global instance
window.mcpToolValidator = new MCPToolValidator();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MCPToolValidator;
}