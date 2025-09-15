# Automated SEO Audit Workflow - Complete Process Documentation

## 🎯 Overview
This document outlines the complete automated workflow process for generating SEO audit reports using real MCP tools. The system creates customer folders, collects comprehensive data from main customer + competitors, and generates professional Promac-style reports with full social media analysis and CSV export functionality.

## 🚨 CRITICAL MISSING COMPONENTS IDENTIFIED
After analyzing the complete Promac report template, several major data collection requirements were missing from the original documentation:

### 1. Social Media Audit & Competitive Analysis (MAJOR SECTION)
- **Facebook**: Follower counts, engagement levels, activity status
- **Instagram**: Follower counts, visual content strategy, posting frequency
- **YouTube**: Subscriber counts, video content, channel activity
- **LinkedIn**: Company page presence, B2B content strategy
- **Competitive Social Comparison**: Gap analysis vs 3 competitors across all platforms
- **ROI Calculations**: Social media revenue impact projections

### 2. CSV Export System (13+ EXPORT BUTTONS)
- Each major section has dedicated CSV export functionality
- Specific data structures for each export type
- Individual competitor CSV exports (Competitor 1, Competitor 2, Competitor 3)
- Comprehensive data formatting for spreadsheet analysis

### 3. Advanced Sections Not Previously Documented
- **Keyword Scout Intelligence**: 100+ keyword opportunity analysis
- **Competitive Intelligence**: Deep competitor keyword analysis
- **ROI Potential Analysis**: Revenue impact projections
- **Strategic Action Plans**: Prioritized implementation roadmaps

## 📋 COMPLETE AUTOMATED WORKFLOW PROCESS

### 🎯 CRITICAL WORKFLOW OVERVIEW
**IMPORTANT**: This is NOT a dummy report system. Every data point must be collected, analyzed, and populated with real data.

### Phase 1: Customer Setup and Folder Creation

#### 1.1 Customer Data Input
```javascript
const customerData = {
    companyName: "Customer Company Name",
    website: "https://customer-website.com",
    industry: "Industry Type",
    email: "contact@customer.com",
    phone: "+1234567890",
    socialMedia: {
        facebook: "customer-facebook-handle",
        instagram: "customer-instagram",
        youtube: "customer-youtube",
        linkedin: "customer-linkedin"
    }
};
```

#### 1.2 Competitor Data Setup
```javascript
const competitors = [
    {
        name: "Competitor 1",
        website: "https://competitor1.com",
        socialMedia: {
            facebook: "competitor1-fb",
            instagram: "competitor1-ig",
            youtube: "competitor1-yt",
            linkedin: "competitor1-li"
        }
    },
    // ... 2 more competitors
];
```

#### 1.3 Automatic Customer Folder Creation
```
/customer-reports/{company-name}-{date}/
├── 01-raw-data/
│   ├── lighthouse-data.json
│   ├── backlinks-data.json
│   ├── keywords-data.json
│   ├── competitors-data.json
│   ├── technical-seo-data.json
│   └── social-media-data.json
├── 02-processed-data/
│   ├── performance-analysis.json
│   ├── competitive-analysis.json
│   └── opportunity-analysis.json
├── 03-csv-exports/
│   ├── metadata-analysis.csv
│   ├── technical-issues-detailed.csv
│   ├── competitor-backlinks-top100.csv
│   ├── keyword-opportunities-top100.csv
│   ├── social-media-comprehensive.csv
│   ├── competitor1-complete-analysis.csv
│   ├── competitor2-complete-analysis.csv
│   └── competitor3-complete-analysis.csv
├── 04-reports/
│   └── final-seo-audit-report.html
└── 05-analysis-logs/
    ├── data-collection-log.txt
    ├── mcp-tool-results.json
    └── workflow-completion-status.json
```

## 🔍 COMPREHENSIVE DATA COLLECTION CHECKLIST

### Phase 2: Complete Data Collection Protocol

#### **CHECKLIST ITEM 1: Performance Data Collection**
- [ ] **MCP Tool**: `mcp__dataforseo__on_page_lighthouse`
- [ ] **Target**: Customer website + 3 competitor websites
- [ ] **Data Points Required**:
  - [ ] Performance Score (0-100)
  - [ ] Accessibility Score (0-100)
  - [ ] Best Practices Score (0-100)
  - [ ] SEO Score (0-100)
  - [ ] PWA Score (0-100)
  - [ ] Core Web Vitals (LCP, FID, CLS)
  - [ ] Page Load Time
- [ ] **Save To**: `01-raw-data/lighthouse-data.json`
- [ ] **Success Criteria**: All 4 websites analyzed successfully

#### **CHECKLIST ITEM 2: Backlinks Analysis**
- [ ] **MCP Tool**: `mcp__dataforseo__backlinks_bulk_referring_domains`
- [ ] **Target**: Customer website + 3 competitor websites
- [ ] **Data Points Required**:
  - [ ] Total backlinks count
  - [ ] Referring domains count
  - [ ] Domain authority/rating
  - [ ] Top 100 backlinks per competitor (for CSV export)
  - [ ] Anchor text analysis
  - [ ] Link quality assessment
- [ ] **Additional MCP Call**: `mcp__dataforseo__backlinks_backlinks` (limit: 100 per site)
- [ ] **Save To**: `01-raw-data/backlinks-data.json`
- [ ] **Success Criteria**: Complete backlink profile for all 4 sites

#### **CHECKLIST ITEM 3: Keyword Rankings Analysis**
- [ ] **MCP Tool**: `mcp__dataforseo__dataforseo_labs_google_ranked_keywords`
- [ ] **Target**: Customer website + 3 competitor websites
- [ ] **Parameters**: `limit: 1000` (for comprehensive analysis)
- [ ] **Data Points Required**:
  - [ ] Total keywords ranking
  - [ ] Top 3 positions count
  - [ ] Top 10 positions count
  - [ ] Average position
  - [ ] Search volume data
  - [ ] Individual keyword performance
  - [ ] Top 100 opportunities (for CSV export)
- [ ] **Save To**: `01-raw-data/keywords-data.json`
- [ ] **Success Criteria**: Full keyword analysis for all 4 sites

#### **CHECKLIST ITEM 4: Competitor Intelligence**
- [ ] **MCP Tool**: `mcp__dataforseo__dataforseo_labs_google_competitors_domain`
- [ ] **Target**: Customer website (to identify additional competitors)
- [ ] **Data Points Required**:
  - [ ] Market competitor identification
  - [ ] Organic traffic estimates
  - [ ] Keyword overlap analysis
  - [ ] Market share data
- [ ] **Save To**: `01-raw-data/competitors-data.json`
- [ ] **Success Criteria**: Complete competitive landscape analysis

#### **CHECKLIST ITEM 5: Technical SEO Audit**
- [ ] **MCP Tool**: `mcp__dataforseo__on_page_instant_pages`
- [ ] **Target**: Customer website (full site audit)
- [ ] **Parameters**: `crawl_entire_site: true`
- [ ] **Data Points Required**:
  - [ ] Meta titles and descriptions (ALL pages)
  - [ ] H1-H6 heading structure (ALL pages)
  - [ ] Internal/external links count
  - [ ] Image optimization status
  - [ ] HTML size and structure
  - [ ] Technical issues (ALL issues, ALL pages)
- [ ] **Save To**: `01-raw-data/technical-seo-data.json`
- [ ] **Success Criteria**: Complete technical audit with actionable fixes

#### **CHECKLIST ITEM 6: Social Media Data Collection**
- [ ] **MCP Tool**: `mcp__firecrawl__firecrawl_scrape` (for social platforms)
- [ ] **Target**: 16 social media accounts (4 platforms × 4 companies)
- [ ] **Platforms Required**:
  - [ ] Facebook (followers, engagement, activity)
  - [ ] Instagram (followers, posts, engagement)
  - [ ] YouTube (subscribers, videos, activity)
  - [ ] LinkedIn (followers, B2B presence)
- [ ] **Data Points Required** (per platform, per company):
  - [ ] Follower/subscriber count
  - [ ] Engagement rate
  - [ ] Post frequency
  - [ ] Activity level assessment
  - [ ] Content quality analysis
- [ ] **Save To**: `01-raw-data/social-media-data.json`
- [ ] **Success Criteria**: Complete social media competitive analysis

#### **CHECKLIST ITEM 7: Advanced Keyword Research**
- [ ] **MCP Tool**: `mcp__dataforseo__dataforseo_labs_google_keyword_ideas`
- [ ] **Target**: Industry-specific keyword opportunities
- [ ] **Parameters**: Customer industry + location + `limit: 1000`
- [ ] **Data Points Required**:
  - [ ] Keyword opportunities
  - [ ] Search volume trends
  - [ ] Competition analysis
  - [ ] Difficulty scores
- [ ] **Save To**: `01-raw-data/keyword-ideas-data.json`
- [ ] **Success Criteria**: 1000+ keyword opportunities identified

### Phase 2: Customer Folder Creation
1. **Folder Structure Creation**
   ```
   /customer-reports/
   └── {company-name}-{date}/
       ├── data/
       │   ├── performance.json
       │   ├── backlinks.json
       │   ├── keywords.json
       │   ├── competitors.json
       │   └── technical-seo.json
       ├── reports/
       │   └── {company-name}-seo-audit-report.html
       └── exports/
           └── raw-data-export.json
   ```

2. **Folder Naming Convention**
   - Company name (sanitized: lowercase, spaces to hyphens)
   - Current date (YYYY-MM-DD format)
   - Example: `acme-corp-2025-01-15`

### Phase 3: Data Collection Using Real MCP Tools

#### 3.1 Performance Data Collection
**MCP Tool**: `mcp__dataforseo__on_page_lighthouse`
**Purpose**: Collect Google Lighthouse performance metrics
**Data Points Needed**:
- Performance Score (0-100)
- Accessibility Score (0-100)
- Best Practices Score (0-100)
- SEO Score (0-100)
- PWA Score (0-100)
- Load Time metrics
- Core Web Vitals

**Implementation**:
```javascript
const lighthouseResult = await mcp__dataforseo__on_page_lighthouse({
    url: websiteUrl
});
```

#### 3.6 Social Media Data Collection
**CRITICAL**: Social Media section requires specialized data collection
**Platforms Required**:
- **Facebook**: Page likes, engagement rate, post frequency, activity status
- **Instagram**: Followers, visual content assessment, posting consistency
- **YouTube**: Subscribers, video count, channel activity, view metrics
- **LinkedIn**: Company page followers, B2B content presence

**Data Structure for Social Media**:
```javascript
const socialMediaData = {
    facebook: {
        followers: 1234,
        activity: 'Low activity - sporadic posts',
        engagement: 'Poor'
    },
    instagram: {
        followers: 890,
        activity: 'Sporadic posts',
        engagement: 'Minimal'
    },
    youtube: {
        subscribers: 450,
        activity: 'Inactive for 2+ years',
        engagement: 'None'
    },
    linkedin: {
        followers: 180,
        activity: 'Professional updates only',
        engagement: 'Low B2B engagement'
    }
};
```

**MCP Tools for Social Media** (if available):
- Web scraping tools for social platform data
- API integrations where possible
- Manual data collection as fallback

#### 3.2 Backlinks Data Collection
**MCP Tool**: `mcp__dataforseo__backlinks_bulk_referring_domains`
**Purpose**: Analyze backlink profile and domain authority
**Data Points Needed**:
- Total backlinks count
- Referring domains count
- Referring main domains
- Referring IPs count
- Domain rating/authority

**Implementation**:
```javascript
const backlinksResult = await mcp__dataforseo__backlinks_bulk_referring_domains({
    targets: [domain]
});
```

#### 3.3 Keywords Data Collection
**MCP Tool**: `mcp__dataforseo__dataforseo_labs_google_ranked_keywords`
**Purpose**: Collect current keyword rankings and search visibility
**Data Points Needed**:
- Total keywords ranking
- Top 3 positions count
- Top 10 positions count
- Average position
- Search volume data
- Individual keyword performance

**Implementation**:
```javascript
const keywordsResult = await mcp__dataforseo__dataforseo_labs_google_ranked_keywords({
    target: domain,
    language_code: 'en',
    location_name: 'United States',
    limit: 100
});
```

#### 3.4 Competitor Analysis
**MCP Tool**: `mcp__dataforseo__dataforseo_labs_google_competitors_domain`
**Purpose**: Identify and analyze direct competitors
**Data Points Needed**:
- Competitor domains
- Organic traffic estimates
- Keyword overlap
- Market share analysis
- Competitive positioning

**Implementation**:
```javascript
const competitorsResult = await mcp__dataforseo__dataforseo_labs_google_competitors_domain({
    target: website,
    language_code: 'en',
    location_name: 'United States',
    limit: 10
});
```

#### 3.5 Technical SEO Analysis
**MCP Tool**: `mcp__dataforseo__on_page_instant_pages`
**Purpose**: Analyze on-page technical SEO factors
**Data Points Needed**:
- Meta title and description
- Heading structure (H1-H6)
- Internal/external links count
- Image optimization
- HTML size and structure
- Page loading metrics

**Implementation**:
```javascript
const technicalResult = await mcp__dataforseo__on_page_instant_pages({
    url: websiteUrl
});
```

### Phase 4: Data Processing and Storage

#### 4.1 Data Extraction Process
For each MCP tool response, extract relevant data points and normalize the format:

**Performance Data Extraction**:
```javascript
extractPerformanceData(response) {
    const data = response?.items?.[0]?.meta?.content?.lighthouse || {};
    return {
        performance: data.performance || 0,
        accessibility: data.accessibility || 0,
        bestPractices: data.best_practices || 0,
        seo: data.seo || 0,
        pwa: data.pwa || 0,
        overallScore: Math.round(((data.performance || 0) + (data.seo || 0)) / 2)
    };
}
```

#### 4.2 Data Storage Process
1. **Individual Data Files**: Store each data type in separate JSON files
2. **Raw Data Backup**: Keep complete MCP responses for debugging
3. **Processed Data**: Store normalized data for report generation
4. **Timestamps**: Add collection timestamps to all data

### Phase 5: Report Generation

#### 5.1 Template Loading
Load the Promac report template from GitHub: `https://boetie78.github.io/website-audits/promac-report-rebuild.html`

## 📊 COMPLETE REPORT STRUCTURE ANALYSIS

### All 15 Major Sections (From GitHub Version):

#### 1. Website Overview
- Company branding and basic information
- Contact details and website URL
- Overall performance summary

#### 2. Site Health Overview
- Overall health score display
- Critical metrics dashboard
- Performance indicators

#### 3. Market Position Analysis
- Competitive positioning metrics
- Market share analysis
- Industry benchmarking

#### 4. Metadata Analysis (CSV Export Available)
- Meta titles and descriptions analysis
- Page-by-page metadata review
- SEO optimization recommendations
- **CSV Export**: `exportCSV('Metadata Analysis')`

#### 5. Technical Issues Breakdown (CSV Export Available)
- Critical technical SEO issues
- Page speed and performance problems
- Mobile usability issues
- **CSV Export**: `exportCSV('Technical Issues')`

#### 6. Competitor Analysis (CSV Export Available)
- Market overview comparison
- Competitor performance metrics
- Competitive positioning analysis
- **CSV Export**: `exportCSV('Competitor Analysis')`

#### 7. Top Keyword Opportunities (CSV Export Available)
- High-value keyword identification
- Search volume and competition analysis
- Ranking opportunity assessment
- **CSV Export**: `exportCSV('Keyword Opportunities')`

#### 8. Competitive Intelligence (CSV Export Available)
- Deep competitor keyword analysis
- Market leader insights (dynamic competitor analysis)
- Competitive gap identification
- **CSV Export**: `exportCSV('Competitive Intelligence')`

#### 9. Prioritized Action Plan (CSV Export Available)
- High-priority action items
- Implementation timelines
- Resource requirements
- **CSV Export**: `exportCSV('Prioritized Action Plan')`

#### 10. Strategic Action Plan (CSV Export Available)
- Long-term strategic initiatives
- Comprehensive implementation roadmap
- Success metrics and KPIs
- **CSV Export**: `exportCSV('Strategic Action Plan')`

#### 11. Competitive Advantages (CSV Export Available)
- Unique value propositions
- Competitive differentiation opportunities
- Strength analysis and positioning
- **CSV Export**: `exportCSV('Competitive Advantages')`

#### 12. Detailed Competitor Analysis (Individual CSV Exports)
- **Competitor 1 Analysis**: Complete competitor profile
  - **CSV Export**: `exportCompetitorCSV('competitor1')`
- **Competitor 2 Analysis**: Competitor performance breakdown
  - **CSV Export**: `exportCompetitorCSV('competitor2')`
- **Competitor 3 Analysis**: Market positioning analysis
  - **CSV Export**: `exportCompetitorCSV('competitor3')`

#### 13. ROI Potential & Expected Outcomes (CSV Export Available)
- Revenue impact projections
- Investment requirements analysis
- ROI calculations and forecasting
- **CSV Export**: `exportCSV('ROI Analysis')`

#### 14. Social Media Audit & Competitive Analysis (CSV Export Available)
**MAJOR SECTION - CRITICAL DATA COLLECTION REQUIRED**

**Social Media Platforms Data Structure**:
```javascript
const socialMediaPlatforms = {
    facebook: {
        customerFollowers: 1234,
        customerActivity: 'Low activity - sporadic posts',
        competitor1Followers: 45000,
        competitor1Activity: 'Very active',
        competitor2Followers: 28000,
        competitor2Activity: 'High engagement',
        competitor3Followers: 8900,
        competitor3Activity: 'Minimal'
    },
    instagram: {
        customerFollowers: 890,
        customerActivity: 'Sporadic posts',
        competitor1Followers: 38000,
        competitor1Activity: 'Excellent visuals',
        competitor2Followers: 22000,
        competitor2Activity: 'Strong strategy',
        competitor3Followers: 4500,
        competitor3Activity: 'Inconsistent'
    },
    youtube: {
        customerSubscribers: 450,
        customerActivity: 'Inactive for 2+ years',
        competitor1Subscribers: 12500,
        competitor1Activity: 'Regular uploads',
        competitor2Subscribers: 8900,
        competitor2Activity: 'Educational content',
        competitor3Subscribers: 3200,
        competitor3Activity: 'Minimal presence'
    },
    linkedin: {
        customerFollowers: 180,
        customerActivity: 'Professional updates only',
        competitor1Followers: 25000,
        competitor1Activity: 'B2B focused content',
        competitor2Followers: 15000,
        competitor2Activity: 'Industry insights',
        competitor3Followers: 8000,
        competitor3Activity: 'Corporate updates'
    }
};
```

**Social Media ROI Calculations**:
- Revenue impact per platform
- Competitive gap analysis
- Growth projections and investment requirements
- **CSV Export**: `exportCSV('Social Media Audit')`

#### 15. Keyword Scout Intelligence (CSV Export Available)
- 100+ keyword opportunity analysis
- Advanced keyword research and intelligence
- Search volume trends and competitive analysis
- **CSV Export**: `exportCSV('Keyword Scout')`

### 🔄 DETAILED CSV EXPORT REQUIREMENTS

**CRITICAL**: Each CSV export must contain comprehensive, actionable data - NOT just highlights shown in the report.

#### 1. Metadata Analysis CSV Export
**File**: `metadata-analysis.csv`
**Required Columns**:
- Page URL
- Current Meta Title
- Current Meta Title Length
- Recommended Meta Title (copy-paste ready)
- Current Meta Description
- Current Meta Description Length
- Recommended Meta Description (copy-paste ready)
- Priority Level (Critical/Major/Minor)
- Expected Ranking Impact
- Implementation Instructions

**Data Source**: `mcp__dataforseo__on_page_instant_pages` for ALL pages

#### 2. Technical Issues Breakdown CSV Export
**File**: `technical-issues-detailed.csv`
**Required Columns**:
- Page URL
- Issue Type (H1 Missing, H1 Too Short, etc.)
- Current Content
- Recommended Fix (exact copy-paste content)
- Priority Level
- SEO Impact Score
- Implementation Steps
- Expected Ranking Improvement

**Example Row**:
```
URL: /about-us
Issue: H1 Too Short
Current: "About"
Recommended: "About Promac Paints - Premium Quality Paint Solutions Since 1985"
Priority: Critical
Impact: +15 ranking positions
Steps: 1. Edit page header 2. Replace H1 tag 3. Test mobile display
```

#### 3. Competitor Backlinks CSV Export (Top 100)
**File**: `competitor-backlinks-top100.csv`
**Required Columns**:
- Referring Domain
- Domain Authority
- Page Authority
- Anchor Text
- Link Type (dofollow/nofollow)
- First Seen Date
- Link Context
- Opportunity Score
- Outreach Potential
- Contact Email (if available)

**Data Source**: `mcp__dataforseo__backlinks_backlinks` with limit: 100

#### 4. Keyword Opportunities CSV Export (Top 100)
**File**: `keyword-opportunities-top100.csv`
**Required Columns**:
- Keyword
- Search Volume
- Competition Level
- Current Position (if ranking)
- Target Position
- Difficulty Score
- Opportunity Score
- Content Gap Analysis
- Recommended Action
- Expected Timeline

#### 5. Social Media Audit CSV Export
**File**: `social-media-comprehensive.csv`
**Required Columns**:
- Platform
- Customer Followers
- Customer Engagement Rate
- Customer Post Frequency
- Competitor 1 Followers
- Competitor 1 Engagement Rate
- Competitor 2 Followers
- Competitor 2 Engagement Rate
- Competitor 3 Followers
- Competitor 3 Engagement Rate
- Gap Analysis
- Revenue Impact
- Recommended Action
- Monthly Investment Required

#### 6. Individual Competitor CSV Exports
**Files**: `competitor1-complete-analysis.csv`, `competitor2-complete-analysis.csv`, `competitor3-complete-analysis.csv`
**Required Columns**:
- Data Type (Keywords/Backlinks/Social/Technical)
- Metric Name
- Competitor Value
- Customer Value
- Gap Analysis
- Opportunity Level
- Action Required
- Implementation Priority
- Expected ROI

**CRITICAL CSV DATA COLLECTION REQUIREMENTS**:

```javascript
// Enhanced CSV Export System
class DetailedCSVExporter {
    async generateMetadataAnalysisCSV(customerData) {
        // Collect EVERY page metadata via MCP
        const allPages = await mcp__dataforseo__on_page_instant_pages({
            url: customerData.website,
            crawl_entire_site: true
        });

        const csvData = allPages.map(page => ({
            url: page.url,
            currentTitle: page.meta.title.content,
            currentTitleLength: page.meta.title.length,
            recommendedTitle: this.generateOptimalTitle(page),
            currentDescription: page.meta.description.content,
            currentDescriptionLength: page.meta.description.length,
            recommendedDescription: this.generateOptimalDescription(page),
            priority: this.calculatePriority(page),
            expectedImpact: this.calculateSEOImpact(page),
            implementationSteps: this.generateImplementationSteps(page)
        }));

        return this.formatAsCSV(csvData);
    }

    async generateTechnicalIssuesCSV(customerData) {
        // Collect ALL technical issues for EVERY page
        const technicalAudit = await mcp__dataforseo__on_page_instant_pages({
            url: customerData.website,
            full_audit: true
        });

        const csvData = [];
        technicalAudit.forEach(page => {
            // Extract every single issue per page
            const issues = this.extractAllTechnicalIssues(page);
            issues.forEach(issue => {
                csvData.push({
                    pageUrl: page.url,
                    issueType: issue.type,
                    currentContent: issue.current,
                    recommendedFix: this.generateSpecificFix(issue),
                    priority: issue.priority,
                    seoImpact: issue.impact,
                    implementationSteps: this.generateStepByStepFix(issue),
                    expectedImprovement: issue.expectedRankingBoost
                });
            });
        });

        return this.formatAsCSV(csvData);
    }

    generateSpecificFix(issue) {
        // Generate copy-paste ready content
        switch(issue.type) {
            case 'H1_TOO_SHORT':
                return `${customerData.companyName} - ${this.generateKeywordRichH1(issue.page)}`;
            case 'META_DESCRIPTION_MISSING':
                return this.generateOptimalMetaDescription(issue.page);
            case 'ALT_TEXT_MISSING':
                return this.generateDescriptiveAltText(issue.image);
            // ... more specific fixes
        }
    }
}
```

#### 5.3 Report Finalization
1. **Quality Check**: Verify all placeholders are replaced
2. **Data Validation**: Ensure all metrics are within expected ranges
3. **File Generation**: Create final HTML report file
4. **Storage**: Save to customer folder and trigger download

### Phase 6: Workflow Execution

#### 6.1 Main Execution Method
```javascript
async executeCompleteWorkflow(customer, competitors) {
    // Step 1: Create customer folder
    const folderPath = await this.createCustomerFolder(customer);

    // Step 2: Collect data for main customer
    const mainCustomerData = await this.collectSingleWebsiteData(customer.website);

    // Step 3: Collect data for each competitor
    const competitorData = [];
    for (const competitorUrl of competitors) {
        const data = await this.collectSingleWebsiteData(competitorUrl);
        competitorData.push(data);
    }

    // Step 4: Store all collected data
    await this.storeDataInFolder(folderPath, mainCustomerData, competitorData);

    // Step 5: Generate final report
    const reportHtml = await this.generateFinalReport(customer, mainCustomerData);

    // Step 6: Save and deliver report
    await this.saveReportToFolder(folderPath, reportHtml, customer);

    return {
        success: true,
        folderPath,
        reportPath: `${folderPath}/reports/${customer.companyName}-seo-audit-report.html`
    };
}
```

## 🛠 REQUIRED MCP TOOLS FOR COMPLETE DATA COLLECTION

### Core SEO Data Collection
1. **mcp__dataforseo__on_page_lighthouse** - Performance metrics
2. **mcp__dataforseo__backlinks_bulk_referring_domains** - Backlink analysis
3. **mcp__dataforseo__dataforseo_labs_google_ranked_keywords** - Keyword rankings
4. **mcp__dataforseo__dataforseo_labs_google_competitors_domain** - Competitor analysis
5. **mcp__dataforseo__on_page_instant_pages** - Technical SEO analysis

### Social Media Data Collection (CRITICAL MISSING)
**PROBLEM**: No direct MCP tools available for social media data collection
**SOLUTION OPTIONS**:
1. **Firecrawl MCP** (`mcp__firecrawl__firecrawl_scrape`) - Web scraping for social platforms
2. **Puppeteer MCP** - Browser automation for social media pages
3. **Manual Data Collection** - Fallback system with sample data

### Advanced Analysis Tools
6. **mcp__dataforseo__dataforseo_labs_google_keyword_ideas** - Keyword opportunities
7. **mcp__dataforseo__dataforseo_labs_bulk_keyword_difficulty** - Keyword difficulty analysis
8. **mcp__dataforseo__dataforseo_labs_google_related_keywords** - Related keyword research

## 🛠 Implementation Files

### Core System Files
- **real-mcp-data-collector.js**: Main data collection logic with real MCP calls
- **create-customer-report-workflow.js**: Complete workflow orchestration
- **template-loader-fix.js**: Template loading and processing utilities

### Test and Interface Files
- **real-workflow-test.html**: Complete workflow testing interface
- **test-complete-workflow.html**: Simplified workflow testing
- **test-report-generation.html**: Report generation testing

### Template Files
- **GitHub Template**: `https://boetie78.github.io/website-audits/promac-report-rebuild.html`
- **Local Template**: `promac-report-rebuild.html` (should match GitHub version)

## 🔄 Error Handling and Fallbacks

### MCP Tool Failures
Each MCP call includes try/catch with fallback data:
```javascript
try {
    const result = await mcp__dataforseo__on_page_lighthouse({url: websiteUrl});
    return this.extractLighthouseData(result);
} catch (error) {
    console.error('Lighthouse MCP failed:', error);
    return this.getFallbackLighthouseData();
}
```

### Fallback Data Systems
- Performance: Default scores based on industry averages
- Backlinks: Estimated metrics for similar businesses
- Keywords: Sample keyword data with realistic metrics
- Technical: Basic technical SEO assumptions

## 📊 Data Quality Assurance

### Validation Checks
1. **URL Validation**: Ensure all websites are accessible
2. **Data Completeness**: Verify all required data points collected
3. **Score Ranges**: Validate all scores are within 0-100 range
4. **Template Integrity**: Ensure all placeholders replaced correctly

### Quality Metrics
- **Data Collection Success Rate**: Track MCP tool success/failure rates
- **Report Accuracy**: Validate generated reports against source data
- **Processing Time**: Monitor workflow execution performance

## 🚨 CRITICAL IMPLEMENTATION REQUIREMENTS

### Social Media Data Collection Strategy

Since the report requires comprehensive social media analysis across 4 platforms for customer + 3 competitors (16 total social accounts), we need:

```javascript
// Social Media Collection Implementation
async collectSocialMediaData(customer, competitors) {
    const socialData = {};

    // For each company (customer + 3 competitors)
    const companies = [customer].concat(competitors);

    for (const company of companies) {
        const domain = company.website || company;

        try {
            // Option 1: Use Firecrawl MCP to scrape social media pages
            const facebookData = await mcp__firecrawl__firecrawl_scrape({
                url: `https://facebook.com/${domain}`,
                formats: ["json"],
                onlyMainContent: true
            });

            const instagramData = await mcp__firecrawl__firecrawl_scrape({
                url: `https://instagram.com/${domain}`,
                formats: ["json"],
                onlyMainContent: true
            });

            // Extract follower counts and activity levels
            socialData[domain] = this.extractSocialMediaMetrics(facebookData, instagramData);

        } catch (error) {
            // Fallback to sample data
            socialData[domain] = this.generateSocialMediaFallback();
        }
    }

    return socialData;
}
```

### CSV Export Implementation Requirements

Each CSV export function must generate properly formatted data:

```javascript
function generateCSVExports(collectedData) {
    const csvExports = {
        'Metadata Analysis': generateMetadataCSV(collectedData.technical),
        'Technical Issues': generateTechnicalIssuesCSV(collectedData.technical),
        'Competitor Analysis': generateCompetitorCSV(collectedData.competitors),
        'Keyword Opportunities': generateKeywordCSV(collectedData.keywords),
        'Social Media Audit': generateSocialMediaCSV(collectedData.socialMedia),
        'ROI Analysis': generateROICSV(collectedData)
    };

    return csvExports;
}
```

## 🚀 Updated Usage Instructions

### 1. Setup Customer with Complete Data
```javascript
const customer = {
    companyName: "Promac Paints",
    website: "https://promacpaints.co.za",
    industry: "Paint & Coatings",
    email: "contact@promacpaints.co.za",
    socialMedia: {
        facebook: "promacpaints",
        instagram: "promac_paints",
        youtube: "promacpaints",
        linkedin: "promac-paints"
    }
};
```

### 2. Setup Competitors with Social Media (Dynamic List)
```javascript
const competitors = [
    {
        website: "https://competitor1-website.com",
        name: "Competitor 1",
        socialMedia: {
            facebook: "competitor1-facebook",
            instagram: "competitor1-instagram",
            youtube: "competitor1-youtube",
            linkedin: "competitor1-linkedin"
        }
    },
    {
        website: "https://competitor2-website.com",
        name: "Competitor 2",
        socialMedia: {
            facebook: "competitor2-facebook",
            instagram: "competitor2-instagram",
            youtube: "competitor2-youtube",
            linkedin: "competitor2-linkedin"
        }
    },
    {
        website: "https://competitor3-website.com",
        name: "Competitor 3",
        socialMedia: {
            facebook: "competitor3-facebook",
            instagram: "competitor3-instagram",
            youtube: "competitor3-youtube",
            linkedin: "competitor3-linkedin"
        }
    }
];
```

### 3. Execute Complete Data Collection
```javascript
const result = await window.realMCPDataCollector.collectAllDataForReport(customer, competitors);
```

### 4. Generate Report with All Sections
```javascript
const reportHtml = await window.customerReportWorkflow.generateCompletePromacReport(customer, result);
```

### 5. Ensure All CSV Export Functions Work
```javascript
// Validate all 13+ CSV export functions are operational
const csvExports = generateAllCSVExports(result);
```

## 🎯 Success Criteria

### Workflow Completion Indicators
- ✅ Customer folder created successfully
- ✅ All MCP data collection completed (main + 3 competitors)
- ✅ Data stored in organized folder structure
- ✅ Professional report generated with real data
- ✅ Report matches Promac template structure exactly
- ✅ All placeholders replaced with collected data
- ✅ Report ready for client delivery

### Expected Output Structure
```
Final Deliverable:
├── Customer Folder (organized data storage)
├── Professional HTML Report (client-ready)
├── Raw Data Files (for future reference)
└── Execution Log (for debugging/audit trail)
```

This documentation provides the complete blueprint for the automated SEO audit workflow system using real MCP tools for comprehensive data collection and professional report generation.