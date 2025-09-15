# SEO Audit Report - MCP Data Requirements Map

## Report Sections → Required MCP Tools

### 1. HEADER & SUMMARY CARDS
- **Company Name, Website, Date**: Customer form input
- **Overall Score**: Calculated from performance + technical + content scores
- **Critical/Major Issues Count**: From on-page analysis
- **Pages Analyzed**: From sitemap crawl count

**MCP Tools:**
- `mcp__dataforseo__on_page_instant_pages` - Issue detection and scoring

### 2. PERFORMANCE METRICS
**Real Lighthouse Data:**
- Desktop & Mobile performance scores
- Load times, Core Web Vitals (LCP, FID, CLS)
- Speed Index, First Contentful Paint, Time to Interactive

**MCP Tools:**
- `mcp__dataforseo__on_page_lighthouse` - Real performance analysis

### 3. PAGE ANALYSIS TABLE
**Individual Page Data:**
- URLs, titles, meta descriptions per page
- Load time per page
- SEO score per page

**MCP Tools:**
- `mcp__dataforseo__on_page_instant_pages` - Page-by-page analysis
- `mcp__dataforseo__on_page_content_parsing` - Content extraction

### 4. TECHNICAL SEO ANALYSIS
**Technical Health Check:**
- HTTPS, Mobile responsiveness, Sitemaps
- Meta tags, Title tags, Heading structure
- Image optimization, Internal links, Schema markup

**MCP Tools:**
- `mcp__dataforseo__on_page_instant_pages` - Comprehensive technical audit

### 5. BACKLINK PROFILE
**Link Authority Analysis:**
- Total backlinks, referring domains
- Domain authority, toxic links
- Top referrers, anchor text analysis

**MCP Tools:**
- `mcp__dataforseo__backlinks_bulk_referring_domains`
- `mcp__dataforseo__backlinks_anchors`
- `mcp__dataforseo__backlinks_summary`

### 6. KEYWORD RANKINGS
**Search Visibility:**
- Current rankings for target keywords
- Search volumes, keyword difficulty
- Ranking opportunities and trends

**MCP Tools:**
- `mcp__dataforseo__dataforseo_labs_google_ranked_keywords`
- `mcp__dataforseo__dataforseo_labs_google_keyword_ideas`
- `mcp__dataforseo__serp_organic_live_advanced`

### 7. COMPETITOR ANALYSIS
**Competitive Intelligence:**
- Main competitor identification
- Keyword gap analysis
- Competitive ranking comparison

**MCP Tools:**
- `mcp__dataforseo__dataforseo_labs_google_competitors_domain`
- `mcp__dataforseo__dataforseo_labs_google_domain_intersection`

### 8. SOCIAL MEDIA PRESENCE
**Social Signals:**
- Platform presence detection
- Follower counts and engagement
- Social traffic estimation

**MCP Tools:**
- Custom social media detection (manual/form input)
- `mcp__dataforseo__serp_youtube_organic_live_advanced` for YouTube

### 9. EXPORT FUNCTIONS REQUIRED
**Download Capabilities:**
- **Full HTML Report**: Complete audit report as HTML file
- **PDF Export**: Print-to-PDF functionality
- **Technical Issues CSV**: All technical problems in spreadsheet format
- **Competitor Analysis CSV**: Keyword gaps and competitor data
- **Recommendations CSV**: Action plan with priorities
- **Keyword Rankings CSV**: All ranking data with metrics

## MCP IMPLEMENTATION PRIORITY

### HIGH PRIORITY (Core Report Data):
1. `mcp__dataforseo__on_page_lighthouse` - Performance metrics
2. `mcp__dataforseo__on_page_instant_pages` - Technical analysis
3. `mcp__dataforseo__backlinks_bulk_referring_domains` - Authority data
4. `mcp__dataforseo__dataforseo_labs_google_ranked_keywords` - Rankings

### MEDIUM PRIORITY (Enhanced Analysis):
5. `mcp__dataforseo__dataforseo_labs_google_competitors_domain` - Competitors
6. `mcp__dataforseo__dataforseo_labs_google_keyword_ideas` - Opportunities
7. `mcp__dataforseo__backlinks_anchors` - Link analysis

### LOW PRIORITY (Nice-to-Have):
8. `mcp__dataforseo__serp_organic_live_advanced` - SERP analysis
9. `mcp__dataforseo__on_page_content_parsing` - Content details
10. `mcp__dataforseo__serp_youtube_organic_live_advanced` - Video presence

## DATA PROCESSING WORKFLOW

1. **Input**: Customer website URL + target keywords
2. **Collection**: Run all HIGH priority MCP tools
3. **Analysis**: Process data into report structure
4. **Scoring**: Calculate overall score from weighted metrics
5. **Output**: Generate HTML report with export capabilities
6. **Export**: Provide CSV downloads for specific data sections