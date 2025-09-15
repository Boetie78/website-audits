/**
 * MCP Development Fallback System
 * Provides mock data when real MCP tools are not available (e.g., in browser)
 */

class MCPDevelopmentFallback {
    constructor() {
        this.isProductionMode = false; // Set to true when real MCP tools are available
        this.mockDelay = 1000; // Simulate API delay
    }

    /**
     * Check if MCP tools are available
     */
    areMCPToolsAvailable() {
        return typeof mcp__dataforseo__on_page_lighthouse === 'function';
    }

    /**
     * Mock Lighthouse API call
     */
    async mockLighthouseAPI(url) {
        await this.simulateDelay();

        return {
            items: [{
                meta: {
                    content: {
                        lighthouse: {
                            performance: Math.floor(Math.random() * 30) + 60, // 60-90
                            accessibility: Math.floor(Math.random() * 20) + 80, // 80-100
                            best_practices: Math.floor(Math.random() * 25) + 70, // 70-95
                            seo: Math.floor(Math.random() * 20) + 75, // 75-95
                            pwa: Math.floor(Math.random() * 40) + 30 // 30-70
                        }
                    }
                }
            }]
        };
    }

    /**
     * Mock Backlinks API call
     */
    async mockBacklinksAPI(domain) {
        await this.simulateDelay();

        return {
            items: [{
                referring_domains: Math.floor(Math.random() * 500) + 50,
                backlinks: Math.floor(Math.random() * 2000) + 200,
                referring_main_domains: Math.floor(Math.random() * 300) + 30,
                referring_ips: Math.floor(Math.random() * 400) + 40
            }]
        };
    }

    /**
     * Mock Keywords API call
     */
    async mockKeywordsAPI(domain) {
        await this.simulateDelay();

        const keywords = [
            'business solutions', 'tools online', 'ecommerce platform',
            'digital services', 'web tools', 'business software'
        ];

        return {
            items: keywords.map(keyword => ({
                keyword_data: {
                    keyword: keyword,
                    keyword_info: {
                        search_volume: Math.floor(Math.random() * 5000) + 100,
                        competition: Math.random(),
                        cpc: (Math.random() * 3).toFixed(2)
                    }
                },
                ranked_serp_element: {
                    serp_item: {
                        rank_group: Math.floor(Math.random() * 50) + 1,
                        rank_absolute: Math.floor(Math.random() * 50) + 1
                    }
                }
            }))
        };
    }

    /**
     * Mock Competitors API call
     */
    async mockCompetitorsAPI(domain) {
        await this.simulateDelay();

        const competitors = [
            'competitor1.com', 'competitor2.com', 'competitor3.com'
        ];

        return {
            items: competitors.map(comp => ({
                target: comp,
                metrics: {
                    organic: {
                        count: Math.floor(Math.random() * 1000) + 100,
                        etv: Math.floor(Math.random() * 10000) + 1000,
                        impressions_etv: Math.floor(Math.random() * 50000) + 5000
                    }
                }
            }))
        };
    }

    /**
     * Mock Technical SEO analysis
     */
    async mockTechnicalSEO(url) {
        await this.simulateDelay();

        return {
            meta: {
                title: {
                    length: Math.floor(Math.random() * 40) + 30,
                    pixel_width: Math.floor(Math.random() * 200) + 400
                },
                description: {
                    length: Math.floor(Math.random() * 60) + 120,
                    pixel_width: Math.floor(Math.random() * 300) + 600
                },
                h1: {
                    length: Math.floor(Math.random() * 30) + 20
                }
            },
            page_metrics: {
                html_size: Math.floor(Math.random() * 100000) + 50000,
                internal_links_count: Math.floor(Math.random() * 50) + 10,
                external_links_count: Math.floor(Math.random() * 20) + 5,
                images_count: Math.floor(Math.random() * 30) + 5,
                scripts_count: Math.floor(Math.random() * 15) + 3,
                stylesheets_count: Math.floor(Math.random() * 10) + 2
            }
        };
    }

    /**
     * Simulate API delay
     */
    async simulateDelay() {
        return new Promise(resolve => setTimeout(resolve, this.mockDelay));
    }

    /**
     * Generic MCP API call with fallback
     */
    async callMCPWithFallback(mcpFunction, fallbackFunction, ...args) {
        try {
            if (this.areMCPToolsAvailable() && this.isProductionMode) {
                console.log('🔄 Using real MCP API...');
                return await mcpFunction(...args);
            } else {
                console.log('🧪 Using mock data (MCP tools not available in browser)');
                return await fallbackFunction(...args);
            }
        } catch (error) {
            console.warn('⚠️ MCP API failed, using fallback:', error);
            return await fallbackFunction(...args);
        }
    }

    /**
     * Safe Lighthouse API call
     */
    async safeLighthouseCall(url) {
        return this.callMCPWithFallback(
            () => mcp__dataforseo__on_page_lighthouse({ url }),
            () => this.mockLighthouseAPI(url),
            url
        );
    }

    /**
     * Safe Backlinks API call
     */
    async safeBacklinksCall(domain) {
        return this.callMCPWithFallback(
            () => mcp__dataforseo__backlinks_bulk_referring_domains({ targets: [domain] }),
            () => this.mockBacklinksAPI(domain),
            domain
        );
    }

    /**
     * Safe Keywords API call
     */
    async safeKeywordsCall(domain) {
        return this.callMCPWithFallback(
            () => mcp__dataforseo__dataforseo_labs_google_ranked_keywords({ target: domain }),
            () => this.mockKeywordsAPI(domain),
            domain
        );
    }

    /**
     * Safe Competitors API call
     */
    async safeCompetitorsCall(domain) {
        return this.callMCPWithFallback(
            () => mcp__dataforseo__dataforseo_labs_google_competitors_domain({ target: domain }),
            () => this.mockCompetitorsAPI(domain),
            domain
        );
    }

    /**
     * Safe Technical SEO call
     */
    async safeTechnicalSEOCall(url) {
        return this.callMCPWithFallback(
            () => mcp__dataforseo__on_page_instant_pages({ url }),
            () => this.mockTechnicalSEO(url),
            url
        );
    }
}

// Global instance
window.mcpFallback = new MCPDevelopmentFallback();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MCPDevelopmentFallback;
}